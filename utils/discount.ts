import { createClient } from '@/utils/supabase/server';

export interface Discount {
  active: boolean;
  percent: number;
  label: string;
}

export async function getDiscount(): Promise<Discount> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('site_settings')
      .select('discount_active, discount_percent, discount_label')
      .eq('id', 'global')
      .single();

    return {
      active: data?.discount_active ?? false,
      percent: data?.discount_percent ?? 0,
      label: data?.discount_label ?? 'Sale',
    };
  } catch {
    return { active: false, percent: 0, label: 'Sale' };
  }
}

export function applyDiscount(price: number, discount: Discount): number {
  if (!discount.active || !discount.percent) return price;
  return Math.round(price * (1 - discount.percent / 100) * 100) / 100;
}
