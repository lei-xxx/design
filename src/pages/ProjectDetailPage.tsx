import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, FileText, Play, Tag } from 'lucide-react';
import GradualBlur from '@/components/GradualBlur';
import { projects } from '@/data/projects';
import { runCirclePageTransition } from '@/lib/pageTransition';
import { useAdaptiveButtonTone } from '@/lib/useAdaptiveButtonTone';
import { publicAsset } from '@/lib/utils';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const project = projects.find((item) => item.slug === slug);
  const isBackTransitioningRef = useRef(false);
  const backButtonRef = useRef<HTMLButtonElement | null>(null);
  const isBackButtonOnLight = useAdaptiveButtonTone(backButtonRef, typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches);
  const isEnteringFromPortfolio = Boolean((location.state as { fromPortfolioTransition?: boolean } | null)?.fromPortfolioTransition);

  if (!project) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-black pt-28 text-white">
        <GradualBlur
          target="page"
          position="top"
          height="7rem"
          strength={2.5}
          divCount={6}
          curve="bezier"
          exponential
          opacity={1}
          className="lg:hidden"
          style={{ zIndex: 55 }}
        />
        <motion.main
          initial={isEnteringFromPortfolio ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: isEnteringFromPortfolio ? 0.18 : 0 }}
          className="relative z-10 mx-auto max-w-3xl px-5 py-20 text-center"
        >
          <h1 className="text-3xl font-semibold">Project not found</h1>
          <Link
            to="/portfolio"
            aria-label="Back to Portfolio"
            className="mt-8 inline-flex h-14 w-24 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/90"
          >
            <ChevronLeft className="h-8 w-8 stroke-[3]" />
          </Link>
        </motion.main>
      </div>
    );
  }

  const projectTags = project.tags ?? [project.category];
  const goBack = (triggerElement?: HTMLElement, clickPoint?: { x: number; y: number }) => {
    const historyIndex = window.history.state?.idx;
    const navigateBack = () => {
      if (typeof historyIndex === 'number' && historyIndex > 0) {
        navigate(-1);
        return;
      }

      navigate('/portfolio');
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigateBack();
      return;
    }

    if (isBackTransitioningRef.current) return;
    isBackTransitioningRef.current = true;

    runCirclePageTransition({
      originX: clickPoint?.x,
      originY: clickPoint?.y,
      fallbackElement: triggerElement,
      onCovered: navigateBack,
      onFinish: () => {
        isBackTransitioningRef.current = false;
      },
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black pt-24 text-white">
      <button
        ref={backButtonRef}
        type="button"
        onClick={(event) => goBack(event.currentTarget, { x: event.clientX, y: event.clientY })}
        className={`fixed right-[106px] top-10 z-[80] inline-flex h-[46px] min-w-[90px] items-center justify-center rounded-full border bg-transparent px-6 text-[13px] font-semibold uppercase tracking-[0.04em] transition active:scale-95 md:right-[120px] md:h-[55px] md:min-w-[112px] md:px-8 md:text-[15px] lg:hidden ${
          isBackButtonOnLight ? 'border-black/75 text-black' : 'border-white/55 text-white'
        }`}
        aria-label="Back"
      >
        Back
      </button>
      <GradualBlur
        target="page"
        position="top"
        height="7rem"
        strength={2.5}
        divCount={6}
        curve="bezier"
        exponential
        opacity={1}
        className="lg:hidden"
        style={{ zIndex: 55 }}
      />
      <motion.main
        initial={isEnteringFromPortfolio ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: isEnteringFromPortfolio ? 0.18 : 0 }}
        className="relative z-10 mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#FF5825]">
            <Tag className="mr-2 h-4 w-4" />
            {projectTags.map((tag) => (
              <span key={tag} className="text-sm font-semibold">{tag}</span>
            ))}
          </div>
          <h1 className="text-[32px] font-semibold leading-tight lg:text-5xl">{project.title}</h1>
        </div>

        <section className="space-y-2">
          {project.media.map((media, mediaIndex) => (
            <article
              key={`${media.type}-${media.src}`}
              className="overflow-hidden bg-transparent"
            >
              {media.type === 'image' ? (
                <img
                  src={publicAsset(media.src)}
                  alt={media.alt || media.title || project.title}
                  loading={mediaIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full object-contain"
                />
              ) : media.type === 'video' ? (
                <video
                  src={publicAsset(media.src)}
                  poster={publicAsset(media.poster)}
                  title={media.title || project.title}
                  controls
                  playsInline
                  className="w-full bg-black"
                />
              ) : media.type === 'pdf' ? (
                <iframe
                  src={publicAsset(media.src)}
                  title={media.title || `${project.title} PDF`}
                  className="h-[80vh] w-full bg-white"
                />
              ) : (
                <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                  {media.type === 'video' ? (
                    <Play className="mb-4 h-10 w-10 text-white/40" />
                  ) : (
                    <FileText className="mb-4 h-10 w-10 text-white/40" />
                  )}
                  <p className="text-sm text-white/50">Media unavailable</p>
                </div>
              )}
            </article>
          ))}
        </section>
      </motion.main>
    </div>
  );
};

export default ProjectDetailPage;
