import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ✅ Fix: Saare imports mein .jsx extension hata di gayi hai.
// Ye mana jata hai ki aapke files './pages' aur './components' folders mein hain.
import Welcome from "./pages/Welcome";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import NgoLogin from "./pages/NgoLogin";
import NgoSignup from "./pages/NgoSignup";
import HospitalLogin from "./pages/HospitalLogin"; 
import HospitalSignup from "./pages/HospitalSignup"; 
import UserHome from "./pages/UserHome";
import NgoResults from "./pages/NgoResults";
import HospitalResults from "./pages/HospitalResults";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from './pages/RegisterForm';
import FactorCalculator from './pages/FactorCalculator';
import HospitalView from "./pages/HospitalView"; 
import NgoView from "./pages/NgoView"; 
import HospitalDashboard from "./pages/HospitalDashboard"; 
import NgoDashboard from "./pages/NgoDashboard"; 
import ForgotPasswordUser from './pages/ForgotPasswordUser';
import ResetPasswordUser from './pages/ResetPasswordUser';
import HospitalPasswordUpdate from './pages/HospitalPasswordUpdate';
import NgoResetPassword from './pages/NgoResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />

        {/* --- USER ROUTES --- */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/home" element={<UserHome />} />
        {/* ⭐ NEW ROUTE ADDED HERE user */}
       <Route path="/user/forget-password" element={<ForgotPasswordUser />} />

        {/* --- NGO ROUTES --- */}
        <Route path="/ngo/login" element={<NgoLogin />} />
        <Route path="/ngo/signup" element={<NgoSignup />} />
        <Route path="/register-ngo" element={<RegisterForm />} /> 
          <Route path="/ngo/forget/password" element={<NgoResetPassword />} /> 
        
        {/* 🛡️ NGO DASHBOARD (PROTECTED) */}
        <Route 
            path="/ngo-dashboard" 
            element={
                <ProtectedRoute userType="ngo">
                    <NgoDashboard />
                </ProtectedRoute>
            } 
        />

        {/* --- PUBLIC VIEW ROUTES --- */}
        <Route path="/hospital/view/:id" element={<HospitalView />} />
        <Route path="/ngo/view/:id" element={<NgoView />} />
        <Route path="/calculate/factor" element={<FactorCalculator />} /> 

        {/* --- HOSPITAL AUTH ROUTES --- */}
        <Route path="/hospital/login" element={<HospitalLogin />} />
        <Route path="/hospital/signup" element={<HospitalSignup />} />
         <Route path="/hospital/forget/password" element={<HospitalPasswordUpdate/>} />

        {/* 🛡️ HOSPITAL DASHBOARD (PROTECTED) */}
        <Route 
          path="/hospital-dashboard" 
          element={
            <ProtectedRoute userType="hospital"> 
              <HospitalDashboard /> 
            </ProtectedRoute>
          } 
        />
        
        {/* --- PROTECTED SEARCH ROUTES (Typically for logged-in Users) --- */}

        {/* SEARCH NGO */}
        <Route
          path="/search/ngo"
          element={
            <ProtectedRoute userType="user">
              <NgoResults />
            </ProtectedRoute>
          }
        />

        {/* SEARCH HOSPITAL */}
        <Route
          path="/search/hospital"
          element={
            <ProtectedRoute userType="user">
              <HospitalResults />
            </ProtectedRoute>
          }
        />

         {/* ⭐ Password Reset Route (Using email as path variable for simplicity, adjust as needed) */}
                <Route path="/user/reset-password" element={<ResetPasswordUser />} /> 
                {/* Real-world: <Route path="/user/reset-password/:token" element={<ResetPasswordUser />} /> */}
          

      </Routes>

    </BrowserRouter>
  );
}

export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Welcome from "./pages/Welcome.jsx";
// import UserLogin from "./pages/UserLogin.jsx";
// import UserSignup from "./pages/UserSignup.jsx";
// import NgoLogin from "./pages/NgoLogin.jsx";
// import NgoSignup from "./pages/NgoSignup.jsx";

// // Assuming HospitalSignup.jsx handles both Login and Signup logic internally
// import HospitalLogin from "./pages/HospitalLogin.jsx"; // Keeping for explicit login route, but often redirects to Signup if combined logic is used
// import HospitalSignup from "./pages/HospitalSignup.jsx"; 

// import UserHome from "./pages/UserHome.jsx";
// import NgoResults from "./pages/NgoResults.jsx";
// import HospitalResults from "./pages/HospitalResults.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import RegisterForm from './pages/RegisterForm.jsx';
// import FactorCalculator from './pages/FactorCalculator.jsx';
// import HospitalView from "./pages/HospitalView.jsx"; 
// import NgoView from "./pages/NgoView.jsx"; 
// import HospitalDashboard from "./pages/HospitalDashboard.jsx"; // Dashboard page
// import NgoDashboard from "./pages/NgoDashboard.jsx"; 

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Welcome />} />

//         {/* --- USER ROUTES --- */}
//         <Route path="/user/login" element={<UserLogin />} />
//         <Route path="/user/signup" element={<UserSignup />} />
//         <Route path="/user/home" element={<UserHome />} />

//         {/* --- NGO ROUTES --- */}
//         <Route path="/ngo/login" element={<NgoLogin />} />
//         <Route path="/ngo/signup" element={<NgoSignup />} />
//         <Route path="/register-ngo" element={<RegisterForm />} /> {/* NGO Registration Form Page */}
//         // App.jsx में add करें:
// <Route path="/ngo-dashboard" element={
//     <ProtectedRoute>
//         <NgoDashboard />
//     </ProtectedRoute>
// } />


//         {/* --- PUBLIC VIEW ROUTES --- */}
//         <Route path="/hospital/view/:id" element={<HospitalView />} />
//         <Route path="/ngo/view/:id" element={<NgoView />} />
//         <Route path="/calculate/factor" element={<FactorCalculator />} /> 

//         {/* --- HOSPITAL AUTH ROUTES --- */}
//         <Route path="/hospital/login" element={<HospitalLogin />} />
//         <Route path="/hospital/signup" element={<HospitalSignup />} />

//         {/* --- 🛡️ HOSPITAL DASHBOARD (PROTECTED) --- */}
//         {/* HospitalSignup component redirects to this route after successful login */}
//         <Route 
//           path="/hospital-dashboard" 
//           element={
//             <ProtectedRoute userType="hospital"> 
//               <HospitalDashboard /> 
//             </ProtectedRoute>
//           } 
//         />
        
//         {/* --- PROTECTED SEARCH ROUTES (Typically for logged-in Users) --- */}

//         {/* SEARCH NGO */}
//         <Route
//           path="/search/ngo"
//           element={
//             <ProtectedRoute userType="user">
//               <NgoResults />
//             </ProtectedRoute>
//           }
//         />

//         {/* SEARCH HOSPITAL */}
//         <Route
//           path="/search/hospital"
//           element={
//             <ProtectedRoute userType="user">
//               <HospitalResults />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;