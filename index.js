const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'hey, there', test: 'trest', deploy: "deploy again" });
});

const PORT = process.env.PORT || 5000;        // Dynamic PORT binding
app.listen(PORT);
