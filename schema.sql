-- ==============================================================================
-- GOLF CART E-COMMERCE SCHEMA
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ==========================================
-- 1. PRODUCTS TABLE
-- ==========================================
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  base_price numeric not null,
  category text check (category in ('electric', 'gas', 'custom', 'parts', 'accessories')),
  inventory_count integer default 1,
  images text[] default '{}',
  specifications jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) -- Added for the handle_updated_at() trigger
);

-- Indexes for products
create index if not exists idx_products_category on products(category);
create index if not exists idx_products_slug on products(slug);

-- ==========================================
-- 2. PRODUCT OPTIONS (Variants)
-- ==========================================
create table if not exists product_options (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products(id) on delete cascade not null,
  option_name text not null, -- e.g., "Battery Type", "Body Color", "Rear Seat Kit"
  option_value text not null, -- e.g., "Lithium-Ion 48V", "Matte Black", "Flip-Flop Seat"
  price_modifier numeric default 0.00, -- e.g., +1500 for Lithium upgrade
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for options
create index if not exists idx_product_options_product_id on product_options(product_id);

-- ==========================================
-- 3. ORDERS TABLE
-- ==========================================
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null, -- Optional if guest checkout is allowed
  customer_email text not null, -- Required for guest checkout/receipts
  customer_phone text,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount numeric not null,
  shipping_address jsonb not null,
  billing_address jsonb,
  payment_intent_id text unique, -- From payment processor (Stripe)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for orders
create index if not exists idx_orders_user_id on orders(user_id);
create index if not exists idx_orders_customer_email on orders(customer_email);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_orders_payment_intent on orders(payment_intent_id);

-- ==========================================
-- 4. ORDER ITEMS TABLE
-- ==========================================
create table if not exists order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) on delete set null,
  quantity integer not null check (quantity > 0),
  selected_options jsonb default '[]'::jsonb, -- Captures selected modifiers at checkout
  price_at_purchase numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for order items
create index if not exists idx_order_items_order_id on order_items(order_id);
create index if not exists idx_order_items_product_id on order_items(product_id);

-- ==========================================
-- 5. CONTACT SUBMISSIONS
-- ==========================================
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  cart_model_interest text,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for contact submissions
create index if not exists idx_contact_submissions_status on contact_submissions(status);
create index if not exists idx_contact_submissions_created_at on contact_submissions(created_at);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
alter table products enable row level security;
alter table product_options enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table contact_submissions enable row level security;

-- ------------------------------------------------------------------------------
-- Admin Roles/Check Function (Assuming Admin via auth.users metadata or specific emails)
-- Because we only have "auth.users" as our admin panel users (no custom users table),
-- we assume anyone authenticated is an admin, OR you can restrict by email. 
-- For safety, we'll allow all authenticated users full access, representing admins.
-- ------------------------------------------------------------------------------

-- Products: Everyone can view. Admins (authenticated users) can manage.
create policy "Products are viewable by everyone" on products for select using (true);
create policy "Products insertable by admin" on products for insert with check (auth.role() = 'authenticated');
create policy "Products updatable by admin" on products for update using (auth.role() = 'authenticated');
create policy "Products deletable by admin" on products for delete using (auth.role() = 'authenticated');

-- Product Options: Everyone can view. Admins can manage.
create policy "Options are viewable by everyone" on product_options for select using (true);
create policy "Options insertable by admin" on product_options for insert with check (auth.role() = 'authenticated');
create policy "Options updatable by admin" on product_options for update using (auth.role() = 'authenticated');
create policy "Options deletable by admin" on product_options for delete using (auth.role() = 'authenticated');

-- Orders: 
-- 1. Customers can insert their own orders (anon or auth). We rely on Stripe Webhooks for status updates.
-- 2. Users can view their own orders if authenticated and matched by user_id.
-- 3. Admins (authenticated) can view and update all orders.
create policy "Orders insertable by everyone" on orders for insert with check (true);
create policy "Users can view their own orders or admins can view all" on orders for select using (
  (auth.role() = 'authenticated') -- Admins or authenticated users
  -- Note: if separating admins from normal users in the future, you'd check auth.uid() = user_id or admin claim
);
create policy "Orders updatable by admin" on orders for update using (auth.role() = 'authenticated');
create policy "Orders deletable by admin" on orders for delete using (auth.role() = 'authenticated');

-- Order Items:
-- Follows similar rules to orders.
create policy "Order items insertable by everyone" on order_items for insert with check (true);
create policy "Order items viewable by admin or owner" on order_items for select using (
  auth.role() = 'authenticated'
);
create policy "Order items updatable by admin" on order_items for update using (auth.role() = 'authenticated');
create policy "Order items deletable by admin" on order_items for delete using (auth.role() = 'authenticated');

-- Contact Submissions:
-- Public can insert. Admins can read/update/delete.
create policy "Anyone can submit contact form" on contact_submissions for insert with check (true);
create policy "Admins can view contact submissions" on contact_submissions for select using (auth.role() = 'authenticated');
create policy "Admins can update contact submissions" on contact_submissions for update using (auth.role() = 'authenticated');
create policy "Admins can delete contact submissions" on contact_submissions for delete using (auth.role() = 'authenticated');

-- ==============================================================================
-- TRIGGER FUNCTIONS FOR UPDATED_AT
-- ==============================================================================
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_products_updated_at
  before update on products
  for each row execute procedure handle_updated_at();

create trigger set_orders_updated_at
  before update on orders
  for each row execute procedure handle_updated_at();

-- ==============================================================================
-- SITE SETTINGS TABLE
-- Run this in Supabase SQL Editor to enable the discount feature.
-- ==============================================================================
create table if not exists site_settings (
  id text primary key default 'global',
  discount_active boolean default false,
  discount_percent numeric default 0 check (discount_percent >= 0 and discount_percent <= 100),
  discount_label text default 'Sale',
  updated_at timestamp with time zone default now()
);

-- Seed the single global row
insert into site_settings (id) values ('global') on conflict (id) do nothing;

-- RLS: public read, service-role write (admin client bypasses RLS anyway)
alter table site_settings enable row level security;
create policy "Anyone can read site settings" on site_settings for select using (true);

-- ==============================================================================
-- STORAGE BUCKET — product-images
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query).
-- This creates the bucket that the admin image uploader writes to.
-- ==============================================================================

-- 1. Create the bucket (public so uploaded images are accessible by URL)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  10485760,   -- 10 MB per file
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public             = true,
  file_size_limit    = 10485760,
  allowed_mime_types = array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

-- 2. Allow anyone to VIEW images (they're public product photos)
create policy "Public read – product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- 3. Allow uploads  (the API uses the service-role key which bypasses RLS,
--    but this policy lets the bucket work even from the dashboard)
create policy "Allow uploads – product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images');

-- 4. Allow replacing an existing image
create policy "Allow updates – product images"
  on storage.objects for update
  using (bucket_id = 'product-images');

-- 5. Allow the admin to delete images
create policy "Allow deletes – product images"
  on storage.objects for delete
  using (bucket_id = 'product-images');