const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serveeri HTML ja CSS

// Hoia mänguseisu serveris
let gameState = {
    randomNumber: Math.floor(Math.random() * 100) + 1,
    attempts: 9,
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Tagasta HTML-fail
});

app.post('/guess', (req, res) => {
    const guess = parseInt(req.body.guess);

    if (isNaN(guess)) {
        return res.json({ message: "Palun sisesta number!", attempts: gameState.attempts });
    }

    if (guess === gameState.randomNumber) {
        return res.json({ message: "Palju õnne! Arvasid numbri ära!", success: true });
    } else if (guess > gameState.randomNumber) {
        gameState.attempts--;
        return res.json({ message: "Liiga kõrge! Proovi väiksemat arvu.", attempts: gameState.attempts });
    } else {
        gameState.attempts--;
        return res.json({ message: "Liiga madal! Proovi suuremat arvu.", attempts: gameState.attempts });
    }

    if (gameState.attempts === 0) {
        return res.json({ message: `Oled kaotanud! Õige number oli ${gameState.randomNumber}.`, success: false });
    }
});

app.listen(3000, () => {
    console.log("Server töötab: http://localhost:3000");
});