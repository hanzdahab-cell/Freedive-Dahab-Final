import { storyConfig } from '../../config/storyConfig';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';

const socialIconMap: Record<string, React.ElementType> = {
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
};

export function Footer() {
  const { footer } = storyConfig.site;

  return (
    <footer className="relative py-20 px-6 md:px-12 bg-[#061826] border-t border-white/10 overflow-hidden text-slate-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Note */}
          <div className="md:col-span-6 space-y-4">
            <span className="font-serif-display text-2xl font-semibold text-white tracking-wide block">
              Freedive Dahab
            </span>
            <p className="font-inter text-sm text-slate-400 max-w-md leading-relaxed">
              {footer.tagline}
            </p>
            <p className="font-inter text-xs text-slate-400">
              The world&apos;s premier freediving sanctuary and first SSI Freediving Instructor Training Center.
            </p>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3 text-xs font-inter">
            <span className="font-mono uppercase tracking-widest text-[#2EC4B6] block mb-2">
              Sanctuary Base
            </span>
            <div className="flex items-center gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-[#2EC4B6] shrink-0" />
              <span>{footer.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-[#2EC4B6] shrink-0" />
              <a
                href={`mailto:${footer.email}`}
                className="hover:text-white transition-colors"
              >
                {footer.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-4 h-4 text-[#2EC4B6] shrink-0" />
              <a
                href={`tel:${footer.phone.replace(/\s+/g, '')}`}
                className="hover:text-white transition-colors"
              >
                {footer.phone}
              </a>
            </div>
          </div>

          {/* Social Icons with Hover Animations */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2EC4B6] block mb-2">
              Connect With Us
            </span>
            <div className="flex items-center gap-3">
              {footer.social.map((s) => {
                const Icon = socialIconMap[s.icon] || MessageCircle;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Freedive Dahab on ${s.name}`}
                    className="p-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#2EC4B6]/60 hover:bg-[#2EC4B6]/10 text-slate-300 hover:text-[#2EC4B6] hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Freedive Dahab. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-cyan-300 transition-colors">
              Return to Surface ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
