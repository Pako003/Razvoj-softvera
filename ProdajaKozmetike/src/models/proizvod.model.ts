import { konekcija } from '../mysqlTabela/tabela';
export const svaJela = async () => {
  const [rows] = await konekcija.query('SELECT * FROM proizvod');
  return rows;
};
export const dodajJelo = async (naziv: string, opis: string | null, slika: string | null, cena: number) => {
  await konekcija.query('INSERT INTO proizvod (naziv, opis, slika, cena) VALUES (?, ?, ?, ?)', [naziv, opis, slika, cena]);
};
