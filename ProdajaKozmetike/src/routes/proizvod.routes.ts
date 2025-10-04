import { Router } from 'express';
import { svaJela, dodajJelo, izmeniJelo, obrisiJelo  } from '../kontroler/proizvod.controller';

const jeloRuter = Router();


jeloRuter.get("/", svaJela);
jeloRuter.post("/", dodajJelo);
jeloRuter.put("/:id", izmeniJelo);
jeloRuter.delete("/:id", obrisiJelo);


export default jeloRuter;
