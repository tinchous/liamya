import fs from "fs";
import path from "path";
import cloudinary from "./cloudinary.js";

const carpetaImagenes = "./data/imagenes_productos"; // acá ponés donde bajaste las imágenes

(async () => {
  const archivos = fs.readdirSync(carpetaImagenes);

  const resultados = [];

  for (const archivo of archivos) {
    const ruta = path.join(carpetaImagenes, archivo);

    console.log("Subiendo:", archivo);

    try {
      const res = await cloudinary.uploader.upload(ruta, {
        folder: "autoservice_liamyahir"
      });

      resultados.push({
        archivoLocal: archivo,
        urlCloudinary: res.secure_url
      });

    } catch (err) {
      console.log("ERROR subiendo", archivo, err.message);
    }
  }

  fs.writeFileSync("./data/imagenes_subidas.json", JSON.stringify(resultados, null, 2));

  console.log("Listo! Subidas:", resultados.length);
})();
