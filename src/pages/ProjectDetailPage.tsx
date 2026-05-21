import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, FileText, Play, Tag } from 'lucide-react';
import MinimalHero from '@/components/ui/hero-minimalism';
import { projects } from '@/data/projects';
import { publicAsset } from '@/lib/utils';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

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
      </main>
    </div>
  );
};

export default ProjectDetailPage;
