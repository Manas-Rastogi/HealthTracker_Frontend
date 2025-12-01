// // src/pages/Login.jsx 
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";
// /*
//   Full-page dark animated Login (Lottie URLs fetched runtime).
//   - Uses runtime fetch for Lottie JSONs (so you don't need local JSON files).
//   - If a fetch fails, a simple SVG fallback shows.
// */

// const LOTTIE_URLS = {
//   heart: "https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json",     // floating heart / blood drop (replace if broken)
//   hospital: "https://assets2.lottiefiles.com/packages/lf20_puciaact.json",  // animated hospital (replace if broken)
//   ngo: "https://assets4.lottiefiles.com/private_files/lf30_editor_6h2m9a5d.json", // ngo helper (replace if broken)
//   child: "https://assets2.lottiefiles.com/packages/lf20_Cc8Bpg.json",       // child injection (replace if broken)
//   vaccine: "https://assets9.lottiefiles.com/packages/lf20_7ybg6m.json",     // vaccine/cells (replace if broken)
//   tool: "https://assets8.lottiefiles.com/packages/lf20_io6j4bxp.json"       // surgical tool (replace if broken)
// };

// export default function UserLogin() {
//   const nav = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [error, setError] = useState("");
//   const [anims, setAnims] = useState({}); // { heart: json, hospital: json, ... }

//   // fetch Lottie JSONs on mount
//   useEffect(() => {
//     let mounted = true;
//     const keys = Object.keys(LOTTIE_URLS);
//     Promise.all(
//       keys.map(async (k) => {
//         try {
//           const res = await fetch(LOTTIE_URLS[k]);
//           if (!res.ok) throw new Error("Lottie fetch failed");
//           const json = await res.json();
//           return { k, json };
//         } catch (e) {
//           // ignore: fallback will be used
//           return { k, json: null };
//         }
//       })
//     ).then((results) => {
//       if (!mounted) return;
//       const map = {};
//       results.forEach(({ k, json }) => (map[k] = json));
//       setAnims(map);
//     });
//     return () => {
//       mounted = false;
//     };
//   }, []);

// //const data = await res.json();

// async function handleLogin(e) {
//   e.preventDefault();
//   setError("");
//   setBusy(true);

//   try {
//     const res = await fetch("http://localhost:8080/healthtech/user/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//      body: JSON.stringify({
//   username: username,
//   password: password
   

// })

//     });

//     const text = await res.text();
//     console.log("RAW LOGIN RESPONSE:", text);

//     // Backend returns plain string like "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//     // So convert manually.
//     let token = text;
//     if (text.startsWith("{")) {
//       const json = JSON.parse(text);
//       token = json.token;
//     }

//     if (!token || !token.includes(".")) {
//       throw new Error("Invalid token received from API");
//     }

//     localStorage.setItem("token", token);

//     nav("/user/home");
//   } catch (err) {
//     console.error(err);
//     setError(err.message);
//   } finally {
//     setBusy(false);
//   }
// }



//   // motion variants
//   const floatSlow = { y: [0, -18, 0] };
//   const floatMed = { y: [0, -12, 0] };
//   const floatFast = { y: [0, -7, 0] };

//   return (
//     <div className="laf-root" role="main" aria-labelledby="login-heading">
//       {/* background blobs */}
//       <div className="laf-bg">
//         <div className="blob b1" />
//         <div className="blob b2" />
//         <div className="blob b3" />
//       </div>

//       {/* floating lotties or fallbacks */}
//       <motion.div className="laf-f la-heart" animate={floatMed} transition={{ repeat: Infinity, duration: 3 }}>
//         {anims.heart ? (
//           <Lottie animationData={anims.heart} loop style={{ width: 160, height: 160 }} />
//         ) : (
//           <svg width="120" height="120" viewBox="0 0 24 24" aria-hidden>
//             <path fill="#ff6b6b" d="M12 21s-7-4.35-9-7.5C1.5 9.9 3.6 6 7.5 6 9 6 10 6.9 12 8c2-1.1 3-2 4.5-2 3.9 0 6 3.9 4.5 7.5C19 16.65 12 21 12 21z" />
//           </svg>
//         )}
//       </motion.div>

//       <motion.div className="laf-f la-hospital" animate={{ x: [0, -26, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
//         {anims.hospital ? (
//           <Lottie animationData={anims.hospital} loop style={{ width: 240, height: 240 }} />
//         ) : (
//           <svg width="160" height="160" viewBox="0 0 64 64" aria-hidden>
//             <rect x="6" y="20" width="52" height="36" rx="3" fill="#eef2ff" stroke="#c7d2fe" />
//             <rect x="18" y="30" width="8" height="8" fill="#fff" />
//             <rect x="34" y="30" width="8" height="8" fill="#fff" />
//             <rect x="18" y="44" width="8" height="8" fill="#fff" />
//             <rect x="34" y="44" width="8" height="8" fill="#fff" />
//           </svg>
//         )}
//       </motion.div>

//       <motion.div className="laf-f la-ngo" animate={floatSlow} transition={{ repeat: Infinity, duration: 5 }}>
//         {anims.ngo ? (
//           <Lottie animationData={anims.ngo} loop style={{ width: 120, height: 120 }} />
//         ) : (
//           <svg width="100" height="100" viewBox="0 0 24 24" aria-hidden>
//             <circle cx="12" cy="8" r="3.2" fill="#fde68a" />
//             <rect x="7" y="12" width="10" height="6" rx="2" fill="#d1fae5" />
//           </svg>
//         )}
//       </motion.div>

