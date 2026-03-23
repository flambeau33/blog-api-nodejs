# FLAMBEAU Blog API

##  Description

Cette application est une API backend développée avec Node.js (Express) et MySQL.
Elle permet de gérer les articles d’un blog : création, lecture, modification, suppression et recherche.

---

##  Technologies utilisées

* Node.js
* Express.js
* MySQL
* Swagger (documentation API)

---

##  Installation

### 1. Cloner le projet

```bash
git clone https://github.com/flambeau33/blog-api-nodejs.git
cd blog-api-nodejs
```

### 2. Installer les dépendances

```bash
npm install
```

---

##  Configuration de la base de données

### Créer la base de données

```sql
CREATE DATABASE blog_db;
```

### Créer la table

```sql
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu TEXT,
  auteur VARCHAR(100) NOT NULL,
  categorie VARCHAR(100),
  tags VARCHAR(255),
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Modifier la connexion MySQL dans `app.js`

```js
host: "localhost",
user: "bloguser",
password: "12345678",
database: "blog_db"
```

---

##  Lancement du serveur

```bash
node app.js
```

Le serveur sera accessible sur :
 http://localhost:3000

---

##  Documentation API (Swagger)

Accéder à Swagger UI :
 http://localhost:3000/api-docs

Swagger permet de tester directement les endpoints de l’API via une interface graphique.

---

##  Endpoints disponibles

###  Créer un article

**POST /api/articles**

```bash
curl -X POST http://localhost:3000/api/articles \
-H "Content-Type: application/json" \
-d '{"titre":"Mon article","contenu":"Contenu test","auteur":"Flambeau"}'
```

---

###  Lire tous les articles

**GET /api/articles**

---

###  Lire un article par ID

**GET /api/articles/{id}**

---

###  Modifier un article

**PUT /api/articles/{id}**

```bash
curl -X PUT http://localhost:3000/api/articles/1 \
-H "Content-Type: application/json" \
-d '{"titre":"Nouveau titre"}'
```

---

###  Supprimer un article

**DELETE /api/articles/{id}**

---

###  Rechercher un article

**GET /api/articles/search?query=texte**

---

##  Bonnes pratiques appliquées

* Validation des champs obligatoires (titre, auteur)
* Utilisation des codes HTTP (200, 201, 400, 404, 500)
* Implémentation des opérations CRUD
* Documentation Swagger intégrée

---

##  Lien du dépôt GitHub

https://github.com/flambeau33/blog-api-nodejs

---

##  Auteur

NSHUTI FLAMBEAU ARISTIDE
