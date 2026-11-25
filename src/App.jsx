import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VideoSection from './components/VideoSection';
import Menu from './components/Menu';
import Offers from './components/Offers';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import useCart from './hooks/useCart';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  return (
    <div className="min-h-screen bg-night-950">
      <Navbar onCartOpen={() => setCartOpen(true)} cartCount={cart.count} />
      <main>
        <Hero cartCount={cart.count} />
        <About />
        <VideoSection />
        <Menu onAdd={cart.addItem} />
        <Offers />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        increase={cart.increase}
        decrease={cart.decrease}
        remove={cart.remove}
        clear={cart.clear}
        subtotal={cart.subtotal}
        delivery={cart.delivery}
        total={cart.total}
      />
    </div>
  );
}
