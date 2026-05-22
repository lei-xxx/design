import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './SignFlowNav.css';

interface NavLinkItem {
  label: string;
  href: string;
}

interface SignFlowNavProps {
  logo: string;
  logoAlt?: string;
  links: NavLinkItem[];
}

const getLuminance = (red: number, green: number, blue: number) => (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

const parseColorLuminance = (color: string) => {
  const colorMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
  if (!colorMatch) return null;

  const alpha = colorMatch[4] === undefined ? 1 : Number(colorMatch[4]);
  if (alpha <= 0.05) return null;

  return getLuminance(Number(colorMatch[1]), Number(colorMatch[2]), Number(colorMatch[3]));
};

const sampleImageLuminance = (image: HTMLImageElement, viewportX: number, viewportY: number) => {
  if (!image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) return null;

  const rect = image.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;

  const style = window.getComputedStyle(image);
  const objectFit = style.objectFit || 'fill';
  let renderedWidth = rect.width;
  let renderedHeight = rect.height;
  let offsetX = 0;
  let offsetY = 0;

  if (objectFit === 'contain' || objectFit === 'cover') {
    const rectRatio = rect.width / rect.height;
    const imageRatio = image.naturalWidth / image.naturalHeight;
    const shouldFitWidth = objectFit === 'contain' ? imageRatio > rectRatio : imageRatio < rectRatio;

    if (shouldFitWidth) {
      renderedWidth = rect.width;
      renderedHeight = rect.width / imageRatio;
      offsetY = (rect.height - renderedHeight) / 2;
    } else {
      renderedHeight = rect.height;
      renderedWidth = rect.height * imageRatio;
      offsetX = (rect.width - renderedWidth) / 2;
    }
  }

  const localX = viewportX - rect.left - offsetX;
  const localY = viewportY - rect.top - offsetY;
  if (localX < 0 || localY < 0 || localX > renderedWidth || localY > renderedHeight) return null;

  const sourceX = Math.min(image.naturalWidth - 1, Math.max(0, Math.floor((localX / renderedWidth) * image.naturalWidth)));
  const sourceY = Math.min(image.naturalHeight - 1, Math.max(0, Math.floor((localY / renderedHeight) * image.naturalHeight)));

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return null;

    context.drawImage(image, sourceX, sourceY, 1, 1, 0, 0, 1, 1);
    const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
    if (alpha <= 13) return null;
    return getLuminance(red, green, blue);
  } catch {
    return null;
  }
};

const AnimatedNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link
    to={href}
    onClick={onClick}
    className="sign-flow-nav-link relative inline-flex items-center text-base">
    <span className="sign-flow-nav-track">
      <span className="sign-flow-nav-line text-gray-300">{children}</span>
      <span className="sign-flow-nav-line text-white">{children}</span>
    </span>
  </Link>
);

