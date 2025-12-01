export async function signupUser(user) {
  const res = await fetch("https://healthtracker-5.onrender.com/healthtech/user/createuser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  
  const txt = await res.text();
  if (!res.ok) throw new Error(txt || "Signup failed");
  return txt;
}

export async function loginUser(credentials) {
  const res = await fetch("https://healthtracker-5.onrender.com/healthtech/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const txt = await res.text();
  if (!res.ok) throw new Error(txt || "Login failed");

  return txt; // jwt token
}
