import { useState, useEffect } from 'react';
import { Cursor } from './components/ui/Cursor';
import { SSINavigation } from './components/ui/SSINavigation';
import { PageHeader } from './components/ui/PageHeader';
import { HeroSurface } from './components/home/HeroSurface';
import { CoralDepthBackground } from './components/home/CoralDepthBackground';
import { SSICertificates } from './components/ssi/SSICertificates';
import { StoryTeaserBanner } from './components/home/StoryTeaserBanner';
import { DahabBlueHoleSection } from './components/home/DahabBlueHoleSection';
import { HomePortalCards } from './components/home/HomePortalCards';
import { CoursesSection } from './components/courses/CoursesSection';
import { TrainingSection } from './components/training/TrainingSection';
import { CalendarSection } from './components/calendar/CalendarSection';
import { AccommodationSection } from './components/accommodation/AccommodationSection';
import { PackagesSection } from './components/packages/PackagesSection';
import { DepthShowcase } from './components/home/DepthShowcase';
import { ActivitiesSection } from './components/activities/ActivitiesSection';
import { BlogSection } from './components/blog/BlogSection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { FAQSection } from './components/faq/FAQSection';
import { Footer } from './components/ui/Footer';
import { BookingModal } from './components/booking/BookingModal';
import { EventDetailPage } from './components/calendar/EventDetailPage';
import { CourseDetailPage } from './components/courses/CourseDetailPage';
import { OurStoryPage } from './components/story/OurStoryPage';
import { useSmoothScroll } from './utils/useSmoothScroll';
import { PageType, EventTypeId } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

