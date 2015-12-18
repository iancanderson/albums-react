import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';


webpackConfig.entry.unshift('webpack-hot-middleware/client');
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
})

app.use(devMiddleware);
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('public'));

app.get('*', function(req, res) {
  const filename = devMiddleware.getFilenameFromUrl('/index.html');
  const content = devMiddleware.fileSystem.readFileSync(filename);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Length', content.length);
  res.end(content);
});

app.listen(8000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8000');
});
