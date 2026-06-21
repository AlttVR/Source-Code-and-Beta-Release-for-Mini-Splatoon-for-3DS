const { WebSocketServer } = require('ws');

// Render automatically sets process.env.PORT. We must listen to it!
const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({ port: PORT });

// Object to track all online players
let activePlayers = {};

console.log(`Splatoon 2D Server started on port ${PORT}`);

wss.on('connection', (ws) => {
    // Generate a unique ID for this player when they connect
    const playerId = Math.random().toString(36).substring(2, 9);
    console.log(`Player connected: ${playerId}`);

    // Send the new player their unique ID
    ws.send(JSON.stringify({ type: 'INIT', id: playerId }));

    // Listen for messages coming from the 3DS / DSi console
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            // If a player moves or shoots, update their data
            if (data.type === 'MOVE') {
                activePlayers[playerId] = { x: data.x, y: data.y, team: data.team };

                // Broadcast this update to every other connected console
                broadcast({
                    type: 'UPDATE',
                    players: activePlayers
                });
            }
        } catch (e) {
            console.error("Invalid packet received");
        }
    });

    // Clean up when a player closes the game or loses Wi-Fi
    ws.on('close', () => {
        console.log(`Player disconnected: ${playerId}`);
        delete activePlayers[playerId];
        broadcast({ type: 'REMOVE', id: playerId });
    });
});

// Helper function to send data to everyone
function broadcast(data) {
    const packet = JSON.stringify(data);
    wss.clients.forEach((client) => {
        if (client.readyState === 1) { // 1 means OPEN
            client.send(packet);
        }
    });
}
