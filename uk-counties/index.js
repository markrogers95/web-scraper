const express = require('express');
const getUKCounties = require('./getUKCounties');

const app = express();

app.get('/api/counties', async (req, res) => {
    const counties = await getUKCounties();
    res.json(counties);
})

const port = process.env.PORT || 4242;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});