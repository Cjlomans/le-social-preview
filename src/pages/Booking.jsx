import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { fetchBlackoutDates, isBlackoutDate, dateRangeOverlapsBlackout } from "../utils/cmsClient";

// Stripe public key (test mode)
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

// PayPal client ID (test mode)
const PAYPAL_CLIENT_ID = "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R";

const signageOptions = [
  "Happy Birthday",
  "Miss to Mrs",
  "Death to my 20s",
  "Oh Baby",
  "Let's Party",
  "She Said Yes",
];

const kits = [
  { id: "black", name: "Black Kit", price: 300 },
  { id: "floral", name: "Floral Kit", price: 280 },
  { id: "orange-pink", name: "Orange & Pink Kit", price: 290 },
  { id: "poolparty", name: "Pool Party Kit", price: 320 },
  { id: "red-pink", name: "Red & Pink Kit", price: 290 },
  { id: "white", name: "White Kit", price: 280 },
];

// Hardcoded unavailable dates for demonstration
const bookedKitsByDate = {
  "2025-08-01": ["black"],
  "2025-08-10": ["white", "poolparty"],
  "2025-08-15": ["black", "floral", "orange-pink"],
  "2025-08-20": ["red-pink", "white"],
  "2025-08-25": ["poolparty"],
  "2025-09-05": ["black", "white"],
  "2025-09-12": ["floral", "orange-pink"],
  "2025-09-18": ["red-pink"],
};

// Convert dates to Date objects for the calendar
const unavailableDates = Object.keys(bookedKitsByDate).map(dateStr => new Date(dateStr));

let invoiceNumber = Math.floor(Math.random() * 1000) + 1000; // Generate a random invoice number

