import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, CheckCircle2, IndianRupee, Truck } from 'lucide-react';

const fmt = (n) => n.toLocaleString('en-IN');

export default function Cart({
  open,
  onClose,
  items,
  increase,
  decrease,
  remove,
  clear,
  subtotal,
  delivery,
  total,
}) {
  const [placed, setPlaced] = useState(false);

  const checkout = () => {
    setPlaced(true);
    clear();
    setTimeout(() => setPlaced(false), 4000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-night-950/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-night-900 border-l border-gold-500/20 shadow-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 border border-gold-500/30 text-gold-400">
                  <ShoppingBag size={18} />
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold text-white">Your Order</h2>
                  <p className="text-xs text-neutral-400">
                    {items.length === 0 ? 'Empty handi' : `${items.reduce((n, i) => n + i.qty, 0)} item(s)`}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-300 hover:border-gold-500/40 hover:text-gold-300 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Order placed confirmation */}
            <AnimatePresence>
              {placed && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mx-5 mt-4 flex items-start gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3.5"
                >
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-green-400" />
                  <div>
                    <p className="text-sm font-semibold text-green-300">Order placed!</p>
                    <p className="mt-0.5 text-xs text-green-200/70">
                      Our kitchen has fired up the handis. Thank you for your order.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
              {items.length === 0 && !placed && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-400/8 border border-gold-500/20">
                    <ShoppingBag size={30} className="text-gold-500/50" />
                  </span>
                  <p className="mt-5 font-display text-lg text-neutral-300">Your handi is empty</p>
                  <p className="mt-1.5 max-w-[240px] text-[13px] text-neutral-500">
                    Add a biryani from our signature menu and it will appear here.
                  </p>
                  <button onClick={onClose} className="btn-gold mt-6">
                    Browse Menu
                  </button>
                </div>
              )}

              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ duration: 0.25 }}
                    className="glass-card flex items-center gap-4 p-3.5"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold-gradient/20 border border-gold-500/25 font-display text-lg text-gold-400">
                      {item.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{item.name}</p>
                      <p className="mt-0.5 text-xs text-gold-400">₹{fmt(item.price)}</p>
                      <div className="mt-2 flex items-center gap-2.5">
                        <button
                          onClick={() => decrease(item.id)}
                          aria-label={`Decrease ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-neutral-300 hover:border-gold-500/40 hover:text-gold-300 transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="min-w-5 text-center text-sm font-semibold text-white">{item.qty}</span>
                        <button
                          onClick={() => increase(item.id)}
                          aria-label={`Increase ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-neutral-300 hover:border-gold-500/40 hover:text-gold-300 transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-semibold text-white">₹{fmt(item.price * item.qty)}</span>
                      <button
                        onClick={() => remove(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="border-t border-white/8 px-6 py-5 space-y-2.5">
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-neutral-200">₹{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Truck size={14} /> Delivery
                  </span>
                  <span className={delivery === 0 ? 'text-green-400 font-medium' : 'text-neutral-200'}>
                    {delivery === 0 ? 'Free' : `₹${fmt(delivery)}`}
                  </span>
                </div>
                {delivery > 0 && (
                  <p className="text-[11px] text-gold-400/80">
                    Add ₹{fmt(999 - subtotal)} more for free delivery
                  </p>
                )}
                <div className="flex justify-between border-t border-white/8 pt-3">
                  <span className="text-sm font-semibold text-white">Total</span>
                  <span className="flex items-center font-display text-xl font-bold text-gold-400">
                    <IndianRupee size={17} strokeWidth={2.4} />
                    {fmt(total)}
                  </span>
                </div>
                <button onClick={checkout} className="btn-gold w-full !py-3.5 mt-2 text-base">
                  Place Order
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
