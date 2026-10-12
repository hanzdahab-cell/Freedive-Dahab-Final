import { useCallback, useEffect, useRef, useState } from 'react';
import { Mail, Send, X, ChevronRight } from 'lucide-react';
import { ssiCourses, specialtyCourses } from '../../data/courses';
import { faqItems } from '../../data/faq';
import { siteConfig } from '../../data/site';

/* ==========================================================================
   CHAT ASSISTANT — free, no backend, no API keys.
   A rule-based assistant that helps visitors choose an SSI course (using the
   real course data), answers from the site's FAQ data, and builds a booking
   request that is delivered by opening the visitor's email app pre-addressed
   to info@freedivedahab.com (mailto:). A WhatsApp deep link is offered as a
   secondary channel. Launcher icon is an envelope, per request.
   ========================================================================== */

interface CourseLike {
  id: string;
  title: string;
  priceEur: number;
  durationDays?: number;
  maxDepthMeters?: number;
  shortDesc?: string;
}

interface ChatMessage {
  id: number;
  from: 'bot' | 'user';
  text: string;
  courses?: CourseLike[];
  chips?: string[];
}

type Flow =
  | 'idle'
  | 'choose-experience'
  | 'recommend'
  | 'prices'
  | 'faq'
  | 'lead-name'
  | 'lead-email'
  | 'lead-date'
  | 'done';

const MAIL_TO = siteConfig.contact.email;
const WHATSAPP_URL = 'https://wa.me/201008452911';

const CORE_CHIPS = ['Help me choose a course', 'See prices', 'FAQ', 'Booking request'];

const EXPERIENCE_CHIPS = ['Never freedived', 'Level 1–2 certified', 'Advanced (30m+)'];

const FAQ_CHIPS = ['Booking & payment', 'Cancellation', 'Equipment', 'Travel to Dahab', 'The Blue Hole'];

function findCourse(idLike: RegExp): CourseLike | undefined {
  return (
    ssiCourses.find((c) => idLike.test(c.id) || idLike.test(c.slug)) ||
    specialtyCourses.find((c) => idLike.test(c.id) || idLike.test(c.slug))
  );
}

