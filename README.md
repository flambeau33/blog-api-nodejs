# Blog API

## Description

Cette application est une API backend développée avec Node.js (Express) et MySQL.
Elle permet de gérer les articles d’un blog : création, lecture, modification, suppression et recherche.

---

## Technologies utilisées

* Node.js
* Express.js
* MySQL
* Swagger (documentation API)

---

## Installation

### 1. Cloner le projet

git clone https://github.com/flambeau33/blog-api-nodejs.git
cd blog-api-nodejs

### 2. Installer les dépendances

npm install

### 3. Configuration de la base de données MySQL

Créer la base :
CREATE DATABASE blog_db;

Créer la table :
CREATE TABLE articles (
id INT AUTO_INCREMENT PRIMARY KEY,
titre VARCHAR(255) NOT NULL,
contenu TEXT,
auteur VARCHAR(100) NOT NULL,
categorie VARCHAR(100),
tags VARCHAR(255),
date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

### 3.2 Modifier les informations de connexion dans app.js
host: "localhost",
user: "bloguser",
password: "12345678",
database: "blog_db"

---

## Lancement du serveur

node app.js

Le serveur sera accessible sur :
http://localhost:3000

---

## Documentation API (Swagger)

Accéder à Swagger UI :
http://localhost:3000/api-docs

---

##  Endpoints disponibles

###  Créer un article

POST /api/articles

Exemple :
curl -X POST http://localhost:3000/api/articles 
-H "Content-Type: application/json" 
-d '{"titre":"Mon article","contenu":"Contenu test","auteur":"Flambeau"}'

---

###  Lire tous les articles

GET /api/articles

---

###  Lire un article par ID

GET /api/articles/{id}

---

###  Modifier un article

PUT /api/articles/{id}

Exemple :
curl -X PUT http://localhost:3000/api/articles/1 
-H "Content-Type: application/json" 
-d '{"titre":"Nouveau titre"}'

---

###  Supprimer un article

DELETE /api/articles/{id}

---

###  Rechercher un article

GET /api/articles/search?query=texte

---

##  Bonnes pratiques appliquées

* Validation des champs obligatoires (titre, auteur)
* Utilisation des codes HTTP (200, 201, 400, 404, 500)
* Séparation logique des fonctionnalités (CRUD)
* Documentation Swagger intégrée

---

##  Lien du dépôt GitHub

https://github.com/flambeau33/blog-api-nodejs

---

##  Auteur

NSUTI FLAMBEAU ARISTIDE
