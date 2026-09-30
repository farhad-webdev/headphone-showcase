import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const ASSETS = {
  hero: "/assets/headphone-01.png",
  side: "/assets/headphone-02.png",
  detail: "/assets/headphone-03.png",
  final: "/assets/headphone-04.png",
};

const features = [
  {
    number: "01",
    eyebrow: "Adaptive silence",
    title: "Silence that\nmoves with you.",
    body: "Adaptive noise cancellation continuously responds to your surroundings, keeping the listening space focused and controlled.",
  },
  {
    number: "02",
    eyebrow: "Spatial audio",
    title: "Sound with\nanother dimension.",
    body: "A wide, detailed soundstage creates depth around every note while keeping vocals precise and natural.",
  },
  {
    number: "03",
    eyebrow: "All-day comfort",
    title: "Designed to\nfeel weightless.",
    body: "Balanced pressure, soft contact surfaces and a carefully tuned frame keep the experience comfortable for longer sessions.",
  },
];

function App() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      syncTouch: false,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      gsap.from(q(".nav-inner"), {
        y: -30,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: false,
        },
      });

      heroTl
        .to(".hero-product", {
          y: 180,
          x: -120,
          rotation: -18,
          scale: 0.72,
          ease: "none",
        }, 0)
        .to(".hero-copy", {
          y: -120,
          opacity: 0,
          ease: "none",
        }, 0)
        .to(".hero-orb", {
          scale: 2.4,
          opacity: 0,
          ease: "none",
        }, 0);

      gsap.to(".marquee-track", {
        xPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      const showcase = gsap.timeline({
        scrollTrigger: {
          trigger: ".showcase",
          start: "top top",
          end: "+=3000",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      const turntableFrames = gsap.utils.toArray(".turntable-frame");
      const turntableDuration = 1;
      gsap.set(turntableFrames, { opacity: 0, scale: 1 });
      gsap.set(turntableFrames[0], { opacity: 1 });

      showcase.to(".showcase-product-wrap", {
        rotation: 360,
        ease: "none",
        duration: turntableFrames.length,
      }, 0);

      turntableFrames.forEach((frame, index) => {
        const nextFrame = turntableFrames[(index + 1) % turntableFrames.length];
        const transitionStart = index * turntableDuration + turntableDuration * 0.72;

        showcase.to(frame, {
          opacity: 0,
          scale: 0.94,
          duration: turntableDuration * 0.28,
          ease: "power1.inOut",
        }, transitionStart);
        showcase.fromTo(nextFrame, {
          opacity: 0,
          scale: 1.04,
        }, {
          opacity: 1,
          scale: 1,
          duration: turntableDuration * 0.28,
          ease: "power1.inOut",
          immediateRender: false,
        }, transitionStart);
      });

      const featureSections = gsap.utils.toArray(".feature");
      featureSections.forEach((section) => {
        const product = section.querySelector(".feature-product");
        const text = section.querySelector(".feature-copy");
        const line = section.querySelector(".feature-line");

        gsap.fromTo(
          product,
          { y: 100, rotation: -10, scale: 0.88, opacity: 0 },
          {
            y: -20,
            rotation: 5,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "center center",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          text,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "center 45%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              end: "center 45%",
              scrub: 1,
            },
          }
        );
      });

      gsap.fromTo(".detail-product",
        { y: 120, rotation: 12, scale: 0.75 },
        {
          y: -40,
          rotation: -8,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".detail",
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(".detail-copy > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".detail",
            start: "top 65%",
            end: "center 45%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(".final-product",
        { y: 180, rotation: -15, scale: 0.7, opacity: 0 },
        {
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".final",
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(".final-copy",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".final",
            start: "top 70%",
            end: "center 45%",
            scrub: 1,
          },
        }
      );
    }, root);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={root}>
      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top">NOIR</a>
          <span className="nav-status">AUDIO / 01</span>
          <a className="nav-link" href="#features">Explore</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="hero-copy">
          <p className="eyebrow">A new dimension of sound</p>
          <h1>
            Hear
            <span>everything.</span>
          </h1>
          <p className="hero-description">
            Engineered for focus. Sculpted for comfort. Built around the way
            you actually listen.
          </p>
          <div className="scroll-hint">
            <span className="scroll-dot" />
            <span>Scroll to explore</span>
          </div>
        </div>

        <div className="hero-product-wrap">
          <div className="product-shadow" />
          <img className="hero-product product-image" src={ASSETS.hero} alt="Headphone product" />
        </div>

        <div className="hero-meta">
          <span>NOIR / H01</span>
          <span>2026</span>
        </div>
      </section>

      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>PURE SOUND</span>
          <i />
          <span>ZERO DISTRACTION</span>
          <i />
          <span>PURE SOUND</span>
          <i />
          <span>ZERO DISTRACTION</span>
        </div>
      </section>

      <section className="showcase">
        <div className="showcase-bg-text">FORM</div>
        <div className="showcase-copy">
          <p className="eyebrow">01 / The object</p>
          <h2>Form follows<br />the frequency.</h2>
          <p>
            Every curve has a purpose. The silhouette is minimal by design,
            while the internal architecture is built around an immersive
            listening experience.
          </p>
        </div>
        <div className="showcase-product-wrap">
          <div className="ring ring-one" />
          <div className="ring ring-two" />
          <img className="showcase-product turntable-frame product-image" src={ASSETS.hero} alt="Headphone rotating view 1" />
          <img className="showcase-product turntable-frame product-image" src={ASSETS.side} alt="Headphone rotating view 2" />
          <img className="showcase-product turntable-frame product-image" src={ASSETS.detail} alt="Headphone rotating view 3" />
          <img className="showcase-product turntable-frame product-image" src={ASSETS.final} alt="Headphone rotating view 4" />
        </div>
        <div className="showcase-progress">Scroll to rotate · 360°</div>
      </section>

      <section className="features" id="features">
        {features.map((feature, index) => (
          <section className="feature" key={feature.number}>
            <div className="feature-index">{feature.number}</div>
            <div className="feature-copy">
              <p className="eyebrow">{feature.eyebrow}</p>
              <h2>{feature.title.split("\n").map((line, i) => <React.Fragment key={line}>{i > 0 && <br />}{line}</React.Fragment>)}</h2>
              <div className="feature-line" />
              <p>{feature.body}</p>
            </div>
            <div className="feature-product-wrap">
              <div className="feature-glow" />
              <img
                className="feature-product product-image"
                src={index === 1 ? ASSETS.detail : ASSETS.hero}
                alt="Headphone product detail"
              />
            </div>
          </section>
        ))}
      </section>

      <section className="detail">
        <div className="detail-copy">
          <p className="eyebrow">Crafted in silence</p>
          <h2>Nothing extra.<br />Everything intentional.</h2>
          <p>
            Precision-machined details, balanced materials and a quiet visual
            language come together in one continuous object.
          </p>
          <div className="spec-row">
            <div>
              <strong>40H</strong>
              <span>Battery</span>
            </div>
            <div>
              <strong>32Ω</strong>
              <span>Driver impedance</span>
            </div>
            <div>
              <strong>24bit</strong>
              <span>High resolution</span>
            </div>
          </div>
        </div>
        <div className="detail-product-wrap">
          <div className="detail-grid" />
          <img className="detail-product product-image" src={ASSETS.detail} alt="Headphone detail" />
        </div>
      </section>

      <section className="final">
        <div className="final-bg">NOIR</div>
        <div className="final-copy">
          <p className="eyebrow">The listening experience</p>
          <h2>Stay inside<br />the sound.</h2>
          <a className="final-button" href="#top">
            <span>Back to top</span>
            <span className="button-arrow">↑</span>
          </a>
        </div>
        <div className="final-product-wrap">
          <img className="final-product product-image" src={ASSETS.final} alt="Headphone final view" />
        </div>
      </section>

      <footer className="footer">
        <span>NOIR AUDIO</span>
        <span>PRODUCT EXPERIENCE / 2026</span>
      </footer>
    </main>
  );
}

export default App;