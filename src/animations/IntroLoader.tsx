import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Vara from 'vara'
import type { VaraProperties } from 'vara'
import varaFontUrl from 'vara/fonts/Shadows-Into-Light/shadows-into-light.json?url'

let cachedFontUrl: string | null = null

const resolveFontUrl = async () => {
  if (cachedFontUrl) return cachedFontUrl
  const res = await fetch(varaFontUrl)
  if (!res.ok) throw new Error('Failed to load vara font')
  const json = await res.text()
  const blob = new Blob([json], { type: 'application/json' })
  cachedFontUrl = URL.createObjectURL(blob)
  return cachedFontUrl
}

const WHITE = '#fcfbfa'
const INK = '#0D1015'
const DRAW_SPEED = 430
const LINE1 = 'Debarjun'
const LINE2 = 'Thakur'
const TAIL = 'v.tag'

interface LoaderProps {
  onComplete: () => void
}

const PATH_LEN = (p: SVGPathElement) => p.getTotalLength()

export default function IntroLoader({ onComplete }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const reportedRef = useRef(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let disposed = false
    let completeFired = false
    let tl: gsap.core.Timeline | null = null

    const finish = () => {
      if (completeFired) return
      completeFired = true
      disposed = true
      if (!reportedRef.current) {
        reportedRef.current = true
        onComplete()
      }
    }

    const failsafe = setTimeout(() => {
      if (!completeFired) finish()
    }, 12000)

    const q = <T extends Element>(selector: string): T | null =>
      root.querySelector<T>(selector)

    const wrapChar = (char: SVGGElement) => {
      const wrap = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      char.parentNode!.insertBefore(wrap, char)
      wrap.appendChild(char)
      return wrap
    }

    const buildSequence = (fontUrl: string) => {
      const line1Box = q<HTMLDivElement>('.lv-line1')
      const line2Box = q<HTMLDivElement>('.lv-line2')
      const tailBox = q<HTMLDivElement>('.lv-tail')
      if (!line1Box || !line2Box || !tailBox) {
        finish()
        return
      }

      const fs = Math.max(
        30,
        Math.min(68, Math.round(window.innerWidth * 0.06)),
      )

      const shared: VaraProperties = {
        autoAnimation: false,
        fontSize: fs,
        strokeWidth: 1.5,
        color: INK,
      }

      line1Box.style.width = '1400px'
      const line1Vara = new Vara(
        '.lv-line1',
        fontUrl,
        [{ text: LINE1, id: 0, autoAnimation: false }],
        shared,
      )

      line1Vara.ready(() => {
        try {
          if (disposed) return
          const l1 = line1Vara.get(0)
          if (!l1 || l1.characters.length === 0) {
            finish()
            return
          }
          const s1 = line1Box.querySelector('svg')
          if (s1) s1.style.overflow = 'visible'

          line2Box.style.width = '1400px'
          const line2Vara = new Vara(
            '.lv-line2',
            fontUrl,
            [{ text: LINE2, id: 0, autoAnimation: false }],
            shared,
          )

          line2Vara.ready(() => {
            try {
              if (disposed) return
              const l2 = line2Vara.get(0)
              if (!l2 || l2.characters.length === 0) {
                finish()
                return
              }
              const s2 = line2Box.querySelector('svg')
              if (s2) s2.style.overflow = 'visible'

              const b1 = s1 ? s1.getBBox() : { width: 0, height: 0 }
              const b2 = s2 ? s2.getBBox() : { width: 0, height: 0 }

              // Center the two-line stack vertically/horizontally.
              const gap = Math.round(fs * 0.35)
              const totalH = b1.height + b2.height + gap
              const top1 = Math.max(16, (window.innerHeight - totalH) / 2)
              line1Box.style.width = `${b1.width}px`
              line1Box.style.left = `calc(50% - ${b1.width / 2}px)`
              line1Box.style.top = `${top1}px`
              line2Box.style.width = `${b2.width}px`
              line2Box.style.left = `calc(50% - ${b2.width / 2}px)`
              line2Box.style.top = `${top1 + b1.height + gap}px`
              line1Box.style.opacity = '1'
              line2Box.style.opacity = '1'

              // "v.tag" lives at the end of the leftover "De".
              tailBox.style.width = '1000px'
              const tailVara = new Vara(
                '.lv-tail',
                fontUrl,
                [{ text: TAIL, id: 0, autoAnimation: false }],
                shared,
              )

              tailVara.ready(() => {
                try {
                  if (disposed) return
                  const t = tailVara.get(0)
                  if (!t || t.characters.length === 0) {
                    finish()
                    return
                  }
                  const st = tailBox.querySelector('svg')
                  if (st) st.style.overflow = 'visible'
                  const bt = st ? st.getBBox() : { width: 0, height: 0 }
                  // Extra room so the "g" never gets clipped.
                  tailBox.style.width = `${bt.width + 16}px`
                  const baseRect = tailBox.getBoundingClientRect()
                  const vRect = t.characters[0].getBoundingClientRect()
                  const bRect = l1.characters[2].getBoundingClientRect()
                  tailBox.style.left = `${bRect.left - (vRect.left - baseRect.left)}px`
                  tailBox.style.top = `${bRect.top - (vRect.top - baseRect.top)}px`

                  buildTimeline(
                    l1.characters,
                    l2.characters,
                    t.characters,
                    { line1Box, line2Box, tailBox },
                  )
                } catch {
                  finish()
                }
              })
            } catch {
              finish()
            }
          })
        } catch {
          finish()
        }
      })
    }

    const buildTimeline = (
      line1Chars: SVGGElement[],
      line2Chars: SVGGElement[],
      tailChars: SVGGElement[],
      els: {
        line1Box: HTMLDivElement
        line2Box: HTMLDivElement
        tailBox: HTMLDivElement
      },
    ) => {
      const { line1Box, tailBox } = els

      tl = gsap.timeline()

      const drawChar = (char: SVGGElement, at: number) => {
        const paths = Array.from(char.querySelectorAll('path'))
        const total = paths.reduce((a, p) => a + PATH_LEN(p), 0)
        const dur = Math.min(0.5, Math.max(0.05, total / DRAW_SPEED))
        tl!.set(paths, { opacity: 1 }, at)
        tl!.to(
          paths,
          { strokeDashoffset: 0, duration: dur, ease: 'power1.inOut' },
          at,
        )
        return at + dur
      }

      const dropIn = (wrap: SVGGElement, char: SVGGElement, at: number) => {
        const paths = Array.from(char.querySelectorAll('path'))
        const total = paths.reduce((a, p) => a + PATH_LEN(p), 0)
        const dur = Math.min(0.5, Math.max(0.15, total / DRAW_SPEED))
        tl!.set(wrap, { y: -140, opacity: 1 }, at)
        tl!.set(paths, { opacity: 1 }, at)
        tl!.to(wrap, { y: 0, duration: 0.55, ease: 'back.out(1.6)' }, at)
        tl!.to(
          paths,
          { strokeDashoffset: 0, duration: dur, ease: 'power1.inOut' },
          at,
        )
        return at + dur
      }

      const stagger = 0.085

      // ── 1. Draw the two lines, one after the other ─────────────
      const l1Wraps = line1Chars.map((char) => wrapChar(char))
      const l2Wraps = line2Chars.map((char) => wrapChar(char))
      // Everything after "De" plus all of line 2 tumbles away. "De" stays
      // put so "v.tag" can fuse with it into "Dev.tag".
      const fallWraps = [...l1Wraps.slice(2), ...l2Wraps]

      let mainEnd = 0
      line1Chars.forEach((char, i) => {
        mainEnd = drawChar(char, i * stagger)
      })
      const line2Start = mainEnd + stagger + 0.15
      line2Chars.forEach((char, i) => {
        mainEnd = drawChar(char, line2Start + i * stagger)
      })
      mainEnd += stagger
      tl.to({}, { duration: 0.5 }, mainEnd)

      // ── 2. The rest of the name tumbles away, right-to-left ─────
      const fallStart = mainEnd + 0.5
      for (let i = fallWraps.length - 1; i >= 0; i--) {
        const wrap = fallWraps[i]!
        const box = wrap.getBBox()
        const at = fallStart + (fallWraps.length - 1 - i) * 0.04
        tl!.to(
          wrap,
          {
            y: window.innerHeight + 240,
            rotation: () => gsap.utils.random(-18, 18),
            x: () => gsap.utils.random(-30, 30),
            svgOrigin: `${box.x + box.width / 2} ${box.y + box.height / 2}`,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.in',
          },
          at,
        )
      }
      const lastFall = fallStart + (fallWraps.length - 1) * 0.04

      // ── 3. "v.tag" drops in right after the resting "De" ─────────
      const bAt = lastFall + 0.15
      tl.set(tailBox, { opacity: 1 }, bAt)
      const vWrap = wrapChar(tailChars[0])

      let cursor = bAt + 0.1
      tailChars.forEach((char, i) => {
        if (i === 0) cursor = dropIn(vWrap, char, cursor)
        else cursor = drawChar(char, cursor)
        cursor += 0.06
      })
      const tagEnd = cursor - 0.06

      // ── 4. "Dev.tag" drops off as one piece; white hands to the
      //    pixel reveal under the page. ─────────────────────────────
      const dropAt = tagEnd + 0.5
      const dropY = () => window.innerHeight + 320
      tl.to(
        [line1Box, tailBox],
        { y: dropY, duration: 0.75, ease: 'power3.in' },
        dropAt,
      )
      tl.to(
        [line1Box, tailBox],
        { opacity: 0, duration: 0.4, ease: 'power1.in' },
        dropAt + 0.4,
      )
      tl.call(finish, [], dropAt + 0.85)

      tl.play()
    }

    const run = async () => {
      try {
        const fontUrl = await resolveFontUrl()
        if (disposed) return
        buildSequence(fontUrl)
      } catch {
        if (!disposed) finish()
      }
    }

    run()

    return () => {
      disposed = true
      clearTimeout(failsafe)
      if (tl) tl.kill()
      queueMicrotask(() => {
        root.querySelectorAll('.lv-line1, .lv-line2, .lv-tail').forEach((el) => {
          el.innerHTML = ''
        })
      })
    }
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        overflow: 'hidden',
        fontFamily: 'var(--font-body-md)',
        color: INK,
      }}
    >
      <div
        className="lv-scene"
        style={{
          position: 'absolute',
          inset: 0,
          background: WHITE,
          overflow: 'hidden',
          willChange: 'transform, opacity',
        }}
      >
        <div
          className="lv-line1"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0,
            zIndex: 1,
            willChange: 'opacity, transform',
            transformOrigin: 'center center',
            whiteSpace: 'nowrap',
          }}
        />

        <div
          className="lv-line2"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0,
            zIndex: 2,
            willChange: 'opacity, transform',
            transformOrigin: 'center center',
            whiteSpace: 'nowrap',
          }}
        />

        <div
          className="lv-tail"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0,
            zIndex: 3,
            willChange: 'opacity, transform',
            transformOrigin: 'center center',
            whiteSpace: 'nowrap',
          }}
        />
      </div>
    </div>
  )
}