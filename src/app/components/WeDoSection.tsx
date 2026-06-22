import { useEffect, useRef, useState } from "react";
import WebDev from "@/imports/WebDev1-1/index";
import "@/imports/WebDev1-1/styles.css";

const NAVY = "#334D85";
const MINT = "#58C4B6";

const SERVICES = [
  {
    id: "web", label: "WEB DEVELOPMENT",
    heading: "Web Development",
    body: "We offer custom **Web development** in Mauritius, building fast, secure, and scalable websites **tailored to your business needs**.\n\nUsing modern frameworks like React and Next.js, we deliver **e-commerce** solutions, **business portals**, and unique **Web Apps**.",
  },
  {
    id: "mobile", label: "MOBILE APP DEVELOPMENT",
    heading: "Mobile App Development",
    body: "We develop **cross-platform iOS & Android apps** using React Native and Flutter. From concept to App Store, we deliver **smooth, intuitive mobile experiences** your users will love.\n\nOur **mobile-first approach** ensures your app performs flawlessly across all devices and screen sizes.",
  },
  {
    id: "enterprise", label: "ENTERPRISE SYSTEM",
    heading: "Enterprise System",
    body: "We integrate and automate your business processes with **powerful enterprise solutions**. As a certified Zoho Partner, we deploy **CRM, ERP, HR** and automation systems **tailored to your workflows**.\n\nOur team handles the full implementation lifecycle — from **requirements gathering** to **deployment and training**.",
  },
  {
    id: "mra", label: "MRA E-INVOICING",
    heading: "MRA E-Invoicing",
    body: "Stay compliant with **Mauritius Revenue Authority's e-Invoicing mandate**. Our certified solution handles **end-to-end digital invoice generation**, submission and archival.\n\nFully **automated and audit-ready** — so your team can focus on the business, not the paperwork.",
  },
];

