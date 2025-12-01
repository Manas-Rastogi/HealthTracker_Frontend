// // src/pages/UserHome.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function UserHome() {
//   const navigate = useNavigate();

//   const [ngoName, setNgoName] = useState("");
//   const [ngoCity, setNgoCity] = useState("");

//   const [hospitalName, setHospitalName] = useState("");
//   const [hospitalCity, setHospitalCity] = useState("");

//   const searchNgo = () => {
//     navigate(`/search/ngo?name=${ngoName}&city=${ngoCity}`);
//   };

//   const searchHospital = () => {
//     navigate(`/search/hospital?name=${hospitalName}&city=${hospitalCity}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#05101f] to-[#0a1a2b] text-white p-8">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-4xl font-bold text-center mb-10"
//       >
//         Welcome to HealthTraker 👨‍⚕️
//       </motion.h1>

//       <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
//         {/* NGO Search */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md"
//         >
//           <h2 className="text-xl font-semibold mb-4">Search NGOs</h2>

//           <input
//             className="w-full mb-3 p-2 rounded bg-black/20"
//             placeholder="NGO Name"
//             value={ngoName}
//             onChange={(e) => setNgoName(e.target.value)}
//           />
//           <input
//             className="w-full mb-3 p-2 rounded bg-black/20"
//             placeholder="City"
//             value={ngoCity}
//             onChange={(e) => setNgoCity(e.target.value)}
//           />

//           <button
//             onClick={searchNgo}
//             className="w-full py-2 rounded bg-blue-500 hover:bg-blue-600"
//           >
//             Search NGO
//           </button>
//         </motion.div>

//         {/* Hospital Search */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md"
//         >
//           <h2 className="text-xl font-semibold mb-4">Search Hospitals</h2>

//           <input
//             className="w-full mb-3 p-2 rounded bg-black/20"
//             placeholder="Hospital Name"
//             value={hospitalName}
//             onChange={(e) => setHospitalName(e.target.value)}
//           />
//           <input
//             className="w-full mb-3 p-2 rounded bg-black/20"
//             placeholder="City"
//             value={hospitalCity}
//             onChange={(e) => setHospitalCity(e.target.value)}
//           />

