const express = require('express');
const bodyParser = require('body-parser');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
app.use(bodyParser.json());

let botClient;

app.post('/submit', (req, res) => {
    const { token, status } = req.body;

    if (token && status) {
        botClient = new Client({ intents: [GatewayIntentBits.Guilds] });
        
        botClient.once('ready', () => {
            console.log(`Logged in as ${botClient.user.tag}!`);
            botClient.user.setPresence({ activities: [{ name: status }], status: 'online' })
                .then(() => res.json({ message: 'Bot status updated successfully.' }))
                .catch(error => res.status(500).json({ message: 'Error setting status: ' + error }));
        });

        botClient.login(token).catch(error => res.status(500).json({ message: 'Error logging in: ' + error }));
    } else {
        res.status(400).json({ message: 'Token and status are required.' });
    }
});

app.post('/force-online', (req, res) => {
    const { token } = req.body;

    if (token) {
        botClient = new Client({ intents: [GatewayIntentBits.Guilds] });

        botClient.once('ready', () => {
            console.log(`Logged in as ${botClient.user.tag}!`);
            res.json({ message: 'Bot forced online successfully.' });
        });

        botClient.login(token).catch(error => res.status(500).json({ message: 'Error logging in: ' + error }));
    } else {
        res.status(400).json({ message: 'Token is required.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
