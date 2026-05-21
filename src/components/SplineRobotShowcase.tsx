import { SplineScene } from '@/components/ui/splite';

export function SplineRobotShowcase() {
  return (
    <div className="relative isolate h-[560px] w-full overflow-hidden rounded-t-2xl rounded-b-[36px]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_38%,rgba(0,0,0,0)_100%)]" />
      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="relative z-10 h-full w-full"
      />
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0)_100%)]" />
    </div>
  );
}
