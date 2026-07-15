import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

const REVEAL_SELECTOR = [
  '.wbHeroCopy',
  '.wbTopology',
  '.wbHeroMetrics',
  '.wbSectionRail',
  '.wbSectionIntro',
  '.wbProjectRow',
  '.wbProcessTrack article',
  '.wbStackTable article',
  '.wbContactCopy',
  '.wbContactForm',
  '.wbFooterMain',
  '.wbCaseHero',
  '.wbCaseNav',
  '.wbCaseSection',
  '.wbCasePagination',
].join(', ')

function WorkbenchPolish() {
  const location = useLocation()
  const progressBarRef = useRef(null)

  useEffect(() => {
    let frameId = 0

    function updateProgress() {
      frameId = 0

      const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight

      const progress =
        scrollableHeight > 0
          ? Math.min(
              Math.max(window.scrollY / scrollableHeight, 0),
              1
            )
          : 0

      if (progressBarRef.current) {
        progressBarRef.current.style.transform =
          `scaleX(${progress})`
      }
    }

    function requestProgressUpdate() {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()

    window.addEventListener('scroll', requestProgressUpdate, {
      passive: true,
    })
    window.addEventListener('resize', requestProgressUpdate)

    return () => {
      window.removeEventListener(
        'scroll',
        requestProgressUpdate
      )
      window.removeEventListener(
        'resize',
        requestProgressUpdate
      )

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const observedElements = new WeakSet()
    let revealIndex = 0
    let setupFrameId = 0

    document.documentElement.classList.add('wbMotionReady')

    const intersectionObserver = prefersReducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return
              }

              entry.target.classList.add('wbRevealed')
              intersectionObserver.unobserve(entry.target)
            })
          },
          {
            threshold: 0.08,
            rootMargin: '0px 0px -7% 0px',
          }
        )

    function prepareElement(element) {
      if (
        !(element instanceof HTMLElement) ||
        observedElements.has(element)
      ) {
        return
      }

      observedElements.add(element)
      element.classList.add('wbRevealTarget')

      const delay = Math.min((revealIndex % 6) * 45, 225)
      element.style.setProperty(
        '--wb-reveal-delay',
        `${delay}ms`
      )
      revealIndex += 1

      if (prefersReducedMotion) {
        element.classList.add('wbRevealed')
        return
      }

      intersectionObserver.observe(element)
    }

    function prepareElements(rootElement = document) {
      if (
        rootElement instanceof HTMLElement &&
        rootElement.matches(REVEAL_SELECTOR)
      ) {
        prepareElement(rootElement)
      }

      if ('querySelectorAll' in rootElement) {
        rootElement
          .querySelectorAll(REVEAL_SELECTOR)
          .forEach(prepareElement)
      }
    }

    setupFrameId = window.requestAnimationFrame(() => {
      prepareElements()
    })

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            prepareElements(node)
          }
        })
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      mutationObserver.disconnect()
      intersectionObserver?.disconnect()

      if (setupFrameId) {
        window.cancelAnimationFrame(setupFrameId)
      }
    }
  }, [location.pathname])

  return (
    <div className="wbScrollProgress" aria-hidden="true">
      <span ref={progressBarRef} />
    </div>
  )
}

export default WorkbenchPolish
