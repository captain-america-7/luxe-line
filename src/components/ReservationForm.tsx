"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, Gift, CheckCircle, Sparkles } from "lucide-react";

export default function ReservationForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2 Guests");
  const [occasion, setOccasion] = useState("Casual Fine Dining");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const timeSlots = ["09:00 AM", "11:30 AM", "01:30 PM", "06:00 PM", "08:30 PM"];
  const guestOptions = ["1 Guest", "2 Guests", "4 Guests", "6 Guests", "8+ Guests"];
  const occasionOptions = ["Casual Fine Dining", "Business Meeting", "Anniversary", "Birthday Celebration"];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    setIsSubmitting(true);

    // Simulate luxury API handshake
    setTimeout(() => {
      const code = "LL-" + Math.floor(100000 + Math.random() * 900000);
      setBookingCode(code);
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 2000);
  };

  return (
    <section
      id="reservation"
      className="relative w-full py-24 md:py-36 bg-[#0B0B0B] text-[#F8F4ED] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Abstract background blur circles */}
        <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-gold blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#4E5340] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Context / Rules */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-gold font-bold mb-4 block">
                CHAPTER VIII — RESERVATIONS
              </span>
              <h2 className="text-4xl md:text-6xl font-light serif-title tracking-tight leading-[1.15] mb-6">
                Reserve Your <br />
                <span className="italic font-normal text-gold">Experience</span>
              </h2>
            </div>
            <p className="text-sm text-neutral-400 font-light leading-relaxed tracking-wider">
              Due to our limited seating capacity and custom ingredient preparations, reservations are highly recommended 2 weeks in advance. Tables are held for a maximum of 15 minutes.
            </p>
            <div className="space-y-4 pt-6 border-t border-neutral-800 text-xs text-neutral-500 tracking-wider">
              <p>• Smart casual dress code required.</p>
              <p>• For private events of 10+, contact: events@luxeline.com</p>
              <p>• Cancellations must be made 24 hours in advance.</p>
            </div>
          </div>

          {/* Right Column: Interactive Form Panel */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 md:p-12 relative min-h-[460px] flex flex-col justify-center overflow-hidden border border-white/10">
              <AnimatePresence mode="wait">
                {!isConfirmed ? (
                  <motion.form
                    key="reservation-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBooking}
                    className="space-y-6"
                  >
                    {/* Date Picker Grid */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> Date Selection
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-matte-black/60 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    {/* Guests selection Row */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" /> Party Size
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {guestOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setGuests(opt)}
                            className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-wider transition-all duration-300 ${
                              guests === opt
                                ? "bg-gold border-gold text-[#0B0B0B] font-semibold"
                                : "bg-transparent border-white/10 text-neutral-400 hover:border-gold/50"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slots Selection */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> Preferred Time
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-wider transition-all duration-300 ${
                              time === slot
                                ? "bg-gold border-gold text-[#0B0B0B] font-semibold"
                                : "bg-transparent border-white/10 text-neutral-400 hover:border-gold/50"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Occasion Option Dropdown */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                        <Gift className="w-3.5 h-3.5" /> Special Occasion
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-matte-black/60 border border-white/10 text-neutral-300 text-xs uppercase tracking-wider focus:outline-none focus:border-gold transition-colors"
                      >
                        {occasionOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#141414] text-white py-2">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Action Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !date || !time}
                      className="w-full py-4 mt-4 rounded-full bg-gold hover:bg-gold-hover text-[#0B0B0B] font-semibold text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-40 disabled:hover:bg-gold hover:scale-102 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 rounded-full border-2 border-matte-black border-t-transparent animate-spin" />
                      ) : (
                        "Request Sanctuary Seat"
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="reservation-confirmed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center space-y-6 flex flex-col items-center"
                  >
                    <div className="p-4 rounded-full bg-gold/10 border border-gold/30 text-gold mb-2 animate-bounce">
                      <CheckCircle className="w-10 h-10" />
                    </div>

                    <h3 className="text-3xl font-light serif-title tracking-wide text-gold">
                      Your Table is Awaiting
                    </h3>
                    
                    <p className="max-w-md text-xs text-neutral-300 leading-relaxed tracking-wider font-light">
                      We have reserved a custom table for your party. A digital concierge confirmation has been prepared.
                    </p>

                    <div className="p-6 rounded-xl bg-matte-black/60 border border-white/5 w-full max-w-sm text-left space-y-4">
                      <div className="flex justify-between items-center text-xs tracking-wider border-b border-white/5 pb-3">
                        <span className="text-neutral-400 uppercase">Booking Code:</span>
                        <span className="font-mono text-gold font-bold">{bookingCode}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[10px] tracking-widest uppercase text-neutral-300 font-light">
                        <div>
                          <span className="text-neutral-500 block mb-1">DATE</span>
                          <span className="font-mono text-xs text-white">{date}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block mb-1">TIME</span>
                          <span className="font-mono text-xs text-white">{time}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block mb-1">PARTY</span>
                          <span className="text-xs text-white">{guests}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block mb-1">OCCASION</span>
                          <span className="text-xs text-white truncate block">{occasion}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsConfirmed(false)}
                      className="px-6 py-2.5 rounded-full border border-gold/30 text-gold hover:bg-gold/5 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                    >
                      Make Another Booking
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
