// app.js
const express = require("express");
const mysql = require("mysql2");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Définition des options Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "FLAMBEAU Blog API",
      version: "1.0.0",
      description: "API pour gérer des articles de blog\",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

//  CONNEXION À LA BASE DE DONNÉES
const db = mysql.createConnection({
  host: "localhost",
  user: "bloguser",
  password: "12345678",
  database: "blog_db"
});

db.connect(err => {
  if (err) {
    console.error("Erreur de connexion à MySQL :", err);
  } else {
    console.log("Connecté à la base MySQL blog_db !");
  }
});

//  CREATE - Ajouter un article
/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Crée un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - auteur
 *             properties:
 *               titre:
 *                 type: string
 *                 description: Le titre de l'article
 *               contenu:
 *                 type: string
 *                 description: Le contenu de l'article
 *               auteur:
 *                 type: string
 *                 description: L'auteur de l'article
 *               categorie:
 *                 type: string
 *                 description: La catégorie de l'article
 *               tags:
 *                 type: string
 *                 description: Les tags associés à l'article
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Titre ou auteur manquant
 *       500:
 *         description: Erreur serveur
 */
app.post("/api/articles", (req, res) => {
  const { titre, contenu, auteur, categorie, tags } = req.body;
  if (!titre || !auteur) return res.status(400).json({ message: "Titre et auteur obligatoires" });

  const sql = "INSERT INTO articles (titre, contenu, auteur, categorie, tags) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [titre, contenu, auteur, categorie || null, tags || null], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ id: result.insertId, titre, contenu, auteur, categorie, tags });
  });
});

//  READ ALL - Tous les articles
/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupère tous les articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Liste de tous les articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titre:
 *                     type: string
 *                   contenu:
 *                     type: string
 *                   auteur:
 *                     type: string
 *                   categorie:
 *                     type: string
 *                   tags:
 *                     type: string
 *                   date_creation:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erreur serveur
 */
app.get("/api/articles", (req, res) => {
  db.query("SELECT * FROM articles", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

//  READ ONE - Article par ID
/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupère un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article trouvé
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
app.get("/api/articles/:id", (req, res) => {
  db.query("SELECT * FROM articles WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Article non trouvé" });
    res.json(results[0]);
  });
});

// UPDATE - Modifier un article
/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifie un article existant
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               contenu:
 *                 type: string
 *               auteur:
 *                 type: string
 *               categorie:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article modifié
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
app.put("/api/articles/:id", (req, res) => {
  const { titre, contenu, auteur, categorie, tags } = req.body;

  // Récupérer l'article actuel
  db.query("SELECT * FROM articles WHERE id=?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Article non trouvé" });

    const article = results[0];

    // Remplacer seulement si la valeur existe dans la requête
    const sql = "UPDATE articles SET titre=?, contenu=?, auteur=?, categorie=?, tags=? WHERE id=?";
    db.query(
      sql,
      [
        titre || article.titre,
        contenu || article.contenu,
        auteur || article.auteur,
        categorie || article.categorie,
        tags || article.tags,
        req.params.id
      ],
      (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Article modifié" });
      }
    );
  });
});

//  DELETE - Supprimer un article
/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprime un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'article à supprimer
 *     responses:
 *       200:
 *         description: Article supprimé
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
app.delete("/api/articles/:id", (req, res) => {
  db.query("DELETE FROM articles WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Article non trouvé" });
    res.json({ message: "Article supprimé" });
  });
});

//  SEARCH - Rechercher un article par texte
/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Recherche des articles par texte
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Texte à rechercher dans le titre ou le contenu
 *     responses:
 *       200:
 *         description: Articles trouvés
 *       400:
 *         description: Paramètre query manquant
 *       500:
 *         description: Erreur serveur
 */
app.get("/api/articles/search", (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ message: "Paramètre query obligatoire" });

  const sql = "SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?";
  db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results.length ? results : { message: "Article non trouvé" });
  });
});

//  SERVEuR
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