export default function SignFlowNav({ logo, logoAlt = 'Logo', links }: SignFlowNavProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-[48px]');
  const [isNavButtonOnLight, setIsNavButtonOnLight] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState({ x: 0, y: 0, radius: 0 });
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = () => setIsOpen(false);
  const isActiveLink = (href: string) => {
    if (href === '/portfolio') return location.pathname === '/portfolio' || location.pathname.startsWith('/portfolio/');
    return location.pathname === href;
  };

  const updateMenuOrigin = () => {
    const rect = menuButtonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 56;
    const y = rect ? rect.top + rect.height / 2 : 56;
    const radius = Math.ceil(Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    ));
    setMenuOrigin({ x, y, radius });
  };
  const toggleMenu = () => {
    updateMenuOrigin();
    setIsOpen(current => !current);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);

    if (isOpen) {
      setHeaderShapeClass('rounded-[48px]');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-[48px]');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const updateButtonTone = () => {
      if (!menuButtonRef.current || !window.matchMedia('(max-width: 639px)').matches) return;

      const rect = menuButtonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const hiddenElement = menuButtonRef.current;
      hiddenElement.style.visibility = 'hidden';
      const elements = document.elementsFromPoint(centerX, centerY);
      hiddenElement.style.visibility = '';

      let sampledLuminance: number | null = null;

      for (const element of elements) {
        const htmlElement = element as HTMLElement;
        if (htmlElement === hiddenElement || htmlElement.closest('header') || htmlElement.closest('.gradual-blur')) {
          continue;
        }

        if (htmlElement instanceof HTMLImageElement) {
          sampledLuminance = sampleImageLuminance(htmlElement, centerX, centerY);
          if (sampledLuminance !== null) break;
        }

        const backgroundLuminance = parseColorLuminance(window.getComputedStyle(htmlElement).backgroundColor);
        if (backgroundLuminance !== null) {
          sampledLuminance = backgroundLuminance;
          break;
        }
      }

      if (sampledLuminance !== null) {
        setIsNavButtonOnLight(sampledLuminance > 0.58);
      }
    };

    let frameId = 0;
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateButtonTone);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('resize', updateMenuOrigin);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('resize', updateMenuOrigin);
    };
  }, []);

  return (
    <>
    <header
      className={`fixed left-1/2 top-6 z-[70] flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col items-center px-8 py-4 text-white transition-all duration-300 ease-in-out sm:w-auto sm:border sm:border-[#333] sm:bg-[#1f1f1f57] sm:px-10 sm:shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:backdrop-blur-[24px] ${headerShapeClass}`}>
      <div className="flex w-full items-center justify-between gap-x-8 sm:gap-x-12">
        <Link to="/" onClick={closeMenu} className="hidden items-center gap-3 sm:flex">
          <img src={logo} alt={logoAlt} className="h-8 w-8 rounded-full object-cover" />
          <span className="hidden whitespace-nowrap text-base font-bold text-white sm:block">疯狂许师傅</span>
        </Link>

        <nav className="hidden items-center space-x-5 sm:flex sm:space-x-9">
          {links.map(link => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <Link to="/portfolio" onClick={closeMenu} className="relative hidden sm:block">
          <span className="absolute inset-0 -m-2 rounded-full bg-gray-100 opacity-35 blur-lg transition-all duration-300 ease-out hover:opacity-60 hover:blur-xl" />
          <span className="relative z-10 inline-flex rounded-full bg-gradient-to-br from-gray-100 to-gray-300 px-5 py-2.5 text-base font-semibold text-black transition-all duration-200 hover:from-gray-200 hover:to-gray-400">
            View Projects
          </span>
        </Link>

        <button
          ref={menuButtonRef}
          className={`ml-auto flex h-[46px] w-[46px] items-center justify-center rounded-full border transition active:scale-95 focus:outline-none sm:hidden ${
            isOpen
              ? 'border-white bg-white text-black'
              : isNavButtonOnLight
                ? 'border-black/75 bg-transparent text-black'
                : 'border-white/75 bg-transparent text-white'
          }`}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          type="button">
          <ArrowUpRight className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-[360deg]' : 'rotate-180'}`} strokeWidth={2.2} />
        </button>
      </div>
    </header>

    <div
      className={`fixed inset-0 z-[60] bg-black px-5 pb-8 pt-32 text-black transition-all duration-300 sm:hidden ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{
        clipPath: isOpen
          ? `circle(${menuOrigin.radius || 1600}px at ${menuOrigin.x || 'calc(100% - 56px)'}px ${menuOrigin.y || 56}px)`
          : `circle(1px at ${menuOrigin.x || 'calc(100% - 56px)'}px ${menuOrigin.y || 56}px)`,
        transition: isOpen
          ? 'clip-path 760ms cubic-bezier(.22,1,.36,1), opacity 180ms ease-out'
          : 'clip-path 220ms ease-in, opacity 220ms ease-in',
      }}
      aria-hidden={!isOpen}
    >
      <div
        className={`mx-auto flex max-w-md flex-col gap-5 transition-all duration-300 ${
          isOpen ? 'translate-y-0 scale-100 opacity-100 delay-120' : 'translate-y-4 scale-[0.98] opacity-0'
        }`}
      >
        <nav className="rounded-[22px] bg-white p-7 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="space-y-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                className="flex items-center justify-between text-[34px] font-medium uppercase leading-none tracking-[-0.02em] text-black"
              >
                <span>{link.label}</span>
                {isActiveLink(link.href) && <span className="h-2.5 w-2.5 rounded-full bg-black" />}
              </Link>
            ))}
          </div>
        </nav>

        <Link
          to="/portfolio"
          onClick={closeMenu}
          className="flex h-20 items-center justify-between rounded-[22px] bg-[#FF5825] px-7 text-[28px] font-medium uppercase tracking-[-0.02em] text-white shadow-[0_24px_70px_rgba(255,88,37,0.28)]"
        >
          <span>Projects</span>
          <ArrowUpRight className="h-8 w-8" />
        </Link>
      </div>
    </div>
    </>
  );
}
