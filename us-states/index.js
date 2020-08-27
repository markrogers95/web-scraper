const express = require('express');
const getStates = require('./getUSStates');

const app = express();

app.use(express.static('public'));

app.get('/api/states', async (req, res) => {
    const states = await getStates();
    res.json(states);
})

const port = process.env.PORT || 4242;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});