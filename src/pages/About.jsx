import React from "react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">About Le Social</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-6">
          Le Social is your premier destination for professional event styling kits that transform ordinary celebrations into extraordinary experiences.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="mb-6">
          Founded with a passion for creating memorable moments, Le Social specializes in providing comprehensive styling solutions for all types of events. From intimate gatherings to grand celebrations, our carefully curated kits ensure your event looks professionally styled without the stress.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Premium quality event styling kits</li>
          <li>Professional setup and breakdown services</li>
          <li>Customizable signage options</li>
          <li>Flexible rental periods</li>
          <li>Expert styling consultation</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <p className="mb-6">
          We're committed to making your special day perfect. Every kit is meticulously maintained and styled to ensure it meets our high standards and exceeds your expectations.
        </p>
      </div>
    </div>
  );
}