//           <button
//             onClick={searchHospital}
//             className="w-full py-2 rounded bg-green-500 hover:bg-green-600"
//           >
//             Search Hospital
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function UserHome() {
//   const nav = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0d1c3c] text-white p-8 flex flex-col items-center">
//       <h1 className="text-4xl font-bold mb-10">Welcome User 👋</h1>

//       <div className="flex gap-10">
//         {/* NGO SEARCH */}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => nav("/search/ngo")}
//           className="px-10 py-6 bg-gradient-to-r from-pink-600 to-red-500 rounded-2xl text-2xl font-semibold shadow-lg hover:shadow-2xl"
//         >
//           🔍 Search NGO
//         </motion.button>

//         {/* HOSPITAL SEARCH */}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => nav("/search/hospital")}
//           className="px-10 py-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-2xl font-semibold shadow-lg hover:shadow-2xl"
//         >
//           🏥 Search Hospital
//         </motion.button>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"; // Animation library

// export default function UserHome() {
//   const nav = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0d1c3c] text-white p-8 flex flex-col items-center">
//       <h1 className="text-5xl font-extrabold mb-12 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//         Welcome User 👋
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//         {/* NGO SEARCH */}
//         <motion.button
//           whileHover={{ scale: 1.05, rotate: 1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => nav("/search/ngo")}
//           className="w-full px-8 py-8 bg-gradient-to-r from-pink-600 to-red-500 rounded-2xl text-2xl font-semibold shadow-2xl hover:shadow-pink-800/50 transition-all duration-300 transform hover:-translate-y-1"
//         >
//           🔍 Search NGO
//         </motion.button>

//         {/* HOSPITAL SEARCH */}
//         <motion.button
//           whileHover={{ scale: 1.05, rotate: -1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => nav("/search/hospital")}
//           className="w-full px-8 py-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl text-2xl font-semibold shadow-2xl hover:shadow-blue-800/50 transition-all duration-300 transform hover:-translate-y-1"
//         >
//           🏥 Search Hospital
//         </motion.button>

//         {/* 🧪 FACTOR CALCULATION BUTTON (New Addition) */}
//         <motion.button
//           whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.8)" }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => nav("/calculate/factor")}
//           className="w-full px-8 py-8 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-purple-800/50 transition-all duration-300 transform hover:-translate-y-1 border-4 border-purple-400"
//         >
//           🧬 Factor Calculation
//         </motion.button>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// // Animated Medical Icons for Homepage UI
// const medicalIcons = [
//   { symbol: "💉", color: "#63e3e1", speed: 15, delay: 0 },
//   { symbol: "🩸", color: "#ff5b6d", speed: 13, delay: 2 },
//   { symbol: "🏥", color: "#85a6ff", speed: 18, delay: 3 },
//   { symbol: "🧬", color: "#b0ffe4", speed: 19, delay: 5 },
//   { symbol: "❤️", color: "#ff8ab1", speed: 11, delay: 9 },
//   { symbol: "🫀", color: "#ffc871", speed: 16, delay: 6 }
// ];

// // Floating Medical Icons Animation Component
// function FloatingMedicalIcons() {
//   return (
//     <div style={{
//       position: "absolute",
//       top: "19vh",
//       left: 0,
//       width: "100vw",
//       pointerEvents: "none",
//       zIndex: 2,
//       height: "70px"
//     }}>
//       {medicalIcons.map((icon, idx) => (
//         <motion.span
//           key={idx}
//           initial={{ x: -70, y: 10 + idx * 15, opacity: 0.6 + idx * 0.1, scale: 1.25 }}
//           animate={{ x: "102vw" }}
//           transition={{
//             duration: icon.speed,
//             repeat: Infinity,
//             repeatType: "loop",
//             delay: icon.delay
//           }}
//           style={{
//             fontSize: "44px",
//             marginLeft: "12px",
//             marginRight: "8px",
//             filter: `drop-shadow(0 2px 15px ${icon.color})`,
//           }}
//         >
//           {icon.symbol}
//         </motion.span>
//       ))}
//     </div>
//   );
// }

// export default function UserHome() {
//   const nav = useNavigate();

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         width: "100vw",
//         background: `
//           linear-gradient(110deg, #F2FBFD 0%, #DDEBF6 25%, #DEFCF9 49%, #FFE7C2 74%, #FFE7F7 100%),
//           radial-gradient(circle at 14% 14%, rgba(255,91,109,0.10), transparent 80%),
//           radial-gradient(circle at 90% 85%, rgba(99,227,225,0.12), transparent 80%)
//         `,
//         color: "#2b2d42",
//         position: "relative",
//         overflow: "hidden",
//         boxSizing: "border-box",
//         padding: "54px 0 0 0"
//       }}
//     >
//       {/* Floating Animated Medical Icons */}
//       <FloatingMedicalIcons />

//       {/* Overlapping Blobs for extra color */}
//       <div
//         style={{
//           pointerEvents: "none",
//           position: "absolute",
//           top: "-120px",
//           left: "-60px",
//           width: "280px",
//           height: "280px",
//           background: "radial-gradient(circle, #D2BFFF 52%, transparent 75%)",
//           filter: "blur(47px)",
//           zIndex: 1
//         }}
//       />
//       <div
//         style={{
//           pointerEvents: "none",
//           position: "absolute",
//           bottom: "-110px",
//           right: "-50px",
//           width: "250px",
//           height: "250px",
//           background: "radial-gradient(circle, #FFE7F7 72%, transparent 80%)",
//           filter: "blur(44px)",
//           zIndex: 1
//         }}
//       />

//       <div style={{
//         position: "relative",
//         zIndex: 12,
//         textAlign: "center",
//         marginBottom: "44px"
//       }}>
//         <h1
//           style={{
//             fontSize: "clamp(32px, 8vw, 70px)",
//             fontWeight: 900,
//             marginBottom: "16px",
//             letterSpacing: "1px",
//             background: `
//               linear-gradient(95deg,#63e3e1,#ff5b6d,#85a6ff,#ffc871)
//             `,
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             backgroundClip: "text",
//             textShadow: "0 0 18px #FFC871",
//             paddingTop: "17px"
//           }}
//         >
//           Welcome User 👋
//         </h1>
//         <motion.div
//           initial={{ opacity: 0, y: 18 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.22 }}
//           style={{
//             fontSize: "19px",
//             fontWeight: 500,
//             margin: "0 auto 28px",
//             maxWidth: "630px",
//             color: "#222",
//             background: `
//               linear-gradient(90deg,#63e3e1,#ff8ab1,#b0ffe4,#ffc871)
//             `,
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             backgroundClip: "text"
//           }}
//         >
//           This site helps hemophilia patients connect easily with NGOs, check availability of clotting factors in different cities, and instantly request medical help.<br />
//           We empower patients to communicate, find lifesaving medicine, and locate care at the right place—right on time, with real support and compassion.
//         </motion.div>
//       </div>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
//           gap: "32px",
//           width: "100%",
//           maxWidth: "1040px",
//           margin: "0 auto",
//           zIndex: 12
//         }}
//       >
//         <motion.button
//           whileHover={{ scale: 1.08, boxShadow: "0 0 28px #ff5b6d,0 0 36px #D2BFFF" }}
//           whileTap={{ scale: 0.96 }}
//           onClick={() => nav("/search/ngo")}
//           style={{
//             width: "100%",
//             padding: "37px 18px",
//             background: "linear-gradient(120deg,#FFE7C2,#ff5b6d,#FFE7F7)",
//             borderRadius: "27px",
//             fontSize: "2.0rem",
//             fontWeight: "800",
//             color: "#232323",
//             boxShadow:
//               "0 0 34px #FF8AB1, 0 0 22px #ffe7c2, 0 0 9px #fff",
//             border: "none",
//             transition: "all 0.21s",
//             position: "relative",
//             overflow: "hidden"
//           }}
//         >
//           🔍 Search NGO
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.08, boxShadow: "0 0 28px #63e3e1, 0 0 38px #85a6ff" }}
//           whileTap={{ scale: 0.96 }}
//           onClick={() => nav("/search/hospital")}
//           style={{
//             width: "100%",
//             padding: "37px 18px",
//             background: "linear-gradient(120deg,#63e3e1,#85a6ff,#DEFCF9)",
//             borderRadius: "27px",
//             fontSize: "2.0rem",
//             fontWeight: "800",
//             color: "#232323",
//             boxShadow:
//               "0 0 32px #63e3e1, 0 0 18px #85a6ff, 0 0 7px #fff",
//             border: "none",
//             transition: "all 0.21s",
//             position: "relative",
//             overflow: "hidden"
//           }}
//         >
//           🏥 Search Hospital
//         </motion.button>

