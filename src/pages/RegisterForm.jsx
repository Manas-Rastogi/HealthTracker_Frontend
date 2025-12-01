// import React, { useState } from "react";
// // 🚩 RegisterForm के लिए useNavigate और useLocation ज़रूरी हैं
// import { useLocation, useNavigate } from 'react-router-dom';

// const formStyles = {
//   container: {
//     padding: "40px",
//     background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
//     minHeight: "100vh",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   formBox: {
//     background: "white",
//     padding: "30px",
//     borderRadius: "15px",
//     boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
//     maxWidth: "550px",
//     width: "100%",
//   },
//   heading: {
//     color: "#2a5298",
//     textAlign: "center",
//     marginBottom: "25px",
//     borderBottom: "2px solid #007bff",
//     paddingBottom: "10px",
//   },
//   inputGroup: {
//     marginBottom: "15px",
//   },
//   label: {
//     display: "block",
//     marginBottom: "5px",
//     fontWeight: "600",
//     color: "#333",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     boxSizing: "border-box",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "#28a745",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "700",
//     marginTop: "20px",
//     transition: "background 0.3s ease",
//   },
//   message: {
//     marginTop: "15px",
//     textAlign: "center",
//     fontWeight: "600",
//   }
// };

// export default function RegisterForm() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   // NgoSearch से पास किए गए ngoId और ngoName को retrieve करें
//   // (यह सुनिश्चित करता है कि ngoId ऑटोमैटिकली formData में आ जाए)
//   const { ngoId, ngoName } = location.state || {}; 

//   const [formData, setFormData] = useState({
//     name: "",
//     lastname: "",
//     email: "",
//     contact_number: "",
//     factor_type: "",
//     Adar_Card: "",
//     city: "",
//     // ngoId को स्टेट से पॉपुलेट किया गया
//     ngoId: ngoId || "" 
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState(false);


//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setError(false);

//     const token = localStorage.getItem("token");

//     if (!token) {
//         setMessage("❌ Token missing. Please log in first.");
//         setError(true);
//         setLoading(false);
//         return;
//     }
    
//     // Validate required fields (based on your Register entity)
//     // Note: Since ngoId is set from state, we ensure other fields are also present.
//     const fieldsToValidate = ['name', 'lastname', 'email', 'contact_number', 'factor_type', 'Adar_Card', 'city', 'ngoId'];
    
//     for (const key of fieldsToValidate) {
//         if (!formData[key]) {
//             setMessage(`❌ Please fill in the ${key.replace('_', ' ')} field.`);
//             setError(true);
//             setLoading(false);
//             return;
//         }
//     }


//     try {
//       const response = await fetch(
//   "http://localhost:8080/healthtech/registration_user/user_register", // 👈 यह आपका नया URL है
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token,
//     },
//     body: JSON.stringify(formData),
//   }
// );
//       if (response.ok) {
//         setMessage(`✅ Successfully registered with ${ngoName}!`);
//         setError(false);
//         // Optionally clear form or redirect after success
//         setTimeout(() => navigate('/search'), 2000); 
//       } else {
//         const errorData = await response.text();
//         setMessage(`❌ Registration failed. Server error: ${response.status}. Details: ${errorData.substring(0, 100)}...`);
//         setError(true);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ An unexpected error occurred during submission.");
//       setError(true);
//     }

//     setLoading(false);
//   };
  
//   // अगर ngoId स्टेट से नहीं मिला (यानी यूजर सीधे URL से आया है)
//   if (!ngoId) {
//     return (
//         <div style={formStyles.container}>
//             <div style={formStyles.formBox}>
//                 <h3 style={formStyles.heading}>Invalid Access</h3>
//                 <p style={{textAlign: 'center', color: 'red'}}>
//                     Please go back to the search page and select an NGO to register.
//                 </p>
//                 <button 
//                     onClick={() => navigate('/search')}
//                     style={{...formStyles.button, background: '#007bff'}}
//                 >
//                     Go to Search
//                 </button>
//             </div>
//         </div>
//     );
//   }

