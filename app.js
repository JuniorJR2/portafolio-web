const express = require("express");
const path = require("path");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/projects", (req, res) => res.render("projects"));
app.get("/contact", (req, res) => res.render("contact"));

app.get("/projects/projects-taller", (req, res) => res.render("projects/projects-taller"));
app.get("/projects/projects-inpi", (req, res) => res.render("projects/projects-inpi"));
app.get("/projects/projects-portafolio", (req, res) => res.render("projects/projects-portafolio"));
// Servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor en http://localhost:${port}`));


