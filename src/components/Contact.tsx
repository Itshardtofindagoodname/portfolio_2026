import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VaraRevealText from './VaraRevealText'
import AppIcon from './AppIcon'
import MotionReveal from './MotionReveal'
import DoodleButton from './DoodleButton'
import contactUsImage from '../assets/contact_us.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // Reconnecting doodle ink path timeline
      gsap.fromTo(
        '.finale-doodle-path',
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: container,
            start: 'top 70%',
          },
        },
      )

      gsap.fromTo(
        '.finale-title-char',
        { opacity: 0, y: 50, rotate: 6 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
          },
        },
      )
    }, container)

    return () => ctx.revert()
  }, [])

  const socialLinks = [
    { label: 'EMAIL', href: 'mailto:debarjunthakur020@gmail.com', detail: 'debarjunthakur020@gmail.com' },
    { label: 'GITHUB', href: 'https://github.com/Itshardtofindagoodname', detail: '@Itshardtofindagoodname' },
    { label: 'LINKEDIN', href: 'https://in.linkedin.com/in/debarjun-thakur', detail: 'in/debarjun-thakur' },
    { label: 'PEERLIST', href: 'https://peerlist.io/debarjunthakur', detail: 'peerlist.io/debarjunthakur' },
  ]

  return (
    <section
      ref={containerRef}
      id="contact"
      className="paper-cut-section relative bg-[#F5F3EE] text-[#0D1015] pt-24 md:pt-36 pb-12 overflow-hidden border-t-2 border-[#0D1015] flex flex-col justify-between min-h-[90vh]"
    >
      {/* Reconnecting Ink Path SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 800" preserveAspectRatio="none">
        <path
          className="finale-doodle-path"
          d="M 50 100 Q 500 400 950 200 T 100 700"
          fill="none"
          stroke="#0D1015"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx="500" cy="400" r="180" fill="none" stroke="rgba(74, 197, 203, 0.2)" strokeWidth="2" />
      </svg>

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full relative z-10 my-auto">
        <div className="text-center mb-16">
          <MotionReveal y={20}>
            <span className="font-label-caps text-xs text-[#5C5268] uppercase tracking-[0.3em] block mb-4">
              FINALE // SAY HI, SHIP THINGS
            </span>
          </MotionReveal>

          {/* Enormous Kinetic Title */}
          <h1 className="font-headline-xl text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-none tracking-tighter text-[#0D1015] break-words">
            {'LET\'S BUILD'.split('').map((char, index) => (
              <span key={index} className="finale-title-char inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <div className="font-handwriting text-3xl md:text-5xl text-[#5C5268] mt-4 italic">
            <VaraRevealText text="something strange & beautiful." fontSize={48} />
          </div>
        </div>

        {/* Quiet Finale Interactive Center Card */}
        <div className="max-w-3xl mx-auto border-2 border-[#0D1015] bg-[#F5F3EE] p-8 md:p-12 shadow-2xl relative">
          <div className="tape-effect tape-tl opacity-80" />
          <div className="tape-effect tape-tr opacity-80" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <p className="font-handwriting text-2xl text-[#0D1015] leading-snug">
                I&apos;m always open to high-impact projects, collaborations, or a good conversation about frontend architecture and tactile UI work.
              </p>

              <div className="space-y-4 pt-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-[#0D1015]/30 pb-2 hover:border-[#4AC5CB] transition-colors"
                  >
                    <span className="font-label-caps text-xs tracking-widest text-[#0D1015] group-hover:text-[#4AC5CB]">
                      {item.label}
                    </span>
                    <span className="font-mono text-sm text-[#5C5268] group-hover:underline">
                      {item.detail}
                    </span>
                  </a>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <DoodleButton href="/Resume.pdf" download variant="paper" className="!text-sm">
                  Download Resume
                  <AppIcon name="download" size={18} />
                </DoodleButton>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div className="border-2 border-[#0D1015] p-2 bg-[#F5F3EE] rotate-2 shadow-md max-w-[220px]">
                <img
                  alt="Debarjun Waving"
                  src={contactUsImage}
                  className="w-full h-auto grayscale hover:grayscale-0 transition-[filter] duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Dark Editorial Footer */}
      <footer className="w-full pt-12 pb-8 border-t-2 border-[#0D1015] bg-[#0D1015] text-[#F5F3EE] mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/dev-tag.png" alt="dev.tag" className="h-8 w-auto filter invert" />
            <span className="font-label-caps text-xs tracking-widest opacity-60">DEBARJUN THAKUR © 2026</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 font-label-caps text-xs tracking-widest text-white/70">
            <a href="#home" className="hover:text-[#4AC5CB] transition-colors">HOME</a>
            <a href="#about" className="hover:text-[#4AC5CB] transition-colors">ABOUT</a>
            <a href="#projects" className="hover:text-[#4AC5CB] transition-colors">PROJECTS</a>
            <a href="#reading" className="hover:text-[#4AC5CB] transition-colors">READING &amp; MUSINGS</a>
            <a href="#contact" className="hover:text-[#4AC5CB] transition-colors">CONTACT</a>
          </div>
        </div>
      </footer>
    </section>
  )
}
