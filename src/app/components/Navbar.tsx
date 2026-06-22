import { useState, useEffect, useRef } from "react";

const NAVY = "#334D85";
const MINT = "#58C4B6";

/* Exact MetaBox logo mark — two overlapping chevron/arrow shapes */
function MetaBoxIcon({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* Left navy chevron arrow */}
      <path d="M4 20 L14 8 L18 12 L10 20 L18 28 L14 32 Z" fill={NAVY} />
      {/* Right teal chevron arrow */}
      <path d="M36 20 L26 8 L22 12 L30 20 L22 28 L26 32 Z" fill={MINT} />
      {/* Center overlap teal */}
      <path d="M18 12 L22 12 L30 20 L22 28 L18 28 L26 20 Z" fill={MINT} opacity="0.7" />
      {/* Center overlap navy */}
      <path d="M22 12 L18 12 L10 20 L18 28 L22 28 L14 20 Z" fill={NAVY} opacity="0.6" />
    </svg>
  );
}

function Logo() {
  return (
    <a href="#home" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          {/* Layer 1 — navy X, full size: provides navy on the left edges */}
          <path fill="#334D85"
            d="M8 2 L20 14 L32 2 L38 8 L26 20 L38 32 L32 38 L20 26 L8 38 L2 32 L14 20 L2 8Z"/>
          {/* Layer 2 — mint X, shifted 4 px right: reveals mint on the right edges */}
          <path fill="#58C4B6"
            d="M12 2 L24 14 L36 2 L42 8 L30 20 L42 32 L36 38 L24 26 L12 38 L6 32 L18 20 L6 8Z"/>
          {/* Layer 3 — white X, inset 3 px: the actual white body of the X */}
          <path fill="white"
            d="M11 5 L20 14 L29 5 L35 11 L27 20 L35 29 L29 35 L20 26 L11 35 L5 29 L13 20 L5 11Z"/>
        </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontWeight: 900,
          fontSize: 20,
          color: NAVY,
          letterSpacing: -0.3,
        }}>
          Meta<span style={{ color: MINT }}>Box</span>
        </span>
        <span style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontWeight: 600,
          fontSize: 8.5,
          color: "#9aafbd",
          letterSpacing: 2,
          marginTop: 1,
        }}>TECHNOLOGY</span>
      </div>
    </a>
  );
}

const WEDO_ITEMS = ["Web Development", "Mobile App Development", "Enterprise System", "MRA E-Invoicing"];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [ddOpen, setDdOpen]       = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const navLink = (label: string, href: string) => (
    <a key={label} href={href} className="nav-link" style={{
      fontFamily: "'Nunito Sans', sans-serif",
      fontWeight: 700,
      fontSize: 15,
      color: "#6b7280",
      textDecoration: "none",
      padding: "6px 12px",
      borderRadius: 6,
      transition: "color .18s",
      whiteSpace: "nowrap",
    }}>{label}</a>
  );

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 999,
        background: "#fff",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.08)" : "0 1px 0 rgba(0,0,0,.06)",
        transition: "box-shadow .3s",
      }}>
        <div style={{
          maxWidth: 1180, margin: "0 auto", padding: "0 24px",
          height: 64, display: "flex", alignItems: "center",
          justifyContent: "space-between", position: "relative",
        }}>
          <Logo />

          {/* Centered nav */}
          <nav className="desk-nav" style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            {navLink("Home", "#home")}
            {navLink("We Are", "#we-are")}

            {/* We Do dropdown */}
            <div ref={ddRef} style={{ position: "relative" }}>
              <button
                className="nav-link"
                onMouseEnter={() => setDdOpen(true)}
                onClick={() => setDdOpen(v => !v)}
                style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, fontSize: 15,
                  color: "#4a4a6a", background: "none", border: "none", cursor: "pointer",
                  padding: "6px 12px", borderRadius: 6, display: "flex", alignItems: "center",
                  gap: 4, transition: "color .18s", whiteSpace: "nowrap",
                }}
              >
                We Do
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                  style={{ transform: ddOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
                  <path d="M1.5 3.5l4 4 4-4" stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div onMouseLeave={() => setDdOpen(false)} style={{
                position: "absolute", top: "calc(100% + 6px)", left: "50%",
                transform: `translateX(-50%) translateY(${ddOpen ? 0 : -6}px)`,
                opacity: ddOpen ? 1 : 0, pointerEvents: ddOpen ? "auto" : "none",
                transition: "opacity .18s, transform .18s",
                background: "#fff", borderRadius: 12,
                boxShadow: "0 10px 36px rgba(0,0,0,.12)", border: "1px solid rgba(88,196,182,.18)",
                padding: "8px 0", minWidth: 230, zIndex: 200,
              }}>
                {WEDO_ITEMS.map(item => (
                  <a key={item} href="#we-do" className="dd-link" style={{
                    display: "block", padding: "11px 20px",
                    fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600, fontSize: 14,
                    color: "#4a4a6a", textDecoration: "none", transition: "background .14s, color .14s",
                  }}>{item}</a>
                ))}
              </div>
            </div>

            {navLink("We Did", "#we-did")}
            {navLink("Join Us", "#join-us")}

            {/* LET'S TALK — sits in the nav, spaced from Join Us */}
            <a href="#contact" className="cta-pill desk-only" style={{
              marginLeft: 20,
              padding: "10px 22px", background: MINT, color: "#fff", borderRadius: 0,
              fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13.5,
              letterSpacing: 0.8, textDecoration: "none",
              transition: "background .2s, transform .18s, box-shadow .2s",
              boxShadow: "0 3px 12px rgba(88,196,182,.35)", whiteSpace: "nowrap",
            }}>LET'S TALK</a>
          </nav>

          {/* Right side — hamburger only */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <button className="hamburger" onClick={() => setMobileOpen(v => !v)} style={{
              display: "none", background: "none", border: "none",
              cursor: "pointer", padding: 6, color: NAVY,
            }}>
              {mobileOpen
                ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                : <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div style={{
          maxHeight: mobileOpen ? 400 : 0, overflow: "hidden",
          transition: "max-height .3s ease", background: "#fff",
          borderTop: mobileOpen ? "1px solid rgba(88,196,182,.15)" : "none",
        }}>
          <div style={{ padding: "12px 24px 20px" }}>
            {["Home","We Are","We Do","We Did","Join Us"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block", padding: "12px 0",
                  fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, fontSize: 16,
                  color: NAVY, textDecoration: "none",
                  borderBottom: "1px solid rgba(51,77,133,.06)",
                }}>{l}</a>
            ))}
            <a href="#contact" onClick={() => setMobileOpen(false)} style={{
              display: "inline-block", marginTop: 16, padding: "12px 26px",
              background: MINT, color: "#fff", borderRadius: 7,
              fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 13.5,
              letterSpacing: 0.8, textDecoration: "none",
            }}>LET'S TALK</a>
          </div>
        </div>
      </header>

      <style>{`
        .nav-link:hover { color: ${MINT} !important; }
        .dd-link:hover { background: rgba(88,196,182,.08) !important; color: ${MINT} !important; }
        .cta-pill:hover { background: #45b0a4 !important; transform: translateY(-1px) !important; }
        @media (max-width: 860px) {
          .desk-nav { display: none !important; }
          .desk-only { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
