import { useEffect, useState } from 'react';

const STORAGE_KEY = 'royal-dum-cart-v1';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function useCart() {
  const [items, setItems] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable (private mode) — cart still works in memory */
    }
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const increase = (id) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));

  const decrease = (id) =>
    setItems((prev) =>
      prev.flatMap((i) =>
        i.id === id ? (i.qty <= 1 ? [] : [{ ...i, qty: i.qty - 1 }]) : [i]
      )
    );

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const clear = () => setItems([]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
  const delivery = items.length === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + delivery;

  return { items, addItem, increase, decrease, remove, clear, count, subtotal, delivery, total };
}
