import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";

// Tipos
type Calle = {
  numero: number;
  streetName: string;
  floor: number;
};

type Person = {
  id: string;
  name: string;
  email: string;
  address: Calle;
};

// "Base de datos" simulada
let personicas: Person[] = [
  {
    id: "1",
    name: "Paco",
    email: "pacoPe@pepe.com",
    address: {
      floor: 1,
      numero: 155,
      streetName: "Capitan Haya",
    },
  },
  {
    id: "2",
    name: "Pepa",
    email: "pepaPe@gmail.com",
    address: {
      floor: 3,
      numero: 155,
      streetName: "Capitan Haya",
    },
  },
];

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// --- Función de validación ---
const validatePersonData = (data: any): string | null => {
  if (!data) return "No se ha proporcionado ningún cuerpo de solicitud.";

  const { name, email, address } = data;

  if (typeof name !== "string" || name.trim().length < 2)
    return "El nombre debe ser una cadena con al menos 2 caracteres.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || !emailRegex.test(email))
    return "El correo electrónico no es válido.";

  if (
    !address ||
    typeof address.numero !== "number" ||
    typeof address.floor !== "number" ||
    typeof address.streetName !== "string"
  ) {
    return "La dirección debe incluir número (number), floor (number) y streetName (string).";
  }

  return null;
};

// --- Middleware de error genérico ---
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error detectado:", err.message);
  res
    .status(500)
    .json({ error: "Error interno del servidor", detail: err.message });
};

// --- Rutas ---
app.get("/", (req: Request, res: Response) => {
  res.send("✅ Okey makei, te has conectado correctamente.");
});

app.get("/persons", (req: Request, res: Response) => {
  res.json(personicas);
});

app.get("/person/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const person = personicas.find((p) => p.id === id);

  return person
    ? res.json(person)
    : res.status(404).json({ error: "Persona no encontrada" });
});

app.post("/person", (req: Request, res: Response) => {
  try {
    const error = validatePersonData(req.body);
    if (error) return res.status(400).json({ error });

    const newUser: Person = {
      id: Date.now().toString(),
      ...req.body,
    };

    personicas.push(newUser);
    res.status(201).json(newUser);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Error al crear la persona", detail: err.message });
  }
});

app.put("/person/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = personicas.findIndex((p) => p.id === id);

    if (index === -1)
      return res.status(404).json({ error: "Persona no encontrada" });

    const error = validatePersonData(req.body);
    if (error) return res.status(400).json({ error });

    personicas[index] = { ...personicas[index], ...req.body };

    res.json({
      message: "Persona actualizada correctamente",
      person: personicas[index],
    });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Error al actualizar la persona", detail: err.message });
  }
});

app.delete("/person/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exists = personicas.some((p) => p.id === id);

    if (!exists)
      return res.status(404).json({ error: "Persona no encontrada" });

    personicas = personicas.filter((p) => p.id !== id);

    res.json({ message: "Persona eliminada correctamente" });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Error al eliminar la persona", detail: err.message });
  }
});

// Middleware final (ruta no encontrada)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de error
app.use(errorHandler);

// --- Inicio del servidor ---
app.listen(port, () => {
  console.log(`🚀 Server started at http://localhost:${port}`);
});
