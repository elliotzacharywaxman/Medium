const router = require('express').Router();
const { Article, Painting } = require('../models');

// GET all articles for homepage
router.get('/', async (req, res) => {
  try {
    const dbArticleData = await Article.findAll();
    const articles = dbArticleData.map((article) =>
      article.get({ plain: true })
    );

    res.render('homepage', {
      articles,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Article
router.get('/article/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the Article
    try {
      const dbArticleData = await Article.findByPk(req.params.id);

      const article = await dbArticleData.get({ plain: true });

      res.render('article', { article, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