//         <motion.button
//           whileHover={{
//             scale: 1.09,
//             boxShadow: "0 0 28px #b0ffe4, 0 0 34px #ffc871"
//           }}
//           whileTap={{ scale: 0.96 }}
//           onClick={() => nav("/calculate/factor")}
//           style={{
//             width: "100%",
//             padding: "37px 18px",
//             background: "linear-gradient(120deg,#ffc871,#b0ffe4,#DEFCF9)",
//             borderRadius: "27px",
//             fontSize: "2.0rem",
//             fontWeight: "800",
//             color: "#232323",
//             boxShadow:
//               "0 0 38px #b0ffe4, 0 0 22px #ffc871, 0 0 7px #fff",
//             border: "none",
//             transition: "all 0.21s",
//             position: "relative",
//             overflow: "hidden"
//           }}
//         >
//           🧬 Factor Calculation
//         </motion.button>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// COLORFUL ANIMATED WELCOME TEXT
function AnimatedText({ text }) {
  const colors = [
    "#ff0000", // Red
    "#ffa500", // Orange
    "#ffff00", // Yellow
    "#00bfff", // Sky blue
    "#8e44ad", // Purple
    "#0000ff", // Blue
  ];
  return (
    <h1 style={{
      fontWeight: 900,
      fontSize: "clamp(32px, 8vw, 70px)",
      marginBottom: 16,
      letterSpacing: "1px",
      background: `linear-gradient(95deg,${colors.join(",")})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow: "0 0 18px #151519",
      paddingTop: 17,
      display: 'inline-block'
    }}>
      {text.split(" ").map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: idx * 0.15 }}
          style={{
            marginRight: 7,
            display: "inline-block",
          }}
        >
          {word}
        </motion.span>
      ))}
      <motion.span
        initial={{ scale: 0, rotate: 10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: text.split(" ").length * 0.15 }}
        style={{ marginLeft: "18px" }}
      >👋</motion.span>
    </h1>
  );
}

// 15 ICONS ANIMATED ACROSS BACKGROUND (ALL DIRECTIONS, WHOLE UI)
function FloatingMedicalIcons() {
  // Icon config, repeated as needed for 15 total
  const icons = [
    { symbol: "💉", color: "#63e3e1" },
    { symbol: "🩸", color: "#ff5b6d" },
    { symbol: "🏥", color: "#85a6ff" },
    { symbol: "🧬", color: "#b0ffe4" },
    { symbol: "❤️", color: "#ff8ab1" },
    { symbol: "🫀", color: "#ffc871" }
  ];
  // Render 15 randomly configured icons
  return (
    <>
      {Array.from({ length: 15 }).map((_, idx) => {
        const icon = icons[idx % icons.length];
        // Random start and delta positions per icon
        const startX = Math.random() * window.innerWidth * 0.95;
        const startY = Math.random() * window.innerHeight * 0.88;
        const moveX = (Math.random() - 0.5) * 350;
        const moveY = (Math.random() - 0.5) * 210;
        return (
          <motion.span
            key={idx}
            initial={{ x: startX, y: startY, opacity: 0.85, scale: 1.27 }}
            animate={{
              x: [startX, startX + moveX, startX],
              y: [startY, startY + moveY, startY]
            }}
            transition={{
              duration: 13 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 2.5
            }}
            style={{
              fontSize: "44px",
              position: "absolute",
              zIndex: 2,
              left: 0,
              top: 0,
              filter: `drop-shadow(0 2px 15px ${icon.color})`,
              pointerEvents: "none"
            }}
          >
            {icon.symbol}
          </motion.span>
        );
      })}
    </>
  );
}

// MAIN UI COMPONENT
export default function UserHome() {
  const nav = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: `
          linear-gradient(110deg, #F2FBFD 0%, #DDEBF6 25%, #DEFCF9 49%, #FFE7C2 74%, #FFE7F7 100%),
          radial-gradient(circle at 14% 14%, rgba(255,91,109,0.10), transparent 80%),
          radial-gradient(circle at 90% 85%, rgba(99,227,225,0.12), transparent 80%)
        `,
        color: "#2b2d42",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        padding: "54px 0 0 0"
      }}
    >
      {/* Animated Medical Icons scattered across background */}
      <FloatingMedicalIcons />

      {/* Colored Blobs for extra effect */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: "-120px",
          left: "-60px",
          width: "280px",
          height: "280px",
          background: "radial-gradient(circle, #D2BFFF 52%, transparent 75%)",
          filter: "blur(47px)",
          zIndex: 1
        }}
      />
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          bottom: "-110px",
          right: "-50px",
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, #FFE7F7 72%, transparent 80%)",
          filter: "blur(44px)",
          zIndex: 1
        }}
      />

      {/* Welcome section */}
      <div style={{
        position: "relative",
        zIndex: 12,
        textAlign: "center",
        marginBottom: "44px"
      }}>
        <AnimatedText text="Welcome User" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.22 }}
          style={{
            fontSize: "19px",
            fontWeight: 500,
            margin: "0 auto 28px",
            maxWidth: "630px",
            color: "#222",
            background: `
              linear-gradient(90deg,#63e3e1,#ff8ab1,#b0ffe4,#ffc871)
            `,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          This site helps hemophilia patients connect easily with NGOs, check availability of clotting factors and medical help. We empower patients with real support and compassion.
        </motion.div>
      </div>

      {/* Buttons Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
          gap: "32px",
          width: "100%",
          maxWidth: "1040px",
          margin: "0 auto",
          zIndex: 12
        }}
      >
        <motion.button
          whileHover={{ scale: 1.08, boxShadow: "0 0 28px #ff5b6d,0 0 36px #D2BFFF" }}
          whileTap={{ scale: 0.96 }}
          onClick={() => nav("/search/ngo")}
          style={{
            width: "100%",
            padding: "37px 18px",
            background: "linear-gradient(120deg,#FFE7C2,#ff5b6d,#FFE7F7)",
            borderRadius: "27px",
            fontSize: "2.0rem",
            fontWeight: "800",
            color: "#232323",
            boxShadow:
              "0 0 34px #FF8AB1, 0 0 22px #ffe7c2, 0 0 9px #fff",
            border: "none",
            transition: "all 0.21s",
            position: "relative",
            overflow: "hidden"
          }}
        >
          🔍 Search NGO
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08, boxShadow: "0 0 28px #63e3e1, 0 0 38px #85a6ff" }}
          whileTap={{ scale: 0.96 }}
          onClick={() => nav("/search/hospital")}
          style={{
            width: "100%",
            padding: "37px 18px",
            background: "linear-gradient(120deg,#63e3e1,#85a6ff,#DEFCF9)",
            borderRadius: "27px",
            fontSize: "2.0rem",
            fontWeight: "800",
            color: "#232323",
            boxShadow:
              "0 0 32px #63e3e1, 0 0 18px #85a6ff, 0 0 7px #fff",
            border: "none",
            transition: "all 0.21s",
            position: "relative",
            overflow: "hidden"
          }}
        >
          🏥 Search Hospital
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.09,
            boxShadow: "0 0 28px #b0ffe4, 0 0 34px #ffc871"
          }}
          whileTap={{ scale: 0.96 }}
          onClick={() => nav("/calculate/factor")}
          style={{
            width: "100%",
            padding: "37px 18px",
            background: "linear-gradient(120deg,#ffc871,#b0ffe4,#DEFCF9)",
            borderRadius: "27px",
            fontSize: "2.0rem",
            fontWeight: "800",
            color: "#232323",
            boxShadow:
              "0 0 38px #b0ffe4, 0 0 22px #ffc871, 0 0 7px #fff",
            border: "none",
            transition: "all 0.21s",
            position: "relative",
            overflow: "hidden"
          }}
        >
          🧬 Factor Calculation
        </motion.button>
      </div>
    </div>
  );
}
