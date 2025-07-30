
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type GsapScrollAnimatorProps = {
  children: React.ReactNode;
};

export function GsapScrollAnimator({ children }: GsapScrollAnimatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate single elements
      const animatedElements = gsap.utils.toArray<HTMLElement>('.scroll-animate:not(.stagger-card)');
      animatedElements.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'restart none restart reset',
            },
          }
        );
      });

      // Animate card containers with stagger
      const staggerContainers = gsap.utils.toArray<HTMLElement>('.stagger-container');
      staggerContainers.forEach((container) => {
         const cards = gsap.utils.toArray<HTMLElement>('.stagger-card', container);
         gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 50 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.2,
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'restart none restart reset',
              },
            }
         )
      })

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
