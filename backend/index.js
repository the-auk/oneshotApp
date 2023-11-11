const express = require('express');
const app = express();
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});