//       <motion.div className="laf-f la-child" animate={floatFast} transition={{ repeat: Infinity, duration: 2.6 }}>
//         {anims.child ? (
//           <Lottie animationData={anims.child} loop style={{ width: 160, height: 160 }} />
//         ) : (
//           <svg width="120" height="120" viewBox="0 0 64 64" aria-hidden>
//             <circle cx="32" cy="22" r="10" fill="#fff7ed" stroke="#fb7185" />
//             <path d="M18 48c8 6 20 6 28 0" stroke="#64748b" strokeWidth="3" fill="none" />
//           </svg>
//         )}
//       </motion.div>

//       <motion.div className="laf-f la-vaccine" animate={{ x: [-30, 0, 30, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
//         {anims.vaccine ? (
//           <Lottie animationData={anims.vaccine} loop style={{ width: 120, height: 120 }} />
//         ) : (
//           <svg width="80" height="80" viewBox="0 0 64 64" aria-hidden>
//             <rect x="10" y="26" width="44" height="10" rx="3" fill="#dbeafe" />
//             <line x1="48" y1="26" x2="58" y2="16" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
//           </svg>
//         )}
//       </motion.div>

//       <motion.div className="laf-f la-tool" animate={{ x: [0, -120, 120, 0] }} transition={{ repeat: Infinity, duration: 8 }}>
//         {anims.tool ? (
//           <Lottie animationData={anims.tool} loop style={{ width: 180, height: 64 }} />
//         ) : (
//           <svg width="160" height="48" viewBox="0 0 160 48" aria-hidden>
//             <rect x="4" y="14" rx="6" width="120" height="20" fill="#e6eef8" />
//             <circle cx="140" cy="24" r="8" fill="#fef08a" />
//           </svg>
//         )}
//       </motion.div>

//       {/* central card */}
//       <motion.section className="laf-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         <div className="laf-card" role="form" aria-labelledby="login-heading">
//           <header className="laf-head">
//             <h1 id="login-heading">HealthTracker</h1>
//             <p className="laf-sub">Patient • Communicate • Your City NGO & Hospital</p>
//           </header>

//           <form className="laf-form" onSubmit={handleLogin}>
//             {error && <div className="laf-error" role="alert">{error}</div>}

//             <label className="laf-label">
//               Username
//               <input
//                 className="laf-input"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="username"
//                 required
//                 aria-label="Username"
//               />
//             </label>

//             <label className="laf-label">
//               Password
//               <input
//                 className="laf-input"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="password"
//                 required
//                 aria-label="Password"
//               />
//             </label>

//             <div className="laf-actions">
//               <motion.button type="submit" className="laf-btn laf-primary" whileTap={{ scale: 0.98 }} disabled={busy}>
//                 {busy ? "Logging..." : "Login"}
//               </motion.button>

//               <motion.button type="button" className="laf-btn laf-ghost" whileTap={{ scale: 0.98 }} onClick={() => nav("/")}>
//                 Back
//               </motion.button>
//             </div>

//             <div className="laf-footer">
//               <button type="button" className="laf-link" onClick={() => nav("/user/signup")}>Create account</button>
//               <small className="laf-note">Login as NGO/Hospital via their specific pages</small>
//             </div>
//           </form>
//         </div>
//       </motion.section>

//       {/* Scoped styles */}
//       <style>{`
//         :root{
//           --bg1: #04060b;
//           --bg2: #071428;
//           --muted: #b8c7d9;
//           --glass: rgba(255,255,255,0.03);
//           --accent-1: #ff6b6b;
//           --accent-2: #7c3aed;
//           --accent-3: #06b6d4;
//         }

//         /* page */
//         .laf-root {
//           min-height: 100vh;
//           height: 100vh;
//           width: 100vw;
//           overflow: hidden;
//           background: radial-gradient(circle at 10% 20%, rgba(255,107,107,0.06), transparent 8%),
//                       linear-gradient(180deg, var(--bg1), var(--bg2));
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue';
//           color: var(--muted);
//           position: relative;
//         }

//         .laf-bg{ position:absolute; inset:0; z-index:0; pointer-events:none;}
//         .blob { position:absolute; filter:blur(72px); opacity:0.12; mix-blend-mode:screen; border-radius:40%;}
//         .b1{ width:760px; height:760px; left:-220px; top:-220px; background:linear-gradient(135deg,#ff7a7a,#ffb86b); }
//         .b2{ width:520px; height:520px; right:-120px; top:-80px; background:linear-gradient(135deg,#7dd3fc,#93c5fd); }
//         .b3{ width:360px; height:360px; left:18%; bottom:-110px; background:linear-gradient(135deg,#bbf7d0,#86efac); }

//         /* floating items container positions */
//         .laf-f{ position:absolute; z-index:1; pointer-events:none; opacity:0.98; }
//         .la-heart{ left:6%; top:10%; transform:translate(-8%,-8%); }
//         .la-hospital{ right:6%; top:6%; }
//         .la-ngo{ left:6%; bottom:8%; }
//         .la-child{ right:16%; bottom:6%; }
//         .la-vaccine{ left:46%; top:6%; transform:translateX(-50%); }
//         .la-tool{ left:6%; top:44%; opacity:0.95; }

//         /* center card */
//         .laf-center { position:relative; z-index:6; width:100%; max-width:980px; padding:20px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; }
//         .laf-card { width:100%; display:flex; gap:22px; padding:18px; border-radius:16px; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); box-shadow: 0 28px 80px rgba(2,6,23,0.6); border: 1px solid rgba(255,255,255,0.04); backdrop-filter: blur(6px); }

