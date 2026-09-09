import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import LatentScatterPlot from '@/components/LatentScatterPlot';
import Pricing from '@/components/Pricing';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Testimonials />
        <LatentScatterPlot />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
