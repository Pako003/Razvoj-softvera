import type { Request, Response } from 'express';
import { konekcija } from '../mysqlTabela/tabela';
export const svaJela = async (req: Request, res: Response) => {
  try {
    const [rez] = await konekcija.query("SELECT * FROM proizvod");
    res.json(rez);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dohvaćanju proizvod." });
  }


};
export const dodajJelo = async (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  const { naziv, opis, cena, slika } = req.body;
  try {
    await konekcija.query(
      "INSERT INTO proizvod (naziv, opis, cena, slika) VALUES (?, ?, ?, ?)",
      [naziv, opis || '', cena, slika || '']
    );
    res.json({ poruka: "Proizvod dodato" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dodavanju proizvod." });
  }
};
export const izmeniJelo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { naziv, opis, cena, slika } = req.body;
  try {
    await konekcija.query(
      "UPDATE proizvod SET naziv = ?, opis = ?, slika = ?, cena = ?, slika = ? WHERE id = ?",
      [naziv, opis || '', cena, slika || '', id]
    );
    res.json({ poruka: "Proizvod izmenjeno" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri izmeni proizvod." });
  }
};
export const obrisiJelo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await konekcija.query("DELETE FROM proizvod WHERE id = ?", [id]);
    res.json({ poruka: "Proizvod obrisan" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri brisanju proizvod." });
  }
};