//         .laf-head { width:36%; padding:14px 8px; display:flex; flex-direction:column; gap:8px; justify-content:center; }
//         .laf-head h1 { margin:0; color:#fff; font-size:28px; letter-spacing:0.2px; }
//         .laf-sub { margin:0; color:var(--muted); font-size:13px; }

//         .laf-form { width:64%; display:flex; flex-direction:column; gap:12px; padding:4px 6px; }
//         .laf-label { display:flex; flex-direction:column; color:var(--muted); font-size:13px; }
//         .laf-input { margin-top:8px; padding:12px 14px; border-radius:10px; background: rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); color:#f8fafc; outline:none; }
//         .laf-input::placeholder { color: rgba(255,255,255,0.35); }

//         .laf-actions { display:flex; gap:12px; margin-top:6px; align-items:center; }
//         .laf-btn { padding:12px 14px; border-radius:10px; border:0; cursor:pointer; font-weight:700; min-width:120px; }
//         .laf-primary { background: linear-gradient(90deg, var(--accent-1), #fb7185); color:white; box-shadow: 0 8px 30px rgba(255,107,107,0.12); }
//         .laf-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.04); color:var(--muted); }

//         .laf-footer { display:flex; justify-content:space-between; align-items:center; margin-top:10px; gap:12px; }
//         .laf-link { background:none; border:0; color:var(--muted); text-decoration:underline; cursor:pointer; }
//         .laf-note { color:var(--muted); font-size:12px; }

//         .laf-error { background: rgba(255,80,80,0.08); padding:10px 12px; border-radius:10px; color:#ffd2d2; border:1px solid rgba(255,80,80,0.06); }

//         /* responsiveness */
//         @media (max-width:980px) {
//           .laf-card { flex-direction:column; gap:14px; padding:12px; }
//           .laf-head { width:100%; text-align:center; padding:6px 0; }
//           .laf-form { width:100%; }
//           /* hide floating lotties on small devices to avoid clutter/performance issues */
//           .laf-f { display:none; }
//         }
//         @media (max-width:560px) {
//           .laf-head h1 { font-size:20px; }
//           .laf-input { font-size:14px; padding:10px; }
//         }
//       `}</style>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// /*
//  * FIX: Is function ko ab standard Base64 decoding se JWT payload ko parse karne ke liye 
//  * update kiya gaya hai taki asli token se role nikaala jaa sake.
//  * UPDATE: Zyaada common role keys (roles, authorities) ko check karne ke liye logic badhaya gaya hai.
//  * Decoded payload ab console mein log hoga jisse user debugging kar sake.
//  */
// const decodeTokenAndExtractRole = (token) => {
//     try {
//         const parts = token.split('.');
//         if (parts.length !== 3) {
//             console.error("Token structure is invalid.");
//             return 'ROLE_UNKNOWN';
//         }

//         // Base64URL decoding for the payload (parts[1])
//         const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(
//             atob(payloadBase64).split('').map(function(c) {
//                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//             }).join('')
//         );

//         const payload = JSON.parse(jsonPayload);
        
//         // --- CRUCIAL DEBUG LOG ---
//         console.log("JWT Payload Decoded:", payload);
//         // -------------------------

//         // Role Extraction: Backend configuration ke hisaab se yahaan role ki key check karein.
        
//         // 1. Check for singular 'role' or 'authority'
//         if (payload.role) {
//             // Spring Security typically returns roles as simple strings like 'USER' or 'ROLE_USER'
//             return Array.isArray(payload.role) ? payload.role[0].toUpperCase() : payload.role.toUpperCase();
//         }
//         if (payload.authority) {
//             return Array.isArray(payload.authority) ? payload.authority[0].toUpperCase() : payload.authority.toUpperCase();
//         }
        
//         // 2. Check for common plural fields: 'authorities' or 'roles' (often arrays)
//         if (payload.authorities && Array.isArray(payload.authorities) && payload.authorities.length > 0) {
//             // Extract the first role from the array
//             return payload.authorities[0].toUpperCase();
//         }
//         if (payload.roles && Array.isArray(payload.roles) && payload.roles.length > 0) {
//             // Extract the first role from the array
//             return payload.roles[0].toUpperCase();
//         }
        
//         console.warn("JWT payload decoded, but expected role field ('role', 'authority', 'roles', or 'authorities') not found.", payload);
//         return 'ROLE_UNKNOWN';
//     } catch (e) {
//         console.error("JWT Decoding Failed (Token might be corrupted or malformed):", e);
//         return 'ROLE_UNKNOWN';
//     }
// };

// const LOTTIE_URLS = {
//     heart: "https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json", 
//     hospital: "https://assets2.lottiefiles.com/packages/lf20_puciaact.json",
//     ngo: "https://assets4.lottiefiles.com/private_files/lf30_editor_6h2m9a5d.json", 
//     child: "https://assets2.lottiefiles.com/packages/lf20_Cc8Bpg.json", 
//     vaccine: "https://assets9.lottiefiles.com/packages/lf20_7ybg6m.json", 
//     tool: "https://assets8.lottiefiles.com/packages/lf20_io6j4bxp.json" 
// };

// export default function UserLogin() {
//     const nav = useNavigate();
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [busy, setBusy] = useState(false);
//     const [error, setError] = useState("");
//     const [anims, setAnims] = useState({}); 
    
//     // CRUCIAL: Yeh portal sirf 'USER' role ke liye hai
//     const INTENDED_ROLE = 'USER';
//     const EXPECTED_ROLE_STRING = `ROLE_${INTENDED_ROLE}`;

