// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; 

// // ----------------------------------------------------
// // 1. GLOBAL ANIMATION VARIANTS AND DATA
// // ----------------------------------------------------

// const itemVariants = {
//   hidden: { opacity: 0, x: -50, scale: 0.9 },
//   visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } },
// };

// // 🎯 FIX: 'factor_level' और 'age' हटाए गए क्योंकि API उनका उपयोग नहीं करता है
// const initialFormData = {
//   heamophilia_type: "A",
//   situation: "minor",
//   factorType: "VIII", // 🎯 FIX: Initial value changed to match API
//   weight: "",
// };

// // ----------------------------------------------------
// // 2. BACKGROUND ANIMATION COMPONENT (Floating Cells/DNA)
// // ----------------------------------------------------
// const FloatingAnimation = () => {
//   const particles = Array.from({ length: 25 });
//   // ... (Floating animation logic remains the same) ...
//   const floatVariants = {
//     start: (i) => ({
//       y: ['-10vh', '110vh'],
//       x: [(i % 5) * 5 + 5 + '%', (i % 5) * -5 + 5 + '%'],
//       scale: [0.8, 1.2, 0.8],
//       opacity: [0.3, 0.7, 0.3],
//       transition: {
//         y: { duration: 25 + Math.random() * 15, repeat: Infinity, ease: 'linear', delay: Math.random() * 20 },
//         x: { duration: 10 + Math.random() * 10, repeat: Infinity, ease: 'easeInOut' },
//         scale: { duration: 5 + Math.random() * 5, repeat: Infinity, ease: 'easeInOut' },
//         opacity: { duration: 5 + Math.random() * 5, repeat: Infinity, ease: 'easeInOut' },
//       },
//     }),
//   };

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {particles.map((_, i) => (
//         <motion.div
//           key={i}
//           custom={i}
//           variants={floatVariants}
//           initial="start"
//           animate="start"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             width: `${10 + Math.random() * 30}px`,
//             height: `${10 + Math.random() * 30}px`,
//             borderRadius: i % 3 === 0 ? '50%' : '25%', 
//             backgroundColor: i % 2 === 0 ? 'rgba(255, 60, 100, 0.5)' : 'rgba(0, 200, 255, 0.4)',
//             zIndex: 0,
//             filter: 'blur(1px)',
//             position: 'absolute',
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // ----------------------------------------------------
// // 3. ANIMATED INPUT COMPONENT
// // ----------------------------------------------------
// const AnimatedInput = ({ label, name, type = "text", value, onChange, options }) => {
//     // Numeric check adjusted for remaining fields
//     const isNumeric = name === 'weight';
//     const inputType = isNumeric ? "text" : type;
    
//     return (
//         <motion.div variants={itemVariants} className="mb-6">
//             <label className="block text-purple-300 text-sm font-semibold mb-2">{label}</label>
//             {options ? (
//                 <motion.select
//                     name={name}
//                     value={value}
//                     onChange={onChange}
//                     whileFocus={{ scale: 1.01, borderColor: '#a78bfa' }}
//                     className="w-full p-3 bg-[#1e0e42] border border-fuchsia-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300 shadow-md"
//                 >
//                     {options.map((option) => (
//                         <option key={option.value} value={option.value} className="bg-[#12072e]">
//                             {option.label}
//                         </option>
//                     ))}
//                 </motion.select>
//             ) : (
//                 <motion.input
//                     type={inputType}
//                     name={name}
//                     value={value}
//                     onChange={onChange}
//                     placeholder={`Enter ${label}`}
//                     pattern={isNumeric ? "[0-9]*" : undefined}
//                     inputMode={isNumeric ? "numeric" : undefined}
//                     whileFocus={{ scale: 1.01, boxShadow: "0 0 15px rgba(0, 255, 255, 0.6)" }}
//                     className="w-full p-3 bg-[#1e0e42] border border-fuchsia-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300 shadow-md"
//                     required
//                 />
//             )}
//         </motion.div>
//     );
// };


// // ----------------------------------------------------
// // 4. FACTOR CALCULATOR COMPONENT (Main Logic)
// // ----------------------------------------------------
// export default function FactorCalculator() {
//   // STATE DEFINITIONS
//   const [formData, setFormData] = useState(initialFormData);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const nav = useNavigate();
    
//   // FUNCTION DEFINITIONS
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);
//     setError(null);
    
//     // Check if weight is valid
//     if (!formData.weight || isNaN(Number(formData.weight))) {
//         setError(`Please enter a valid number for Weight (kg).`);
//         setLoading(false);
//         return;
//     }
    
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/healthtech/ai_factor/aiFactorCalculate", 
//         formData, 
//         { 
//           headers: {
//             'Content-Type': 'application/json' 
//           }
//         }
//       );
//       setResult(response.data);
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message || "An unknown network error occurred.";
//       setError(`Calculation failed: ${errorMessage}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0d0617] text-white p-8 relative overflow-hidden">
        
//       <FloatingAnimation />
      
//       <div className="relative z-10">
//         <button onClick={() => nav(-1)} className="text-cyan-400 mb-6 hover:text-pink-300 transition flex items-center">
//           <span className="text-xl mr-2">←</span> Back to Home
//         </button>

//         <motion.div
//           initial={{ opacity: 0, y: -50, rotateX: 5 }}
//           animate={{ opacity: 1, y: 0, rotateX: 0 }}
//           transition={{ duration: 1, type: "spring", stiffness: 50 }}
//           className="max-w-4xl mx-auto p-12 bg-[#12072e] rounded-3xl shadow-[0_0_80px_rgba(200,0,255,0.4)] border-4 border-fuchsia-600/50 backdrop-blur-md"
//         >
//           <h2 className="text-6xl font-black mb-4 text-center tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-red-500">
//             🩸 Factor Dose AI 💉
//           </h2>
//           <p className="text-center text-lg text-purple-300 mb-10 font-light">
//             Calculate precise clotting factor replacement based on patient biometrics and clinical need.
//           </p>

//           <motion.form 
//               onSubmit={handleSubmit}
//               initial="hidden"
//               animate="visible"
//               variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
//               className="space-y-4"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
//               {/* Only required inputs are kept: Type, Situation, Factor Type, Weight */}
//               <AnimatedInput 
//                   label="Hemophilia Type" 
//                   name="heamophilia_type" 
//                   value={formData.heamophilia_type} 
//                   onChange={handleChange}
//                   options={[
//                       { value: "A", label: "Hemophilia A (Factor VIII)" },
//                       { value: "B", label: "Hemophilia B (Factor IX)" },
//                   ]}
//               />
//               <AnimatedInput 
//                   label="Clinical Situation" 
//                   name="situation" 
//                   value={formData.situation} 
//                   onChange={handleChange}
//                   options={[
//                       { value: "minor", label: "Minor Bleeding/Procedure (30% Target)" },
//                       { value: "moderate", label: "Moderate Bleeding/Surgery (40% Target)" },
//                       { value: "major", label: "Major Bleeding/Surgery (50% Target)" },
//                   ]}
//               />
//               <AnimatedInput 
//                   label="Factor Type" 
//                   name="factorType" 
//                   value={formData.factorType} 
//                   onChange={handleChange}
//                   options={[
//                       { value: "VIII", label: "Factor VIII Concentrate" }, // 🎯 FIX: Value is "VIII"
//                       { value: "IX", label: "Factor IX Concentrate" },     // 🎯 FIX: Value is "IX"
//                   ]}
//               />
              
//               <AnimatedInput label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
              
//               {/* NOTE: 'Current Factor Level (%)' and 'Age (Years)' are removed/omitted as API logic does not use them. */}
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.02, boxShadow: "0 0 25px #ff0077" }}
//               whileTap={{ scale: 0.96 }}
//               type="submit"
//               disabled={loading}
//               className="w-full mt-12 p-4 bg-gradient-to-r from-red-600 to-pink-500 rounded-xl text-2xl font-extrabold shadow-2xl transition duration-300 disabled:opacity-50 flex justify-center items-center transform hover:rotate-1"
//             >
//               {loading ? (
//                   <motion.div 
//                       animate={{ rotate: 360 }} 
//                       transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
//                       className="w-6 h-6 border-4 border-t-4 border-t-white border-red-300 rounded-full mr-3"
//                   ></motion.div>
//               ) : (
//                   <span className="flex items-center">
//                       <span className="mr-3 text-4xl leading-none">🚀</span> ANALYZE & CALCULATE
//                   </span>
//               )}
//             </motion.button>
//           </motion.form>

