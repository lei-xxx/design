
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Tag } from 'lucide-react';
import MinimalHero from '@/components/ui/hero-minimalism';
import GradualBlur from '@/components/GradualBlur';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { projects, type Project } from '@/data/projects';
import { runCirclePageTransition } from '@/lib/pageTransition';
import { publicAsset } from '@/lib/utils';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
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
  const getProjectTags = (project: Project) => project.tags ?? [project.category];

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
    animateProjectNavigation(project, triggerElement, clickPoint);
  };

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
        className="lg:hidden"
        style={{ zIndex: 55 }}
      />
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="text-white pb-8 pt-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>

            <h1 className="mb-6 text-5xl font-semibold lg:mb-12">
              Design 
              <span className="text-[#FF5825] text-5xl">Portfolio</span>
            </h1>
            <div className="mx-auto max-w-6xl text-white/60">
              <p className="hidden text-[14px] leading-relaxed text-white lg:block lg:text-xl">
                这里汇集了我的设计作品，涵盖界面设计、视觉系统、产品体验与品牌表达。每个项目都围绕真实场景展开，关注从设计策略到最终落地的完整过程。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-4 lg:py-8">
        <div className="mx-auto max-w-7xl px-0 lg:px-8">
          <div className="flex snap-x snap-mandatory flex-nowrap gap-4 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6 md:flex-wrap md:justify-center md:overflow-visible md:px-16 lg:px-0">
            {categories.map((category) =>
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`shrink-0 snap-start whitespace-nowrap px-6 py-2 rounded-full !font-normal transition-all duration-200 ${
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
      <section className="pb-16 pt-8 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-36">
            {filteredProjects.map((project, index) =>
            <motion.div
              key={project.title}
              data-project-card
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`grid grid-cols-1 gap-4 items-center lg:gap-12 ${
                index % 2 === 0 ? 'lg:grid-cols-[2.6fr_2fr]' : 'lg:grid-cols-[2fr_2.6fr]'
              }`}>

                {/* Project Images */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative">
                    {/* Desktop View */}
                    <button
                      type="button"
                      aria-label={`View ${project.title} project`}
	                      className="relative mx-auto block w-full cursor-pointer text-left md:w-4/5 lg:hidden"
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
                    <button
                      type="button"
                      aria-label={`View ${project.title} project`}
                      className="relative hidden w-full cursor-pointer text-left lg:block"
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
                    
                  </div>
                </div>

                {/* Project Details */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} md:mx-auto md:w-4/5 lg:mx-0 lg:w-auto`}>
                  <div className="mb-4 hidden flex-wrap items-center gap-x-4 gap-y-2 lg:flex">
                    <Tag className="h-5 w-5 text-[#FF5825] mr-2" />
                    {getProjectTags(project).map((tag) => (
                      <span key={tag} className="text-[#FF5825] font-semibold">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="mb-5 flex items-center justify-between gap-4 lg:mb-8 lg:block">
                    <h3 className="text-[22px] font-semibold text-white lg:text-3xl">{project.title}</h3>
                    <button
                      type="button"
                      aria-label={`View ${project.title} project`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/80 text-white transition active:scale-95 lg:hidden"
                      onClick={(event) => openProject(project, event.currentTarget, { x: event.clientX, y: event.clientY })}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="max-w-[760px] space-y-4 lg:space-y-6">
                    <p className="hidden overflow-hidden text-white text-[16px] leading-9 lg:[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">
                      {project.descriptionZh}
                    </p>
                    <div className={`hidden pt-2 lg:flex lg:pt-6 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                      <ButtonColorful
                        type="button"
                        label="View Project"
                        className="h-12 px-6 text-sm"
                        onClick={(event) => openProject(project, event.currentTarget, { x: event.clientX, y: event.clientY })}
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
    </div>);

};

export default PortfolioPage;