//   return (
//     <div style={formStyles.container}>
//       <div style={formStyles.formBox}>
//         <h2 style={formStyles.heading}>Register with {ngoName}</h2>
//         <p style={{textAlign: 'center', marginBottom: '20px', color: '#555'}}>
//             NGO ID: <strong>{ngoId}</strong>
//         </p>
        
//         <form onSubmit={handleSubmit}>
//           {/* Name and Lastname in two columns */}
//           <div style={{ display: 'flex', gap: '15px' }}>
//             <div style={{...formStyles.inputGroup, flex: 1}}>
//               <label style={formStyles.label} htmlFor="name">First Name</label>
//               <input
//                 style={formStyles.input}
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div style={{...formStyles.inputGroup, flex: 1}}>
//               <label style={formStyles.label} htmlFor="lastname">Last Name</label>
//               <input
//                 style={formStyles.input}
//                 type="text"
//                 id="lastname"
//                 name="lastname"
//                 value={formData.lastname}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
          
//           {/* Email */}
//           <div style={formStyles.inputGroup}>
//             <label style={formStyles.label} htmlFor="email">Email</label>
//             <input
//               style={formStyles.input}
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Contact and City */}
//           <div style={{ display: 'flex', gap: '15px' }}>
//             <div style={{...formStyles.inputGroup, flex: 1}}>
//               <label style={formStyles.label} htmlFor="contact_number">Contact Number</label>
//               <input
//                 style={formStyles.input}
//                 type="text"
//                 id="contact_number"
//                 name="contact_number"
//                 value={formData.contact_number}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div style={{...formStyles.inputGroup, flex: 1}}>
//               <label style={formStyles.label} htmlFor="city">City</label>
//               <input
//                 style={formStyles.input}
//                 type="text"
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
          
//           {/* Factor Type */}
//           <div style={formStyles.inputGroup}>
//             <label style={formStyles.label} htmlFor="factor_type">Factor Type (e.g., Blood Group, Skill)</label>
//             <input
//               style={formStyles.input}
//               type="text"
//               id="factor_type"
//               name="factor_type"
//               value={formData.factor_type}
//               onChange={handleChange}
//               required
//             />
//           </div>
          
//           {/* Adar Card */}
//           <div style={formStyles.inputGroup}>
//             <label style={formStyles.label} htmlFor="Adar_Card">Aadhar Card Number</label>
//             <input
//               style={formStyles.input}
//               type="text"
//               id="Adar_Card"
//               name="Adar_Card"
//               value={formData.Adar_Card}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button style={formStyles.button} type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Submit Registration"}
//           </button>
          
//           {message && (
//             <p style={{ ...formStyles.message, color: error ? 'red' : 'green' }}>
//               {message}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const formStyles = {
  container: {
    padding: "40px",
    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    maxWidth: "550px",
    width: "100%",
  },
  heading: {
    color: "#2a5298",
    textAlign: "center",
    marginBottom: "25px",
    borderBottom: "2px solid #007bff",
    paddingBottom: "10px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "700",
    marginTop: "20px",
    transition: "background 0.3s ease",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "600",
  }
};

