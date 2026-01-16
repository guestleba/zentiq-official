import React from 'react';
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { MetricsTicker } from "@/components/MetricsTicker";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <Navbar />
      <HeroSection />
      <MetricsTicker />
      <FeatureGrid />
      <Footer />
    </div>
  );
}