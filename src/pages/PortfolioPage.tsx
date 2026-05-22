
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, FileText, Play, RotateCcw, Tag, X, ZoomIn, ZoomOut } from 'lucide-react';
import MinimalHero from '@/components/ui/hero-minimalism';
import GradualBlur from '@/components/GradualBlur';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { projects, type Project } from '@/data/projects';
import { runCirclePageTransition } from '@/lib/pageTransition';
import { publicAsset } from '@/lib/utils';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);
  const isProjectTransitioningRef = useRef(false);

  const categories = ['All', 'Mobile Design', 'Web Design', 'Data visualization', 'Motion Effect Design'];
  const allPrioritySlugs = [
    'personnel-logistics-management-system',
    'human-resources-management-system',
    'petro-mesh-international-dmcc',
  ];

  const filteredProjects = filter === 'All' ?
  [...projects].sort((a, b) => {
    const aIndex = allPrioritySlugs.indexOf(a.slug);
    const bIndex = allPrioritySlugs.indexOf(b.slug);

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  }) :
  projects.filter((project) => (project.tags ?? [project.category]).includes(filter));
  const activeMedia = selectedProject?.media[activeMediaIndex];
  const getProjectTags = (project: Project) => project.tags ?? [project.category];
  const updateImageZoom = (nextZoom: number) => {
    setImageZoom(Math.min(2.5, Math.max(0.75, Number(nextZoom.toFixed(2)))));
  };

  const preloadProjectDetailImages = (project: Project) => {
    const sources = [
      project.cover,
      project.images.desktop,
      ...project.media.flatMap((media) => {
        if (media.type === 'image') return [media.src];
        if (media.type === 'video' && media.poster) return [media.poster];
        return [];
      }),
    ];

    Array.from(new Set(sources.filter(Boolean)))
      .slice(0, 5)
      .forEach((source) => {
        const image = new Image();
        image.decoding = 'async';
        image.loading = 'eager';
        image.src = publicAsset(source);
      });
  };

  const animateProjectNavigation = (project: Project, triggerElement?: HTMLElement, clickPoint?: { x: number; y: number }) => {
    if (isProjectTransitioningRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      navigate(`/portfolio/${project.slug}`);
      return;
    }

    isProjectTransitioningRef.current = true;
    preloadProjectDetailImages(project);

    runCirclePageTransition({
      originX: clickPoint?.x,
      originY: clickPoint?.y,
      fallbackElement: triggerElement,
      onCovered: () => navigate(`/portfolio/${project.slug}`, { state: { fromPortfolioTransition: true } }),
      onFinish: () => {
        isProjectTransitioningRef.current = false;
      },
    });
  };

  const openProject = (project: Project, triggerElement?: HTMLElement, clickPoint?: { x: number; y: number }) => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      setSelectedProject(project);
      setActiveMediaIndex(0);
      return;
    }

    animateProjectNavigation(project, triggerElement, clickPoint);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject]);

  useEffect(() => {
    setImageZoom(1);
  }, [activeMediaIndex, selectedProject]);

  return (
    <div className="relative overflow-hidden pt-16 bg-black">
      <MinimalHero backgroundOnly disableParticlesOnMobile className="z-0" />
      <GradualBlur
        target="page"
        position="top"
        height="7rem"
        strength={2.5}
        divCount={6}
        curve="bezier"
        exponential
        opacity={1}
        className="md:hidden"
        style={{ zIndex: 55 }}
      />
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="text-white pb-8 pt-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>

            <h1 className="mb-6 text-5xl font-bold md:mb-12">
              Design 
              <span className="text-[#FF5825] text-5xl">Portfolio</span>
            </h1>
            <div className="mx-auto max-w-6xl text-white/60">
              <p className="hidden text-[14px] leading-relaxed text-white md:block md:text-xl">
                这里汇集了我的设计作品，涵盖界面设计、视觉系统、产品体验与品牌表达。每个项目都围绕真实场景展开，关注从设计策略到最终落地的完整过程。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-4 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) =>
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
              filter === category ?
              'bg-[#FF5825] text-white' :
              'bg-black/20 text-white/60 hover:bg-white hover:text-black'}`
              }>

                {category}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-16 pt-8 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 md:space-y-36">
            {filteredProjects.map((project, index) =>
            <motion.div
              key={project.title}
              data-project-card
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`grid grid-cols-1 gap-6 items-center md:gap-12 ${
                index % 2 === 0 ? 'lg:grid-cols-[2.6fr_2fr]' : 'lg:grid-cols-[2fr_2.6fr]'
              }`}>

                {/* Project Images */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative">
                    {/* Desktop View */}
                    <button
                      type="button"
                      aria-label={`View ${project.title} project`}
                      className="relative block w-full cursor-pointer text-left lg:hidden"
                      onClick={(event) => openProject(project, event.currentTarget, { x: event.clientX, y: event.clientY })}
                    >
                      <img
                      data-project-image
                      src={publicAsset(project.images.desktop)}
                      alt={`${project.title} - Desktop view`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full rounded-lg shadow-2xl" />
                    </button>
                    <div className="relative hidden lg:block">
                      <img
                      src={publicAsset(project.images.desktop)}
                      alt={`${project.title} - Desktop view`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full rounded-lg shadow-2xl" />
                    </div>
                    
                  </div>
                </div>

                {/* Project Details */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="mb-4 hidden flex-wrap items-center gap-x-4 gap-y-2 md:flex">
                    <Tag className="h-5 w-5 text-[#FF5825] mr-2" />
                    {getProjectTags(project).map((tag) => (
                      <span key={tag} className="text-[#FF5825] font-semibold">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="mb-5 flex items-center justify-between gap-4 md:mb-8 md:block">
                    <h3 className="text-[22px] font-bold text-white md:text-3xl">{project.title}</h3>
                    <button
                      type="button"
                      aria-label={`View ${project.title} project`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/80 text-white transition active:scale-95 md:hidden"
                      onClick={(event) => openProject(project, event.currentTarget, { x: event.clientX, y: event.clientY })}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="max-w-[760px] space-y-4 md:space-y-6">
                    <p className="hidden overflow-hidden text-white text-[16px] leading-9 md:[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
                      {project.descriptionZh}
                    </p>
                    <div className={`hidden pt-2 md:flex md:pt-6 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                      <ButtonColorful
                        type="button"
                        label="View Project"
                        className="h-12 px-6 text-sm"
                        onClick={() => openProject(project)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent px-2 py-5 sm:px-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} project preview`}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="relative flex h-[88vh] w-full max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[28px] border border-white/15 bg-[rgba(7,7,7,0.86)] shadow-2xl backdrop-blur-[44px] lg:max-w-[66vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#FF5825]">
                  <Tag className="mr-2 h-4 w-4" />
                  {getProjectTags(selectedProject).map((tag) => (
                    <span key={tag} className="text-sm font-semibold">{tag}</span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">{selectedProject.title}</h2>
              </div>
              <button
                type="button"
                aria-label="Close project preview"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white hover:text-black"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 p-3 sm:p-4 lg:grid lg:grid-cols-[minmax(0,1fr)_160px]">
              <div className="min-h-0 bg-transparent">
                {activeMedia?.type === 'image' ? (
                  <div className="relative h-[48vh] min-h-[280px] lg:h-full lg:min-h-[600px]">
                    <div
                      className={`h-full overflow-auto rounded-2xl border border-white/10 bg-black/20 ${
                        imageZoom === 1 ? 'flex items-center justify-center' : 'block'
                      }`}
                      onWheel={(event) => {
                        event.preventDefault();
                        updateImageZoom(imageZoom + (event.deltaY < 0 ? 0.1 : -0.1));
                      }}
                    >
                      <img
                        src={publicAsset(activeMedia.src)}
                        alt={activeMedia.alt || selectedProject.title}
                        loading="eager"
                        decoding="async"
                        className="rounded-xl object-contain"
                        style={
                          imageZoom === 1
                            ? { maxWidth: '100%', maxHeight: '100%' }
                            : { width: `${imageZoom * 100}%`, maxWidth: 'none' }
                        }
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/55 p-1.5 text-white backdrop-blur-xl">
                      <button
                        type="button"
                        aria-label="Zoom out"
                        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white hover:text-black"
                        onClick={() => updateImageZoom(imageZoom - 0.25)}
                      >
                        <ZoomOut className="h-[18px] w-[18px]" />
                      </button>
                      <span className="min-w-14 text-center text-sm font-semibold text-white/80">
                        {Math.round(imageZoom * 100)}%
                      </span>
                      <button
                        type="button"
                        aria-label="Zoom in"
                        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white hover:text-black"
                        onClick={() => updateImageZoom(imageZoom + 0.25)}
                      >
                        <ZoomIn className="h-[18px] w-[18px]" />
                      </button>
                      <button
                        type="button"
                        aria-label="Reset zoom"
                        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white hover:text-black"
                        onClick={() => updateImageZoom(1)}
                      >
                        <RotateCcw className="h-[18px] w-[18px]" />
                      </button>
                    </div>
                  </div>
                ) : activeMedia?.type === 'video' ? (
                  <video
                    src={publicAsset(activeMedia.src)}
                    poster={publicAsset(activeMedia.poster)}
                    title={activeMedia.title || selectedProject.title}
                    controls
                    playsInline
                    className="h-[48vh] min-h-[280px] w-full rounded-2xl border border-white/10 bg-black object-contain lg:h-full lg:min-h-[600px]"
                  />
                ) : activeMedia?.type === 'pdf' ? (
                  <iframe
                    src={publicAsset(activeMedia.src)}
                    title={activeMedia.title || `${selectedProject.title} PDF`}
                    className="h-[48vh] min-h-[280px] w-full rounded-2xl border border-white/10 bg-white lg:h-full lg:min-h-[600px]"
                  />
                ) : (
                  <div className="flex h-[48vh] min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-transparent text-center lg:h-full lg:min-h-[600px]">
                    <FileText className="mb-5 h-16 w-16 text-white/35" />
                    <p className="text-xl font-semibold text-white">Project Media Placeholder</p>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                      当前项目还没有绑定图片、视频或 PDF。后续提供资源后，会在这里展示完整作品内容。
                    </p>
                  </div>
                )}
              </div>
              {selectedProject.media.length > 1 && (
                <div className="shrink-0 overflow-x-auto overflow-y-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 lg:min-h-0 lg:overflow-x-hidden lg:overflow-y-auto">
                  <div className="flex gap-2 lg:flex-col">
                    {selectedProject.media.map((media, mediaIndex) => (
                      <button
                        key={`${media.type}-${media.src}`}
                        type="button"
                        className={`group relative h-24 w-36 shrink-0 overflow-hidden rounded-xl border transition lg:aspect-[4/3] lg:h-auto lg:w-auto ${
                          activeMediaIndex === mediaIndex
                            ? 'border-white'
                            : 'border-white/10 opacity-55 hover:border-white/60 hover:opacity-100'
                        }`}
                        onClick={() => setActiveMediaIndex(mediaIndex)}
                      >
                        {media.type === 'image' ? (
                          <img
                            src={publicAsset(media.src)}
                            alt={media.alt || media.title || selectedProject.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-white/5 text-white/70">
                            {media.type === 'video' && <Play className="h-5 w-5" />}
                            {media.type === 'pdf' && <FileText className="h-5 w-5" />}
                          </div>
                        )}
                        <span className="absolute bottom-1 right-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
                          {String(mediaIndex + 1).padStart(2, '0')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>);

};

export default PortfolioPage;
