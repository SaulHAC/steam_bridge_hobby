import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

const app = express();

// Permitir CORS desde cualquier origen (puedes limitarlo a tu Angular si quieres)
app.use(cors({
  origin: "*", // o "http://localhost:4200"
}));

app.use("/api/", async (req, res) => {
  try {
    // Obtenemos todo el path después de /api/
    const steamPath = req.originalUrl.replace(/^\/api\//, "");
    const steamUrl = `https://store.steampowered.com/api/${steamPath}`;

    const response = await fetch(steamUrl);
    const data = await response.json();

    // 🔑 Aquí te aseguras de que tu server devuelva CORS válido
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al hacer la petición a Steam" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
