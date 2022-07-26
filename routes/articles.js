const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

// gives us router we can use to create views similar to server.js (app.get('/', (req...))) exact same capability through the Router : router.get('/') and will get a route at the / be sure to tell app to use this router
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
});

// route takes input from req.body and creates new article with title, description, markdown. if there is an error like wrong type input, can use catch to return that to the user. article = give us an id for the article. when form submitted with error, get message that 'cant read properties of undefined(reading 'title') cuz body is undefined
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (e) {
    res.render("articles/new", { article: article });
  }
});

router.delete("/", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
});

module.exports = router;

/*
const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

// gives us router we can use to create views similar to server.js (app.get('/', (req...))) exact same capability through the Router : router.get('/') and will get a route at the / be sure to tell app to use this router
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect("/index");
  res.render("articles/show", { article: article });
});

// route takes input from req.body and creates new article with title, description, markdown. if there is an error like wrong type input, can use catch to return that to the user. article = give us an id for the article. when form submitted with error, get message that 'cant read properties of undefined(reading 'title') cuz body is undefined
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    res.render("articles/new", { article: article });
  }
});

module.exports = router;
*/