//           {/* Result/Error Display Section */}
//           {error && (
//             <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="mt-10 p-5 bg-red-900/40 border-l-4 border-red-500 rounded-lg text-red-300 shadow-2xl">
//               ❌ **ERROR IN FACTOR ANALYSIS:** {error}
//             </motion.div>
//           )}

//           {result && (
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="mt-10 p-6 bg-cyan-900/40 border-4 border-cyan-500 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.4)]"
//             >
//               <h3 className="text-3xl font-bold text-cyan-400 mb-4 flex items-center">
//                 <span className="text-4xl mr-3">✅</span> Optimal Dose Result
//               </h3>
//               <pre className="whitespace-pre-wrap font-mono text-lg p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-inner text-green-300 overflow-auto">
//                   {JSON.stringify(result, null, 2)}
//               </pre>
//               <p className="mt-4 text-sm text-cyan-200 italic">
//                   *This factor calculation is based on AI simulation. Always consult a hematologist before treatment.*
//               </p>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, type: "spring", stiffness: 70, damping: 18 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 }
  }
};

const pillVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.08,
    y: -4,
    transition: { type: "spring", stiffness: 220, damping: 10 }
  }
};

const initialFormData = {
  heamophilia_type: "A",
  situation: "minor",
  factorType: "VIII",
  weight: ""
};