function DevIllustration({ t }: { t: number }) {
  const cssX  = Math.sin(t * 0.65) * 20;
  const htmlX = Math.sin(t * 0.65 + Math.PI) * 18;
  const jsY   = Math.sin(t * 1.0) * 12;

  return (
    <svg viewBox="0 0 420 400" fill="none" style={{ width:"100%", maxWidth:440, height:"auto" }}>
      <defs>
        <filter id="tag-sh"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity=".10"/></filter>
      </defs>

      {/* Background grid lines */}
      {[60,120,180,240,300,360].map(y => (
        <line key={y} x1="0" y1={y+Math.sin(t*.28+y*.01)*4}
          x2="420" y2={y+Math.sin(t*.28+y*.01+1)*4}
          stroke="rgba(51,77,133,.04)" strokeWidth="1"/>
      ))}
      {[50,110,170,230,290,350,410].map(x => (
        <line key={x} x1={x+Math.sin(t*.22+x*.01)*3} y1="0"
          x2={x+Math.sin(t*.22+x*.01+1)*3} y2="400"
          stroke="rgba(88,196,182,.035)" strokeWidth="1"/>
      ))}

      {/* Chair */}
      <rect x="148" y="310" width="124" height="8" rx="4" fill="#3a9e93"/>
      <rect x="160" y="318" width="8" height="50" rx="4" fill="#334D85"/>
      <rect x="252" y="318" width="8" height="50" rx="4" fill="#334D85"/>
      <rect x="150" y="356" width="120" height="8" rx="4" fill="#334D85"/>

      {/* Desk */}
      <rect x="90" y="300" width="240" height="12" rx="6" fill="#58C4B6"/>
      <rect x="100" y="312" width="10" height="60" rx="4" fill="#3a9e93"/>
      <rect x="310" y="312" width="10" height="60" rx="4" fill="#3a9e93"/>

      {/* Laptop screen */}
      <rect x="120" y="200" width="180" height="108" rx="8" fill="#334D85"/>
      <rect x="124" y="204" width="172" height="98" rx="6" fill="#1B2848"/>
      {/* Code lines on screen */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x="132" y={215+i*16} rx="3"
          width={60+Math.sin(t*0.9+i*0.7)*30}
          height={8}
          fill={i%2===0 ? "rgba(88,196,182,.65)" : "rgba(255,255,255,.2)"}/>
      ))}
      {/* Cursor */}
      <rect x="132" y={215+5*16} width="6" height="10" rx="2" fill="#58C4B6"
        style={{ animation:"weDoBlink .75s step-end infinite" }}/>
      {/* Laptop base */}
      <rect x="108" y="308" width="204" height="10" rx="5" fill="#334D85"/>

      {/* Developer character */}
      {/* head */}
      <circle cx="210" cy="170" r="32" fill="#FDDBB4"/>
      <path d="M180 158 Q180 128 210 126 Q240 128 240 158 Q238 136 210 136 Q182 136 180 158Z" fill="#4A2C17"/>
      {/* glasses */}
      <rect x="193" y="167" width="12" height="8" rx="3.5" fill="none" stroke="#334D85" strokeWidth="1.8"/>
      <rect x="211" y="167" width="12" height="8" rx="3.5" fill="none" stroke="#334D85" strokeWidth="1.8"/>
      <line x1="205" y1="171" x2="211" y2="171" stroke="#334D85" strokeWidth="1.5"/>
      <line x1="193" y1="171" x2="190" y2="169" stroke="#334D85" strokeWidth="1.5"/>
      <line x1="223" y1="171" x2="226" y2="169" stroke="#334D85" strokeWidth="1.5"/>
      <path d="M200 182 Q210 188 220 182" stroke="#334D85" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* body */}
      <rect x="183" y="200" width="54" height="64" rx="14" fill="#58C4B6"/>
      {/* arms */}
      <line x1="185" y1="225" x2="150" y2="260" stroke="#FDDBB4" strokeWidth="14" strokeLinecap="round"/>
      <line x1="235" y1="225" x2="270" y2="260" stroke="#FDDBB4" strokeWidth="14" strokeLinecap="round"/>

      {/* Floating CSS tag */}
      <g transform={`translate(${36+cssX}, 72)`} filter="url(#tag-sh)">
        <rect width="72" height="40" rx="9" fill="#264DE4"/>
        <text x="36" y="26" textAnchor="middle" fill="white"
          fontSize="16" fontFamily="'Nunito Sans',sans-serif" fontWeight="800">CSS</text>
      </g>

      {/* Floating HTML tag */}
      <g transform={`translate(${306+htmlX}, 54)`} filter="url(#tag-sh)">
        <rect width="80" height="40" rx="9" fill="#E34F26"/>
        <text x="40" y="26" textAnchor="middle" fill="white"
          fontSize="16" fontFamily="'Nunito Sans',sans-serif" fontWeight="800">HTML</text>
      </g>

      {/* Floating JS tag */}
      <g transform={`translate(316, ${210+jsY})`} filter="url(#tag-sh)">
        <rect width="66" height="40" rx="9" fill="#F7DF1E"/>
        <text x="33" y="26" textAnchor="middle" fill="#333"
          fontSize="16" fontFamily="'Nunito Sans',sans-serif" fontWeight="800">JS</text>
      </g>

      {/* Floating React tag */}
      <g transform={`translate(${24+cssX*.4}, 250)`} filter="url(#tag-sh)">
        <rect width="74" height="36" rx="9" fill="#282C34"/>
        <text x="37" y="23" textAnchor="middle" fill="#61DAFB"
          fontSize="13" fontFamily="'Nunito Sans',sans-serif" fontWeight="800">React</text>
      </g>

      {/* decorative dots */}
      <circle cx="356" cy="330" r="14" fill="rgba(88,196,182,.1)"/>
      <circle cx="50" cy="360" r="10" fill="rgba(51,77,133,.07)"/>
      <circle cx="380" cy="150" r="8" fill="rgba(88,196,182,.13)"/>

      <style>{`@keyframes weDoBlink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </svg>
  );
}

export function WeDoSection() {
  const [active, setActive] = useState("web");
  const [visible, setVisible] = useState(false);
  const [t, setT] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let prev = performance.now(), acc = 0;
    const tick = (now: number) => {
      acc += (now - prev)/1000; prev = now;
      setT(acc); rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const svc = SERVICES.find(s => s.id === active)!;

  return (
    <section
      id="we-do"
      ref={sectionRef}
      style={{
        backgroundColor: "#EEF8F6",
        padding: "90px 24px 0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity .75s ease, transform .75s ease",
      }}
    >
      <div style={{
        maxWidth: 1180, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "4rem", alignItems: "center",
      }} className="wedo-grid">

        {/* Left */}
        <div>
          <h2 style={{
            fontFamily: "'Nunito Sans', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.2rem, 3.8vw, 3rem)", lineHeight: 1.15,
            margin: 0, marginBottom: 18,
          }}>
            <span style={{ color: NAVY }}>We</span>
            <span style={{ color: MINT }}>Do</span>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1rem",
            color: "#6b7280", lineHeight: 1.78, marginBottom: 32,
          }}>
            Catch a glimpse of our <strong style={{ fontWeight:700, color:"#374151" }}>core services</strong>, designed to{" "}
            <strong style={{ fontWeight:700, color:"#374151" }}>equip your business</strong> with the{" "}
            <strong style={{ fontWeight:700, color:"#374151" }}>digital tools</strong> and{" "}
            <strong style={{ fontWeight:700, color:"#374151" }}>operational efficiencies</strong> it needs.
          </p>

          {/* 2×2 button grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 12, marginBottom: 0,
          }}>
            {SERVICES.map(s => {
              const on = s.id === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 0,
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontWeight: 700, fontSize: 12.5, letterSpacing: .6,
                    cursor: "pointer", textAlign: "center" as const,
                    transition: "all .22s ease",
                    /* WEB: active=mint bg, inactive=navy border
                       Others: active=navy bg, inactive=mint border */
                    border: s.id === "web"
                      ? (on ? `2px solid ${MINT}` : `2px solid ${NAVY}`)
                      : (on ? `2px solid ${NAVY}` : `2px solid ${MINT}`),
                    backgroundColor: s.id === "web"
                      ? (on ? MINT : "#fff")
                      : (on ? NAVY : "#fff"),
                    color: on ? "#fff" : NAVY,
                    boxShadow: on
                      ? (s.id === "web"
                          ? "0 4px 16px rgba(88,196,182,.28)"
                          : "0 4px 16px rgba(51,77,133,.25)")
                      : "none",
                  }}
                  onMouseEnter={e => {
                    if (!on) {
                      const el = e.currentTarget as HTMLElement;
                      if (s.id === "web") {
                        el.style.borderColor = MINT;
                        el.style.color = MINT;
                      } else {
                        el.style.backgroundColor = "rgba(88,196,182,.07)";
                      }
                    }
                  }}
                  onMouseLeave={e => {
                    if (!on) {
                      const el = e.currentTarget as HTMLElement;
                      if (s.id === "web") {
                        el.style.borderColor = NAVY;
                        el.style.color = NAVY;
                      } else {
                        el.style.backgroundColor = "#fff";
                      }
                    }
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: developer illustration */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* WebDev1-1 Figma import replaces hand-drawn SVG */}
        <div style={{ width: 514, height: 500, maxWidth: "100%", position: "relative", overflow: "visible" }}>
          <WebDev />
        </div>
        </div>
      </div>

      {/* Service detail strip below */}
      <div style={{
        maxWidth: 1180, margin: "60px auto 0",
        paddingBottom: 90,
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "4rem", alignItems: "flex-start",
      }} className="wedo-detail-grid">
        <div>
          <h3 style={{
            fontFamily: "'Nunito Sans', sans-serif", fontWeight: 900,
            fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
            lineHeight: 1.2, marginBottom: 20,
            letterSpacing: -0.5,
          }}>
            <span style={{ color: NAVY }}>{svc.heading.split(" ")[0]}</span>
            <span style={{ color: MINT }}>{svc.heading.split(" ").slice(1).join("")}</span>
          </h3>
          {svc.body.split("\n\n").map((para, i) => (
            <p key={i} style={{
              fontFamily: "'Inter', sans-serif", fontSize: ".98rem",
              color: "#6b7280", lineHeight: 1.82, marginBottom: 16,
            }}>
              {para.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                j % 2 === 1
                  ? <strong key={j} style={{ fontWeight: 700, color: "#374151" }}>{part}</strong>
                  : part
              )}
            </p>
          ))}
          <a
            href="#contact"
            style={{
              display: "inline-block", marginTop: 12,
              padding: "12px 26px",
              border: `2px solid ${NAVY}`, color: NAVY, borderRadius: 0,
              fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800,
              fontSize: 13, letterSpacing: .8, textDecoration: "none",
              transition: "all .2s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = NAVY; el.style.color = "#fff"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = NAVY; }}
          >
            OUR SERVICES
          </a>
        </div>
        <div/>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .wedo-grid, .wedo-detail-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .wedo-grid > div:last-child { order: -1; }
        }
      `}</style>
    </section>
  );
}