//     // Lottie fetch logic (SVGs are used, but fetch remains for potential future use)
//     useEffect(() => {
//         let mounted = true;
//         const keys = Object.keys(LOTTIE_URLS);
//         Promise.all(
//             keys.map(async (k) => {
//                 try {
//                     const res = await fetch(LOTTIE_URLS[k]);
//                     if (!res.ok) throw new Error("Lottie fetch failed");
//                     const json = await res.json();
//                     return { k, json };
//                 } catch (e) {
//                     return { k, json: null };
//                 }
//             })
//         ).then((results) => {
//             if (!mounted) return;
//             const map = {};
//             results.forEach(({ k, json }) => (map[k] = json));
//             setAnims(map);
//         });
//         return () => {
//             mounted = false;
//         };
//     }, []);

//     async function handleLogin(e) {
//         e.preventDefault();
//         setError("");
//         setBusy(true);

//         try {
//             // 1. API Call
//             // Note: Hum maan rahe hain ki backend http://localhost:8080/healthtech/user/login par token dega
//             const res = await fetch("http://localhost:8080/healthtech/user/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     username: username,
//                     password: password
//                 })
//             });

//             // Agar API call fail ho (jaise 401 Unauthorized), toh error throw karein
//             if (!res.ok) {
//                 const errorText = await res.text();
//                 throw new Error(`Login failed (Status: ${res.status}). Response: ${errorText.substring(0, 100)}...`);
//             }

//             const text = await res.text();
//             console.log("RAW LOGIN RESPONSE:", text);

//             let token = text;
//             if (text.startsWith("{")) {
//                 const json = JSON.parse(text);
//                 token = json.token || json.accessToken; // Check both common token keys
//             }

//             if (!token || !token.includes(".")) {
//                 throw new Error("Invalid token received from API. Check username/password.");
//             }

//             // 2. TOKEN ROLE CHECK (Using improved decoding logic)
//             const actualRole = decodeTokenAndExtractRole(token);
            
//             // Compare the extracted role with the expected role (e.g., 'ROLE_USER' === 'ROLE_USER')
//             if (actualRole === EXPECTED_ROLE_STRING) {
//                 // ✅ SUCCESS: Role match
//                 localStorage.setItem("token", token);
//                 nav("/user/home");
//             } else {
//                 // ❌ FAILURE: Role mismatch
//                 const roleName = actualRole.replace('ROLE_', '');
//                 throw new Error(`Access Denied! This portal is for ${INTENDED_ROLE} only. Your account role is ${roleName}.`);
//             }

//         } catch (err) {
//             console.error("Login Error:", err);
//             // Agar network error ho ya API se kuch galat aaye
//             setError(err.message || "Login failed. Please check credentials or network.");
//             localStorage.removeItem("token"); 
//         } finally {
//             setBusy(false);
//         }
//     }


//     // motion variants
//     const floatSlow = { y: [0, -18, 0] };
//     const floatMed = { y: [0, -12, 0] };
//     const floatFast = { y: [0, -7, 0] };

//     return (
//         <div className="laf-root" role="main" aria-labelledby="login-heading">
//             {/* background blobs */}
//             <div className="laf-bg">
//                 <div className="blob b1" />
//                 <div className="blob b2" />
//                 <div className="blob b3" />
//             </div>

//             {/* floating SVG fallbacks (using SVGs to avoid Lottie dependency issue) */}
//             <motion.div className="laf-f la-heart" animate={floatMed} transition={{ repeat: Infinity, duration: 3 }}>
//                 <svg width="120" height="120" viewBox="0 0 24 24" aria-hidden>
//                     <path fill="#ff6b6b" d="M12 21s-7-4.35-9-7.5C1.5 9.9 3.6 6 7.5 6 9 6 10 6.9 12 8c2-1.1 3-2 4.5-2 3.9 0 6 3.9 4.5 7.5C19 16.65 12 21 12 21z" />
//                 </svg>
//             </motion.div>

//             <motion.div className="laf-f la-hospital" animate={{ x: [0, -26, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
//                 <svg width="160" height="160" viewBox="0 0 64 64" aria-hidden>
//                     <rect x="6" y="20" width="52" height="36" rx="3" fill="#eef2ff" stroke="#c7d2fe" />
//                     <rect x="18" y="30" width="8" height="8" fill="#fff" />
//                     <rect x="34" y="30" width="8" height="8" fill="#fff" />
//                     <rect x="18" y="44" width="8" height="8" fill="#fff" />
//                     <rect x="34" y="44" width="8" height="8" fill="#fff" />
//                 </svg>
//             </motion.div>

//             <motion.div className="laf-f la-ngo" animate={floatSlow} transition={{ repeat: Infinity, duration: 5 }}>
//                 <svg width="100" height="100" viewBox="0 0 24 24" aria-hidden>
//                     <circle cx="12" cy="8" r="3.2" fill="#fde68a" />
//                     <rect x="7" y="12" width="10" height="6" rx="2" fill="#d1fae5" />
//                 </svg>
//             </motion.div>

//             <motion.div className="laf-f la-child" animate={floatFast} transition={{ repeat: Infinity, duration: 2.6 }}>
//                 <svg width="120" height="120" viewBox="0 0 64 64" aria-hidden>
//                     <circle cx="32" cy="22" r="10" fill="#fff7ed" stroke="#fb7185" />
//                     <path d="M18 48c8 6 20 6 28 0" stroke="#64748b" strokeWidth="3" fill="none" />
//                 </svg>
//             </motion.div>

