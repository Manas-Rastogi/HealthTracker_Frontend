// src/pages/WelcomeSVG.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 *
 * SVG-only animated Welcome page.
 *
 * No external Lottie files required.
 */

export default function WelcomeSVG() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);

  // Animation variant for cards
  const cardEnter = (i = 0) => ({
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.12 * i, type: "spring", stiffness: 120, damping: 16 } },
  });

  // Animation variant for new info sections
  const sectionEnter = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  // Floating animations
  const floatSlow = { y: [0, -12, 0] };
  const floatMed = { y: [0, -8, 0] };
  const floatFast = { y: [0, -6, 0] };
  const floatPulse = { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }; // Added pulse for heart/blood

  return (
    <div className={`wa-page ${dark ? "theme-dark" : "theme-light"}`} role="main">
      <div className="top-controls">
        <div className="brand-wrap">
          <div className="wa-logo" aria-hidden>
            <svg viewBox="0 0 64 64" width="40" height="40">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#ff7a7a" />
                  <stop offset="100%" stopColor="#ffb86b" />
                </linearGradient>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feFlood floodColor="#ff7a7a" floodOpacity="0.8" result="color" />
                  <feComposite in="color" in2="blur" operator="in" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#neon-glow)">
                {/* Logo with added glow filter */}
                <path d="M32 52s-20-12-20-28a12 12 0 0 1 24-6 12 12 0 0 1 24 6c0 16-20 28-20 28z" fill="url(#g1)" opacity="0.98" />
                <rect x="28" y="20" width="8" height="18" rx="2" fill="#fff" transform="rotate(45 32 29)" opacity="0.9" />
              </g>
            </svg>
          </div>
          <div>
            <h1 className="wa-title">HealthTracker</h1>
            <p className="wa-tag">Patient • Communicate • Your City NGO & Hospital</p>
          </div>
        </div>
        <div className="controls">
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-pressed={dark}>
            {dark ? "Dark" : "Light"}
          </button>
        </div>
      </div>
      <div className="wa-bg" aria-hidden>
        <div className="wa-bg-blob blob-1" />
        <div className="wa-bg-blob blob-2" />
        <div className="wa-bg-blob blob-3" />
        <div className="wa-bg-blob blob-4" />
      </div>
      <header className="wa-header" role="navigation">
        <nav className="wa-nav">
          <motion.button onClick={() => navigate("/user/login")} whileTap={{ scale: 0.96 }} className="wa-nav-btn">
            User Login
          </motion.button>
          <motion.button onClick={() => navigate("/ngo/login")} whileTap={{ scale: 0.96 }} className="wa-nav-btn wa-muted">
            NGO Login
          </motion.button>
          <motion.button onClick={() => navigate("/hospital/login")} whileTap={{ scale: 0.96 }} className="wa-nav-cta">
            Hospital Login
          </motion.button>
        </nav>
      </header>
      <main className="wa-main">
        <section className="wa-hero">
          <div className="wa-hero-left">
            {/* NEW INTRO TEXT ADDED HERE */}
            <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} className="wa-hero-title wa-new-title">
              🌟 Hemophilia Care Connect Platform
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }} className="wa-hero-sub">
              Connecting Patients, NGOs & Hospitals — Faster. Smarter. Together.
            </motion.p>
            {/* END NEW INTRO TEXT */}

            <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.24 }} className="wa-hero-title wa-sub-heading">
              Patient • Communicate • Your City NGO & Hospital
              <span className="wa-sub-highlight"> — neon animated</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="wa-hero-sub">
              Signup as User, NGO or Hospital. Animated visuals below show donation, vaccine and care flows.
            </motion.p>

            <div className="wa-hero-cta">
              <motion.button onClick={() => navigate("/user/signup")} className="wa-btn-primary" whileTap={{ scale: 0.98 }}>
                Get Started — Patient
              </motion.button>
              <motion.button onClick={() => navigate("/ngo/signup")} className="wa-btn-outline" whileTap={{ scale: 0.98 }}>
                NGO Signup
              </motion.button>
            </div>

            <div className="wa-quick-stats">
              <div>
                <strong>1.2k+</strong>
                <span>Lives helped</span>
              </div>
              <div>
                <strong>450+</strong>
                <span>Donations</span>
              </div>
              <div>
                <strong>120</strong>
                <span>Partner Hospitals</span>
              </div>
            </div>
          </div>

          <div className="wa-hero-right">
            <div className="scene" aria-hidden>
              {/* hospital SVG - Added extra rotation and depth effect */}
              <motion.div
                className="sc-hospital"
                animate={{ rotate: [0, -4, 0, 4, 0], scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 12 }}
              >
                <svg viewBox="0 0 120 120" width="260" height="260" aria-hidden>
                  {/* Added a subtle glow effect via style */}
                  <rect
                    x="8"
                    y="34"
                    width="104"
                    height="74"
                    rx="8"
                    fill="rgba(255,255,255,0.08)"
                    stroke="#93c5fd"
                    strokeWidth="2"
                    style={{ filter: "drop-shadow(0 0 4px #93c5fd)" }}
                  />
                  <text x="14" y="76" fill="#93c5fd" fontSize="6" fontWeight="bold">
                    City Hospital
                  </text>
                </svg>
              </motion.div>

              {/* child + syringe (SVG animation style) - Added more movement */}
              <motion.div className="sc-child" animate={{ ...floatMed, scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}>
                <svg viewBox="0 0 200 200" width="160" height="160" aria-hidden>
                  <circle cx="80" cy="78" r="28" fill="#fff7ed" stroke="#fb7185" />
                  <circle cx="80" cy="64" r="16" fill="#fde68a" />
                  <path d="M60 110 q20 18 40 0" stroke="#64748b" strokeWidth="3" fill="none" />
                  {/* Injection group - Added extra rotation */}
                  <motion.g
                    transform="translate(118,62)"
                    className="needle-g"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3.2 }}
                  >
                    <rect x="0" y="-6" width="46" height="12" rx="2" fill="#ecfeff" stroke="#94a3b8" />
                    <line x1="62" x2="92" y1="0" y2="0" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
                  </motion.g>
                </svg>
              </motion.div>

              {/* Blood Drop - Added pulsing and stronger color */}
              <motion.div
                className="sc-blood"
                animate={{ ...floatPulse, ...floatFast }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 40 40" width="48" height="48" aria-hidden>
                  <path d="M20 2 C14 12, 10 16, 10 22 A10 10 0 0 0 30 22 C30 16, 26 12, 20 2 Z" fill="url(#bggrad)" style={{ filter: "drop-shadow(0 0 4px #ff6b6b)" }} />
                  <defs>
                    <linearGradient id="bggrad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#ff6b6b" />
                      <stop offset="100%" stopColor="#b91c1c" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* NGO - Added subtle glow and vertical movement */}
              <motion.div
                className="sc-ngo"
                animate={{ x: [0, -8, 8, 0], y: [0, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4.5 }}
              >
                <svg viewBox="0 0 80 80" width="110" height="110" aria-hidden>
                  <circle cx="40" cy="20" r="10" fill="#fff7ed" />
                  <rect
                    x="28"
                    y="34"
                    width="24"
                    height="26"
                    rx="4"
                    fill="#bbf7d0"
                    style={{ filter: "drop-shadow(0 0 4px #bbf7d0)" }}
                  />
                </svg>
              </motion.div>

              {/* Tool (Medicine strip/file) - More pronounced horizontal movement */}
              <motion.div
                className="sc-tool"
                animate={{ x: [120, 24, -40, 60, 140], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 120 40" width="160" height="48" aria-hidden>
                  <rect x="4" y="10" width="96" height="8" rx="6" fill="#e6eef8" />
                  <circle cx="110" cy="18" r="6" fill="#fef08a" style={{ filter: "drop-shadow(0 0 4px #fef08a)" }} />
                </svg>
              </motion.div>

              {/* Stethoscope - Added continuous rotation for more dynamic look */}
              <motion.div
                className="sc-stetho"
                animate={{ x: [-80, 0, 80, 0], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 80 60" width="120" height="80" aria-hidden>
                  <path d="M10 12 C18 2, 30 2, 38 12" stroke="#a78bfa" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <circle cx="56" cy="34" r="8" fill="#7c3aed" style={{ filter: "drop-shadow(0 0 4px #7c3aed)" }} />
                </svg>
              </motion.div>
            </div>

            <p className="scene-caption">Animated demo: vaccine · blood · hospital · NGO · instrument</p>
          </div>
        </section>
        
        {/* NEW SECTION: Hemophilia Care Connect Platform Details */}
        <section className="wa-features">
            <motion.div variants={sectionEnter} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                <h2 className="wa-section-title">Why This Platform Exists</h2>
                <p className="wa-info-text">
                    Finding the right support at the right time is one of the biggest challenges for Hemophilia patients.
                    Timely access to Factor therapy can save lives. But patients often face delays due to lack of information.
                </p>
                <motion.ul className="wa-problem-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, staggerChildren: 0.1 }}>
                    <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>❌ They don’t know which hospital has Factor VIII or IX</motion.li>
                    <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>❌ They don’t know which city has active NGOs</motion.li>
                    <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>❌ They cannot check if the required vials are available</motion.li>
                    <motion.li initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>❌ They feel alone during emergencies</motion.li>
                </motion.ul>
                <p className="wa-info-text wa-highlighted-p">
                    We are here to change that.
                    Introducing India’s first all-in-one Hemophilia Support Platform, designed to bring **Patients, NGOs, and Hospitals together** on one digital network.
                </p>
            </motion.div>
            
            <hr className="wa-divider"/>

            <motion.div variants={sectionEnter} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                <h2 className="wa-section-title">🔗 Key Features</h2>
                
                <div className="wa-feature-grid">
                    <div className="wa-feature-card">
                        <motion.h3 whileHover={{ x: 5 }} className="wa-feature-heading">🏥 Hospital Factor Availability</motion.h3>
                        <ul>
                            <li>Check real-time availability of Factor VIII, IX, DDAVP and more</li>
                            <li>View hospital stock instantly</li>
                            <li>Find hospitals by city or region</li>
                        </ul>
                    </div>
                    <div className="wa-feature-card">
                        <motion.h3 whileHover={{ x: 5 }} className="wa-feature-heading">🤝 Connect with NGOs</motion.h3>
                        <ul>
                            <li>Browse NGOs near your city</li>
                            <li>Send direct messages for help</li>
                            <li>Receive quick support from verified NGO volunteers</li>
                        </ul>
                    </div>
                    <div className="wa-feature-card wa-full-width">
                        <motion.h3 whileHover={{ x: 5 }} className="wa-feature-heading">🧮 Smart Factor Dose Calculator</motion.h3>
                        <div className="wa-dose-calc-info">
                            <div className="input-info">
                                <h4>Enter your details:</h4>
                                <ul>
                                    <li>✔ Weight</li>
                                    <li>✔ Hemophilia Type (A/B)</li>
                                    <li>✔ Factor Type (VIII/IX)</li>
                                    <li>✔ Bleeding Situation (Minor / Moderate / Major)</li>
                                </ul>
                            </div>
                            <div className="output-info">
                                <h4>The system instantly tells you:</h4>
                                <ul>
                                    <li>➡ Required IU dosage</li>
                                    <li>➡ Number of vials</li>
                                    <li>➡ Recommended vial sizes (250 / 500 / 1000 IU)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="wa-feature-card">
                        <motion.h3 whileHover={{ x: 5 }} className="wa-feature-heading">💬 Patient Assistance & Emergency Support</motion.h3>
                        <ul>
                            <li>Share your problem directly with hospitals and NGOs</li>
                            <li>Get guidance, availability info, and support in minutes</li>
                        </ul>
                    </div>
                    <div className="wa-feature-card">
                        <motion.h3 whileHover={{ x: 5 }} className="wa-feature-heading">📝 NGO Registration & Dashboard</motion.h3>
                        <ul>
                            <li>NGOs can register in one click</li>
                            <li>Manage city-wise coverage</li>
                            <li>Receive patient requests instantly</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
            
            <hr className="wa-divider"/>

            <motion.div variants={sectionEnter} initial="hidden" animate="visible" transition={{ delay: 0.8 }}>
                <h2 className="wa-section-title">🌍 Our Vision</h2>
                <p className="wa-vision-text">We dream of a future where:</p>
                <ul className="wa-vision-list">
                    <li>Every Hemophilia patient receives factor on time</li>
                    <li>No child or patient waits for treatment</li>
                    <li>Hospitals and NGOs work together through a connected digital ecosystem</li>
                </ul>
                <p className="wa-final-call">
                    This platform is more than a tool — **It is a lifeline, a community, a support system.**
                </p>
            </motion.div>
            
            <hr className="wa-divider"/>

            <motion.div className="wa-join-us" variants={sectionEnter} initial="hidden" animate="visible" transition={{ delay: 0.9 }}>
                <h2 className="wa-section-title">💙 Join Us. Save Lives. Make Hemophilia Care Accessible.</h2>
                <div className="wa-join-buttons">
                    <motion.button onClick={() => navigate("/user/signup")} className="wa-btn-primary wa-btn-large" whileTap={{ scale: 0.95 }}>
                        👉 Patients: Get instant help
                    </motion.button>
                    <motion.button onClick={() => navigate("/ngo/signup")} className="wa-btn-outline wa-btn-large" whileTap={{ scale: 0.95 }}>
                        NGOs & Hospitals: Join our mission
                    </motion.button>
                </div>
            </motion.div>


        </section>

        <section className="wa-cards">
          <motion.div className="wa-card patient" variants={cardEnter(0)} initial="hidden" animate="visible" whileHover={{ y: -6, scale: 1.02 }}>
            <div className="card-visual">
              <svg viewBox="0 0 48 48" width="72" height="72">
                <circle cx="24" cy="14" r="8" fill="#fde68a" />
              </svg>
            </div>
            <h3>Patient</h3>
            <p className="muted">Signup / Login to request help or donate blood</p>
            <div className="card-actions">
              <motion.button onClick={() => navigate("/user/login")} className="card-btn">
                Login
              </motion.button>
              <motion.button onClick={() => navigate("/user/signup")} className="card-btn outline">
                Signup
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="wa-card ngo" variants={cardEnter(1)} initial="hidden" animate="visible" whileHover={{ y: -6, scale: 1.02 }}>
            <div className="card-visual">
              <svg viewBox="0 0 48 48" width="72" height="72">
                <rect x="6" y="8" width="36" height="28" rx="6" fill="#bbf7d0" />
              </svg>
            </div>
            <h3>NGO</h3>
            <p className="muted">Register NGOs and manage volunteers</p>
            <div className="card-actions">
              <motion.button onClick={() => navigate("/ngo/login")} className="card-btn">
                Login
              </motion.button>
              <motion.button onClick={() => navigate("/ngo/signup")} className="card-btn outline">
                Signup
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="wa-card hospital" variants={cardEnter(2)} initial="hidden" animate="visible" whileHover={{ y: -6, scale: 1.02 }}>
            <div className="card-visual">
              <svg viewBox="0 0 48 48" width="72" height="72">
                <rect x="8" y="14" width="32" height="24" rx="4" fill="#93c5fd" />
              </svg>
            </div>
            <h3>Hospital</h3>
            <p className="muted">Hospital signup for triage, beds & vaccine tracking</p>
            <div className="card-actions">
              <motion.button onClick={() => navigate("/hospital/login")} className="card-btn">
                Login
              </motion.button>
              <motion.button onClick={() => navigate("/hospital/signup")} className="card-btn outline">
                Signup
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>
      <footer className="wa-footer">
        <small>
          © {new Date().getFullYear()} HealthTracker — Built with ❤️
        </small>
        <div className="wa-footer-links">
          <button className="linkish">Privacy</button>
          <button className="linkish">Terms</button>
        </div>
      </footer>
      <style>{`
        /* theme vars */
        :root{ --bg:#071026; --muted:#a8b9c9; --accent1:#ff6b6b; --accent2:#7c3aed; --accent3:#06b6d4;}
        .theme-light{ --bg:#f8fafc; --muted:#374151; --accent1:#ef4444; --accent2:#6366f1; --accent3:#0ea5e9; }

        html, body, #root {height:100%; width:100%; margin:0; padding:0}
        *{box-sizing:border-box}
        button{ cursor:pointer }

        .wa-page{ font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto; min-height:100vh; background:linear-gradient(180deg,#071021,#071a2f); color:var(--muted); display:flex; flex-direction:column; overflow-x:hidden; transition:background 0.3s ease; }
        .theme-light.wa-page{ background:linear-gradient(180deg,#f3f4f6,#fff); }
        .theme-light .wa-title{ color:#1f2937 }
        .theme-light .theme-toggle{ background:#e5e7eb; border-color:#d1d5db; color:var(--muted) }
        .theme-light .wa-nav-btn.wa-muted{ color:#6b7280; background:transparent; border:1px solid #e5e7eb }
        .theme-light .wa-btn-outline{ color:#4b5563; border-color:#d1d5db }
        .theme-light .wa-hero-title, .theme-light .wa-section-title, .theme-light .wa-feature-heading{ color:#1f2937 }
        .theme-light .wa-sub-highlight{ color:var(--accent1) }
        .theme-light .wa-card{ background:#fff; box-shadow:0 10px 40px rgba(0,0,0,0.1); border:1px solid #e5e7eb }
        .theme-light .card-btn.outline{ background:#f3f4f6; color:#4b5563; border:1px solid #d1d5db }
        .theme-light .wa-footer{ border-top-color:#e5e7eb; color:#6b7280 }
        .theme-light .wa-divider{ border-color:#e5e7eb }
        .theme-light .wa-problem-list li{ color:#ef4444 }


        .top-controls{ display:flex; justify-content:space-between; align-items:center; padding:18px 28px }
        .brand-wrap{ display:flex; gap:12px; align-items:center }
        .wa-title{ font-size:20px; margin:0; color: #fff; font-weight:700 }
        .wa-tag{ margin:0; color:var(--muted); font-size:12px }
        .theme-toggle{ background:transparent; border:1px solid rgba(255,255,255,0.06); color:var(--muted); padding:8px 12px; border-radius:999px; cursor:pointer; transition:all 0.3s ease }

        .wa-bg{ position:fixed; inset:0; z-index:-20; overflow:hidden }
        .wa-bg-blob{ position:absolute; filter:blur(64px); opacity:0.12; mix-blend-mode:screen; transition:all 0.8s ease }
        .blob-1{ width:760px; height:760px; left:-220px; top:-240px; background:linear-gradient(135deg,#ff9a9e,#fbc2eb); border-radius:42% }
        .blob-2{ width:520px; height:520px; right:-140px; top:-80px; background:linear-gradient(135deg,#93c5fd,#7dd3fc); border-radius:40% }
        .blob-3{ width:380px; height:380px; left:10%; bottom:-140px; background:linear-gradient(135deg,#bbf7d0,#86efac); border-radius:45% }
        .blob-4{ width:240px; height:240px; right:12%; bottom:40px; background:linear-gradient(135deg,#fef08a,#ffb86b); border-radius:50% }
        .theme-light .blob-1{ background:linear-gradient(135deg,#fecaca,#f9a8d4); opacity:0.2 }
        .theme-light .blob-2{ background:linear-gradient(135deg,#bfdbfe,#7dd3fc); opacity:0.2 }
        .theme-light .blob-3{ background:linear-gradient(135deg,#dcfce7,#a7f3d0); opacity:0.2 }
        .theme-light .blob-4{ background:linear-gradient(135deg,#fef08a,#fcd34d); opacity:0.2 }


        .wa-header{ display:flex; justify-content:flex-end; padding:6px 28px 0 }
        .wa-nav{ display:flex; gap:12px; align-items:center }
        .wa-nav-btn, .wa-nav-cta{ padding:8px 12px; border-radius:8px; border:0; font-size:14px; transition:all 0.2s }
        .wa-nav-btn{ background:transparent; color:var(--muted); border:1px solid rgba(255,255,255,0.06); }
        .wa-nav-cta{ background:linear-gradient(90deg,var(--accent1),#fb7185); color:white; font-weight:600; }
        .theme-light .wa-nav-btn{ background:transparent; border-color:#e5e7eb; color:#6b7280 }
        .theme-light .wa-nav-cta{ background:linear-gradient(90deg,var(--accent1),#f87171); }


        .wa-main{ padding:18px 42px 60px; display:flex; flex-direction:column; gap:28px; width:100% }
        .wa-hero{ display:flex; gap:28px; align-items:center; justify-content:space-between; width:100% }
        .wa-hero-left{ flex:1; max-width:720px }
        .wa-hero-right{ width:520px; display:flex; flex-direction:column; align-items:center }

        .wa-hero-title{ font-size:28px; margin:0 0 8px 0; color:#fff; line-height:1.05 }
        .wa-new-title{ font-size: 36px; margin-bottom: 4px; color: #fef08a; text-shadow: 0 0 10px #fef08a; }
        .wa-sub-highlight{ display:block; color:var(--accent1); font-weight:700; margin-top:8px }
        .wa-hero-sub{ color:var(--muted) }

        .wa-hero-cta{ display:flex; gap:12px; margin-top:12px }
        .wa-btn-primary{ background:linear-gradient(90deg,var(--accent1),#fb7185); color:white; padding:10px 16px; border-radius:10px; border:0; font-weight:600; transition:all 0.2s }
        .wa-btn-outline{ background:transparent; border:1px solid rgba(255,255,255,0.06); color:var(--muted); padding:10px 14px; border-radius:10px; transition:all 0.2s }
        .theme-light .wa-btn-primary{ background:linear-gradient(90deg,var(--accent1),#f87171); }

        .wa-quick-stats{ display:flex; gap:24px; margin-top:24px }
        .wa-quick-stats strong{ color:#fff; font-size:18px; display:block }
        .wa-quick-stats span{ font-size:12px; color:var(--muted) }
        .theme-light .wa-quick-stats strong{ color:#1f2937 }

        .scene{ position:relative; width:100%; display:flex; align-items:center; justify-content:center; min-height:320px }
        .sc-hospital{ position:absolute; left:0; top:8px; transform-style:preserve-3d }
        .sc-child{ position:absolute; right:8px; bottom:6px }
        .sc-blood{ position:absolute; left:44%; top:8px }
        .sc-ngo{ position:absolute; left:8px; bottom:12px }
        .sc-tool{ position:absolute; top:32px; left:-40px; }
        .sc-stetho{ position:absolute; top:8px; right:-40px; }

        .wa-cards{ display:flex; gap:18px; width:100%; }
        .wa-card{ background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); padding:18px; border-radius:14px; box-shadow:0 10px 40px rgba(2,6,23,0.45); flex:1; min-width:220px; transition:all 0.3s ease; border:1px solid transparent }
        .wa-card:hover{ border-color:rgba(255,255,255,0.1) }
        .card-actions{ display:flex; gap:8px; margin-top:12px }
        .wa-card h3{ margin-top:8px; color:#fff; font-size:20px; }
        .wa-card p{ font-size:14px; color:var(--muted) }
        .theme-light .wa-card h3{ color:#1f2937 }

        .card-btn{ background:linear-gradient(90deg,#60a5fa,#ff7a7a); color:white; padding:8px 12px; border-radius:8px; border:0; cursor:pointer; font-size:14px }
        .card-btn.outline{ background:transparent; border:1px solid rgba(255,255,255,0.04); color:var(--muted) }

        .wa-footer{ padding:18px 42px; border-top:1px solid rgba(255,255,255,0.03); display:flex; justify-content:space-between; align-items:center; font-size:12px }
        .wa-footer-links button{ background:transparent; border:0; color:var(--muted); font-size:12px; margin-left:12px; }

        .scene-caption{ color:var(--muted); font-size:12px; margin-top:12px }

        /* NEW FEATURE SECTION STYLES */
        .wa-features{ margin-top: 40px; }
        .wa-section-title{ font-size: 24px; color: white; margin-bottom: 16px; border-bottom: 2px solid var(--accent2); padding-bottom: 4px; display: inline-block; }
        .wa-info-text{ font-size: 16px; line-height: 1.6; margin-bottom: 16px; }
        .wa-highlighted-p{ color: #fff; font-weight: 500; }
        .wa-problem-list{ list-style: none; padding: 0; margin-bottom: 24px; }
        .wa-problem-list li{ background: rgba(255, 0, 0, 0.1); padding: 8px 12px; border-radius: 6px; margin-bottom: 8px; color: var(--accent1); font-weight: 500; border-left: 4px solid var(--accent1); }
        .theme-light .wa-problem-list li{ background: #fecaca; border-left-color: #ef4444; color: #ef4444 }

        .wa-divider{ border: 0; height: 1px; background: rgba(255,255,255,0.06); margin: 30px 0; }

        .wa-feature-grid{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; margin-top: 20px; }
        .wa-feature-card{ background: rgba(255,255,255,0.04); padding: 20px; border-radius: 12px; border-top: 4px solid var(--accent3); }
        .theme-light .wa-feature-card{ background: #f9fafb; border: 1px solid #e5e7eb; }
        
        .wa-feature-heading{ color: var(--accent3); font-size: 18px; margin-top: 0; cursor: pointer; }
        .wa-feature-card ul{ list-style: none; padding-left: 0; margin-top: 10px; }
        .wa-feature-card li{ margin-bottom: 8px; font-size: 14px; color: var(--muted); }

        .wa-full-width{ grid-column: 1 / -1; }
        .wa-dose-calc-info{ display: flex; gap: 24px; }
        .wa-dose-calc-info h4{ color: #fff; margin-top: 0; font-size: 16px; }
        .theme-light .wa-dose-calc-info h4{ color: #1f2937 }
        .wa-dose-calc-info ul{ padding-left: 20px; }
        .wa-dose-calc-info li{ list-style-type: none; margin-bottom: 4px; }
        .input-info{ flex: 1; border-right: 1px dashed rgba(255,255,255,0.1); padding-right: 12px; }
        .output-info{ flex: 1; }
        .theme-light .input-info{ border-right-color: #d1d5db; }


        .wa-vision-text{ color: #fff; font-style: italic; margin-bottom: 12px; }
        .wa-vision-list{ list-style: '✨ '; padding-left: 20px; margin-top: 0; }
        .wa-vision-list li{ margin-bottom: 10px; color: #bbf7d0; font-weight: 500; }
        .wa-final-call{ color: #fde68a; font-weight: 600; font-size: 16px; margin-top: 20px; }


        .wa-join-us{ text-align: center; padding: 20px; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; background: rgba(0,0,0,0.1); }
        .wa-join-buttons{ display: flex; justify-content: center; gap: 16px; margin-top: 16px; }
        .wa-btn-large{ padding: 12px 24px; font-size: 16px; }


        /* small animations */
        .needle-g line { stroke-dasharray:5 4; animation: dash 1.6s linear infinite; }
        @keyframes dash { 0%{stroke-dashoffset:0} 50%{stroke-dashoffset:12} 100%{stroke-dashoffset:0} }

        @media (max-width:980px) {
          .wa-hero{ flex-direction:column-reverse; align-items:flex-start }
          .wa-hero-right{ width:100% }
          .wa-cards{ flex-direction:column }
          .wa-main{ padding:18px 24px 60px; }
          .wa-footer{ padding:18px 24px }
          .wa-new-title{ font-size: 28px; }
          .wa-feature-grid{ grid-template-columns: 1fr; }
          .wa-dose-calc-info{ flex-direction: column; gap: 16px; }
          .input-info{ border-right: none; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 16px; padding-right: 0; }
          .wa-join-buttons{ flex-direction: column; }
        }
      `}</style>
    </div>
  );
}