export default function RegisterForm() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 🔑 NGO ID और NGO Name को useLocation state से प्राप्त करें
  const { ngoId, ngoName } = location.state || {}; 

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    contact_number: "",
    factor_type: "",
    Adar_Card: "",
    city: "",
    // ngoId को state से ऑटोमैटिकली पॉपुलेट किया गया
    ngoId: ngoId || "" 
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    const token = localStorage.getItem("token");

    if (!token) {
        setMessage("❌ Token missing. Please log in first.");
        setError(true);
        setLoading(false);
        return;
    }
    
    // अनिवार्य फील्ड्स (ngoId सहित) की पुष्टि
    const fieldsToValidate = ['name', 'lastname', 'email', 'contact_number', 'factor_type', 'Adar_Card', 'city', 'ngoId'];
    
    for (const key of fieldsToValidate) {
        if (!formData[key]) {
            setMessage(`❌ Please fill in the ${key.replace('_', ' ')} field. Missing: ${key}.`);
            setError(true);
            setLoading(false);
            return;
        }
    }


    try {
      // 🎯 FIX: URL को backend path (healthtech) से match करने के लिए अपडेट किया गया
      const API_URL = "https://healthtracker-5.onrender.com/healthtech/registration_user/user_register";
      
      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // JWT Token Authorization header में भेजना
            Authorization: "Bearer " + token, 
          },
          // formData में ngoId ऑटोमैटिकली शामिल है
          body: JSON.stringify(formData), 
        }
      );

      if (response.ok) {
        setMessage(`✅ Successfully registered with ${ngoName}!`);
        setError(false);
        setTimeout(() => navigate('/search'), 2000); 
      } else {
        const errorData = await response.text();
        setMessage(`❌ Registration failed. Server error: ${response.status}. Details: ${errorData.substring(0, 150)}...`);
        setError(true);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setMessage("❌ An unexpected network error occurred during submission. Check server and CORS.");
      setError(true);
    }

    setLoading(false);
  };
  
  // 🛑 Guard: अगर ngoId state से नहीं मिला
  if (!ngoId) {
    return (
      <div style={formStyles.container}>
        <div style={formStyles.formBox}>
          <h3 style={formStyles.heading}>⚠️ Invalid Access</h3>
          <p style={{textAlign: 'center', color: 'red'}}>
            Please go back to the search page and select an NGO to register. (Missing NGO ID)
          </p>
          <button 
            onClick={() => navigate('/search')}
            style={{...formStyles.button, background: '#007bff'}}
          >
            Go to Search
          </button>
        </div>
      </div>
    );
  }

  // 👇 Registration Form Render
  return (
    <div style={formStyles.container}>
      <div style={formStyles.formBox}>
        <h2 style={formStyles.heading}>Register with {ngoName}</h2>
        <p style={{textAlign: 'center', marginBottom: '20px', color: '#555'}}>
            NGO ID: <strong>{ngoId}</strong>
        </p>
        
        <form onSubmit={handleSubmit}>
          {/* Name and Lastname */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{...formStyles.inputGroup, flex: 1}}>
              <label style={formStyles.label} htmlFor="name">First Name</label>
              <input
                style={formStyles.input}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{...formStyles.inputGroup, flex: 1}}>
              <label style={formStyles.label} htmlFor="lastname">Last Name</label>
              <input
                style={formStyles.input}
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Email */}
          <div style={formStyles.inputGroup}>
            <label style={formStyles.label} htmlFor="email">Email</label>
            <input
              style={formStyles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact and City */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{...formStyles.inputGroup, flex: 1}}>
              <label style={formStyles.label} htmlFor="contact_number">Contact Number</label>
              <input
                style={formStyles.input}
                type="text"
                id="contact_number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{...formStyles.inputGroup, flex: 1}}>
              <label style={formStyles.label} htmlFor="city">City</label>
              <input
                style={formStyles.input}
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Factor Type */}
          <div style={formStyles.inputGroup}>
            <label style={formStyles.label} htmlFor="factor_type">Factor Type (e.g., Blood Group, Skill)</label>
            <input
              style={formStyles.input}
              type="text"
              id="factor_type"
              name="factor_type"
              value={formData.factor_type}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Adar Card */}
          <div style={formStyles.inputGroup}>
            <label style={formStyles.label} htmlFor="Adar_Card">Aadhar Card Number</label>
            <input
              style={formStyles.input}
              type="text"
              id="Adar_Card"
              name="Adar_Card"
              value={formData.Adar_Card}
              onChange={handleChange}
              required
            />
          </div>

          <button style={formStyles.button} type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
          
          {message && (
            <p style={{ ...formStyles.message, color: error ? 'red' : 'green' }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}