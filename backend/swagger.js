import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerPath = path.join(__dirname, "cirmatch-api.yaml");
const swaggerDocument = YAML.load(swaggerPath);

export const swaggerDocs = (app) => {
  // Serve Swagger static files without key check
  app.use("/api-docs", swaggerUi.serve);

  // Protect only the main HTML page
  app.get("/api-docs", (req, res, next) => {
    if (req.query.key !== process.env.SWAGGER_KEY) {
      return res.status(401).send("Unauthorized");
    }
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
      swaggerOptions: { docExpansion: "none" },
    })(req, res, next);
  });

  console.log(
    `📄 Swagger Docs available at: http://localhost:${process.env.PORT || 5000}/api-docs?key=${process.env.SWAGGER_KEY}`
  );
};
