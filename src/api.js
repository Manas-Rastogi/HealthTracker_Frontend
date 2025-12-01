// import axios from "axios";

// const BASE = "http://localhost:8080/healthtech";


// export async function postWithAuth(url, body) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error("Token missing in localStorage");
//   }

//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer " + token
//     },
//     body: JSON.stringify(body)
//   });

//   if (res.status === 403) {
//     throw new Error("Forbidden: Token invalid OR role mismatch");
//   }

//   return res.json();
// }


// // ---------------- USER SIGNUP ----------------
// export const signupUser = async (data) => {
//   return axios.post(`${BASE}/user/createuser`, data);
// };

// // ---------------- USER LOGIN ----------------
// export const loginUser = async (data) => {
//   return axios.post(`${BASE}/user/login`, data);
// };

// // ---------------- NGO SEARCH ----------------
// export async function searchNgo(data) {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${BASE}/searchNgo/find`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`
//     },
//     body: JSON.stringify(data)
//   });

//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// // ---------------- HOSPITAL SEARCH ----------------
// export async function searchHospital(data) {
//   const token = localStorage.getItem("token");

//   const res = await fetch(`${BASE}/searchHospital/search`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`
//     },
//     body: JSON.stringify(data)
//   });

//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }


import axios from "axios";

const BASE = "https://healthtracker-5.onrender.com/healthtech";

// 🔥 UNIVERSAL POST WITH AUTH
export async function postWithAuth(url, body) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token missing in localStorage");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token.trim()  // ❤️ SUPER IMPORTANT
    },
    body: JSON.stringify(body)
  });

  if (res.status === 403) {
    throw new Error("Forbidden: Token invalid OR role mismatch");
  }

  return res.json();
}

// ---------------- USER SIGNUP ----------------
export const signupUser = async (data) => {
  return axios.post(`${BASE}/user/createuser`, data);
};

// ---------------- USER LOGIN ----------------
export const loginUser = async (data) => {
  return axios.post(`${BASE}/user/login`, data);
};

// ---------------- NGO SEARCH ----------------
export async function searchNgo(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/searchNgo/find`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.trim()}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ---------------- HOSPITAL SEARCH ----------------
export async function searchHospital(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/searchHospital/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.trim()}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
