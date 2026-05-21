
import React from 'react';
import { motion } from 'framer-motion';
import MinimalHero from '@/components/ui/hero-minimalism';

const ContactPage = () => {
  return (
    <div className="relative overflow-hidden pt-16 bg-black">
      <MinimalHero backgroundOnly disableParticlesOnMobile className="z-0" />
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="text-white pb-8 pt-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>

            <h1 className="text-5xl font-bold mb-12">
              Let's 
              <span className="text-[#FF5825] text-5xl">Start Building</span>
            </h1>
            <div className="mx-auto max-w-6xl text-white/60">
              <p className="text-[14px] leading-relaxed text-white md:text-xl">
                感谢您访问我的作品集。我专注于将创意与用户体验相结合，通过精细的界面设计和交互方案，帮助项目从概念落地到实际应用。如果您对合作、项目或任何设计相关问题感兴趣，欢迎随时联系我。
              </p>
              <p className="mx-auto mt-5 hidden max-w-5xl text-[13px] leading-6 md:block">
                Thank you for visiting my portfolio. I focus on combining creativity with user experience, using refined interface design and interaction solutions to help projects move from concept to real-world application. If you are interested in collaboration, projects, or any design-related questions, feel free to contact me.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="pb-16 pt-8 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center">

              <h2 className="text-[32px] font-bold text-white mb-16">Get In Touch</h2>
              
              <div className="space-y-14">
                <div>
                  <h3 className="text-[18px] font-semibold text-white mb-7">Email</h3>
                  <div className="flex flex-col items-center justify-center gap-4 text-[18px] text-white/60 md:flex-row md:gap-20">
                    <p className="text-[18px]">xuleixulei2021@qq.com</p>
                    <p className="text-[18px]">xuleixulei2021@gmail.com</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[18px] font-semibold text-white mb-7">Phone</h3>
                  <p className="text-[18px] text-white/60">18406593255</p>
                </div>

                <div>
                  <h3 className="text-[18px] font-semibold text-white mb-7">Location</h3>
                  <p className="text-[18px] text-white/60">China, Shenzhen</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </div>);

};

export default ContactPage;
