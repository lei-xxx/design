
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {ArrowRight, Star, Users, Award, Palette, Layout, Layers, Sparkles, Globe} from 'lucide-react';
import { ShimmerButton } from '../components/ShimmerButton';
import { PaperDesignBackground } from '../components/PaperDesignBackground';
import { SplineRobotShowcase } from '../components/SplineRobotShowcase';

const HomePage = () => {
  const [backgroundExitProgress, setBackgroundExitProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateBackgroundExit = () => {
      const viewportHeight = window.innerHeight || 1;
      const nextProgress = Math.min(Math.max(window.scrollY / viewportHeight, 0), 1);
      setBackgroundExitProgress(nextProgress);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateBackgroundExit);
    };

    updateBackgroundExit();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const services = [
    {
      name: 'Brand Identity Design',
      icon: Sparkles,
      description: 'Build a distinctive visual language, logo system, and brand foundation that makes every touchpoint feel intentional.',
      className: 'lg:col-span-2',
      accent: 'from-[#FF5825]/14 via-white/5 to-transparent'
    },
    {
      name: 'Visual Design',
      icon: Palette,
      description: 'Create campaign visuals, digital assets, and polished compositions with a sharp eye for hierarchy and emotion.',
      className: '',
      accent: 'from-[#FF5825]/14 via-white/5 to-transparent'
    },
    {
      name: 'Motion Graphics',
      icon: Layers,
      description: 'Bring stories to life with kinetic systems, launch assets, and lightweight animation concepts for modern brands.',
      className: '',
      accent: 'from-[#FF5825]/14 via-white/5 to-transparent'
    },
    {
      name: 'UI/UX Design',
      icon: Layout,
      description: 'Shape product flows, interface systems, and interaction details that make complex ideas feel clear and usable.',
      className: 'lg:col-span-2',
      accent: 'from-[#FF5825]/14 via-white/5 to-transparent'
    }
  ];

  return (
    <div className="relative overflow-x-hidden bg-black">
      <PaperDesignBackground
        className="fixed inset-0 z-0 pointer-events-none origin-center"
        scale={1 + backgroundExitProgress * 5}
      />
      <div className="relative z-10">
      {/* Hero Section - Black Background with Paper Design Shader */}
      <section className="text-white min-h-screen flex items-center relative overflow-hidden">
        <div className="w-full relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center">

              <h1 className="text-[2.1rem] sm:text-[2.75rem] md:text-[3.4rem] lg:text-[4.15rem] xl:text-[5rem] font-bold leading-tight mb-7 px-4">
                Your Next Design Inspiration
                <br className="hidden lg:block" />
                {' — Xu Lei'}
              </h1>
              <p className="text-white/60 mb-9 leading-relaxed text-xl sm:text-[1.38rem] font-light max-w-5xl mx-auto px-4">
                Welcome to my portfolio website of design works, let's explore the stories of inspiration through creation together.
              </p>
              <div className="flex justify-center mb-2 sm:mb-3 lg:mb-4 px-4">
                <Link
                  to="/portfolio"
                  className="border border-white bg-transparent text-white hover:bg-white hover:text-black rounded-full font-semibold transition-all duration-200 text-center px-14 h-20 text-xl lg:text-[1.38rem] flex items-center justify-center w-full max-w-[396px] sm:w-[374px]">
                  View Portfolio
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-14 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16">

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Design Services</h2>
            <p className="text-base sm:text-lg text-white/60 max-w-4xl mx-auto">
              I specialize in creating compelling visual experiences that elevate your brand 
              and engage your audience. Every project is crafted with intention and creativity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(260px,auto)] gap-4 lg:gap-5">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative min-h-[230px] overflow-hidden rounded-[28px] border border-white/10 bg-[#050505]/55 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-[#080808]/65 lg:p-7 ${service.className}`}>

                  <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-45 transition-opacity duration-500 group-hover:opacity-65`} />
                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />
                  <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:36px_36px]" />

                  <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#FF5825] shadow-[0_12px_28px_rgba(255,88,37,0.35)]">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">{service.name}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 lg:mb-8">Why Work With Me?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-[#FF5825] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">7+ Years of Design Excellence</h3>
                    <p className="text-white/60 text-sm">
                      Proven track record of delivering exceptional design solutions for brands worldwide.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Star className="h-6 w-6 text-[#FF5825] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Award-Winning Creativity</h3>
                    <p className="text-white/60 text-sm">
                      Beautiful, innovative designs that captivate audiences and stand out from the crowd.
                    </p>
                  </div>
                  </div>
                <div className="flex items-start space-x-4">
                  <Globe className="h-6 w-6 text-[#FF5825] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Strategic Design Thinking</h3>
                    <p className="text-white/60 text-sm">
                      Data-driven design decisions that align with your business goals and user needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-[#FF5825] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Collaborative Process</h3>
                    <p className="text-white/60 text-sm">
                      Transparent communication and close collaboration to bring your vision to life.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative order-first lg:order-last">

              <SplineRobotShowcase />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-base sm:text-lg text-white/60 mb-8 max-w-3xl mx-auto">
              Let's collaborate on creating stunning visual designs that perfectly capture 
              your brand essence and resonate with your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <ShimmerButton className="shadow-2xl rounded-full border-[#dedede] bg-[linear-gradient(110deg,#dedede,45%,#ffffff,55%,#dedede)] hover:bg-[linear-gradient(110deg,#dedede,45%,#ffffff,55%,#dedede)] transition-all duration-200 w-full text-black sm:w-auto">
                  <span className="text-center text-sm leading-none font-semibold tracking-tight whitespace-pre-wrap text-black lg:text-base flex items-center justify-center">
                    Let's Collaborate
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </ShimmerButton>
              </Link>
              <Link
                to="/portfolio"
                className="border border-white bg-transparent text-white hover:bg-white hover:text-black px-8 h-12 flex items-center justify-center rounded-full font-semibold transition-all duration-200 text-center w-full sm:w-auto">

                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </div>);

};

export default HomePage;
