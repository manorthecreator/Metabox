import { useEffect, useRef, useState } from "react";
import zohoGif from "@/imports/20241213_124350.gif";

const NAVY = "#334D85";
const MINT  = "#58C4B6";

/* Zoho logo — four overlapping rounded squares with independent float + rotate animations */
function ZohoLogo() {
  return (
    <>
      <style>{`
        @keyframes zoho-float-red {
          0%,100% { transform: translate(0px, 0px) rotate(-8deg); }
          25%      { transform: translate(-4px, -6px) rotate(-11deg); }
          50%      { transform: translate(2px, -10px) rotate(-6deg); }
          75%      { transform: translate(-2px, -4px) rotate(-10deg); }
        }
        @keyframes zoho-float-green {
          0%,100% { transform: translate(0px, 0px) rotate(5deg); }
          30%      { transform: translate(5px, -8px) rotate(8deg); }
          60%      { transform: translate(-3px, -12px) rotate(3deg); }
          80%      { transform: translate(4px, -5px) rotate(7deg); }
        }
        @keyframes zoho-float-blue {
          0%,100% { transform: translate(0px, 0px) rotate(-5deg); }
          20%      { transform: translate(4px, -7px) rotate(-2deg); }
          55%      { transform: translate(-2px, -11px) rotate(-7deg); }
          80%      { transform: translate(3px, -4px) rotate(-3deg); }
        }
        @keyframes zoho-float-yellow {
          0%,100% { transform: translate(0px, 0px) rotate(8deg); }
          35%      { transform: translate(-3px, -9px) rotate(12deg); }
          65%      { transform: translate(5px, -6px) rotate(5deg); }
          85%      { transform: translate(-1px, -3px) rotate(10deg); }
        }
        @keyframes zoho-pulse-text {
          0%,100% { opacity: 0.85; letter-spacing: 6px; }
          50%      { opacity: 1;    letter-spacing: 8px; }
        }

        .zoho-sq-red    { animation: zoho-float-red    3.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .zoho-sq-green  { animation: zoho-float-green  4.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .zoho-sq-blue   { animation: zoho-float-blue   4.1s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .zoho-sq-yellow { animation: zoho-float-yellow 3.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .zoho-text      { animation: zoho-pulse-text   3s ease-in-out infinite; }
      `}</style>

      {/*
        ANIMATION SEQUENCE (6 s loop, CSS px translations match the 280×215 rendered viewport)
        ─────────────────────────────────────────────────────────────────────────────────────
        0 – 25 %  (0 – 1.5 s) : rings spread out at rest
        25 – 42 % (1.5 – 2.5 s): converge toward centre — Red/Blue spin CW, Green/Yellow CCW
        42 – 67 % (2.5 – 4.0 s): merged at centre, fast multi-colour spin (2 rps → see colours)
        67 – 72 % (4.0 – 4.3 s): 0.3 s blackout — logo + ZOHO invisible
        72 – 89 % (4.3 – 5.35 s): spin back out to original positions
        89 – 100% (5.35 – 6.0 s): rest
        Seamless loop: 720 ° ≡ 0 ° (mod 360 °)
      */}
      <img
        src={zohoGif}
        alt="Zoho animated logo"
        width={280}
        style={{
          display: "block",
          maxWidth: "100%",
          animation: "zmGifReveal 0.8s ease-out both",
        }}
      />
      <style>{`
        @keyframes zmGifReveal {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
      `}</style>
    </>
  );
}

export function ZohoSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="zoho"
      ref={ref}
      style={{
        background: "#fff", padding: "96px 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity .75s ease, transform .75s ease",
      }}
    >
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "5rem", alignItems: "center",
      }} className="zoho-grid">

        {/* Left — Zoho logo */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ZohoLogo />
        </div>

        {/* Right — text */}
        <div>
          <h2 style={{
            fontFamily: "'Nunito Sans', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.2rem, 3.5vw, 3rem)", lineHeight: 1.1,
            marginBottom: 28,
          }}>
            <span style={{ color: NAVY, letterSpacing: -2 }}>ZO</span>
            <span style={{ color: MINT, letterSpacing: -2 }}>HO</span>
          </h2>

          {[
            <>MetaBox is a trusted <strong style={{ fontWeight:700, color:"#374151" }}>Zoho Partner in Mauritius</strong>, helping businesses get the most out of Zoho's powerful suite of tools.</>,
            <>From <strong style={{ fontWeight:700, color:"#374151" }}>Sales</strong> and <strong style={{ fontWeight:700, color:"#374151" }}>CRM</strong> to <strong style={{ fontWeight:700, color:"#374151" }}>Finance</strong>, <strong style={{ fontWeight:700, color:"#374151" }}>HR</strong>, and <strong style={{ fontWeight:700, color:"#374151" }}>automation</strong>, we configure and integrate over <strong style={{ fontWeight:700, color:"#374151" }}>55+ Zoho applications</strong> to match your unique business needs.</>,
            <>Rely on our expertise to <strong style={{ fontWeight:700, color:"#374151" }}>streamline your operations</strong>, so you can focus on <strong style={{ fontWeight:700, color:"#374151" }}>growing your business.</strong></>,
          ].map((para, i) => (
            <p key={i} style={{
              fontFamily: "'Inter', sans-serif", fontSize: "1rem",
              color: "#6b7280", lineHeight: 1.82,
              marginBottom: i < 2 ? 20 : 40,
            }}>{para}</p>
          ))}

          <a
            href="#contact"
            className="zoho-btn"
            style={{
              display: "inline-block",
              padding: "13px 26px",
              border: `2px solid ${NAVY}`, color: NAVY, borderRadius: 0,
              fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800,
              fontSize: 13, letterSpacing: .8, textDecoration: "none",
              transition: "all .2s ease",
            }}
          >
            DISCOVER ZOHO
          </a>
        </div>
      </div>

      <style>{`
        .zoho-btn:hover { background: ${NAVY} !important; color: #fff !important; transform: translateY(-1px); }
        @media (max-width: 860px) {
          .zoho-grid { grid-template-columns: 1fr !important; gap: 3rem !important; text-align: center; }
        }
      `}</style>
    </section>
  );
}
