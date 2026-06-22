import { useEffect, useRef, useState } from "react";

const NAVY = "#334D85";
const MINT  = "#58C4B6";

/* Project data from screenshots */
const PROJECTS = [
  {
    id: 1,
    category: "Mobile App Development",
    name: "Personal Transnational Mobility Assistant – PTMA",
    bg: "#1a1a2e",
    accent: "#FF8C00",
    abbr: "PTMA",
    labelColor: "#fff",
  },
  {
    id: 2,
    category: "Enterprise System",
    name: "Teck D'Or",
    bg: "#2a2a2a",
    accent: "#FFD700",
    abbr: "Teck d'Or",
    labelColor: "#FFD700",
  },
  {
    id: 3,
    category: "Web Development",
    name: "Arcus – Best Archery Supplies",
    bg: "#0d1117",
    accent: "#58C4B6",
    abbr: "ARCUS",
    labelColor: "#fff",
  },
  {
    id: 4,
    category: "Web Development",
    name: "Sweets O'Clock",
    bg: "#f5f0eb",
    accent: "#334D85",
    abbr: "S",
    labelColor: "#334D85",
  },
  {
    id: 5,
    category: "Hair Color Expert",
    name: "Hadya Phair Beauty",
    bg: "#1c1c1c",
    accent: "#C9A96E",
    abbr: "HFB",
    labelColor: "#C9A96E",
  },
  {
    id: 6,
    category: "Web Development",
    name: "MetaBox Portfolio",
    bg: "#334D85",
    accent: "#58C4B6",
    abbr: "MB",
    labelColor: "#58C4B6",
  },
];

