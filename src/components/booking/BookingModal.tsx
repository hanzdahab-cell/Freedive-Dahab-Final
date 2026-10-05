import { useState, useEffect } from 'react';
import { X, Calendar, Sparkles, MessageCircle, ShieldCheck, Send } from 'lucide-react';
import { ssiCourses, specialtyCourses, instructorCourses } from '../../data/courses';
import { packagesData } from '../../data/packages';
import { roomTypes } from '../../data/accommodation';
import { useLanguage } from '../../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedId?: string;
  currency: 'EUR' | 'USD' | 'EGP';
}

export function BookingModal({ isOpen, onClose, initialSelectedId, currency }: BookingModalProps) {
  const { t, isRtl } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>('ssi-level-1');
  const [diverCount, setDiverCount] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('2026-10-15');
  const [lodgingId, setLodgingId] = useState<string>('none');
  const [lodgingNights, setLodgingNights] = useState<number>(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialSelectedId) {
      setSelectedId(initialSelectedId);
    }
  }, [initialSelectedId]);

  if (!isOpen) return null;

  // Find selected course or package
  const allOfferings = [
    ...ssiCourses.map(c => ({ id: c.id, title: c.title, priceEur: c.priceEur, type: 'Course' })),
    ...specialtyCourses.map(s => ({ id: s.id, title: s.title, priceEur: s.priceEur, type: 'Specialty' })),
    ...instructorCourses.map(i => ({ id: i.id, title: i.title, priceEur: i.priceEur, type: 'Instructor' })),
    ...packagesData.map(p => ({ id: p.id, title: p.title, priceEur: p.priceEur, type: 'Package' })),
    { id: 'training-session', title: 'Daily Line Training Buoy Pack (5 Sessions)', priceEur: 155, type: 'Training' }
  ];

  const currentOffering = allOfferings.find(o => o.id === selectedId) || allOfferings[0];
  const selectedRoom = roomTypes.find(r => r.id === lodgingId);

  // Price math
  const courseBasePrice = currentOffering.priceEur * diverCount;
  const lodgingCost = selectedRoom ? selectedRoom.pricePerNightEur.min * lodgingNights : 0;
  const totalEur = courseBasePrice + lodgingCost;
  const depositEur = Math.round(totalEur * 0.3);
  const balanceEur = totalEur - depositEur;

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Freedive Dahab! I want to book: ${currentOffering.title} for ${diverCount} diver(s) starting on ${startDate}. Name: ${name || 'Interested Diver'}. Total: €${totalEur}`
    );
    window.open(`https://wa.me/201008452911?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div className={`glass-panel max-w-3xl w-full max-h-[92vh] overflow-y-auto rounded-3xl border border-cyan-400/40 p-6 sm:p-10 relative shadow-2xl space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 ${isRtl ? 'left-6' : 'right-6'} p-2 rounded-full border border-white/10 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors cursor-pointer`}
          aria-label={t.booking.close}
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              <Sparkles className="w-10 h-10 animate-spin" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                RESERVATION RECEIVED
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                See You in Dahab, {name || 'Adventurer'}
              </h3>
              <p className="text-slate-300 max-w-md mx-auto text-sm font-light leading-relaxed">
                Your reservation for <strong className="text-white">{currentOffering.title}</strong> has been logged. 
                Our instructor team will contact you within 6 hours via WhatsApp or email with your confirmation package.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 max-w-md mx-auto text-left text-xs font-mono space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Program:</span>
                <span className="text-cyan-300 font-bold">{currentOffering.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Start Date:</span>
                <span>{startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Divers:</span>
                <span>{diverCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">30% Deposit Due:</span>
                <span className="text-emerald-400 font-bold">{formatPrice(depositEur)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={handleWhatsAppDirect}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.booking.whatsappDirect}</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-xl border border-white/20 text-white text-xs font-mono uppercase tracking-wider hover:bg-white/5 cursor-pointer"
              >
                {t.booking.close}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                DIRECT ACADEMY RESERVATION • GUARANTEED 3:1 RATIO
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {t.booking.modalTitle}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-light">
                {t.booking.modalSubtitle}
              </p>
            </div>

            {/* Step 1: Select Program */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-slate-300 block">
                {t.booking.offering}
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-white/15 text-white font-sans text-sm focus:border-cyan-400 focus:outline-none"
              >
                {allOfferings.map((o) => (
                  <option key={o.id} value={o.id}>
                    [{o.type}] {o.title} — {formatPrice(o.priceEur)}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Date & Divers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {t.booking.dates}
                </label>
                <input
                  type="date"
                  value={startDate}
                  min="2026-10-01"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-300 block">
                  {t.booking.experienceLevel}
                </label>
                <select
                  value={diverCount}
                  onChange={(e) => setDiverCount(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:border-cyan-400 focus:outline-none"
                >
                  <option value={1}>1 Diver (Individual)</option>
                  <option value={2}>2 Divers (Buddy Pair)</option>
                  <option value={3}>3 Divers (Full Private Group - Max 3)</option>
                  <option value={4}>4 Divers (Two Instructor Groups)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Optional Sea Lodge Stay */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-xs font-mono uppercase text-slate-300 flex justify-between">
                <span>Add Oceanfront Sea Lodge Stay (Optional)</span>
                <span className="text-cyan-400">Save up to €180 bundled</span>
              </label>
              <select
                value={lodgingId}
                onChange={(e) => setLodgingId(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:border-cyan-400 focus:outline-none"
              >
                <option value="none">No Accommodation Needed (Arrange Own)</option>
                {roomTypes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} — {formatPrice(r.pricePerNightEur.min)}/night (Breakfast & 100Mbps WiFi)
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Diver Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-400 block">{t.booking.fullName}</label>
                <input
                  type="text"
                  placeholder={t.booking.fullNamePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-400 block">{t.booking.email}</label>
                <input
                  type="email"
                  placeholder={t.booking.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-slate-400 block">{t.booking.phone}</label>
                <input
                  type="tel"
                  placeholder={t.booking.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Step 5: Notes */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-slate-400 block">{t.booking.notes}</label>
              <textarea
                rows={2}
                placeholder={t.booking.notesPlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Price Breakdown Calculation */}
            <div className="p-5 rounded-2xl bg-black/50 border border-cyan-500/30 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{currentOffering.title} ({diverCount}x):</span>
                <span>{formatPrice(courseBasePrice)}</span>
              </div>
              {selectedRoom && (
                <div className="flex justify-between text-slate-300">
                  <span>Sea Lodge ({selectedRoom.title} x {lodgingNights} nights):</span>
                  <span>{formatPrice(lodgingCost)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400 text-[11px] border-t border-white/10 pt-2">
                <span>Total Calculated:</span>
                <span className="text-white font-bold">{formatPrice(totalEur)}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold text-sm">
                <span>30% Deposit to Secure Slot:</span>
                <span>{formatPrice(depositEur)}</span>
              </div>
              <div className="text-[10px] text-slate-500">
                *Remaining balance of {formatPrice(balanceEur)} is paid on arrival in Dahab. Free date changes up to 14 days before start.
              </div>
            </div>

            {/* Submit & WhatsApp Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-cyan-500/25"
              >
                <Send className="w-4 h-4" />
                <span>{t.booking.submit}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="px-6 py-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-500/20 text-emerald-300 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.booking.whatsappDirect}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