const FloatingAnimation = () => {
  const particles = Array.from({ length: 40 });
  const floatVariants = {
    start: (i) => ({
      y: ["-10vh", "110vh"],
      x: [((i % 10) * 10) + "%", ((i % 10) * 10 + 8) + "%"],
      scale: [0.6, 1.5, 0.6],
      opacity: [0.1, 0.9, 0.1],
      rotate: [0, 360],
      transition: {
        y: { duration: 25 + Math.random() * 20, repeat: Infinity, ease: "linear" },
        x: { duration: 10 + Math.random() * 12, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 5 + Math.random() * 7, repeat: Infinity },
        opacity: { duration: 6 + Math.random() * 6, repeat: Infinity },
        rotate: { duration: 20 + Math.random() * 15, repeat: Infinity, ease: "linear" }
      }
    })
  };
  const particleColors = [
    { bg: "#FF1493", shadow: "rgba(255, 20, 147, 0.8)" },
    { bg: "#00CED1", shadow: "rgba(0, 206, 209, 0.8)" },
    { bg: "#FFD700", shadow: "rgba(255, 215, 0, 0.8)" },
    { bg: "#00FF00", shadow: "rgba(0, 255, 0, 0.8)" },
    { bg: "#1E90FF", shadow: "rgba(30, 144, 255, 0.8)" },
    { bg: "#FF6347", shadow: "rgba(255, 99, 71, 0.8)" },
    { bg: "#00BFFF", shadow: "rgba(0, 191, 255, 0.8)" },
    { bg: "#FF69B4", shadow: "rgba(255, 105, 180, 0.8)" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(circle at 0% 0%, rgba(255, 20, 147, 0.37) 0%, transparent 50%),
          radial-gradient(circle at 100% 0%, rgba(30, 144, 255, 0.37) 0%, transparent 50%),
          radial-gradient(circle at 0% 100%, rgba(0, 255, 100, 0.32) 0%, transparent 50%),
          radial-gradient(circle at 100% 100%, rgba(255, 215, 0, 0.32) 0%, transparent 50%)
        `,
        mixBlendMode: "screen"
      }} />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: "-100px",
          background: `
            conic-gradient(
              from 0deg,
              rgba(255, 20, 147, 0.33),
              rgba(30, 144, 255, 0.33),
              rgba(0, 255, 100, 0.33),
              rgba(255, 215, 0, 0.33),
              rgba(255, 20, 147, 0.33)
            )
          `,
          opacity: 0.8
        }}
      />
      {particles.map((_, i) => {
        const color = particleColors[i % particleColors.length];
        return (
          <motion.div
            key={i}
            custom={i}
            variants={floatVariants}
            initial="start"
            animate="start"
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${10 + Math.random() * 35}px`,
              height: `${10 + Math.random() * 35}px`,
              borderRadius: i % 2 === 0 ? "50%" : "30%",
              backgroundColor: color.bg,
              boxShadow: `0 0 30px ${color.shadow}, 0 0 60px ${color.shadow}`,
              filter: "blur(1px)",
              zIndex: 0,
              mixBlendMode: "screen",
              opacity: 0.7
            }}
          />
        );
      })}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 30%, rgba(30, 144, 255, 0.41), transparent 60%)`
        }}
      />
    </div>
  );
};
const AnimatedInput = ({ label, name, type = "text", value, onChange, options }) => {
  const isNumeric = name === "weight";
  return (
    <motion.div variants={itemVariants} className="mb-6 relative group">
      <label style={{
        display: "block",
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: "#00FF88",
        marginBottom: "8px",
        fontWeight: "600",
        textShadow: "0 0 10px rgba(0, 255, 136, 0.7)"
      }} >{label}</label>
      {options ? (
        <motion.select
          name={name}
          value={value}
          onChange={onChange}
          whileFocus={{ scale: 1.02 }}
          style={{
            width: "100%",
            padding: "12px 14px",
            background: "linear-gradient(135deg, rgba(30, 0, 100, 0.92), rgba(50, 10, 80, 0.92))",
            border: "2px solid #FF1493",
            borderRadius: "12px",
            fontSize: "14px",
            color: "#FFFFFF",
            appearance: "none",
            cursor: "pointer",
            boxShadow: "0 0 25px rgba(255, 20, 147, 0.7), inset 0 0 15px rgba(255, 20, 147, 0.2)",
            outline: "none"
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} style={{ background: "#1a0033" }}>
              {option.label}
            </option>
          ))}
        </motion.select>
      ) : (
        <motion.input
          type={isNumeric ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label}`}
          pattern={isNumeric ? "[0-9]*" : undefined}
          inputMode={isNumeric ? "numeric" : undefined}
          whileFocus={{ scale: 1.02 }}
          style={{
            width: "100%",
            padding: "12px 14px",
            background: "linear-gradient(135deg, rgba(0, 100, 150, 0.92), rgba(20, 50, 120, 0.92))",
            border: "2px solid #00CED1",
            borderRadius: "12px",
            fontSize: "14px",
            color: "#FFFFFF",
            boxShadow: "0 0 25px rgba(0, 206, 209, 0.7), inset 0 0 15px rgba(0, 206, 209, 0.2)",
            outline: "none"
          }}
        />
      )}
    </motion.div>
  );
};

