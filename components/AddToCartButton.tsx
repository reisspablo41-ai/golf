'use client';

import { useState } from 'react';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart, CartItem } from './CartContext';

interface Props {
  item: Omit<CartItem, 'quantity'>;
  className?: string;
}

export default function AddToCartButton({ item, className }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button onClick={handleAdd} className={className} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center' }}>
      {added ? (
        <><CheckCircle size={18} /> Added to Cart!</>
      ) : (
        <><ShoppingCart size={18} /> Add to Cart</>
      )}
    </button>
  );
}