//             <motion.div className="laf-f la-vaccine" animate={{ x: [-30, 0, 30, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
//                 <svg width="80" height="80" viewBox="0 0 64 64" aria-hidden>
//                     <rect x="10" y="26" width="44" height="10" rx="3" fill="#dbeafe" />
//                     <line x1="48" y1="26" x2="58" y2="16" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
//                 </svg>
//             </motion.div>

//             <motion.div className="laf-f la-tool" animate={{ x: [0, -120, 120, 0] }} transition={{ repeat: Infinity, duration: 8 }}>
//                 <svg width="160" height="48" viewBox="0 0 160 48" aria-hidden>
//                     <rect x="4" y="14" rx="6" width="120" height="20" fill="#e6eef8" />
//                     <circle cx="140" cy="24" r="8" fill="#fef08a" />
//                 </svg>
//             </motion.div>

//             {/* central card */}
//             <motion.section className="laf-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//                 <div className="laf-card" role="form" aria-labelledby="login-heading">
//                     <header className="laf-head">
//                         <h1 id="login-heading">{INTENDED_ROLE} Login</h1> 
//                         <p className="laf-sub">Patient • Communicate • Your City NGO & Hospital</p>
//                     </header>

//                     <form className="laf-form" onSubmit={handleLogin}>
//                         {error && <div className="laf-error" role="alert">{error}</div>}

//                         <label className="laf-label">
//                             Username
//                             <input
//                                 className="laf-input"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 placeholder="username"
//                                 required
//                                 aria-label="Username"
//                             />
//                         </label>

//                         <label className="laf-label">
//                             Password
//                             <input
//                                 className="laf-input"
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 placeholder="password"
//                                 required
//                                 aria-label="Password"
//                             />
//                         </label>

//                         <div className="laf-actions">
//                             <motion.button type="submit" className="laf-btn laf-primary" whileTap={{ scale: 0.98 }} disabled={busy}>
//                                 {busy ? "Logging..." : "Login"}
//                             </motion.button>

//                             <motion.button type="button" className="laf-btn laf-ghost" whileTap={{ scale: 0.98 }} onClick={() => nav("/")}>
//                                 Back
//                             </motion.button>
//                         </div>

//                         <div className="laf-footer">
//                             <button type="button" className="laf-link" onClick={() => nav("/user/signup")}>Create account</button>
//                             <small className="laf-note">Login as NGO/Hospital via their specific pages</small>
//                         </div>
//                     </form>
//                 </div>
//             </motion.section>

//             {/* Scoped styles */}
//             <style>{`
//             :root{
//                 --bg1: #04060b;
//                 --bg2: #071428;
//                 --muted: #b8c7d9;
//                 --glass: rgba(255,255,255,0.03);
//                 --accent-1: #ff6b6b;
//                 --accent-2: #7c3aed;
//                 --accent-3: #06b6d4;
//             }

//             /* page */
//             .laf-root {
//                 min-height: 100vh;
//                 height: 100vh;
//                 width: 100vw;
//                 overflow: hidden;
//                 background: radial-gradient(circle at 10% 20%, rgba(255,107,107,0.06), transparent 8%),
//                             linear-gradient(180deg, var(--bg1), var(--bg2));
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue';
//                 color: var(--muted);
//                 position: relative;
//             }

//             .laf-bg{ position:absolute; inset:0; z-index:0; pointer-events:none;}
//             .blob { position:absolute; filter:blur(72px); opacity:0.12; mix-blend-mode:screen; border-radius:40%;}
//             .b1{ width:760px; height:760px; left:-220px; top:-220px; background:linear-gradient(135deg,#ff7a7a,#ffb86b); }
//             .b2{ width:520px; height:520px; right:-120px; top:-80px; background:linear-gradient(135deg,#7dd3fc,#93c5fd); }
//             .b3{ width:360px; height:360px; left:18%; bottom:-110px; background:linear-gradient(135deg,#bbf7d0,#86efac); }

//             /* floating items container positions */
//             .laf-f{ position:absolute; z-index:1; pointer-events:none; opacity:0.98; }
//             .la-heart{ left:6%; top:10%; transform:translate(-8%,-8%); }
//             .la-hospital{ right:6%; top:6%; }
//             .la-ngo{ left:6%; bottom:8%; }
//             .la-child{ right:16%; bottom:6%; }
//             .la-vaccine{ left:46%; top:6%; transform:translateX(-50%); }
//             .la-tool{ left:6%; top:44%; opacity:0.95; }

//             /* center card */
//             .laf-center { position:relative; z-index:6; width:100%; max-width:980px; padding:20px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; }
//             .laf-card { width:100%; display:flex; gap:22px; padding:18px; border-radius:16px; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); box-shadow: 0 28px 80px rgba(2,6,23,0.6); border: 1px solid rgba(255,255,255,0.04); backdrop-filter: blur(6px); }

//             .laf-head { width:36%; padding:14px 8px; display:flex; flex-direction:column; gap:8px; justify-content:center; }
//             .laf-head h1 { margin:0; color:#fff; font-size:28px; letter-spacing:0.2px; }
//             .laf-sub { margin:0; color:var(--muted); font-size:13px; }

//             .laf-form { width:64%; display:flex; flex-direction:column; gap:12px; padding:4px 6px; }
//             .laf-label { display:flex; flex-direction:column; color:var(--muted); font-size:13px; }
//             .laf-input { margin-top:8px; padding:12px 14px; border-radius:10px; background: rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); color:#f8fafc; outline:none; }
//             .laf-input::placeholder { color: rgba(255,255,255,0.35); }

