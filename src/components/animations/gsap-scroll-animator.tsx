
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

type GsapScrollAnimatorProps = {
  children: React.ReactNode;
};

export function GsapScrollAnimator({ children }: GsapScrollAnimatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const commonScrollTrigger = {
        start: 'top 80%', // Start animation when element top hits 80% from viewport top
        end: 'bottom 30%', // End animation when element bottom hits 20% from viewport top
        toggleActions: 'play reverse play reverse',
      };
      
      // Animate single elements
      const animatedElements = gsap.utils.toArray<HTMLElement>('.animate-fade-in-up');
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
              ...commonScrollTrigger
            },
          }
        );
      });

      // Stagger animation for cards
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
                 ...commonScrollTrigger
               },
             }
          )
       });

        // Text animation for titles
        const textElements = gsap.utils.toArray<HTMLElement>('.animate-text-reveal');
        textElements.forEach((el) => {
            const split = new SplitType(el, { types: 'words, chars' });
            gsap.from(split.chars, {
                autoAlpha: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.03,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    ...commonScrollTrigger
                },
            });
        });

      // Star animation
      const starContainers = gsap.utils.toArray<HTMLElement>('.animate-stars');
      starContainers.forEach((container) => {
        const stars = gsap.utils.toArray<HTMLElement>('.star', container);
        gsap.from(stars, {
          scale: 0,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: container,
            start: 'top 50%',
            end: 'bottom 30%',
            toggleActions: 'play reverse play reverse',
          }
        });
      });


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
