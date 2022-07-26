// https://www.youtube.com/watch?v=1NrHkjlWVhM
// 38:29
const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require("method-override");
const articleRouter = require("./routes/articles");
const app = express();

mongoose.connect("mongodb://localhost/blog");

app.set("view engine", "ejs");
// tell article router where it's based
// every route created in article router added to end of /articles/

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
app.listen(5000);

/*
const articles = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test Description",
    },
    {
      title: "Test Article 2",
      createdAt: new Date(),
      description: "Test Description 2",
    },
  ];
*/
