const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/', router);

app.listen(port, () => console.log("👉 http://localhost:" + port));