function ProjectCard({ project, active }: { project: typeof PROJECTS[0]; active: boolean }) {
  return (
    <div style={{
      flexShrink: 0,
      width: 200,
      borderRadius: 16,
      overflow: "hidden",
      background: project.bg,
      boxShadow: active
        ? "0 10px 40px rgba(51,77,133,.22)"
        : "0 4px 16px rgba(0,0,0,.12)",
      transform: active ? "scale(1.04)" : "scale(1)",
      transition: "transform .3s, box-shadow .3s",
      cursor: "pointer",
    }}>
      {/* Card visual */}
      <div style={{
        height: 180, display: "flex", alignItems: "center",
        justifyContent: "center", padding: 20, position: "relative",
      }}>
        {/* Project mock visual */}
        <div style={{
          width: 110, height: 110, borderRadius: 12,
          background: `${project.accent}22`,
          border: `2px solid ${project.accent}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "'Nunito Sans', sans-serif", fontWeight: 900,
            fontSize: project.abbr.length > 4 ? 11 : project.abbr.length > 3 ? 14 : 22,
            color: project.accent, textAlign: "center" as const, padding: 4,
          }}>{project.abbr}</span>
        </div>
        {/* Category badge */}
        <div style={{
          position: "absolute", bottom: 10, left: 10, right: 10,
          background: "rgba(0,0,0,.55)", borderRadius: 6,
          padding: "5px 8px", textAlign: "center" as const,
        }}>
          <span style={{
            fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700,
            fontSize: 9.5, color: "#fff", letterSpacing: .3,
          }}>{project.category}</span>
        </div>
      </div>
      {/* Name strip */}
      <div style={{ padding: "14px 16px", background: "rgba(255,255,255,.04)" }}>
        <p style={{
          fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700,
          fontSize: 12, color: "#fff", margin: 0, lineHeight: 1.4,
          textAlign: "center" as const,
          opacity: project.bg === "#f5f0eb" ? 0 : 1,
        }}>{project.name}</p>
      </div>
    </div>
  );
}

export function WeDidSection() {
  const [slide, setSlide] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const maxSlide = PROJECTS.length - 2;

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const prev = () => setSlide(s => Math.max(0, s - 1));
  const next = () => setSlide(s => Math.min(maxSlide, s + 1));

  return (
    <section
      id="we-did"
      ref={ref}
      style={{
        background: "#EEF8F6", padding: "96px 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity .75s ease, transform .75s ease",
      }}
    >
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        display: "grid", gridTemplateColumns: "420px 1fr",
        gap: "4rem", alignItems: "center",
      }} className="wedid-grid">

        {/* Left — text */}
        <div>
          <h2 style={{
            fontFamily: "'Nunito Sans', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.2rem, 3.5vw, 3rem)", lineHeight: 1.15,
            marginBottom: 28,
          }}>
            <span style={{ color: NAVY, fontWeight: 900 }}>We</span>
            <span style={{ color: MINT, fontWeight: 900 }}>Did</span>
          </h2>

          {[
            <>MetaBox has helped clients <strong style={{ fontWeight:700, color:"#374151" }}>overcome complex challenges</strong> with practical, effective <strong style={{ fontWeight:700, color:"#374151" }}>digital solutions.</strong></>,
            <>Our experience spans <strong style={{ fontWeight:700, color:"#374151" }}>custom web platforms</strong>, mobile applications, <strong style={{ fontWeight:700, color:"#374151" }}>ERP implementations</strong>, and <strong style={{ fontWeight:700, color:"#374151" }}>business process automation</strong>.</>,
            <><strong style={{ fontWeight:700, color:"#374151" }}>Explore our portfolio</strong> to see how we've delivered results for <strong style={{ fontWeight:700, color:"#374151" }}>businesses in Mauritius and internationally.</strong></>,
          ].map((p, i) => (
            <p key={i} style={{
              fontFamily: "'Inter', sans-serif", fontSize: ".98rem",
              color: "#6b7280", lineHeight: 1.82,
              marginBottom: i < 2 ? 18 : 40,
            }}>{p}</p>
          ))}

          <a
            href="#projects"
            className="wedid-btn"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              border: `2px solid ${NAVY}`, color: NAVY, borderRadius: 0,
              fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800,
              fontSize: 13, letterSpacing: .8, textDecoration: "none",
              transition: "all .2s",
            }}
          >
            VIEW ALL PROJECTS
          </a>
        </div>

        {/* Right — carousel */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Arrow prev */}
          <button
            onClick={prev}
            disabled={slide === 0}
            style={{
              position: "absolute", left: -20, top: "50%", transform: "translateY(-60%)",
              zIndex: 10, width: 40, height: 40, borderRadius: "50%",
              background: slide === 0 ? "rgba(255,255,255,.5)" : "#fff",
              border: "none", cursor: slide === 0 ? "default" : "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: NAVY, transition: "all .2s",
              opacity: slide === 0 ? .4 : 1,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Cards row */}
          <div style={{
            display: "flex",
            gap: 24,
            transform: `translateX(${-slide * 324}px)`,
            transition: "transform .42s cubic-bezier(.25,.8,.25,1)",
          }}>
            {PROJECTS.map((p) => (
              <div key={p.id} style={{ flexShrink: 0, width: 300 }}>

                {/* ── Card ── */}
                <div style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  height: 340,
                  position: "relative",
                  boxShadow: "0 14px 44px rgba(0,0,0,.16)",
                  cursor: "pointer",
                }}>
                  {/* Full-bleed thumbnail fill */}
                  <div style={{
                    width: "100%", height: "100%",
                    background: p.bg,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: 14,
                  }}>
                    {/* Project mark */}
                    <div style={{
                      width: 150, height: 110, borderRadius: 12,
                      background: `${p.accent}1A`,
                      border: `2px solid ${p.accent}55`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        fontWeight: 900,
                        fontSize: p.abbr.length > 4 ? 12 : p.abbr.length > 3 ? 16 : 28,
                        color: p.accent,
                        textAlign: "center" as const,
                        padding: 4,
                      }}>{p.abbr}</span>
                    </div>
                    {/* Decorative rule lines */}
                    <div style={{ width: 110, height: 3, borderRadius: 2, background: `${p.accent}44` }}/>
                    <div style={{ width: 76,  height: 3, borderRadius: 2, background: `${p.accent}2A` }}/>
                  </div>

                  {/* Teal-to-transparent gradient overlay — bottom third */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, #3DBFA0EE 0%, #3DBFA055 38%, transparent 68%)",
                    pointerEvents: "none",
                  }}/>

                  {/* Category label */}
                  <div style={{
                    position: "absolute", bottom: 24,
                    left: 0, right: 0,
                    display: "flex", justifyContent: "center",
                    paddingInline: 20,
                  }}>
                    <span style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "white",
                      letterSpacing: 0.4,
                      textShadow: "0 1px 4px rgba(0,0,0,.25)",
                    }}>{p.category}</span>
                  </div>
                </div>

                {/* Project title — below card, outside */}
                <p style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#2D3561",
                  textAlign: "center" as const,
                  lineHeight: 1.45,
                  margin: "18px 0 0",
                  padding: "0 6px",
                }}>{p.name}</p>

              </div>
            ))}
          </div>

          {/* Arrow next */}
          <button
            onClick={next}
            disabled={slide >= maxSlide}
            style={{
              position: "absolute", right: -20, top: "50%", transform: "translateY(-60%)",
              zIndex: 10, width: 40, height: 40, borderRadius: "50%",
              background: slide >= maxSlide ? "rgba(255,255,255,.5)" : "#fff",
              border: "none", cursor: slide >= maxSlide ? "default" : "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: NAVY, transition: "all .2s",
              opacity: slide >= maxSlide ? .4 : 1,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Pagination dots */}
          <div style={{
            display: "flex", justifyContent: "center",
            gap: 8, marginTop: 24,
          }}>
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(Math.min(i, maxSlide))}
                style={{
                  width: i === slide ? 22 : 8, height: 8, borderRadius: 4,
                  background: i === slide ? MINT : "rgba(51,77,133,.25)",
                  border: "none", cursor: "pointer",
                  transition: "all .3s", padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .wedid-btn:hover { background: ${NAVY} !important; color: #fff !important; transform: translateY(-1px); }
        @media (max-width: 860px) {
          .wedid-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