const CartoonDoctor = () => {
  return (
    <motion.div
      className="flex items-center justify-center w-full"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "220px",
          height: "240px",
          borderRadius: "28px",
          background: `linear-gradient(135deg, #FF1493, #FFD700, #00CED1, #00FF88)`,
          boxShadow: "0 0 60px rgba(255, 20, 147, 1), 0 0 100px rgba(30, 144, 255, 0.8)",
          padding: "3px",
          position: "relative"
        }}
      >
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: "26px",
          background: "linear-gradient(135deg, rgba(10, 5, 30, 0.96), rgba(20, 10, 40, 0.98))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Animated background glows */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }} 
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(30, 144, 255, 0.8), transparent)",
              filter: "blur(26px)"
            }}
          />
          <motion.div
            animate={{ scale: [1.1, 0.8, 1.1] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{
              position: "absolute",
              bottom: "-13%",
              left: "-12%",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0, 255, 100, 0.8), transparent)",
              filter: "blur(23px)"
            }}
          />
          {/* Character Body */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "relative",
              zIndex: 10,
              width: "94px",
              height: "124px",
              background: "linear-gradient(180deg, #F5E6D3, #E8D4C0)",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "16px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.7)"
            }}
          >
            {/* Head */}
            <div style={{
              width: "40px",
              height: "40px",
              background: "#F5DEB3",
              borderRadius: "50%",
              border: "4px solid #D2691E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              marginBottom: "8px"
            }}>
              {/* Eyes */}
              <div style={{
                position: "absolute",
                width: "24px",
                height: "10px",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <div style={{
                  width: "7px",
                  height: "7px",
                  background: "#000",
                  borderRadius: "50%"
                }} />
                <div style={{
                  width: "7px",
                  height: "7px",
                  background: "#000",
                  borderRadius: "50%"
                }} />
              </div>
              {/* Smile */}
              <div style={{
                position: "absolute",
                bottom: "5px",
                width: "17px",
                height: "8px",
                border: "2px solid #000",
                borderTop: "none",
                borderRadius: "0 0 15px 15px"
              }} />
            </div>
            <div style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginTop: "4px"
            }}>
              Dr. Clot
            </div>
            <div style={{
              fontSize: "10px",
              color: "#555",
              textAlign: "center",
              marginTop: "4px"
            }}>
              Dose
              <br />
              Planner
            </div>
            {/* Syringe Animation */}
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                position: "absolute",
                right: "-20px",
                bottom: "18px",
                width: "30px",
                height: "10px",
                background: "linear-gradient(90deg, #FF1493, #FFD700)",
                borderRadius: "20px",
                boxShadow: "0 0 20px rgba(255, 20, 147, 0.9)"
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function FactorCalculator() {
  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    if (!formData.weight || isNaN(Number(formData.weight))) {
      setError("Please enter a valid number for Weight (kg).");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        "https://healthtracker-5.onrender.com/healthtech/ai_factor/aiFactorCalculate",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Network error occurred.";
      setError(`Calculation failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: `
        linear-gradient(135deg, #0a0020, #1a0033 42%, #FFD700 78%, #1E90FF 100%),
        radial-gradient(circle at 7% 15%, rgba(255, 20, 147, 0.38), transparent 50%),
        radial-gradient(circle at 88% 88%, rgba(30, 144, 255, 0.37), transparent 50%)
      `,
      color: "#FFFFFF",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box"
    }}>
      <FloatingAnimation />
      {/* --- Top Bar --- */}
      <div style={{
        position: "relative", zIndex: 20, width: "100%", maxWidth: "100vw", margin: "0 auto 32px", padding: "24px 6vw"
      }}>
        <button
          onClick={() => nav(-1)}
          style={{
            background: "none",
            border: "none",
            color: "#00CED1",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            textDecoration: "none"
          }}
        >← Back to Home</button>
        <div style={{
          position: "relative",
          zIndex: 20,
          width: "100%",
          margin: "24px 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          {["🚀 Driven", "⚡ Real-time Dose", "👁️ Clinical Visualizer"].map((pill, idx) => (
            <motion.div
              key={pill}
              variants={pillVariants}
              initial="rest"
              whileHover="hover"
              style={{
                padding: "12px 28px",
                borderRadius: "24px",
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                background:
                  idx === 0
                    ? "linear-gradient(135deg,#1E90FF,#00CED1)"
                    : idx === 1
                    ? "linear-gradient(135deg,#00FF88,#FFD700)"
                    : "linear-gradient(135deg,#FF1493,#FF69B4)",
                color: "#000",
                fontWeight: "700",
                boxShadow:
                  idx === 0
                    ? "0 0 25px rgba(30,144,255,0.8)"
                    : idx === 1
                    ? "0 0 25px rgba(255,215,0,0.8)"
                    : "0 0 25px rgba(255,20,147,0.8)"
              }}
            >{pill}</motion.div>
          ))}
        </div>
      </div>
      {/* Full-page layout: grid */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100vw",
          maxWidth: "none",
          margin: "0",
          minHeight: "78vh",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(375px,1fr))",
          gap: "4vw",
          alignItems: "start",
          padding: "50px 6vw"
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- FORM SIDE --- */}
        <div>
          {/* --- HEADER --- */}
          <div style={{ textAlign: "center", marginBottom: "38px" }}>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              style={{
                fontSize: "clamp(34px,9vw,78px)",
                fontWeight: "900",
                background: `
                  linear-gradient(120deg,#00CED1,#FFD700,#FF1493,#00FF88,#1E90FF)
                `,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 40px rgba(0,206,209,0.8)",
                margin: "0"
              }}
            >🩸 Factor Dose 💉</motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                marginTop: "18px",
                fontSize: "18px",
                background: `
                  linear-gradient(90deg,#00CED1,#00FF88,#FFD700,#FF1493)
                `,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                maxWidth: "660px",
                margin: "14px auto 0"
              }}
            >
              Hyper-visual calculator for precise clotting factor replacement.
            </motion.p>
          </div>
          {/* ---- FORM ---- */}
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "32px" }}
          >
            <AnimatedInput
              label="Hemophilia Type"
              name="heamophilia_type"
              value={formData.heamophilia_type}
              onChange={handleChange}
              options={[
                { value: "A", label: "Hemophilia A (Factor VIII)" },
                { value: "B", label: "Hemophilia B (Factor IX)" }
              ]}
            />
            <AnimatedInput
              label="Clinical Situation"
              name="situation"
              value={formData.situation}
              onChange={handleChange}
              options={[
                { value: "minor", label: "Minor Bleeding / Procedure · 30% Target" },
                { value: "moderate", label: "Moderate Bleeding / Surgery · 40% Target" },
                { value: "major", label: "Major Bleeding / Surgery · 50% Target" }
              ]}
            />
            <AnimatedInput
              label="Factor Type"
              name="factorType"
              value={formData.factorType}
              onChange={handleChange}
              options={[
                { value: "VIII", label: "Factor VIII Concentrate" },
                { value: "IX", label: "Factor IX Concentrate" }
              ]}
            />
            <AnimatedInput
              label="Weight (kg)"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </motion.form>
          {/* ---- BUTTON ---- */}
          <motion.button
            onClick={handleSubmit}
            disabled={loading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            style={{
              width: "100%",
              padding: "16px 24px",
              borderRadius: "16px",
              fontSize: "18px",
              fontWeight: "700",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              background: `
                linear-gradient(135deg, #FF1493, #FF69B4, #1E90FF, #00CED1)
              `,
              backgroundSize: "200% 200%",
              color: "#000",
              boxShadow: "0 0 50px rgba(255,20,147,0.9),0 0 100px rgba(30,144,255,0.65)",
              opacity: loading ? 0.6 : 1,
              position: "relative",
              overflow: "hidden"
            }}
          >
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: "20px", height: "20px",
                    border: "3px solid rgba(0, 0, 0, 0.4)",
                    borderTopColor: "#000",
                    borderRadius: "50%"
                  }}
                />
                <span>Analyzing...</span>
              </div>
            ) : (
              <span>🚀 ANALYZE & CALCULATE DOSE</span>
            )}
          </motion.button>
          {/* ---- ERROR ---- */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "linear-gradient(135deg, rgba(255, 0, 50, 0.23), rgba(139, 0, 0, 0.17))",
                border: "2px solid #FF0000",
                borderRadius: "12px",
                color: "#FF6B6B",
                fontSize: "14px",
                boxShadow: "0 0 38px rgba(255,0,0,0.5)"
              }}
            >⚠️ <strong>Error:</strong> {error}</motion.div>
          )}
          {/* ---- RESULT ---- */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                marginTop: "32px",
                padding: "24px",
                background: `linear-gradient(135deg, rgba(0,206,209,0.18), rgba(30,144,255,0.15))`,
                border: "2px solid #00CED1",
                borderRadius: "16px",
                boxShadow: "0 0 40px rgba(0,206,209,0.8),inset 0 0 20px rgba(30,144,255,0.18)"
              }}
            >
              <h3 style={{ color: "#00CED1", fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>
                ✅ Optimal Dose Result
              </h3>
              <pre style={{
                background: "rgba(0,0,0,0.68)",
                padding: "16px",
                borderRadius: "12px",
                color: "#00FF88",
                fontSize: "14px",
                overflow: "auto",
                maxHeight: "300px",
                border: "1px solid rgba(0,255,136,0.25)"
              }}>
                {JSON.stringify(result, null, 2)}
              </pre>
              <p style={{
                marginTop: "12px",
                fontSize: "12px",
                color: "#AAA",
                fontStyle: "italic"
              }}>
                This is AI-simulated data for decision support only.
              </p>
            </motion.div>
          )}
        </div>
        {/* ---- Cartoon Doctor ---- */}
        <CartoonDoctor />
      </motion.div>
    </div>
  );
}
