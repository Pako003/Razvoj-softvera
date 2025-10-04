const API_URL = "http://localhost:3000";
export async function getJela() {
  const res = await fetch(`${API_URL}/api/proizvodi`);
  return await res.json();
}
export async function addJelo(proizvod: any) {
  await fetch(`${API_URL}/api/proizvodi`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proizvod),
  });
}
export async function updateJelo(proizvod: any) {
  await fetch(`${API_URL}/api/proizvodi/${proizvod.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proizvod),
  });
}
export async function deleteJelo(id: number) {
  await fetch(`${API_URL}/api/proizvodi/${id}`, { method: "DELETE" });
}
export async function getPorudzbine() {
  const res = await fetch(`${API_URL}/api/porudzbine`);
  return await res.json();
}
function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}
export async function register(data: any) {
  const res = await fetch(`${API_URL}/korisnik/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}
export async function login(data: any) {
  const res = await fetch(`${API_URL}/korisnik/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();


}
