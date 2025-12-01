import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NgoView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const rawToken = localStorage.getItem("token");
  const token = rawToken && rawToken !== "null" ? rawToken : null;

  const [ngo, setNgo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNgo = async () => {
      try {
        const res = await fetch(`/findNgo/view/${id}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) throw new Error("Failed to load NGO");

        const data = await res.json();
        setNgo(data);
      } catch (err) {
        setError("NGO not found or server error.");
      }
    };

    loadNgo();
  }, [id, token]);

  if (error)
    return (
      <div className="p-10 text-center text-red-500 font-semibold">{error}</div>
    );

  if (!ngo)
    return (
      <div className="p-10 text-center text-white/70">Loading NGO...</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#0d1c3c] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 bg-white/10 rounded-lg mb-6 hover:bg-white/20"
        >
          ← Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-2xl font-bold">
              {ngo.ngoName?.slice(0, 1)}
            </div>

            <div>
              <h1 className="text-3xl font-bold">{ngo.ngoName}</h1>
              <p className="text-slate-300">{ngo.city}</p>
            </div>
          </div>

          <div className="mt-6 text-slate-200 leading-relaxed">
            {ngo.description || "No description available."}
          </div>

          <div className="mt-8 flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">
              Request Help
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
              Contact NGO
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
