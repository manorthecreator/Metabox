import { useEffect, useRef, useState } from "react";

/* ─── Puzzle piece SVG paths ─── */
/* We build each piece as a connected path with "nub" connectors */
function buildPuzzle(S: number) {
  /* S = square size per piece (e.g. 120)
     Nub radius = S * 0.18, protruding outward by S * 0.22
     Center point for each nub: midpoint of the shared edge
  */
  const N = S * 0.18;   // nub radius (as bulge amount)
  const M = S * 0.5;    // midpoint of edge

  /*
    Piece arrangement (2x2 grid, top-left = 0,0):
    ┌─────┬─────┐
    │ TL  │ TR  │
    │     │     │
    ├─────┼─────┤
    │ BL  │ BR  │
    │     │     │
    └─────┴─────┘

    Shared edges:
    - TL right  ↔  TR left    → nub protrudes right from TL (inward for TR)
    - TL bottom ↔  BL top     → nub protrudes down from TL (inward for BL)
    - TR bottom ↔  BR top     → nub protrudes down from TR (inward for BR)
    - BL right  ↔  BR left    → nub protrudes right from BL (inward for BR)
  */

  const topLeftPath = `
    M 0,0
    L ${M - N},0
    Q ${M - N},${-N*1.6} ${M + N},${-N*1.6}
    Q ${M + N*1.6},${-N*1.6} ${M + N},0
    L ${S},0
    L ${S},${M - N}
    Q ${S + N*1.6},${M - N} ${S + N*1.6},${M + N}
    Q ${S + N*1.6},${M + N*1.6} ${S},${M + N}
    L ${S},${S}
    L 0,${S}
    Z
  `.trim();

  const topRightPath = `
    M 0,0
    L ${S},0
    L ${S},${S}
    L ${M + N},${S}
    Q ${M + N},${S + N*1.6} ${M - N},${S + N*1.6}
    Q ${M - N*1.6},${S + N*1.6} ${M - N},${S}
    L 0,${S}
    L 0,${M + N}
    Q ${-N*1.6},${M + N} ${-N*1.6},${M - N}
    Q ${-N*1.6},${M - N*1.2} 0,${M - N}
    Z
  `.trim();

  const bottomLeftPath = `
    M 0,0
    L ${M - N},0
    Q ${M - N},${-N*1.6} ${M + N},${-N*1.6}
    Q ${M + N*1.6},${-N*1.6} ${M + N},0
    L ${S},0
    L ${S},${S}
    L 0,${S}
    L 0,${M + N}
    Q ${-N*1.6},${M + N} ${-N*1.6},${M - N}
    Q ${-N*1.6},${M - N*1.2} 0,${M - N}
    Z
  `.trim();

  const bottomRightPath = `
    M 0,0
    L ${S},0
    L ${S},${M - N}
    Q ${S + N*1.6},${M - N} ${S + N*1.6},${M + N}
    Q ${S + N*1.6},${M + N*1.6} ${S},${M + N}
    L ${S},${S}
    L 0,${S}
    Z
  `.trim();

  return { topLeftPath, topRightPath, bottomLeftPath, bottomRightPath };
}

