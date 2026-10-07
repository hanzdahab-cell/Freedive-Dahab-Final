import { useState } from 'react';
import { roomTypes } from '../../data/accommodation';
import { Wifi, Check, Users, Home, ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import storeImg from '../../assets/images/dahab_freedive_store_1789742281859.jpg';

interface AccommodationSectionProps {
  onOpenBooking: () => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

export function AccommodationSection({ onOpenBooking, currency }: AccommodationSectionProps) {
  const [activeRoomId, setActiveRoomId] = useState(roomTypes[0].id);
  const activeRoom = roomTypes.find(r => r.id === activeRoomId) || roomTypes[0];

  const formatPrice = (eur: number) => {
    if (currency === 'USD') return `$${Math.round(eur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(eur * 52)}`;
    return `€${eur}`;
  };

  return (
    <section id="accommodation" className="relative py-32 px-6 bg-[#0E3453] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-alata tracking-[0.3em] uppercase text-cyan-400">
              <Home className="w-4 h-4" />
              <span>THE SEA LODGE • LIGHTHOUSE BAY</span>
            </div>
            <h2 className="font-bebas text-5xl sm:text-6xl font-normal text-white tracking-[0.05em] leading-tight">
              OCEANFRONT <span className="text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]">SANCTUARY</span>
            </h2>
            <p className="text-slate-300 text-base font-alata font-normal max-w-xl leading-relaxed">
              Wake up to panoramic Red Sea views, step directly onto the training bay, 
              and unwind on our private sunset yoga and coworking terrace with 100Mbps+ fiber.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-cyan-300">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <span>100Mbps+ Fiber • Nomad Friendly</span>
          </div>
        </div>

        {/* 2-Column Room Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Room Selector Navigation */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              {roomTypes.map((room) => {
                const isSelected = room.id === activeRoomId;
                return (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoomId(room.id)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border ${
                      isSelected
                        ? 'bg-sky-950/40 border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.15)] text-white'
                        : 'bg-slate-900/30 border-white/5 hover:border-white/20 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-serif text-xl font-bold">{room.title}</h4>
                      <span className="font-mono text-sm text-cyan-300 font-semibold">
                        {formatPrice(room.pricePerNightEur.min)}–{formatPrice(room.pricePerNightEur.max)}
                        <span className="text-[10px] text-slate-400 font-normal"> / night</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-light mb-2">{room.subtitle}</p>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-cyan-400" />
                        Up to {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                      </span>
                      {room.featured && (
                        <span className="text-cyan-400 font-semibold uppercase">Featured</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-slate-900/50 border border-cyan-400/20 mt-4 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                Package Discount
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Booking your accommodation alongside an SSI Course or Depth Package saves up to €180 on room rates.
              </p>
              <button
                onClick={onOpenBooking}
                className="btn-luxury text-white text-xs w-full py-3 mt-2"
              >
                RESERVE LODGE STAY
              </button>
            </div>
          </div>

          {/* Right Column: Selected Room Image & Amenities */}
          <div className="lg:col-span-7 glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={activeRoom.images[0]}
                alt={activeRoom.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-cyan-300">
                  {formatPrice(activeRoom.pricePerNightEur.min)} – {formatPrice(activeRoom.pricePerNightEur.max)} / night
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="font-serif text-3xl font-bold text-white mb-1">
                  {activeRoom.title}
                </h3>
                <p className="text-xs text-cyan-200/90 font-mono">
                  {activeRoom.subtitle}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Lodge Amenities & Features
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {activeRoom.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-xl bg-ocean hover:bg-ocean-light text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
                >
                  <span>Book {activeRoom.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* THE FREEDIVE DAHAB PRO STORE PICS & GEAR SHOWCASE       */}
        {/* ======================================================== */}
        <div className="mt-28 pt-16 border-t border-white/10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-cyan-400">
                <ShoppingBag className="w-4 h-4" />
                <span>EQUIPMENT SHOWROOM • LIGHTHOUSE PROMENADE</span>
              </div>
              <h3 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
                The Freedive <span className="text-cyan-300 italic font-normal">Pro Store</span>
              </h3>
              <p className="text-slate-400 text-sm font-light max-w-xl">
                South Sinai’s most comprehensive freediving pro shop. Carbon fiber fins, low volume masks, custom Yamamoto suits, and precision equalisation gear with in-bay trial privileges.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                ✓ Try Before You Buy in Lighthouse Bay
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Store Interior Photograph */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 relative group shadow-2xl aspect-[16/10]">
              <img
                src={storeImg}
                alt="Freedive Dahab Pro Store with carbon fins, wetsuits and masks"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E3453] via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-cyan-300 uppercase tracking-wider">
                  OFFICIAL MARES & MOLCHANOVS PARTNER
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-white">
                    Lighthouse Gear Sanctuary
                  </h4>
                  <p className="text-xs font-mono text-slate-300">
                    Open daily 08:00 – 20:00 • Custom fitting & sizing
                  </p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-semibold"
                >
                  Reserve Gear
                </button>
              </div>
            </div>

            {/* Store Features & Brands */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    title: 'Carbon & Fiberglass Fins',
                    brands: 'Cetma Composites, Molchanovs, Mares',
                    desc: 'Optimized stiffness curves calibrated to your kicking mechanics and dive style.',
                  },
                  {
                    title: 'Low Volume Freedive Masks',
                    brands: 'Aqualung Sphera, Mares Viper, Omer Zero',
                    desc: 'Micro-volume silhouettes for effortless equalisation beyond 30 meters.',
                  },
                  {
                    title: 'Custom Yamamoto Neoprene',
                    brands: '1.5mm, 3mm, 5mm Smoothskin',
                    desc: 'Hydrodynamic glide, thermal protection, and full flexibility tailored to your measurements.',
                  },
                  {
                    title: 'Equalisation & Depth Accessories',
                    brands: 'Octo Noseclips, Lanyards, Depth Gauges',
                    desc: 'Competition grade freediving hardware trusted by world record contenders.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-900/40 border border-white/10 hover:border-cyan-400/40 transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-white">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 font-medium">
                        {item.brands}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-400/20 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-mono text-cyan-300 font-semibold uppercase">
                    15% Student Discount
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Enrolled students receive preferential rates on all equipment.
                  </div>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded-lg bg-ocean-light text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors"
                >
                  SHOP INQUIRE
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
