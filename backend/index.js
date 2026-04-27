const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

let releases = [
    { id: 1, version: "1.0.0", status: "Success" },
    { id: 2, version: "1.1.0-alpha", status: "Fail" }
];

app.get('/api/releases', (req, res) => {
    res.json(releases);
});

app.post('/api/releases', (req, res) => {
    const { version, status } = req.body;

    if (!version || version.length < 2) {
        return res.status(400).json({ error: "Invalid version length" });
    }

    const newRelease = {
        id: Date.now(),
        version: version,
        status: status || "Success"
    };

    releases.push(newRelease);
    res.status(201).json(newRelease);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});

setInterval(() => {}, 1000);
