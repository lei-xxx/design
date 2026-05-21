import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, FileText, Play, Tag } from 'lucide-react';
import MinimalHero from '@/components/ui/hero-minimalism';
import { projects } from '@/data/projects';
import { publicAsset } from '@/lib/utils';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const backButtonRef = useRef<HTMLAnchorElement | null>(null);
  const [backIconColor, setBackIconColor] = useState('#fff');

  useEffect(() => {
    if (!project) return;

    let frameId = 0;

    const updateIconColor = () => {
      const button = backButtonRef.current;
      if (!button) return;

      const buttonRect = button.getBoundingClientRect();
      const centerX = buttonRect.left + buttonRect.width / 2;
      const centerY = buttonRect.top + buttonRect.height / 2;
      const images = Array.from(document.querySelectorAll<HTMLImageElement>('main img'));
      const sampleOffsets = [
        [-14, -14], [0, -14], [14, -14],
        [-14, 0], [0, 0], [14, 0],
        [-14, 14], [0, 14], [14, 14],
      ];
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;

      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return;

      try {
        const luminanceSamples = sampleOffsets.flatMap(([offsetX, offsetY]) => {
          const pointX = centerX + offsetX;
          const pointY = centerY + offsetY;
          const image = images.find((img) => {
            const rect = img.getBoundingClientRect();
            return pointX >= rect.left && pointX <= rect.right && pointY >= rect.top && pointY <= rect.bottom;
          });

          if (!image || !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) {
            return [];
          }

          const rect = image.getBoundingClientRect();
          const scaleX = image.naturalWidth / rect.width;
          const scaleY = image.naturalHeight / rect.height;
          const sampleX = Math.min(image.naturalWidth - 1, Math.max(0, Math.floor((pointX - rect.left) * scaleX)));
          const sampleY = Math.min(image.naturalHeight - 1, Math.max(0, Math.floor((pointY - rect.top) * scaleY)));

          context.drawImage(image, sampleX, sampleY, 1, 1, 0, 0, 1, 1);
          const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
          return [0.2126 * red + 0.7152 * green + 0.0722 * blue];
        });

        if (luminanceSamples.length === 0) {
          setBackIconColor('#fff');
          return;
        }

        const averageLuminance = luminanceSamples.reduce((sum, value) => sum + value, 0) / luminanceSamples.length;
        setBackIconColor(averageLuminance > 150 ? '#000' : '#fff');
      } catch {
        setBackIconColor('#fff');
      }
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateIconColor);
    };

    scheduleUpdate();
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('main img'));
    const timeoutId = window.setTimeout(scheduleUpdate, 300);
    images.forEach((image) => image.addEventListener('load', scheduleUpdate));
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      images.forEach((image) => image.removeEventListener('load', scheduleUpdate));
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('load', scheduleUpdate);
    };
  }, [project]);

  if (!project) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-black pt-28 text-white">
        <MinimalHero backgroundOnly className="z-0" />
        <main className="relative z-10 mx-auto max-w-3xl px-5 py-20 text-center">
          <h1 className="text-3xl font-bold">Project not found</h1>
          <Link
            to="/portfolio"
            aria-label="Back to Portfolio"
            className="mt-8 inline-flex h-14 w-24 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/90"
          >
            <ChevronLeft className="h-8 w-8 stroke-[3]" />
          </Link>
        </main>
      </div>
    );
  }

  const projectTags = project.tags ?? [project.category];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black pt-24 text-white">
      <MinimalHero backgroundOnly className="z-0" />
      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[#FF5825]">
            <Tag className="mr-2 h-4 w-4" />
            {projectTags.map((tag) => (
              <span key={tag} className="text-sm font-semibold">{tag}</span>
            ))}
          </div>
          <h1 className="text-[32px] font-bold leading-tight sm:text-5xl">{project.title}</h1>
        </div>

        <section className="space-y-2">
          {project.media.map((media) => (
            <article
              key={`${media.type}-${media.src}`}
              className="overflow-hidden bg-transparent"
            >
              {media.type === 'image' ? (
                <img
                  src={publicAsset(media.src)}
                  alt={media.alt || media.title || project.title}
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
      </main>
      <Link
        ref={backButtonRef}
        to="/portfolio"
        aria-label="Back to Portfolio"
        className="fixed bottom-[100px] left-6 z-40 flex h-16 w-24 items-center justify-center rounded-full bg-white/80% text-black shadow-[0_16px_48px_rgba(0,0,0,0.32)] backdrop-blur-[12px] transition active:scale-95 sm:hidden"
      >
        <ChevronLeft className="h-9 w-9 stroke-[2]" style={{ color: backIconColor }} />
      </Link>
    </div>
  );
};

export default ProjectDetailPage;
