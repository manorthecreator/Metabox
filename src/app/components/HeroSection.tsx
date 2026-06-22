import { useEffect, useState } from "react";
import { HeroIllustration } from "./HeroIllustration";

const PHRASES = ["Mobile App Builder", "System Integrator", "Zoho Specialist", "Web Developer"];

function TypeWriter() {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[idx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIdx < phrase.length) {
        timer = setTimeout(() => setCharIdx(c => c + 1), 70);
      } else {
        timer = setTimeout(() => setDeleting(true), 1400);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => setCharIdx(c => c - 1), 38);
      } else {
        setDeleting(false);
        setIdx(i => (i + 1) % PHRASES.length);
      }
    }

    setDisplayed(phrase.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx]);

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 800,
      fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)",
      color: "#58C4B6",
      lineHeight: 1.25,
      minHeight: "2.8rem",
      display: "flex",
      alignItems: "center",
      marginBottom: 28,
    }}>
      <span className="text-[#334d85]">{displayed}</span>
      <span style={{
        display: "inline-block",
        width: 3,
        height: "1em",
        background: "#58C4B6",
        marginLeft: 4,
        borderRadius: 2,
        verticalAlign: "middle",
        animation: "cursorBlink 0.75s step-end infinite",
      }} />
    </div>
  );
}

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" style={{
      backgroundColor: "#EEF8F6",
      minHeight: "calc(100vh - 70px)",
      display: "flex",
      alignItems: "center",
      padding: "60px 28px",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Subtle background shape */}
      <div style={{
        position: "absolute",
        top: -80,
        right: -80,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(88,196,182,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1.05fr 0.95fr",
        gap: "3rem",
        alignItems: "center",
      }} className="hero-grid">

        {/* Illustration */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateX(0)" : "translateX(-48px)",
          transition: "opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <HeroIllustration />
        </div>

        {/* Text content */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateX(0)" : "translateX(48px)",
          transition: "opacity 0.85s ease 0.18s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.18s",
        }}>
          

          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 3.8vw, 3rem)",
            color: "#6b7280",
            lineHeight: 1.2,
            marginBottom: 8,
          }}>
            MetaBox is your
          </h1>

          <TypeWriter />

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 1.4vw, 1.08rem)",
            color: "#6b7280",
            lineHeight: 1.8,
            marginBottom: 40,
            maxWidth: 460,
          }}>
            We build <strong style={{ fontWeight: 700, color: "#374151" }}>bespoke web platforms</strong>,
            {" "}develop <strong style={{ fontWeight: 700, color: "#374151" }}>intuitive mobile apps</strong>,
            {" "}and <strong style={{ fontWeight: 700, color: "#374151" }}>implement solutions</strong>
            {" "}to streamline your business operations.
          </p>

          <div style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.7s ease 0.9s",
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
          }}>
            <a
              href="#contact"
              style={{
                display: "inline-block",
                padding: "14px 34px",
                backgroundColor: "#58C4B6",
                color: "#fff",
                borderRadius: 0,
                fontFamily: "'Nunito Sans', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 1.1,
                textDecoration: "none",
                transition: "background 0.2s, transform 0.18s, box-shadow 0.2s",
                boxShadow: "0 4px 22px rgba(88,196,182,0.38)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "#45b0a3";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 28px rgba(88,196,182,0.45)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "#58C4B6";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 22px rgba(88,196,182,0.38)";
              }}
            >
              LET'S TALK
            </a>

            
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-grid > div:first-child { order: 2; }
          .hero-grid > div:last-child { order: 1; text-align: center; }
          .hero-grid > div:last-child p { margin-left: auto; margin-right: auto; }
          .hero-grid > div:last-child > div:last-child { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
