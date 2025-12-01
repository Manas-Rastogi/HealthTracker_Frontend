import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api";
import { motion } from "framer-motion";
import "./UserSignup.css";

/**
 * Advanced Signup component
 * - Replace existing Signup.jsx with this file
 * - Requires framer-motion and ../api.signupUser to exist
 */

export default function SignupAdvanced() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setError("");
    setSuccessMsg("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // Simple client validation
    if (!form.username.trim()) return setError("Please enter a username.");
    if (!EMAIL_RE.test(form.email)) return setError("Please enter a valid email address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    setBusy(true);
    try {
      // signupUser should POST to backend and throw on error
      await signupUser({ username: form.username.trim(), email: form.email.trim(), password: form.password });
      setSuccessMsg("Signup successful — please login.");
      setTimeout(() => nav("/user/login"), 900);
    } catch (err) {
      // err may be Error object or string
      const msg = (err && err.message) || err || "Signup failed";
      setError(msg);
    } finally {
      setBusy(false);
    }
  }

  // Motion variants
  const card = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } } };
  const float = { y: [0, -10, 0] };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <motion.div className="left" initial="hidden" animate="show" variants={card}>
          <header className="brand">
            <div className="logo" aria-hidden>
              <svg viewBox="0 0 64 64" width="44" height="44">
                <defs>
                  <linearGradient id="lg1" x1="0" x2="1">
                    <stop offset="0" stopColor="#ff9a9e" />
                    <stop offset="1" stopColor="#fad0c4" />
                  </linearGradient>
                </defs>
                <path d="M32 52s-20-12-20-28a12 12 0 0 1 24-6 12 12 0 0 1 24 6c0 16-20 28-20 28z" fill="url(#lg1)" />
              </svg>
            </div>
            <div>
              <h1>HealthTracker</h1>
              <p className="tag">Patient • Communicate • Your City NGO & Hospital</p>
            </div>
          </header>

          <motion.form className="signup-card" onSubmit={handleSubmit} initial={{ opacity: 0.9 }} animate={{ opacity: 1 }}>
            <h2>Create an account</h2>

            {error && <div className="alert error" role="alert">{error}</div>}
            {successMsg && <div className="alert success" role="status">{successMsg}</div>}

            <label>
              Username
              <input
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="eg. rahul_k"
                required
                aria-label="Username"
              />
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@domain.com"
                required
                aria-label="Email"
              />
            </label>

            <label>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="6+ characters"
                required
                aria-label="Password"
              />
            </label>

            <div className="actions">
              <motion.button
                type="submit"
                className="btn primary"
                whileTap={{ scale: 0.98 }}
                disabled={busy}
                aria-disabled={busy}
              >
                {busy ? "Creating..." : "Sign up"}
              </motion.button>

              <motion.button
                type="button"
                className="btn ghost"
                onClick={() => nav("/")}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </div>

            <p className="small">
              Already have an account?{" "}
              <button type="button" className="link" onClick={() => nav("/user/login")}>Login</button>
            </p>
          </motion.form>
        </motion.div>

        <motion.aside className="right" initial="hidden" animate="show" variants={card}>
          <div className="scene">
            {/* Hospital block */}
            <motion.div className="scene-hospital" animate={{ rotate: [0, -2, 0, 2, 0] }} transition={{ repeat: Infinity, duration: 9 }}>
              <svg viewBox="0 0 120 120" width="220" height="220" aria-hidden>
                <rect x="6" y="34" width="108" height="72" rx="8" fill="#fff" stroke="#e6eef8" />
                <rect x="22" y="48" width="18" height="18" rx="2" fill="#fef3c7" />
                <rect x="52" y="48" width="18" height="18" rx="2" fill="#e0f2fe" />
                <rect x="82" y="48" width="12" height="18" rx="2" fill="#bbf7d0" />
                <text x="14" y="78" fontSize="6" fill="#475569">City Hospital</text>
              </svg>
            </motion.div>

            {/* Child + syringe (floating) */}
            <motion.div className="scene-child" animate={float} transition={{ repeat: Infinity, duration: 2.6 }}>
              <svg viewBox="0 0 200 200" width="160" height="160" aria-hidden>
                <circle cx="80" cy="78" r="28" fill="#fff7ed" stroke="#fb7185" />
                <circle cx="80" cy="64" r="16" fill="#fde68a" />
                <path d="M60 110 q20 18 40 0" stroke="#64748b" strokeWidth="3" fill="none" />
                {/* syringe */}
                <g transform="translate(120, 62)">
                  <rect x="0" y="-6" width="56" height="12" rx="2" fill="#ecfeff" stroke="#94a3b8" />
                  <rect x="46" y="-2" width="20" height="4" fill="#94a3b8" />
                  <line x1="66" x2="96" y1="0" y2="0" stroke="#ef4444" strokeWidth="2" className="needle" />
                </g>
              </svg>
            </motion.div>

            {/* Blood drop */}
            <motion.div className="scene-drop" animate={{ y: [0, 8, 0], scale: [1, 0.98, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}>
              <svg viewBox="0 0 40 40" width="48" height="48" aria-hidden>
                <defs>
                  <linearGradient id="gdrop" x1="0" x2="1">
                    <stop offset="0" stopColor="#ff6b6b" />
                    <stop offset="1" stopColor="#b91c1c" />
                  </linearGradient>
                </defs>
                <path d="M20 2 C14 12, 10 16, 10 22 A10 10 0 0 0 30 22 C30 16, 26 12, 20 2 Z" fill="url(#gdrop)" />
              </svg>
            </motion.div>

            {/* Surgical tool gliding */ }
            <motion.div className="scene-tool" animate={{ x: [100, 0, -40, 40, 100] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
              <svg viewBox="0 0 120 40" width="120" height="36" aria-hidden>
                <rect x="4" y="10" width="92" height="8" rx="6" fill="#e2e8f0" />
                <circle cx="110" cy="14" r="6" fill="#fef08a" />
              </svg>
            </motion.div>

            {/* Stethoscope loop */ }
            <motion.div className="scene-stetho" animate={{ x: [-60, 0, 60, 10, -30] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}>
              <svg viewBox="0 0 80 60" width="120" height="78" aria-hidden>
                <path d="M10 12 C18 2, 30 2, 38 12" stroke="#a78bfa" strokeWidth="4" fill="none" strokeLinecap="round" />
                <circle cx="56" cy="34" r="8" fill="#7c3aed" />
              </svg>
            </motion.div>
          </div>

          <div className="scene-copy">
            <h3>Protect. Donate. Heal.</h3>
            <p>Signup to request help, donate blood & join community health drives. Animated previews show vaccine & instrument flows.</p>
          </div>
        </motion.aside>
      </div>

      {/* Scoped CSS — paste into external CSS file if you prefer */}
      <style>{`
        :root{
          --bg: linear-gradient(180deg,#071021,#071a2f);
          --card:#0f1724;
          --muted:#cbd5e1;
          --accent1:#fb7185;
          --accent2:#60a5fa;
          --glass: rgba(255,255,255,0.04);
        }
        .signup-page{min-height:100vh;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:28px;box-sizing:border-box}
        .signup-container{display:flex;gap:28px;max-width:1200px;width:100%;align-items:stretch}
        .left{flex:0 0 460px}
        .right{flex:1;display:flex;flex-direction:column;gap:14px;align-items:center;justify-content:center;padding:18px;border-radius:16px}
        .brand{display:flex;gap:12px;align-items:center;margin-bottom:12px}
        .brand h1{margin:0;color:white;font-size:20px}
        .brand .tag{color: #cbd5e1; margin:0;font-size:13px}

        .signup-card{background: rgba(255,255,255,0.03); padding:20px;border-radius:14px;box-shadow: 0 8px 40px rgba(2,6,23,0.6); display:flex;flex-direction:column;gap:12px}
        .signup-card h2{margin:0;color:#fff;font-size:20px}
        label{display:flex;flex-direction:column;color:var(--muted);font-size:13px}
        input{margin-top:8px;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#fff;outline:none}
        input::placeholder{color:rgba(255,255,255,0.4)}
        .actions{display:flex;gap:10px;margin-top:6px;align-items:center}
        .btn{padding:10px 14px;border-radius:10px;border:0;font-weight:700;cursor:pointer}
        .btn.primary{background:linear-gradient(90deg,var(--accent1),#f97316);color:white;box-shadow:0 6px 20px rgba(251,113,133,0.12)}
        .btn.ghost{background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--muted)}
        .small{color:var(--muted);font-size:13px;margin-top:8px}
        .link{background:none;border:0;color:#fff;text-decoration:underline;cursor:pointer}

        .alert{padding:8px 10px;border-radius:8px;font-size:13px}
        .alert.error{background:rgba(255,80,80,0.12);color:#ffd2d2;border:1px solid rgba(255,80,80,0.12)}
        .alert.success{background:rgba(110,231,183,0.08);color:#ddffec;border:1px solid rgba(110,231,183,0.08)}

        /* Scene styles */
        .scene{width:100%;height:320px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,0.01),transparent);border-radius:12px;padding:12px}
        .scene-hospital{position:absolute;left:12px;top:20px;opacity:0.98}
        .scene-child{position:absolute;right:24px;bottom:12px}
        .scene-drop{position:absolute; left:48%; top:12px}
        .scene-tool{position:absolute; left:-10%; top:36%}
        .scene-stetho{position:absolute; right:-6%; top:6%}
        .scene-copy{color:var(--muted);text-align:center;padding:6px 20px}
        .scene-copy h3{margin:0;color:white;font-size:20px}

        /* small animations */
        .syringe .needle{stroke-dasharray:8 6;animation:needle-move 1.6s linear infinite}
        @keyframes needle-move{0%{stroke-dashoffset:0}50%{stroke-dashoffset:12}100%{stroke-dashoffset:0}}

        /* Responsive */
        @media (max-width:1000px){
          .signup-container{flex-direction:column;align-items:stretch}
          .left{flex:1}
          .right{order:-1;width:100%}
          .scene{height:220px}
        }
        @media (max-width:520px){
          .signup-card{width:100%}
          .scene{height:180px}
        }
      `}</style>
    </div>
  );
}
