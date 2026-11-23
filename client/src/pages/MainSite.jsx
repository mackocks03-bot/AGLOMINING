import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import History from '../components/History';
import About from '../components/About';
import Leadership from '../components/Leadership';
import Values from '../components/Values';
import HealthSafety from '../components/HealthSafety';
import Environment from '../components/Environment';
import CSR from '../components/CSR';
import Workforce from '../components/Workforce';
import Careers from '../components/Careers';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import WhatsApp from '../components/WhatsApp';
import { useContent } from '../hooks/useContent';

export default function MainSite() {
  const { content, images, loading } = useContent();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      <Navbar />
      <main>
        <Hero content={content?.hero} images={images} />
        <History content={content?.history} images={images} />
        <About content={content?.about} images={images} />
        <Leadership content={content?.leadership || content?.md_message} images={images} />
        <Values />
        <HealthSafety />
        <Environment />
        <CSR />
        <Workforce />
        <Careers content={content?.contact} />
        <Contact content={content?.contact} />
      </main>
      <Footer content={content?.contact} />
      <ScrollTop />
      <WhatsApp />
    </>
  );
}
