import React, { useState } from "react";

const faqs = [
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 4-6 weeks in advance to ensure availability, especially during peak wedding and event seasons."
  },
  {
    question: "What's included in each kit?",
    answer: "Each kit includes all styling elements, decorative pieces, signage, and setup instructions. Specific items vary by kit - check individual kit pages for detailed inventories."
  },
  {
    question: "Do you provide setup services?",
    answer: "Yes! We offer professional setup and breakdown services for an additional fee. Our team will ensure everything looks perfect for your event."
  },
  {
    question: "What's your cancellation policy?",
    answer: "Cancellations are fully refundable up to 45 days before your event. Cancellations within 45 days are subject to a 50% cancellation fee."
  },
  {
    question: "Can I customize the signage?",
    answer: "Absolutely! We offer several pre-designed signage options, and custom signage is available for an additional fee."
  },
  {
    question: "What if something gets damaged?",
    answer: "Minor wear and tear is expected and covered. Significant damage or missing items will be charged at replacement cost."
  },
  {
    question: "Do you deliver outside the metro area?",
    answer: "Yes, we deliver Australia-wide. Delivery fees apply based on distance and may require extended rental periods for remote locations."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-semibold">{faq.question}</span>
              <span className="text-2xl">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          We're here to help! Contact us for personalized assistance with your event styling needs.
        </p>
        <a 
          href="mailto:hello@lesocial.au" 
          className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

