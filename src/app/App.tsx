import "../styles/fonts.css";
import { Navbar }       from "./components/Navbar";
import { HeroSection }  from "./components/HeroSection";
import { WeAreSection } from "./components/WeAreSection";
import { WeDoSection }  from "./components/WeDoSection";
import { ZohoSection }  from "./components/ZohoSection";
import { WeDidSection } from "./components/WeDidSection";

const NAVY = "#334D85";
const MINT = "#58C4B6";

/* MetaBox icon mark – reused in footer */
function FooterIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
      <path d="M4 20 L14 8 L18 12 L10 20 L18 28 L14 32 Z" fill="white"/>
      <path d="M36 20 L26 8 L22 12 L30 20 L22 28 L26 32 Z" fill={MINT}/>
      <path d="M18 12 L22 12 L30 20 L22 28 L18 28 L26 20 Z" fill={MINT} opacity="0.6"/>
    </svg>
  );
}

function SocialBtn({ icon }: { icon: "fb" | "li" | "yt" }) {
  const paths: Record<string, string> = {
    fb: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    li: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    yt: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02l5.75-3.02-5.75-3.02v6.04z",
  };
  return (
    <a href="#" style={{
      width: 44, height: 44, borderRadius: "50%",
      background: MINT, display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background .2s, transform .18s",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#3aa99d"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = MINT; (e.currentTarget as HTMLElement).style.transform = "none"; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[icon]}/>
      </svg>
    </a>
  );
}

function Footer() {
  const footerLinks = ["We Are", "Terms of Service", "Privacy Policy", "Join Us", "Kickstart Your Next Project"];

  return (
    <footer id="contact">
      {/* Big CTA text straddling white → navy transition */}
      <div style={{
        background: "linear-gradient(to bottom, #fff 50%, #2a3d6e 50%)",
        textAlign: "center", padding: "0 24px",
      }}>
        <h2 style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(2rem, 5.5vw, 4.2rem)",
          color: NAVY,
          letterSpacing: -1,
          lineHeight: 1.05,
          margin: 0,
          paddingTop: 48,
          paddingBottom: 48,
        }}>
          LET US HANDLE YOUR BUSINESS
        </h2>
      </div>

      {/* Dark navy footer body */}
      <div style={{
        background: "#2a3d6e",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle diamond pattern */}
{/* plain navy background — no pattern */}

        <div style={{
          maxWidth: 900, margin: "0 auto", padding: "60px 24px 40px",
          textAlign: "center", position: "relative", zIndex: 1,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 36 }}>
            <FooterIcon />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{
                fontFamily: "'Nunito Sans', sans-serif", fontWeight: 900,
                fontSize: 24, color: "#fff", letterSpacing: -0.3,
              }}>Meta<span style={{ color: MINT }}>Box</span></span>
              <span style={{
                fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600,
                fontSize: 9, color: "rgba(255,255,255,.5)", letterSpacing: 2.5, marginTop: 2,
              }}>TECHNOLOGY</span>
            </div>
          </div>

          {/* Nav links */}
          <nav style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: "0 0", marginBottom: 30,
          }}>
            {footerLinks.map((link, i) => (
              <span key={link} style={{ display: "flex", alignItems: "center" }}>
                <a href="#" style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 400,
                  fontSize: 14, color: "rgba(255,255,255,.7)",
                  textDecoration: "none", transition: "color .18s",
                  padding: "0 12px",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = MINT}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.7)"}
                >{link}</a>
                {i < footerLinks.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,.25)", fontSize: 14 }}>|</span>
                )}
              </span>
            ))}
          </nav>

          {/* Contact line */}
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 14,
            color: "rgba(255,255,255,.65)", marginBottom: 32,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
            flexWrap: "wrap",
          }}>
            <span>5701 9002</span>
            <span style={{ color: "rgba(255,255,255,.25)" }}>|</span>
            <span>contact@metabox.mu</span>
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 40 }}>
            <SocialBtn icon="fb" />
            <SocialBtn icon="li" />
            <SocialBtn icon="yt" />
          </div>

          {/* Copyright */}
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 13,
            color: "rgba(255,255,255,.38)", margin: 0,
          }}>
            © MetaBox Technology – 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Floating chat widget */
function ChatWidget() {
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <div style={{
        background: "#fff", borderRadius: 24, padding: "10px 18px",
        boxShadow: "0 4px 20px rgba(0,0,0,.12)",
        fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700,
        fontSize: 14, color: "#4a4a6a",
      }}>
        Let's Talk
      </div>
      <a href="#contact" style={{
        width: 48, height: 48, borderRadius: "50%",
        background: MINT,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(88,196,182,.4)",
        textDecoration: "none",
        transition: "transform .2s",
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <WeAreSection />
      <WeDoSection />
      <ZohoSection />
      <WeDidSection />
      <Footer />
      <ChatWidget />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #EEF8F6; }
        ::-webkit-scrollbar-thumb { background: #58C4B6; border-radius: 3px; }
      `}</style>
    </div>
  );
}
