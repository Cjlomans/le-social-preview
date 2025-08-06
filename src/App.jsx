import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import KitPage from "./pages/KitPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css';

let invoiceNumber = 1; // temporary local increment

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={
            <main className="flex-grow pt-16">
              <Booking />
            </main>
          } />
          <Route path="/faq" element={
            <main className="flex-grow pt-16">
              <FAQ />
            </main>
          } />
          <Route path="/about" element={
            <main className="flex-grow pt-16">
              <About />
            </main>
          } />
          <Route path="/kits/:kitId" element={
            <main className="flex-grow pt-16">
              <KitPage />
            </main>
          } />
          <Route path="/thank-you" element={
            <main className="flex-grow pt-16">
              <div className='p-10 text-center'>
                <h1 className='text-3xl font-bold mb-4'>Thanks for your booking!</h1>
                <p className='text-lg'>We'll be in touch soon. Your payment was received successfully.</p>
              </div>
            </main>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

