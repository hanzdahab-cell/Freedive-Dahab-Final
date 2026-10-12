import { useState } from 'react';
import { ArrowRight, Compass, GraduationCap, Waves } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { ssiCourses } from '../../data/courses';
import { PageType } from '../../types';

interface CourseFinderProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (courseId?: string) => void;
  currency: 'EUR' | 'USD' | 'EGP';
}

const choices = [
  { id: 'try', courseId: 'ssi-basic-freediver', titleKey: 'courseFinder.choices.try.title', descriptionKey: 'courseFinder.choices.try.description', Icon: Waves },
  { id: 'beginner', courseId: 'ssi-level-1', titleKey: 'courseFinder.choices.beginner.title', descriptionKey: 'courseFinder.choices.beginner.description', Icon: Compass },
  { id: 'level-one', courseId: 'ssi-level-2', titleKey: 'courseFinder.choices.levelOne.title', descriptionKey: 'courseFinder.choices.levelOne.description', Icon: GraduationCap },
  { id: 'level-two', courseId: 'ssi-level-3', titleKey: 'courseFinder.choices.levelTwo.title', descriptionKey: 'courseFinder.choices.levelTwo.description', Icon: GraduationCap },
] as const;

export function CourseFinder({ onNavigate, onOpenBooking, currency }: CourseFinderProps) {
  const { t } = useTranslation();
  const { isRtl } = useLanguage();
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const selectedChoice = choices.find((choice) => choice.id === selectedChoiceId);
  const selectedCourse = ssiCourses.find((course) => course.id === selectedChoice?.courseId);

  const formatPrice = (priceEur: number) => {
    if (currency === 'USD') return `$${Math.round(priceEur * 1.08)}`;
    if (currency === 'EGP') return `E£${Math.round(priceEur * 52)}`;
    return `€${priceEur}`;
  };

  return (
    <section
      aria-labelledby="course-finder-title"
      className="relative overflow-hidden border-y border-ocean-pale/10 bg-[#0B2C4A] px-6 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-ocean/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl space-y-4 sm:mb-14">
          <div className="flex items-center gap-2 text-sm text-ocean-pale">
            <Compass aria-hidden="true" className="h-4 w-4" />
            <span>{t('courseFinder.eyebrow')}</span>
          </div>
          <h2 id="course-finder-title" className="font-bebas text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            {t('courseFinder.title')}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {t('courseFinder.subtitle')}
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div role="group" aria-labelledby="course-finder-question" className="space-y-3">
            <h3 id="course-finder-question" className="mb-5 text-lg font-semibold text-white">
              {t('courseFinder.question')}
            </h3>
            {choices.map(({ id, titleKey, descriptionKey, Icon }) => {
              const isSelected = selectedChoiceId === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedChoiceId(id)}
                  className={`group flex min-h-20 w-full items-center gap-4 rounded-xl border p-4 text-start transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-pale ${
                    isSelected
                      ? 'border-ocean-pale/70 bg-ocean/35'
                      : 'border-white/10 bg-white/[0.03] hover:border-ocean-pale/40 hover:bg-white/[0.06]'
                  }`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                    isSelected
                      ? 'border-ocean-pale/50 bg-ocean/40 text-white'
                      : 'border-white/10 bg-[#081F35]/70 text-ocean-pale'
                  }`}>
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white">{t(titleKey)}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-400">{t(descriptionKey)}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 text-ocean-pale transition-transform ${isRtl ? 'rotate-180' : ''} ${isSelected ? 'translate-x-0.5' : 'opacity-50'}`}
                  />
                </button>
              );
            })}
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="min-h-80 overflow-hidden rounded-2xl border border-ocean-pale/15 bg-[#081F35]/70"
          >
            {selectedCourse ? (
              <div key={selectedCourse.id} className="course-finder-reveal">
                <div className="relative aspect-[16/8] overflow-hidden bg-[#0E3453]">
                  <img
                    src={selectedCourse.image.url}
                    alt={selectedCourse.image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081F35] via-[#081F35]/20 to-transparent" />
                  <p className="absolute bottom-4 start-5 text-sm font-medium text-ocean-pale">
                    {t('courseFinder.resultEyebrow')}
                  </p>
                </div>

                <div className="space-y-5 p-5 sm:p-7">
                  <div>
                    <h3 className="font-bebas text-3xl text-white sm:text-4xl">{selectedCourse.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{selectedCourse.subtitle}</p>
                  </div>

                  <dl className="grid grid-cols-3 gap-3 border-y border-white/10 py-4">
                    <div>
                      <dt className="text-xs text-slate-400">{t('courseFinder.duration')}</dt>
                      <dd className="mt-1 font-semibold text-white">
                        {selectedCourse.durationDays} {t('coursesSection.days')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-400">{t('courseFinder.depth')}</dt>
                      <dd className="mt-1 font-semibold text-white">
                        {selectedCourse.maxDepthMeters} {t('coursesSection.meters')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-400">{t('courseFinder.price')}</dt>
                      <dd className="mt-1 font-semibold text-white">{formatPrice(selectedCourse.priceEur)}</dd>
                    </div>
                  </dl>

                  <p className="text-xs leading-relaxed text-slate-400">{t('courseFinder.prerequisiteNote')}</p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => onNavigate(`course-${selectedCourse.slug}` as PageType)}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-ocean-pale/30 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-pale"
                    >
                      {t('courseFinder.viewCourse')}
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenBooking(selectedCourse.id)}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-ocean px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-pale"
                    >
                      {t('courseFinder.bookCourse')}
                      <ArrowRight aria-hidden="true" className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center px-8 py-12 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-ocean-pale/20 bg-ocean/15 text-ocean-pale">
                  <Waves aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className="font-bebas text-2xl text-white">{t('courseFinder.emptyTitle')}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
                  {t('courseFinder.emptyDescription')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