//             .laf-actions { display:flex; gap:12px; margin-top:6px; align-items:center; }
//             .laf-btn { padding:12px 14px; border-radius:10px; border:0; cursor:pointer; font-weight:700; min-width:120px; }
//             .laf-primary { background: linear-gradient(90deg, var(--accent-1), #fb7185); color:white; box-shadow: 0 8px 30px rgba(255,107,107,0.12); }
//             .laf-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.04); color:var(--muted); }

//             .laf-footer { display:flex; justify-content:space-between; align-items:center; margin-top:10px; gap:12px; }
//             .laf-link { background:none; border:0; color:var(--muted); text-decoration:underline; cursor:pointer; }
//             .laf-note { color:var(--muted); font-size:12px; }

//             .laf-error { background: rgba(255,80,80,0.08); padding:10px 12px; border-radius:10px; color:#ffd2d2; border:1px solid rgba(255,80,80,0.06); }

//             /* responsiveness */
//             @media (max-width:980px) {
//                 .laf-card { flex-direction:column; gap:14px; padding:12px; }
//                 .laf-head { width:100%; text-align:center; padding:6px 0; }
//                 .laf-form { width:100%; }
//                 /* hide floating lotties on small devices to avoid clutter/performance issues */
//                 .laf-f { display:none; }
//             }
//             @media (max-width:560px) {
//                 .laf-head h1 { font-size:20px; }
//                 .laf-input { font-size:14px; padding:10px; }
//             }
//             `}</style>
//         </div>
//     );
// }






import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/*
 * FIX: Is function ko ab standard Base64 decoding se JWT payload ko parse karne ke liye 
 * update kiya gaya hai taki asli token se role nikaala jaa sake.
 * UPDATE: Zyaada common role keys (roles, authorities) ko check karne ke liye logic badhaya gaya hai.
 * Decoded payload ab console mein log hoga jisse user debugging kar sake.
 */
const decodeTokenAndExtractRole = (token) => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error("Token structure is invalid.");
            return 'ROLE_UNKNOWN';
        }

        // Base64URL decoding for the payload (parts[1])
        const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(payloadBase64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join('')
        );

        const payload = JSON.parse(jsonPayload);
        
        // --- CRUCIAL DEBUG LOG ---
        console.log("JWT Payload Decoded:", payload);
        // -------------------------

        // Role Extraction: Backend configuration ke hisaab se yahaan role ki key check karein.
        
        // 1. Check for singular 'role' or 'authority'
        if (payload.role) {
            // Spring Security typically returns roles as simple strings like 'USER' or 'ROLE_USER'
            return Array.isArray(payload.role) ? payload.role[0].toUpperCase() : payload.role.toUpperCase();
        }
        if (payload.authority) {
            return Array.isArray(payload.authority) ? payload.authority[0].toUpperCase() : payload.authority.toUpperCase();
        }
        
        // 2. Check for common plural fields: 'authorities' or 'roles' (often arrays)
        if (payload.authorities && Array.isArray(payload.authorities) && payload.authorities.length > 0) {
            // Extract the first role from the array
            return payload.authorities[0].toUpperCase();
        }
        if (payload.roles && Array.isArray(payload.roles) && payload.roles.length > 0) {
            // Extract the first role from the array
            return payload.roles[0].toUpperCase();
        }
        
        console.warn("JWT payload decoded, but expected role field ('role', 'authority', 'roles', or 'authorities') not found.", payload);
        return 'ROLE_UNKNOWN';
    } catch (e) {
        console.error("JWT Decoding Failed (Token might be corrupted or malformed):", e);
        return 'ROLE_UNKNOWN';
    }
};

const LOTTIE_URLS = {
    heart: "https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json", 
    hospital: "https://assets2.lottiefiles.com/packages/lf20_puciaact.json",
    ngo: "https://assets4.lottiefiles.com/private_files/lf30_editor_6h2m9a5d.json", 
    child: "https://assets2.lottiefiles.com/packages/lf20_Cc8Bpg.json", 
    vaccine: "https://assets9.lottiefiles.com/packages/lf20_7ybg6m.json", 
    tool: "https://assets8.lottiefiles.com/packages/lf20_io6j4bxp.json" 
};

