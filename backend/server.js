const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/', router);

app.listen(port, () => console.log("👉 http://localhost:" + port));