export default function App() {
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'EGP'>('EUR');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingOfferingId, setBookingOfferingId] = useState<string | undefined>();

  // Determine initial page from URL hash, default to 'home'
  const validPages = ['home', 'courses', 'training', 'experience', 'accommodation', 'packages', 'blog', 'faq', 'calendar', 'story'];

  const getInitialPage = (): PageType => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (validPages.includes(hash) || hash.startsWith('event-') || hash.startsWith('course-')) {
        return hash as PageType;
      }
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageType>(getInitialPage);

  // Initialize smooth inertia scrolling
  useSmoothScroll();

  // Listen to browser forward/backward buttons and external hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (validPages.includes(hash) || hash.startsWith('event-') || hash.startsWith('course-')) {
        setCurrentPage(hash as PageType);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash = `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (offeringId?: string) => {
    setBookingOfferingId(offeringId);
    setIsBookingOpen(true);
  };

  const handleDescend = () => {
    const certsElem = document.getElementById('certificates');
    if (certsElem) {
      certsElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('courses');
    }
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <div className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* Precision Luxury Pointer Cursor */}
        <Cursor />

        {/* SSI Mega Menu Navigation Header with Individual Page Links */}
        <SSINavigation
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenBooking={handleOpenBooking}
          currency={currency}
          setCurrency={setCurrency}
          isTransparent={currentPage === 'home'}
        />

        <main className="relative z-10">
        
        {/* ========================================================= */}
        {/* 1. INDIVIDUAL PAGE: HOME SANCTUARY                        */}
        {/* ========================================================= */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* 1. HERO: milestones + living water + cinematic descent */}
            <HeroSurface
              onDescend={handleDescend}
              onOpenBooking={() => handleOpenBooking()}
              onNavigate={navigateTo}
              currency={currency}
              setCurrency={setCurrency}
            />

            {/* 2. STORY TEASER — Meet Our Pioneers */}
            <StoryTeaserBanner
              onNavigate={navigateTo}
            />

            {/* Immersive Coral Depth Environment (The depth of the corals across all home sections) */}
            <div className="relative">
              <CoralDepthBackground />

              <div className="relative z-10">
                {/* 3. Dahab & the Blue Hole */}
                <DahabBlueHoleSection
                  onNavigate={navigateTo}
                />

                {/* Discover Each Dimension: Portal Grid leading to individual pages */}
                <HomePortalCards
                  onNavigate={navigateTo}
                />

                {/* Diver Voices & Testimonials */}
                <TestimonialsSection />

                {/* Frequently Answered Questions */}
                <FAQSection />

                {/* Last: Official SSI Partner badges */}
                <SSICertificates
                  onOpenBooking={() => handleOpenBooking()}
                  onNavigate={navigateTo}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. INDIVIDUAL PAGE: SSI COURSES                           */}
        {/* ========================================================= */}
        {currentPage === 'courses' && (
          <div className="animate-in fade-in duration-300">
            <PageHeader
              title="SSI Freediving Courses"
              subtitle="Structured international curriculum from introductory diaphragmatic mechanics and pool technique to elite 40m+ Mouthfill and professional SSI Instructor examination."
              badge="SSI Diamond ITC Facility #720079 • ISO 24801 & 24802"
              currentPage="courses"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking()}
              ctaText="Enroll in a Course"
            />

            <CoursesSection
              onOpenBooking={handleOpenBooking}
              onNavigate={navigateTo}
              currency={currency}
            />

            <FAQSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. INDIVIDUAL PAGE: FREEDIVING TRAINING                   */}
        {/* ========================================================= */}
        {currentPage === 'training' && (
          <div className="animate-in fade-in duration-300">
            <PageHeader
              title="Freediving Training & Coaching"
              subtitle="Dedicated counter-ballast depth buoys at the Blue Hole, precision equalization clinics, pool tables, and 1-on-1 master underwater 4K video analysis."
              badge="Dahab Blue Hole & Lighthouse Sanctuary Base"
              currentPage="training"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking('depth-training')}
              ctaText="Reserve Depth Buoy"
            />

            <TrainingSection
              onOpenBooking={handleOpenBooking}
              currency={currency}
              onNavigate={navigateTo}
            />

            <DepthShowcase
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. INDIVIDUAL PAGE: ACCOMMODATION                         */}
        {/* ========================================================= */}
        {currentPage === 'accommodation' && (
          <div className="animate-in fade-in duration-300">
            <PageHeader
              title="Sanctuary Accommodation & Living"
              subtitle="Step from your room directly into the turquoise training bay. Enjoy oceanfront suites, desert garden eco-villas, gear drying rooms, and high-speed fiber internet."
              badge="Sea Lodge • Lighthouse Bay Dahab • Nomad Friendly"
              currentPage="accommodation"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking()}
              ctaText="Check Availability"
            />

            <AccommodationSection
              onOpenBooking={() => handleOpenBooking()}
              currency={currency}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. INDIVIDUAL PAGE: EXPERIENCES PACKAGES                  */}
        {/* ========================================================= */}
        {currentPage === 'packages' && (
          <div className="animate-in fade-in duration-300">
            <PageHeader
              title="Expeditions & Experiences Packages"
              subtitle="All-inclusive freediving residencies combining certified SSI courses, coached Blue Hole line training, oceanfront accommodation, and Red Sea desert safaris."
              badge="All-Inclusive Immersions • 7 to 28 Days"
              currentPage="packages"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking()}
              ctaText="Book Package"
            />

            <PackagesSection
              onOpenBooking={handleOpenBooking}
              currency={currency}
            />

            <ActivitiesSection
              onOpenBooking={handleOpenBooking}
              currency={currency}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 6. INDIVIDUAL PAGE: CALENDAR SCHEDULE                     */}
        {/* ========================================================= */}
        {currentPage === 'calendar' && (
          <div className="animate-in fade-in duration-300">
            <PageHeader
              title="Expedition & Course Calendar"
              subtitle="Live schedule of upcoming certified SSI courses, depth camps, equalization clinics, and camel safaris in Dahab. Check remaining spots and book directly."
              badge="Live 2026 Season Schedule • Instant Seat Reservation"
              currentPage="calendar"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking()}
              ctaText="Custom Date Request"
            />

            <CalendarSection
              onOpenBooking={handleOpenBooking}
              onNavigate={navigateTo}
              currency={currency}
            />

            <BlogSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* 7. INDIVIDUAL PAGE: EXPERIENCE & SAFARIS                  */}
        {/* ========================================================= */}
        {currentPage === 'experience' && (
          <div className="animate-in fade-in duration-300">
            <PageHeader
              title="Red Sea Expeditions & Safaris"
              subtitle="Immerse yourself in world-class boat expeditions to Ras Mohamed National Park, the legendary Dahab Blue Hole arch, bioluminescent night dives, and Bedouin desert camps."
              badge="Red Sea Marine Sanctuary Expeditions"
              currentPage="experience"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking()}
              ctaText="Inquire for Safari"
            />

            <ActivitiesSection
              onOpenBooking={handleOpenBooking}
              currency={currency}
            />

            <PackagesSection
              onOpenBooking={handleOpenBooking}
              currency={currency}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 8. INDIVIDUAL PAGE: BLOG & JOURNAL                        */}
        {/* ========================================================= */}
        {currentPage === 'blog' && (
          <div className="animate-in fade-in duration-300">
            <PageHeader
              title="Freediving Journal & Archive"
              subtitle="Physiological science, deep equalization mechanics, equipment breakdowns, and dispatches from the Red Sea depths."
              badge="Dahab Deep Archive"
              currentPage="blog"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking()}
              ctaText="Join an Academy"
            />

            <BlogSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* 9. INDIVIDUAL PAGE: FAQ & LOGISTICS                       */}
        {/* ========================================================= */}
        {currentPage === 'faq' && (
          <div className="animate-in fade-in duration-300">
            <PageHeader
              title="Frequently Answered Questions"
              subtitle="Everything you need to know about traveling to Dahab, medical clearance, beginner prerequisites, and safety standards."
              badge="Practical Advice & Logistics"
              currentPage="faq"
              onNavigate={navigateTo}
              onOpenBooking={() => handleOpenBooking()}
              ctaText="Ask an Instructor"
            />

            <FAQSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* 10. INDIVIDUAL PAGES: DEDICATED SCHEDULED EVENT DETAIL    */}
        {/* ========================================================= */}
        {currentPage.startsWith('event-') && (
          <div className="animate-in fade-in duration-300">
            <EventDetailPage
              eventTypeId={currentPage.replace('event-', '') as EventTypeId}
              onNavigate={navigateTo}
              onOpenBooking={handleOpenBooking}
              currency={currency}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 11. INDIVIDUAL PAGES: DEDICATED COURSE DETAIL             */}
        {/* ========================================================= */}
        {currentPage.startsWith('course-') && (
          <div className="animate-in fade-in duration-300">
            <CourseDetailPage
              courseSlug={currentPage.replace('course-', '')}
              onNavigate={navigateTo}
              onOpenBooking={handleOpenBooking}
              currency={currency}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 12. INDIVIDUAL PAGE: OUR STORY – FREEDIVE DAHAB           */}
        {/* ========================================================= */}
        {currentPage === 'story' && (
          <div className="animate-in fade-in duration-300">
            <OurStoryPage
              onNavigate={navigateTo}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

      </main>

      {/* TECHNICAL ARCHITECTURAL FOOTER (On Every Page with Page Switching) */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={navigateTo}
      />

      {/* RESERVATION DRAWER & WHATSAPP DIRECT CONNECT */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialSelectedId={bookingOfferingId}
        currency={currency}
      />

    </div>
    </LanguageProvider>
    </I18nextProvider>
  );
}
