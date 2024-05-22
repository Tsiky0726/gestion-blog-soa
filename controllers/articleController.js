const Article = require("../models/article");

exports.findAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findArticleById = async (req, res) => {
  try {
    const { IdArticle } = req.body; // Récupérer l'ID de l'article depuis le corps de la requête
    if (!IdArticle) {
      return res.status(400).json({ error: 'ID of the article is required in the request body' });
    }

    const article = await Article.findByPk(IdArticle);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createArticle = async ( req , res ) => {
    try {
        const newArticle = await Article.create(req.body);
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.updateArticle = async (req, res) => {
  try {
    const { IdArticle, titre, contenu, IdUtilusateur } = req.body;
    console.log("test :" , req.body) // Récupérer les données de l'article depuis le corps de la requête
    const [updated] = await Article.update(
      { IdArticle ,titre, contenu, IdUtilusateur }, // Mettre à jour uniquement le titre et le contenu
      { where: { IdArticle: IdArticle } }
    );

    if (updated) {
      const updatedArticle = await Article.findByPk(IdArticle);
      res.status(200).json(updatedArticle);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteArticle = async (req, res) => {
    try {
      const {IdArticle} = req.body
      console.log('id' , IdArticle)
      const deleted = await Article.destroy({
        where: { IdArticle: IdArticle }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Article not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