export default function Booking() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    kit: "",
    signage: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    preference: "",
    businessName: "",
    businessABN: "",
  });
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [depositAmount, setDepositAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [requireFullPayment, setRequireFullPayment] = useState(false);
  const [adminBlackoutDates, setAdminBlackoutDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch blackout dates from CMS
  useEffect(() => {
    const getBlackoutDates = async () => {
      try {
        setIsLoading(true);
        const blackoutDates = await fetchBlackoutDates();
        setAdminBlackoutDates(blackoutDates);
      } catch (error) {
        console.error("Error fetching blackout dates:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getBlackoutDates();
  }, []);

  // Calculate the number of days in the selected range
  const getDaysCount = (dateRange) => {
    if (!dateRange[0] || !dateRange[1]) return 0;
    
    const start = new Date(dateRange[0]);
    const end = new Date(dateRange[1]);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    
    return diffDays;
  };

  // Calculate days until the event start date
  const daysUntil = (startDate) => {
    if (!startDate) return Infinity;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(start - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Calculate deposit and total amount based on kit price and number of days
  useEffect(() => {
    if (form.kit && dateRange[0] && dateRange[1]) {
      const selectedKit = kits.find(k => k.id === form.kit);
      if (selectedKit) {
        const days = getDaysCount(dateRange);
        const total = selectedKit.price * days;
        setTotalAmount(total);
        
        // Check if event is less than 30 days away
        const daysToEvent = daysUntil(dateRange[0]);
        if (daysToEvent < 30) {
          setRequireFullPayment(true);
          setDepositAmount(total); // Full payment required
        } else {
          setRequireFullPayment(false);
          setDepositAmount(total * 0.5); // 50% deposit
        }
      }
    }
  }, [form.kit, dateRange]);

  const updateForm = (key, value) => setForm({ ...form, [key]: value });
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  // Function to handle date range selection
  const handleDateRangeChange = (update) => {
    setDateRange(update);
    if (update[0] && update[1]) {
      const formattedStartDate = update[0].toISOString().split('T')[0];
      const formattedEndDate = update[1].toISOString().split('T')[0];
      updateForm("startDate", formattedStartDate);
      updateForm("endDate", formattedEndDate);
    } else {
      updateForm("startDate", "");
      updateForm("endDate", "");
    }
  };

  // Function to check if a kit is available on the selected date range
  const isKitAvailable = (kitId) => {
    if (!dateRange[0] || !dateRange[1]) return true;
    
    const start = new Date(dateRange[0]);
    const end = new Date(dateRange[1]);
    
    // Check each day in the range
    for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
      const formattedDate = day.toISOString().split('T')[0];
      if (bookedKitsByDate[formattedDate]?.includes(kitId)) {
        return false;
      }
    }
    
    return true;
  };

  // Filter available kits based on selected date range
  const availableKits = kits.filter(kit => isKitAvailable(kit.id));

  // Generate a unique invoice ID
  const generateInvoiceId = () => {
    return `INV-${String(invoiceNumber++).padStart(4, '0')}`;
  };

  // Send confirmation email
  const sendEmail = () => {
    const invoiceId = generateInvoiceId();
    const days = getDaysCount(dateRange);

    emailjs.send("service_252f4vd", "template_5hc24md", {
      ...form,
      kit: kits.find((k) => k.id === form.kit)?.name,
      to_name: form.name,
      user_email: form.email,
      invoice_number: invoiceId,
      deposit_amount: depositAmount.toFixed(2),
      total_amount: totalAmount.toFixed(2),
      days_count: days,
      logo_url: "https://deepresearcher.net/assets/branding/lesocial-logo.webp"
    }, "Crx2WtjpSNo9n3_fs").then(
      () => {
        alert("Confirmation sent! Invoice #" + invoiceId);
        if (paymentSuccess) {
          alert("Thank you for your payment! Your booking is confirmed.");
        }
      },
      (error) => alert("Error: " + error.text)
    );
  };

  // Handle Stripe checkout
  const handleStripeCheckout = async () => {
    setIsPaymentProcessing(true);
    
    try {
      // Replace with your actual Stripe Checkout link
      window.location.href = 'https://buy.stripe.com/test_YOUR_LINK_HERE';
      
      // Note: In a real implementation, the code below would not execute
      // as the page would redirect to Stripe. This is just for demo purposes.
      setTimeout(() => {
        setIsPaymentProcessing(false);
        setPaymentSuccess(true);
        alert("Stripe payment successful! Your payment has been processed.");
        sendEmail();
      }, 2000);
    } catch (error) {
      setIsPaymentProcessing(false);
      alert("Payment failed: " + error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Book Your Event Kit</h1>

      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Date</h2>
          <div className="mb-6">
            <style jsx>{`
              .react-datepicker {
                font-family: 'Proxima Nova', 'Inter', sans-serif;
                border-radius: 0.5rem;
                border: 1px solid #e6d6c9;
              }
              .react-datepicker__header {
                background-color: #f5ede1;
                border-bottom: 1px solid #e6d6c9;
              }
              .react-datepicker__day--selected,
              .react-datepicker__day--in-range {
                background-color: #b48a7a;
              }
              .react-datepicker__day--in-selecting-range {
                background-color: #e6d6c9;
              }
              .react-datepicker__day:hover {
                background-color: #e6d6c9;
              }
              .unavailable-date {
                background-color: #ffeeee;
                color: #999;
                text-decoration: line-through;
              }
              .react-datepicker__day--disabled {
                color: #ccc;
              }
            `}</style>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateRangeChange}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              excludeDates={adminBlackoutDates}
              inline
              className="w-full border p-2 rounded mb-4"
              dayClassName={date => {
                const formattedDate = date.toISOString().split('T')[0];
                return Object.keys(bookedKitsByDate).includes(formattedDate) ? "unavailable-date" : undefined;
              }}
            />
            <div className="flex flex-col space-y-2 mt-4 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#ffeeee] border border-gray-300 mr-2"></div>
                <span>Some kits unavailable on this date</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#f0f0f0] border border-gray-300 mr-2"></div>
                <span>Admin blackout dates (unavailable)</span>
              </div>
              {isLoading && (
                <div className="mt-2 p-2 bg-yellow-100 rounded">
                  <p>Loading blackout dates from CMS...</p>
                </div>
              )}
              {dateRange[0] && dateRange[1] && (
                <div className="mt-2 p-2 bg-[#f5ede1] rounded">
                  <p className="font-semibold">Selected: {getDaysCount(dateRange)} day{getDaysCount(dateRange) !== 1 ? 's' : ''}</p>
                  <p>From: {dateRange[0].toLocaleDateString()}</p>
                  <p>To: {dateRange[1].toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={next}
            className="bg-[#b48a7a] text-white px-4 py-2 rounded hover:bg-[#e6d6c9] hover:text-[#b48a7a] transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Kit</h2>
          <div className="mb-4 p-3 bg-[#f5ede1] rounded">
            <p className="font-semibold">Booking for {getDaysCount(dateRange)} day{getDaysCount(dateRange) !== 1 ? 's' : ''}</p>
            <p>From: {new Date(form.startDate).toLocaleDateString()}</p>
            <p>To: {new Date(form.endDate).toLocaleDateString()}</p>
          </div>
          <div className="grid gap-2 mb-4">
            {kits.map((kit) => (
              <button
                key={kit.id}
                onClick={() => updateForm("kit", kit.id)}
                disabled={!isKitAvailable(kit.id)}
                className={`p-3 border rounded text-left ${
                  form.kit === kit.id ? "bg-[#f5ede1] border-[#b48a7a]" : ""
                } ${!isKitAvailable(kit.id) ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}`}
              >
                <div className="flex justify-between items-center">
                  <span>{kit.name}</span>
                  <span className="text-sm font-semibold">${kit.price} per day</span>
                </div>
                {!isKitAvailable(kit.id) && <span className="text-red-500 text-sm block mt-1">(Unavailable for selected dates)</span>}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <button onClick={back} className="text-sm underline">Back</button>
            <button
              onClick={next}
              disabled={!form.kit}
              className="bg-[#b48a7a] text-white px-4 py-2 rounded disabled:bg-gray-400 hover:bg-[#e6d6c9] hover:text-[#b48a7a] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Kit Preferences</h2>
          
          <label className="block mb-1 font-semibold">Variation Preference</label>
          <textarea
            className="w-full border p-2 rounded mb-4"
            placeholder="Any specific color variations or customizations?"
            value={form.preference}
            onChange={(e) => updateForm("preference", e.target.value)}
          />

          <label className="block mb-1 font-semibold">Signage Option</label>
          <select
            className="w-full border p-2 rounded mb-4"
            value={form.signage}
            onChange={(e) => updateForm("signage", e.target.value)}
          >
            <option value="">Select signage...</option>
            {signageOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <div className="flex space-x-2">
            <button onClick={back} className="text-sm underline">Back</button>
            <button
              onClick={next}
              disabled={!form.signage}
              className="bg-[#b48a7a] text-white px-4 py-2 rounded disabled:bg-gray-400 hover:bg-[#e6d6c9] hover:text-[#b48a7a] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
          
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-2"
            value={form.name}
            onChange={(e) => updateForm("name", e.target.value)}
          />

          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded mb-2"
            value={form.email}
            onChange={(e) => updateForm("email", e.target.value)}
          />

          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="tel"
            className="w-full border p-2 rounded mb-2"
            value={form.phone}
            onChange={(e) => updateForm("phone", e.target.value)}
          />

          <label className="block mb-1 font-semibold">Role/Relationship to Event</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-4"
            placeholder="e.g., Bride, Event Planner, Mother of Bride"
            value={form.role}
            onChange={(e) => updateForm("role", e.target.value)}
          />

          <div className="flex space-x-2">
            <button onClick={back} className="text-sm underline">Back</button>
            <button
              onClick={next}
              disabled={!form.name || !form.email || !form.phone}
              className="bg-[#b48a7a] text-white px-4 py-2 rounded disabled:bg-gray-400 hover:bg-[#e6d6c9] hover:text-[#b48a7a] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Confirm & Pay</h2>
          
          <div className="bg-[#f5ede1] p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Booking Summary</h3>
            <ul className="space-y-1">
              <li><span className="font-medium">Dates:</span> {new Date(form.startDate).toLocaleDateString()} to {new Date(form.endDate).toLocaleDateString()} ({getDaysCount(dateRange)} day{getDaysCount(dateRange) !== 1 ? 's' : ''})</li>
              <li><span className="font-medium">Kit:</span> {kits.find((k) => k.id === form.kit)?.name}</li>
              <li><span className="font-medium">Signage:</span> {form.signage}</li>
              <li><span className="font-medium">Name:</span> {form.name}</li>
              <li><span className="font-medium">Email:</span> {form.email}</li>
              <li><span className="font-medium">Phone:</span> {form.phone}</li>
              {form.role && <li><span className="font-medium">Role:</span> {form.role}</li>}
              {form.preference && <li><span className="font-medium">Preferences:</span> {form.preference}</li>}
            </ul>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Business Name (Optional)</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              value={form.businessName}
              onChange={(e) => updateForm("businessName", e.target.value)}
            />

            <label className="block mb-1 font-semibold">Business ABN (Optional)</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={form.businessABN}
              onChange={(e) => updateForm("businessABN", e.target.value)}
            />
          </div>

          <div className="bg-white border border-[#e6d6c9] rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Daily Rate:</span>
              <span>${kits.find((k) => k.id === form.kit)?.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Number of Days:</span>
              <span>{getDaysCount(dateRange)}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-lg font-bold">
              <span>Total Price:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            
            {requireFullPayment ? (
              <div className="bg-yellow-100 p-2 rounded mt-2 text-sm">
                <p className="font-semibold">Full payment required</p>
                <p>Your event is less than 30 days away, so full payment is required to secure your booking.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2 text-lg font-bold">
                  <span>50% Deposit Due Now:</span>
                  <span>${depositAmount.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Final payment of ${(totalAmount - depositAmount).toFixed(2)} will be due 30 days before your event.
                </p>
              </>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Payment Options</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select a payment method to secure your booking with {requireFullPayment ? 'full payment' : 'a 50% deposit'}.
            </p>

            {/* Stripe Payment Button */}
            <button 
              onClick={handleStripeCheckout}
              disabled={isPaymentProcessing || paymentSuccess}
              className="w-full bg-[#6772e5] text-white py-3 px-4 rounded mb-3 flex items-center justify-center hover:bg-[#5469d4] transition-colors"
            >
              {isPaymentProcessing ? (
                <span>Processing...</span>
              ) : paymentSuccess ? (
                <span>Payment Complete ✓</span>
              ) : (
                <span>Pay ${depositAmount.toFixed(2)} with Credit Card</span>
              )}
            </button>

            {/* PayPal Payment Button */}
            <div className="mb-3">
              <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: "AUD" }}>
                <PayPalButtons
                  disabled={isPaymentProcessing || paymentSuccess}
                  style={{ layout: "horizontal", color: "gold" }}
                  createOrder={(data, actions) => {
                    // Replace YOUR_EMAIL and ITEM_NAME as needed
                    const paypalUrl =
                      'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick'
                      + '&business=YOUR_EMAIL@example.com'
                      + '&item_name=Le+Social+Deposit'
                      + '&amount=' + depositAmount.toFixed(2)
                      + '&currency_code=AUD'
                      + '&return=https://lesocial.au/thank-you'
                      + '&custom=' + generateInvoiceId();
                    
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: depositAmount.toFixed(2),
                            currency_code: "AUD"
                          },
                          description: `${requireFullPayment ? 'Full payment' : 'Deposit'} for ${kits.find((k) => k.id === form.kit)?.name} - ${getDaysCount(dateRange)} day(s)`
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(() => {
                      setPaymentSuccess(true);
                      alert("PayPal payment successful! Your payment has been processed.");
                      sendEmail();
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>

            {/* Email Confirmation Option */}
            <button
              onClick={sendEmail}
              className="w-full bg-green-600 text-white py-3 px-4 rounded mb-3 hover:bg-green-700 transition-colors"
            >
              Request Invoice (Pay Later)
            </button>
          </div>

          <button onClick={back} className="text-sm underline">Back</button>
        </div>
      )}
    </div>
  );
}

