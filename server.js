const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Blue-Green Deployment Demo",
        version: "Green Version"
    });
});

app.get("/status", (req, res) => {
    res.json({
        status: "Application is running successfully!",
        version: "Green Version"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});