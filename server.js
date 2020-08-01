const express = require('express');
const app = express();

app.use(express.static('./dist/keep-explorer'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/keep-explorer/'}),
);

app.listen(process.env.PORT || 8080);
