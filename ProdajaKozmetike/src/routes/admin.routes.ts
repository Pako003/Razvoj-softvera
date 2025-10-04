import { Router } from "express";
import { konekcija } from "../mysqlTabela/tabela";
import jwt from "jsonwebtoken";
const adminRuter = Router();
function proveriAdmin(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Nema tokena" });
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Nevažeći token" });
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "tajni_kljuc");
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Nemaš admin prava" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token nije validan" });
  }
}
adminRuter.get("/korisnik", proveriAdmin, async (req, res) => {
  try {
    const [result] = await konekcija.query("SELECT id, ime, email, role FROM korisnik");
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
adminRuter.delete("/korisnik/:id", proveriAdmin, async (req, res) => {
  try {
    await konekcija.query("DELETE FROM korisnik WHERE id = ?", [req.params.id]);
    res.json({ message: "Korisnik obrisan" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
adminRuter.post("/proizvod", proveriAdmin, async (req, res) => {
  const { naziv, opis, cena } = req.body;
  try {
    await konekcija.query("INSERT INTO proizvod (naziv, opis, slika, cena) VALUES (?, ?, ?, ?)", [naziv, opis, cena]);
    res.json({ message: "Proizvod dodato" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
adminRuter.put("/proizvod/:id", proveriAdmin, async (req, res) => {
  const { naziv, opis, cena } = req.body;
  try {
    await konekcija.query("UPDATE proizvod SET naziv=?, opis=?, slika=?, cena=? WHERE id=?", [naziv, opis, slika, cena, req.params.id]);
    res.json({ message: "Proizvod ažurirano" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
adminRuter.delete("/proizvod/:id", proveriAdmin, async (req, res) => {
  try {
    await konekcija.query("DELETE FROM proizvod WHERE id=?", [req.params.id]);
    res.json({ message: "Proizvod obrisano" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
export default adminRuter;
