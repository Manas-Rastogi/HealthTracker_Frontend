// src/pages/HospitalView.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Hospital() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [hospital, setHospital] = useState(null);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`/serachHospital/view/${id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//         });
//         if (!res.ok) throw new Error("Failed to load hospital");
//         const data = await res.json();
//         setHospital(data);
//       } catch (err) {
//         setError("Hospital not found or server error.");
//       }
//     };

//     fetchData();
//   }, [id, token]);

//   if (error)
//     return (
//       <div className="p-10 text-center text-red-500 font-semibold">{error}</div>
//     );

//   if (!hospital)
//     return (
//       <div className="p-10 text-center text-white/70">Loading hospital...</div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0a1a33] text-white p-8">
//       <div className="max-w-4xl mx-auto">
//         <button
//           onClick={() => navigate(-1)}
//           className="px-3 py-2 bg-white/10 rounded-lg mb-6 hover:bg-white/20"
//         >
//           ← Back
//         </button>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl"
//         >
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-2xl font-bold">
//               {hospital.hospitalName?.slice(0, 1)}
//             </div>

//             <div>
//               <h1 className="text-3xl font-bold">{hospital.hospitalName}</h1>
//               <p className="text-slate-300">{hospital.city}</p>
//             </div>
//           </div>

//           <div className="mt-6 text-slate-200 leading-relaxed">
//             {hospital.description || "No description available."}
//           </div>

//           <div className="mt-8 flex gap-3">
//             <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
//               Book Appointment
//             </button>
//             <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
//               Contact
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { FaHospital, FaPhone, FaMapMarkerAlt, FaStethoscope, FaStar, FaHeart, FaClock } from "react-icons/fa";

export default function Hospital() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const controls = useAnimationControls();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/serachHospital/view/${id}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error("Failed to load hospital");
        const data = await res.json();
        setHospital(data);
        controls.start("visible");
      } catch (err) {
        setError("Hospital not found or server error.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-rose-900/20 via-red-900/10 to-rose-900/20 flex items-center justify-center p-8"
      >
        <div className="bg-gradient-to-r from-red-500/20 to-pink-600/20 backdrop-blur-xl border border-red-500/30 p-12 rounded-3xl text-center shadow-2xl max-w-md mx-auto animate-pulse">
          <FaHeart className="text-red-400 text-6xl mx-auto mb-4 animate-bounce" />
          <h1 className="text-2xl font-bold text-white mb-2">Oops!</h1>
          <p className="text-red-100/80">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (loading || !hospital) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-8 overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-emerald-900/20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-ping" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-8 pt-24">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="group mb-12 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl font-medium flex items-center gap-3 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
        >
          <motion.div 
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full group-hover:scale-110"
          />
          Back to Results
        </motion.button>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-8"
        >
          {/* Hero Card */}
          <motion.div 
            variants={itemVariants}
            className="relative bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-3xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-emerald-500/10 animate-pulse" />
            
            <div className="relative flex items-start gap-8">
              {/* Animated Logo */}
              <motion.div 
                variants={floatingVariants}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-3xl font-black shadow-2xl border-4 border-white/20"
                style={{ textShadow: '0 0 20px rgba(16,185,129,0.5)' }}
              >
                {hospital.hospitalName?.slice(0, 1)?.toUpperCase() || 'H'}
              </motion.div>

              {/* Hospital Info */}
              <div className="flex-1 min-w-0 pt-4">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-2 leading-tight"
                >
                  {hospital.hospitalName}
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-4 text-emerald-400/90"
                >
                  <FaMapMarkerAlt className="text-xl" />
                  <span className="text-xl font-semibold">{hospital.city}</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <span className="text-slate-300 ml-1">(4.8)</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="group p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all">
                <FaStethoscope className="text-3xl text-blue-400 group-hover:scale-110 mb-2" />
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-slate-300">Emergency</div>
              </div>
              <div className="group p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl border border-emerald-500/20 hover:border-emerald-400/40">
                <FaHospital className="text-3xl text-emerald-400 group-hover:scale-110 mb-2" />
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-slate-300">Beds</div>
              </div>
              <div className="group p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl border border-purple-500/20 hover:border-purple-400/40">
                <FaClock className="text-3xl text-purple-400 group-hover:scale-110 mb-2" />
                <div className="text-2xl font-bold text-white">15 min</div>
                <div className="text-slate-300">Avg Wait</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Description & Actions */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Description */}
            <motion.div className="bg-white/3 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl hover:shadow-emerald-500/20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-cyan-300">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-lg font-bold">ℹ️</div>
                About Hospital
              </h2>
              <div className="space-y-4 text-slate-200 leading-relaxed prose prose-invert max-w-none">
                <AnimatePresence>
                  {showMore && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {hospital.description || "This state-of-the-art facility offers comprehensive medical services with cutting-edge technology and experienced healthcare professionals dedicated to your well-being."}
                    </motion.p>
                  )}
                </AnimatePresence>
                {!showMore && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg line-clamp-3 cursor-pointer hover:text-white transition-colors"
                    onClick={() => setShowMore(true)}
                  >
                    {hospital.description?.substring(0, 150)}...
                    <span className="text-emerald-400 font-semibold ml-2 cursor-pointer hover:underline">Read More</span>
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="space-y-4 self-start">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34,197,94,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl border-2 border-emerald-400/50 backdrop-blur-xl text-xl flex items-center justify-center gap-4 hover:gap-6 transition-all duration-300"
              >
                <FaHeart className="text-2xl group-hover:scale-110" />
                Book Appointment Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-slate-700/50 to-slate-800/50 hover:from-slate-600 hover:to-slate-700 backdrop-blur-xl border border-white/20 text-white py-5 px-8 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                <FaPhone className="text-xl" />
                Call Hospital
                <span className="text-sm bg-white/10 px-3 py-1 rounded-full ml-2 animate-pulse">+91 98765 43210</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Facilities Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: FaStethoscope, label: "ICU", color: "from-blue-500 to-cyan-500" },
              { icon: FaHeart, label: "Cardiology", color: "from-red-500 to-pink-500" },
              { icon: FaHospital, label: "Emergency", color: "from-emerald-500 to-teal-500" },
              { icon: "🧠", label: "Neurology", color: "from-purple-500 to-violet-500" },
              { icon: "👁️", label: "Ophthalmology", color: "from-orange-500 to-yellow-500" },
              { icon: "🦷", label: "Dentistry", color: "from-indigo-500 to-blue-500" },
              { icon: "👶", label: "Pediatrics", color: "from-pink-500 to-rose-500" },
              { icon: "⚕️", label: "General", color: "from-slate-400 to-gray-400" }
            ].map((facility, index) => (
              <motion.div
                key={facility.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: `0 20px 40px hsl(var(--color-${facility.color.split('-')[0]}-500)/0.3)`
                }}
                className={`group p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 text-center hover:border-${facility.color.split(' ')[0]}-400/40`}
              >
                <div className={`text-3xl mb-3 group-hover:scale-110 transition-transform`}>{facility.icon}</div>
                <div className="font-semibold text-white group-hover:text-slate-200">{facility.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