export function ChatWidget({ onOpenBooking }: { onOpenBooking?: (courseId?: string) => void }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [flow, setFlow] = useState<Flow>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      from: 'bot',
      text: "Hi! I'm the Freedive Dahab assistant. I can help you pick the right SSI course, answer questions, or start a booking request — pick one below, or just type.",
      chips: CORE_CHIPS,
    },
  ]);
  const leadRef = useRef<{ name?: string; email?: string; date?: string; courseId?: string }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const onCloseRef = useRef(() => setOpen(false));

  const push = useCallback((msg: Omit<ChatMessage, 'id'>) => {
    setMessages((prev) => [...prev, { ...msg, id: nextId.current++ }]);
  }, []);

  // Freeze the Lenis page scroll while the chat is open; Escape closes.
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.__lenis?.start();
    };
  }, [open]);

  // Other components (e.g. FAQ CTA) can open the chat: window.dispatchEvent(new CustomEvent('fd:open-chat'))
  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener('fd:open-chat', openChat);
    return () => window.removeEventListener('fd:open-chat', openChat);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const sendEmailRequest = () => {
    const l = leadRef.current;
    const course = l.courseId
      ? [...ssiCourses, ...specialtyCourses].find((c) => c.id === l.courseId)
      : undefined;
    const subject = `Booking request — ${course ? course.title : 'Freediving in Dahab'}${l.name ? ` — ${l.name}` : ''}`;
    const body = [
      `Name: ${l.name || '—'}`,
      `Email: ${l.email || '—'}`,
      `Requested course: ${course ? `${course.title} (€${course.priceEur})` : 'Not sure yet — needs recommendation'}`,
      `Preferred start date: ${l.date || 'Flexible'}`,
      '',
      'Sent from the freedivedahab.com chat assistant.',
    ].join('\n');
    window.location.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const answerFaq = (text: string): string | null => {
    const q = text.toLowerCase();
    const match = (keys: string[]) => keys.some((k) => q.includes(k));
    if (match(['cancel', 'refund'])) return faqItems.find((f) => f.id === 'faq-2')?.answer || null;
    if (match(['book', 'pay', 'deposit', 'reserve'])) return faqItems.find((f) => f.id === 'faq-1')?.answer || null;
    if (match(['gear', 'equipment', 'wetsuit', 'fins', 'mask'])) return faqItems.find((f) => f.id === 'faq-8')?.answer || null;
    if (match(['fly', 'flight', 'airport', 'visa', 'transfer', 'travel', 'sharm'])) return faqItems.find((f) => f.id === 'faq-7')?.answer || null;
    if (match(['temperature', 'temperature', 'warm', 'cold', 'water temp', 'visibility'])) return faqItems.find((f) => f.id === 'faq-9')?.answer || null;
    if (match(['blue hole'])) return faqItems.find((f) => f.id === 'faq-10')?.answer || null;
    if (match(['deep', 'depth', 'meters'])) return faqItems.find((f) => f.id === 'faq-4')?.answer || null;
    if (match(['ratio', 'group size', 'students'])) return faqItems.find((f) => f.id === 'faq-6')?.answer || null;
    if (match(['certification', 'recognized', 'ssi card', 'license'])) return faqItems.find((f) => f.id === 'faq-5')?.answer || null;
    if (match(['begin', 'never', 'first time', 'start', 'no experience'])) return faqItems.find((f) => f.id === 'faq-3')?.answer || null;
    return null;
  };

  const recommendFor = (experience: string): CourseLike[] => {
    if (/never|begin/i.test(experience)) {
      const l1 = findCourse(/level-1/) || ssiCourses[0];
      const basic = findCourse(/basic/);
      return basic && basic.id !== l1?.id ? [l1, basic].filter(Boolean) : [l1].filter(Boolean);
    }
    if (/level 1|level-1|certified/i.test(experience)) {
      const l2 = findCourse(/level-2/);
      return l2 ? [l2] : ssiCourses.slice(1, 2);
    }
    const l3 = findCourse(/level-3/);
    const master = findCourse(/master/);
    return [l3, master].filter(Boolean) as CourseLike[];
  };

  const handleChip = (chip: string) => {
    push({ from: 'user', text: chip });

    if (flow === 'choose-experience') {
      const recs = recommendFor(chip);
      if (recs[0]) leadRef.current.courseId = recs[0].id;
      setFlow('recommend');
      push({
        from: 'bot',
        text:
          recs.length > 1
            ? 'Great fit! Here are your best-matching courses:'
            : 'Here is the course I recommend for you:',
        courses: recs,
        chips: ['Reserve this course', 'Email us about it', FAQ_CHIPS[0]],
      });
      return;
    }

    if (flow === 'recommend' && /reserve/i.test(chip)) {
      startLead();
      return;
    }
    if (flow === 'recommend' && /email/i.test(chip)) {
      startLead();
      return;
    }

    if (/choose a course/i.test(chip)) {
      setFlow('choose-experience');
      push({
        from: 'bot',
        text: 'Perfect. How much freediving experience do you have?',
        chips: EXPERIENCE_CHIPS,
      });
      return;
    }
    if (/price/i.test(chip)) {
      setFlow('prices');
      push({
        from: 'bot',
        text: 'Our SSI core pathway (all gear included, max 3:1 ratio):',
        courses: ssiCourses.slice(0, 4),
        chips: ['Help me choose a course', 'Booking request', FAQ_CHIPS[0]],
      });
      return;
    }
    if (/faq|question/i.test(chip)) {
      setFlow('faq');
      push({ from: 'bot', text: 'Pick a topic, or just type your question:', chips: FAQ_CHIPS });
      return;
    }
    if (/booking request|book/i.test(chip)) {
      startLead();
      return;
    }

    // FAQ topic chips
    const topic = FAQ_CHIPS.find((c) => c === chip);
    if (topic) {
      const map: Record<string, string[]> = {
        'Booking & payment': ['book', 'pay', 'deposit'],
        Cancellation: ['cancel', 'refund'],
        Equipment: ['gear', 'equipment'],
        'Travel to Dahab': ['travel', 'airport'],
        'The Blue Hole': ['blue hole'],
      };
      const answer = map[topic]
        ? map[topic]
            .map((k) => answerFaq(k))
            .filter(Boolean)[0]
        : null;
      push({
        from: 'bot',
        text: answer || 'Our team can answer that in detail — send us a booking request and we will reply within a day.',
        chips: [...CORE_CHIPS],
      });
      return;
    }

    // Course recommendation chips ("Reserve this course" handled above)
    startLead();
  };

  const startLead = () => {
    setFlow('lead-name');
    push({
      from: 'bot',
      text: 'Wonderful — let me build your request so it lands straight in our inbox. What is your name?',
    });
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    push({ from: 'user', text });

    if (flow === 'lead-name') {
      leadRef.current.name = text;
      setFlow('lead-email');
      push({ from: 'bot', text: `Nice to meet you, ${text}! What email should we reply to?` });
      return;
    }
    if (flow === 'lead-email') {
      if (!/\S+@\S+\.\S+/.test(text)) {
        push({ from: 'bot', text: 'That email does not look complete — could you check it? (e.g. you@example.com)' });
        return;
      }
      leadRef.current.email = text;
      setFlow('lead-date');
      push({ from: 'bot', text: 'Thanks! When would you like to start? (e.g. "12 November" or "flexible")' });
      return;
    }
    if (flow === 'lead-date') {
      leadRef.current.date = text;
      setFlow('done');
      const course = leadRef.current.courseId
        ? [...ssiCourses, ...specialtyCourses].find((c) => c.id === leadRef.current.courseId)
        : undefined;
      push({
        from: 'bot',
        text: `Here is your request:\n• Name: ${leadRef.current.name}\n• Email: ${leadRef.current.email}\n• Course: ${course ? course.title : 'Not sure yet'}\n• Start: ${leadRef.current.date}\n\nTap "Send by email" — your email app opens with everything pre-filled to ${MAIL_TO}. Prefer chat? WhatsApp works too.`,
        chips: ['Send by email', 'Open booking form', 'Open WhatsApp'],
      });
      return;
    }

    // Free text: FAQ first, then intents
    const faq = answerFaq(text);
    if (faq) {
      push({ from: 'bot', text: faq, chips: FAQ_CHIPS.slice(0, 3).concat(CORE_CHIPS.slice(0, 1)) });
      return;
    }
    if (/book|reserve|request/i.test(text)) {
      startLead();
      return;
    }
    if (/price|cost|how much|€/i.test(text)) {
      handleChipSilent('See prices');
      return;
    }
    if (/recommend|suggest|which course|choose/i.test(text)) {
      handleChipSilent('Help me choose a course');
      return;
    }
    push({
      from: 'bot',
      text: "I can help with courses, prices, and booking requests — or pick a FAQ topic below. For anything else, email us directly and our instructors reply personally.",
      chips: CORE_CHIPS,
    });
  };

  // Fire an existing flow without echoing the chip as a user bubble
  const handleChipSilent = (chip: string) => {
    handleChip(chip);
  };

  const handleAction = (chip: string) => {
    if (chip === 'Send by email') {
      push({ from: 'user', text: chip });
      sendEmailRequest();
      push({ from: 'bot', text: 'Your email app should be opening with the request. We reply within a day — see you in Dahab!', chips: CORE_CHIPS });
      return;
    }
    if (chip === 'Open booking form') {
      push({ from: 'user', text: chip });
      onOpenBooking?.(leadRef.current.courseId);
      setOpen(false);
      return;
    }
    if (chip === 'Open WhatsApp') {
      push({ from: 'user', text: chip });
      window.open(`${WHATSAPP_URL}?text=${encodeURIComponent('Hello Freedive Dahab! I have a question.')}`, '_blank', 'noopener');
      return;
    }
    if (chip === 'Reserve this course' || chip === 'Email us about it') {
      startLead();
      return;
    }
    handleChip(chip);
  };

  const lastBot = [...messages].reverse().find((m) => m.from === 'bot');

  return (
    <>
      {/* Launcher — envelope icon per request */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Chat with us — get help choosing a course'}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[70] w-14 h-14 rounded-full bg-[#22628C] hover:bg-[#1B5175] text-white shadow-[0_10px_30px_rgba(14,52,83,0.45)] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
      >
        {open ? <X className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
      </button>

      {open && (
        <div
          data-lenis-prevent
          role="dialog"
          aria-label="Freedive Dahab chat assistant"
          className="fixed z-[70] bottom-[5.5rem] right-4 left-4 sm:left-auto sm:right-5 sm:w-[380px] max-h-[72dvh] sm:max-h-[560px] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-[0_24px_70px_rgba(8,31,53,0.35)] flex flex-col"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#0E3453] text-white flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#22628C] flex items-center justify-center">
              <Mail className="w-4.5 h-4.5" />
            </span>
            <div className="leading-tight flex-1">
              <div className="font-alata font-semibold text-sm">Freedive Dahab Assistant</div>
              <div className="text-[10px] font-mono text-[#A9D2EC] uppercase tracking-[0.18em]">
                Courses · FAQ · Email requests
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3 bg-[#F2F8FC]"
            aria-live="polite"
          >
            {messages.map((m) => (
              <div key={m.id} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs font-alata leading-relaxed whitespace-pre-line ${
                    m.from === 'user'
                      ? 'bg-[#22628C] text-white rounded-br-sm'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                  {m.courses && m.courses.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {m.courses.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            leadRef.current.courseId = c.id;
                            push({ from: 'user', text: c.title });
                            startLead();
                          }}
                          className="w-full text-left rounded-xl border border-[#22628C]/25 bg-[#E3F1FA]/60 hover:border-[#22628C] px-3 py-2 transition-colors cursor-pointer"
                        >
                          <div className="text-[11px] font-semibold text-[#0E3453]">{c.title}</div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {[c.durationDays ? `${c.durationDays} days` : null, c.maxDepthMeters ? `${c.maxDepthMeters}m` : null, `€${c.priceEur}`]
                              .filter(Boolean)
                              .join(' · ')}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Quick-reply chips under the latest bot message */}
            {lastBot?.chips && lastBot.chips.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {lastBot.chips.filter(Boolean).map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleAction(chip)}
                    className="px-3 py-1.5 rounded-full border border-[#22628C]/40 bg-white text-[#0E3453] text-[11px] font-alata hover:bg-[#22628C] hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    {chip}
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              aria-label="Chat message"
              className="flex-1 px-3.5 py-2.5 rounded-full bg-[#F2F8FC] border border-slate-200 text-xs font-alata text-slate-700 focus:outline-none focus:border-[#22628C]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="w-10 h-10 rounded-full bg-[#22628C] hover:bg-[#1B5175] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
