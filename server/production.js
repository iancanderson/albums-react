import express from 'express';

const app = express();

const port = process.env.PORT || 8000;
const forceSSL = process.env.FORCE_SSL || false;

app.use(express.static('dist'));

app.get('*', function(req, res) {
  const protocol = req.headers['X-Forwarded-Proto'];

  if (forceSSL && protocol !== 'https') {
    res.redirect(`https://${req.hostname}${req.originalUrl}`);
  } else {
    res.sendFile('dist/index.html', { root: __dirname });
  }
});

app.listen(port);