export default function UserLogin() {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [anims, setAnims] = useState({}); 
    
    // CRUCIAL: Yeh portal sirf 'USER' role ke liye hai
    const INTENDED_ROLE = 'USER';
    const EXPECTED_ROLE_STRING = `ROLE_${INTENDED_ROLE}`;

    // Lottie fetch logic (SVGs are used, but fetch remains for potential future use)
    useEffect(() => {
        let mounted = true;
        const keys = Object.keys(LOTTIE_URLS);
        Promise.all(
            keys.map(async (k) => {
                try {
                    const res = await fetch(LOTTIE_URLS[k]);
                    if (!res.ok) throw new Error("Lottie fetch failed");
                    const json = await res.json();
                    return { k, json };
                } catch (e) {
                    return { k, json: null };
                }
            })
        ).then((results) => {
            if (!mounted) return;
            const map = {};
            results.forEach(({ k, json }) => (map[k] = json));
            setAnims(map);
        });
        return () => {
            mounted = false;
        };
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setBusy(true);

        try {
            // 1. API Call
            // Note: Hum maan rahe hain ki backend http://localhost:8080/healthtech/user/login par token dega
            const res = await fetch("https://healthtracker-5.onrender.com/healthtech/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            // Agar API call fail ho (jaise 401 Unauthorized), toh error throw karein
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Login failed (Status: ${res.status}). Response: ${errorText.substring(0, 100)}...`);
            }

            const text = await res.text();
            console.log("RAW LOGIN RESPONSE:", text);

            let token = text;
            if (text.startsWith("{")) {
                const json = JSON.parse(text);
                token = json.token || json.accessToken; // Check both common token keys
            }

            if (!token || !token.includes(".")) {
                throw new Error("Invalid token received from API. Check username/password.");
            }

            // 2. TOKEN ROLE CHECK (Using improved decoding logic)
            const actualRole = decodeTokenAndExtractRole(token);
            
            // Compare the extracted role with the expected role (e.g., 'ROLE_USER' === 'ROLE_USER')
            if (actualRole === EXPECTED_ROLE_STRING) {
                // ✅ SUCCESS: Role match
                localStorage.setItem("token", token);
                nav("/user/home");
            } else {
                // ❌ FAILURE: Role mismatch
                const roleName = actualRole.replace('ROLE_', '');
                throw new Error(`Access Denied! This portal is for ${INTENDED_ROLE} only. Your account role is ${roleName}.`);
            }

        } catch (err) {
            console.error("Login Error:", err);
            // Agar network error ho ya API se kuch galat aaye
            setError(err.message || "Login failed. Please check credentials or network.");
            localStorage.removeItem("token"); 
        } finally {
            setBusy(false);
        }
    }

    // ⭐ NEW FUNCTION: Forget Password
    function handleForgotPassword() {
        // 'nav' function ka use karke /user/forget-password route par chalein jaayenge
        nav("/user/forget-password");
    }


    // motion variants
    const floatSlow = { y: [0, -18, 0] };
    const floatMed = { y: [0, -12, 0] };
    const floatFast = { y: [0, -7, 0] };

    return (
        <div className="laf-root" role="main" aria-labelledby="login-heading">
            {/* background blobs */}
            <div className="laf-bg">
                <div className="blob b1" />
                <div className="blob b2" />
                <div className="blob b3" />
            </div>

            {/* floating SVG fallbacks (using SVGs to avoid Lottie dependency issue) */}
            <motion.div className="laf-f la-heart" animate={floatMed} transition={{ repeat: Infinity, duration: 3 }}>
                <svg width="120" height="120" viewBox="0 0 24 24" aria-hidden>
                    <path fill="#ff6b6b" d="M12 21s-7-4.35-9-7.5C1.5 9.9 3.6 6 7.5 6 9 6 10 6.9 12 8c2-1.1 3-2 4.5-2 3.9 0 6 3.9 4.5 7.5C19 16.65 12 21 12 21z" />
                </svg>
            </motion.div>

            <motion.div className="laf-f la-hospital" animate={{ x: [0, -26, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
                <svg width="160" height="160" viewBox="0 0 64 64" aria-hidden>
                    <rect x="6" y="20" width="52" height="36" rx="3" fill="#eef2ff" stroke="#c7d2fe" />
                    <rect x="18" y="30" width="8" height="8" fill="#fff" />
                    <rect x="34" y="30" width="8" height="8" fill="#fff" />
                    <rect x="18" y="44" width="8" height="8" fill="#fff" />
                    <rect x="34" y="44" width="8" height="8" fill="#fff" />
                </svg>
            </motion.div>

            <motion.div className="laf-f la-ngo" animate={floatSlow} transition={{ repeat: Infinity, duration: 5 }}>
                <svg width="100" height="100" viewBox="0 0 24 24" aria-hidden>
                    <circle cx="12" cy="8" r="3.2" fill="#fde68a" />
                    <rect x="7" y="12" width="10" height="6" rx="2" fill="#d1fae5" />
                </svg>
            </motion.div>

            <motion.div className="laf-f la-child" animate={floatFast} transition={{ repeat: Infinity, duration: 2.6 }}>
                <svg width="120" height="120" viewBox="0 0 64 64" aria-hidden>
                    <circle cx="32" cy="22" r="10" fill="#fff7ed" stroke="#fb7185" />
                    <path d="M18 48c8 6 20 6 28 0" stroke="#64748b" strokeWidth="3" fill="none" />
                </svg>
            </motion.div>

            <motion.div className="laf-f la-vaccine" animate={{ x: [-30, 0, 30, 0] }} transition={{ repeat: Infinity, duration: 6 }}>
                <svg width="80" height="80" viewBox="0 0 64 64" aria-hidden>
                    <rect x="10" y="26" width="44" height="10" rx="3" fill="#dbeafe" />
                    <line x1="48" y1="26" x2="58" y2="16" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                </svg>
            </motion.div>

            <motion.div className="laf-f la-tool" animate={{ x: [0, -120, 120, 0] }} transition={{ repeat: Infinity, duration: 8 }}>
                <svg width="160" height="48" viewBox="0 0 160 48" aria-hidden>
                    <rect x="4" y="14" rx="6" width="120" height="20" fill="#e6eef8" />
                    <circle cx="140" cy="24" r="8" fill="#fef08a" />
                </svg>
            </motion.div>

            {/* central card */}
            <motion.section className="laf-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="laf-card" role="form" aria-labelledby="login-heading">
                    <header className="laf-head">
                        <h1 id="login-heading">{INTENDED_ROLE} Login</h1> 
                        <p className="laf-sub">Patient • Communicate • Your City NGO & Hospital</p>
                    </header>

                    <form className="laf-form" onSubmit={handleLogin}>
                        {error && <div className="laf-error" role="alert">{error}</div>}

                        <label className="laf-label">
                            Username
                            <input
                                className="laf-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username"
                                required
                                aria-label="Username"
                            />
                        </label>

                        <label className="laf-label">
                            Password
                            <input
                                className="laf-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                                required
                                aria-label="Password"
                            />
                        </label>

                        <div className="laf-actions">
                            <motion.button type="submit" className="laf-btn laf-primary" whileTap={{ scale: 0.98 }} disabled={busy}>
                                {busy ? "Logging..." : "Login"}
                            </motion.button>

                            <motion.button type="button" className="laf-btn laf-ghost" whileTap={{ scale: 0.98 }} onClick={() => nav("/")}>
                                Back
                            </motion.button>
                        </div>

                        <div className="laf-footer">
                            <button type="button" className="laf-link" onClick={() => nav("/user/signup")}>Create account</button>
                            
                            {/* ⭐ FORGET PASSWORD BUTTON ADDED HERE */}
                            <button type="button" className="laf-link" onClick={handleForgotPassword}>Forget Password?</button>

                            <small className="laf-note">Login as NGO/Hospital via their specific pages</small>
                        </div>
                    </form>
                </div>
            </motion.section>

            {/* Scoped styles (Same as before) */}
            <style>{`
            :root{
                --bg1: #04060b;
                --bg2: #071428;
                --muted: #b8c7d9;
                --glass: rgba(255,255,255,0.03);
                --accent-1: #ff6b6b;
                --accent-2: #7c3aed;
                --accent-3: #06b6d4;
            }

            /* page */
            .laf-root {
                min-height: 100vh;
                height: 100vh;
                width: 100vw;
                overflow: hidden;
                background: radial-gradient(circle at 10% 20%, rgba(255,107,107,0.06), transparent 8%),
                            linear-gradient(180deg, var(--bg1), var(--bg2));
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue';
                color: var(--muted);
                position: relative;
            }

            .laf-bg{ position:absolute; inset:0; z-index:0; pointer-events:none;}
            .blob { position:absolute; filter:blur(72px); opacity:0.12; mix-blend-mode:screen; border-radius:40%;}
            .b1{ width:760px; height:760px; left:-220px; top:-220px; background:linear-gradient(135deg,#ff7a7a,#ffb86b); }
            .b2{ width:520px; height:520px; right:-120px; top:-80px; background:linear-gradient(135deg,#7dd3fc,#93c5fd); }
            .b3{ width:360px; height:360px; left:18%; bottom:-110px; background:linear-gradient(135deg,#bbf7d0,#86efac); }

            /* floating items container positions */
            .laf-f{ position:absolute; z-index:1; pointer-events:none; opacity:0.98; }
            .la-heart{ left:6%; top:10%; transform:translate(-8%,-8%); }
            .la-hospital{ right:6%; top:6%; }
            .la-ngo{ left:6%; bottom:8%; }
            .la-child{ right:16%; bottom:6%; }
            .la-vaccine{ left:46%; top:6%; transform:translateX(-50%); }
            .la-tool{ left:6%; top:44%; opacity:0.95; }

            /* center card */
            .laf-center { position:relative; z-index:6; width:100%; max-width:980px; padding:20px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; }
            .laf-card { width:100%; display:flex; gap:22px; padding:18px; border-radius:16px; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); box-shadow: 0 28px 80px rgba(2,6,23,0.6); border: 1px solid rgba(255,255,255,0.04); backdrop-filter: blur(6px); }

            .laf-head { width:36%; padding:14px 8px; display:flex; flex-direction:column; gap:8px; justify-content:center; }
            .laf-head h1 { margin:0; color:#fff; font-size:28px; letter-spacing:0.2px; }
            .laf-sub { margin:0; color:var(--muted); font-size:13px; }

            .laf-form { width:64%; display:flex; flex-direction:column; gap:12px; padding:4px 6px; }
            .laf-label { display:flex; flex-direction:column; color:var(--muted); font-size:13px; }
            .laf-input { margin-top:8px; padding:12px 14px; border-radius:10px; background: rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); color:#f8fafc; outline:none; }
            .laf-input::placeholder { color: rgba(255,255,255,0.35); }

            .laf-actions { display:flex; gap:12px; margin-top:6px; align-items:center; }
            .laf-btn { padding:12px 14px; border-radius:10px; border:0; cursor:pointer; font-weight:700; min-width:120px; }
            .laf-primary { background: linear-gradient(90deg, var(--accent-1), #fb7185); color:white; box-shadow: 0 8px 30px rgba(255,107,107,0.12); }
            .laf-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.04); color:var(--muted); }

            .laf-footer { display:flex; justify-content:space-between; align-items:center; margin-top:10px; gap:12px; }
            .laf-link { background:none; border:0; color:var(--muted); text-decoration:underline; cursor:pointer; }
            .laf-note { color:var(--muted); font-size:12px; }

            .laf-error { background: rgba(255,80,80,0.08); padding:10px 12px; border-radius:10px; color:#ffd2d2; border:1px solid rgba(255,80,80,0.06); }

            /* responsiveness */
            @media (max-width:980px) {
                .laf-card { flex-direction:column; gap:14px; padding:12px; }
                .laf-head { width:100%; text-align:center; padding:6px 0; }
                .laf-form { width:100%; }
                /* hide floating lotties on small devices to avoid clutter/performance issues */
                .laf-f { display:none; }
            }
            @media (max-width:560px) {
                .laf-head h1 { font-size:20px; }
                .laf-input { font-size:14px; padding:10px; }
            }
            `}</style>
        </div>
    );
}