function PuzzleIllustration() {
  const raf = useRef<number>(0);
  const [t, setT] = useState(0);

  useEffect(() => {
    let prev = performance.now();
    let acc = 0;
    const step = (now: number) => {
      acc += (now - prev) / 1000;
      prev = now;
      setT(acc);
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const S = 140; // piece size
  const gap = 4; // gap between pieces (visual separation)
  const totalW = S * 2 + gap;
  const totalH = S * 2 + gap;

  const { topLeftPath, topRightPath, bottomLeftPath, bottomRightPath } = buildPuzzle(S);

  /* Animation: TL slides left, TR slides right, BL/BR stay */
  const period = 4; // seconds per cycle
  const phase = (t % period) / period; // 0→1
  const slide = Math.sin(phase * Math.PI * 2) * 12; // ±12px horizontal

  const tlX = -slide; // slides left when sin > 0
  const trX = slide;  // slides right

  const vb = totalW + 80;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/*
        ── PUZZLE PIECES ──────────────────────────────────────────────────────
        All 4 pieces are drawn at SVG origin (0,0). CSS translate positions
        each one. SVG viewBox = 340 × 360 px → 1 SVG unit = 1 CSS px.

        Piece size S=110, tab half-width N=22.

        Assembled positions (CSS translate):
          TL=(60,70)  TR=(170,70)
          BL=(60,180) BR=(170,180)

        Interlocking proof (all edges meet at same CSS coordinate):
          TL right-tab → 60+132=192   TR left-blank → 170+22=192  ✓
          TL bottom-tab→ 70+132=202   BL top-blank  → 180+22=202  ✓
          TR bottom-tab→ 70+132=202   BR top-blank  → 180+22=202  ✓
          BL right-tab → 60+132=192   BR left-blank → 170+22=192  ✓

        Animation: 5.5 s loop
          0–22 %  assembled (rest)
          22–42 % scatter outward
          42–62 % floating apart (52 % = float bob peak)
          62–80 % reassemble
          80–100% assembled (rest)
        ──────────────────────────────────────────────────────────────────── */}
      <svg viewBox="0 0 320 320" width={320} height={320}
        style={{ overflow: "visible" }}>

        <style>{`
          @keyframes pzReveal {
            from { opacity: 0; transform: translateY(40px); }
            to   { opacity: 1; transform: translateY(0px); }
          }
          /* TR: lifts up + tilts RIGHT (clockwise) */
          @keyframes pzTRLift {
            0%, 100% { transform: translate(160px,61px) rotate(0deg); }
            30%      { transform: translate(160px,51px) rotate(8deg); }
            55%      { transform: translate(160px,51px) rotate(8deg); }
            85%      { transform: translate(160px,61px) rotate(0deg); }
          }
          /* TL: lifts up slightly + drifts right toward TR slowly */
          @keyframes pzTLMove {
            0%, 100% { transform: translate(50px,61px) rotate(0deg); }
            30%      { transform: translate(58px,54px) rotate(0deg); }
            55%      { transform: translate(58px,54px) rotate(0deg); }
            85%      { transform: translate(50px,61px) rotate(0deg); }
          }
          .pzReveal { animation: pzReveal 0.8s ease-out both; }
          .pzTR {
            animation: pzTRLift 1.8s ease-in-out infinite;
            transform-box: fill-box; transform-origin: center;
          }
          .pzTL {
            animation: pzTLMove 1.8s ease-in-out infinite;
            transform-box: fill-box; transform-origin: center;
          }
        `}</style>

        <g className="pzReveal">

          {/* TL ── navy: knob-top, socket-left, socket-right, knob-bottom */}
          <path className="pzTL" fill="#304773"
            d="M 0 0
               L 33 0 C 33 -13.2 46.2 -22 55 -22 C 63.8 -22 77 -13.2 77 0
               L 110 0
               L 110 33 C 96.8 33 88 46.2 88 55 C 88 63.8 96.8 77 110 77
               L 110 110
               L 77 110 C 77 123.2 63.8 132 55 132 C 46.2 132 33 123.2 33 110
               L 0 110
               L 0 77 C 13.2 77 22 63.8 22 55 C 22 46.2 13.2 33 0 33
               Z"/>

          {/* TR ── teal: flat-top, knob-left, knob-right, knob-bottom — ANIMATED */}
          <path className="pzTR" fill="#4DC0AC"
            d="M 0 0
               L 110 0
               L 110 33 C 123.2 33 132 46.2 132 55 C 132 63.8 123.2 77 110 77
               L 110 110
               L 77 110 C 77 123.2 63.8 132 55 132 C 46.2 132 33 123.2 33 110
               L 0 110
               L 0 77 C -13.2 77 -22 63.8 -22 55 C -22 46.2 -13.2 33 0 33
               Z"/>

          {/* BL ── teal: socket-top, knob-left, knob-right, socket-bottom */}
          <path transform="translate(50,171)" fill="#4DC0AC"
            d="M 0 0
               L 33 0 C 33 13.2 46.2 22 55 22 C 63.8 22 77 13.2 77 0
               L 110 0
               L 110 33 C 123.2 33 132 46.2 132 55 C 132 63.8 123.2 77 110 77
               L 110 110
               L 77 110 C 77 96.8 63.8 88 55 88 C 46.2 88 33 96.8 33 110
               L 0 110
               L 0 77 C -13.2 77 -22 63.8 -22 55 C -22 46.2 -13.2 33 0 33
               Z"/>

          {/* BR ── navy: socket-top, socket-left, socket-right, flat-bottom */}
          <path transform="translate(160,171)" fill="#304773"
            d="M 0 0
               L 33 0 C 33 13.2 46.2 22 55 22 C 63.8 22 77 13.2 77 0
               L 110 0
               L 110 33 C 96.8 33 88 46.2 88 55 C 88 63.8 96.8 77 110 77
               L 110 110
               L 0 110
               L 0 77 C 13.2 77 22 63.8 22 55 C 22 46.2 13.2 33 0 33
               Z"/>

        </g>
      </svg>
    </div>
  );
}

export function WeAreSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="we-are"
      ref={ref}
      style={{
        backgroundColor: "#fff",
        padding: "100px 28px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "5rem",
        alignItems: "center",
      }} className="we-are-grid">

        {/* Left */}
        <div>
          {/* Section label */}
          

          <h2 style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)",
            lineHeight: 1.15,
            marginBottom: 32,
          }}>
            <span style={{ color: "#334D85" }}>We</span>
            <span style={{ color: "#58C4B6" }}>Are</span>
          </h2>

          {[
            <>At <strong style={{ fontWeight:700, color:"#374151" }}>MetaBox</strong>, our experienced Web Developers, Mobile App Developers, and System Integrators are <strong style={{ fontWeight:700, color:"#374151" }}>dedicated</strong> to delivering <strong style={{ fontWeight:700, color:"#374151" }}>high-quality digital solutions.</strong></>,
            <>We believe in building strong client partnerships founded on <strong style={{ fontWeight:700, color:"#374151" }}>Trust</strong>, <strong style={{ fontWeight:700, color:"#374151" }}>applying disciplined development practices</strong>, and always being open to <strong style={{ fontWeight:700, color:"#374151" }}>Learning new ways</strong> to meet your specific needs.</>,
            <><strong style={{ fontWeight:700, color:"#374151" }}>Our purpose</strong> is to build and implement <strong style={{ fontWeight:700, color:"#374151" }}>reliable digital tools</strong> and systems designed to <strong style={{ fontWeight:700, color:"#374151" }}>improve your business's efficiency</strong> and <strong style={{ fontWeight:700, color:"#374151" }}>performance</strong>.</>,
          ].map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "#6b7280",
                lineHeight: 1.82,
                marginBottom: i < 2 ? 20 : 44,
              }}
            >
              {para}
            </p>
          ))}

          <a
            href="#about"
            style={{
              display: "inline-block",
              padding: "13px 28px",
              border: "2px solid #334D85",
              color: "#334D85",
              borderRadius: 0,
              fontFamily: "'Nunito Sans', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 0.9,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#334D85";
              el.style.color = "#fff";
              el.style.transform = "translateY(-1px)";
              el.style.boxShadow = "0 4px 16px rgba(51,77,133,0.22)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "#334D85";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            FIND OUT MORE WHO WE ARE
          </a>
        </div>

        {/* Right: puzzle */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Animated puzzle illustration — paths from WeAre1 Figma import */}
          <svg viewBox="0 0 375 355" width={340} height={322}
               fill="none" style={{ overflow: "visible", maxWidth: "100%" }}>
            <defs>
              <filter id="pzSh" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#304773" floodOpacity="0.18"/>
              </filter>
            </defs>

            <style>{`
              @keyframes pzNavyDrift {
                0%   { transform: translate(0px, 0px); }
                30%  { transform: translate(-10px, 9px); }
                55%  { transform: translate(-10px, 9px); }
                80%  { transform: translate(0px, 0px); }
                100% { transform: translate(0px, 0px); }
              }
              @keyframes pzTealFloat {
                0%   { transform: translate(0px, 0px) rotate(0deg); }
                9%   { transform: translate(-4px, 3px) rotate(0deg); }
                17%  { transform: translate(0px, 0px) rotate(0deg); }
                40%  { transform: translate(-14px, 12px) rotate(-7deg); }
                58%  { transform: translate(-14px, 12px) rotate(-7deg); }
                80%  { transform: translate(0px, 0px) rotate(0deg); }
                100% { transform: translate(0px, 0px) rotate(0deg); }
              }
              .pz-nd {
                animation: pzNavyDrift 4s ease-in-out infinite;
                transform-box: fill-box; transform-origin: center;
              }
              .pz-tf {
                animation: pzTealFloat 4s ease-in-out infinite;
                transform-box: fill-box; transform-origin: center;
              }
            `}</style>

            {/* ── Static anchor: Navy top-left (p3990aae0) ── */}
            <g transform="translate(58,30) scale(0.47)" filter="url(#pzSh)">
              <path fill="#304773" d="M235.406 254.396C213.422 254.396 195.594 232.937 195.594 206.463C195.594 179.978 213.422 158.509 235.406 158.509C242.488 158.509 249.134 160.743 254.887 164.641C260.539 168.484 268.18 164.518 268.18 157.682V81.0192C268.18 76.3388 264.382 72.552 259.702 72.552H182.145C175.298 72.552 171.332 64.9114 175.186 59.2592C179.118 53.4952 181.352 46.8488 181.352 39.7556C181.352 17.7945 159.86 0 133.353 0C106.834 0 85.3422 17.7945 85.3422 39.7556C85.3422 46.8488 87.5874 53.4952 91.5082 59.2592C95.362 64.9114 91.3965 72.552 84.5491 72.552H8.48954C3.79795 72.552 0 76.3388 0 81.0192V158.754C0 165.747 7.95336 169.668 13.5833 165.512C19.6041 161.078 26.675 158.509 34.2597 158.509C56.2543 158.509 74.0712 179.978 74.0712 206.463C74.0712 232.937 56.2543 254.396 34.2597 254.396C26.675 254.396 19.6041 251.838 13.5833 247.403C7.95336 243.247 0 247.168 0 254.161V331.863C0 336.543 3.79795 340.33 8.48954 340.33H85.2305C92.0668 340.33 96.0434 332.712 92.2008 327.059C88.3023 321.318 86.0794 314.694 86.0794 307.634C86.0794 285.684 107.583 267.878 134.09 267.878C160.609 267.878 182.101 285.684 182.101 307.634C182.101 314.694 179.878 321.318 175.979 327.059C172.148 332.712 176.113 340.33 182.949 340.33H259.702C264.382 340.33 268.18 336.543 268.18 331.863V255.233C268.18 248.397 260.539 244.432 254.887 248.274C249.134 252.173 242.488 254.396 235.406 254.396Z"/>
            </g>

            {/* ── Animated: Teal top-right (p29c7fc00) — quick bump then drifts -7° ── */}
            <g transform="translate(176,6) scale(0.47)" filter="url(#pzSh)">
              <g className="pz-tf">
                <path fill="#4DC0AC" d="M254.697 300.563C254.697 293.492 252.463 286.846 248.553 281.093C244.711 275.452 248.676 267.822 255.524 267.822H332.298C336.979 267.822 340.777 264.025 340.777 259.344V182.67C340.777 175.845 348.417 171.88 354.081 175.711C359.833 179.621 366.48 181.855 373.562 181.855C395.556 181.855 413.373 160.385 413.373 133.911C413.373 107.426 395.556 85.9677 373.562 85.9677C366.48 85.9677 359.833 88.1906 354.081 92.1003C348.417 95.9429 340.777 91.9774 340.777 85.1411V8.4672C340.777 3.79795 336.979 0 332.298 0H81.0862C76.3946 0 72.5967 3.79795 72.5967 8.4672V85.1411C72.5967 91.9774 64.9561 95.9429 59.3039 92.1003C53.5399 88.1906 46.8935 85.9677 39.8114 85.9677C17.828 85.9677 0 107.426 0 133.911C0 160.385 17.828 181.855 39.8114 181.855C46.8935 181.855 53.5399 179.621 59.3039 175.711C64.9561 171.88 72.5967 175.845 72.5967 182.67V259.344C72.5967 264.025 76.3946 267.822 81.0862 267.822H157.861C164.697 267.822 168.674 275.452 164.831 281.093C160.91 286.846 158.676 293.492 158.676 300.563C158.676 322.513 180.168 340.319 206.687 340.319C233.205 340.319 254.697 322.513 254.697 300.563Z"/>
              </g>
            </g>

            {/* ── Static anchor: Teal bottom-left (p32d5e440) ── */}
            <g transform="translate(12,192) scale(0.47)" filter="url(#pzSh)">
              <path fill="#4DC0AC" d="M259.814 313.257C255.494 318.644 259.57 326.259 266.839 326.259H347.765C352.631 326.259 356.579 322.618 356.579 318.13V244.625C356.579 238.07 364.533 234.268 370.409 237.952C376.401 241.69 383.31 243.832 390.672 243.832C413.525 243.832 432.047 223.247 432.047 197.863C432.047 172.48 413.525 151.894 390.672 151.894C383.31 151.894 376.401 154.037 370.409 157.785C364.533 161.459 356.579 157.657 356.579 151.102V77.5966C356.579 73.109 352.631 69.4675 347.765 69.4675H267.989C260.882 69.4675 256.748 62.163 260.731 56.7435C264.784 51.2384 267.094 44.8872 267.094 38.1182C267.094 17.0723 244.752 0 217.185 0C189.629 0 167.287 17.0723 167.287 38.1182C167.287 44.8872 169.598 51.2384 173.65 56.7435C177.633 62.163 173.499 69.4675 166.393 69.4675H86.6161C81.7389 69.4675 77.7908 73.109 77.7908 77.5966V152.644C77.7908 159.413 69.3835 163.162 63.5657 159.049C57.1557 154.519 49.5497 151.894 41.3862 151.894C18.5332 151.894 0 172.48 0 197.863C0 223.247 18.5332 243.832 41.3862 243.832C49.5497 243.832 57.1557 241.208 63.5657 236.678C69.3835 232.565 77.7908 236.314 77.7908 243.083V318.13C77.7908 322.618 81.7389 326.259 86.6161 326.259H167.531C174.811 326.259 178.887 318.644 174.568 313.257C169.946 307.495 167.287 300.715 167.287 293.453C167.287 272.397 189.629 255.335 217.185 255.335C244.752 255.335 267.094 272.397 267.094 293.453C267.094 300.715 264.435 307.495 259.814 313.257Z"/>
            </g>

            {/* ── Animated: Navy bottom-right (pdc54940) — slow drift down-left ── */}
            <g transform="translate(196,218) scale(0.47)" filter="url(#pzSh)">
              <g className="pz-nd">
                <path fill="#304773" d="M243.173 82.427C251.058 82.427 258.42 84.8797 264.679 89.1424C270.532 93.116 278.788 89.3566 278.788 82.6627V8.12918C278.788 3.64154 274.84 0 269.974 0H190.14C183.021 0 178.899 7.32591 182.894 12.7346C186.97 18.2612 189.304 24.6339 189.304 31.4242C189.304 52.4808 166.962 69.5425 139.394 69.5425C111.826 69.5425 89.4844 52.4808 89.4844 31.4242C89.4844 24.6339 91.8185 18.2612 95.8944 12.7346C99.9006 7.32591 95.7666 0 88.6599 0H8.82537C3.94821 0 0 3.64154 0 8.12918V81.6345C0 88.1785 7.94284 91.9807 13.8187 88.307C19.8106 84.5584 26.7083 82.427 34.0705 82.427C56.9235 82.427 75.4567 103.002 75.4567 128.396C75.4567 153.78 56.9235 174.365 34.0705 174.365C26.7083 174.365 19.8106 172.223 13.8187 168.485C7.94284 164.811 0 168.613 0 175.157V248.663C0 253.15 3.94821 256.792 8.82537 256.792H269.974C274.84 256.792 278.788 253.15 278.788 248.663V174.129C278.788 167.425 270.532 163.676 264.679 167.649C258.42 171.901 251.058 174.365 243.173 174.365C220.32 174.365 201.787 153.78 201.787 128.396C201.787 103.002 220.32 82.427 243.173 82.427Z"/>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .we-are-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center;
          }
          .we-are-grid > div:last-child { order: -1; }
          .we-are-grid a { margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
