const socketio = require("socket.io");
/**
 * WebSockets
 * clean this later
 */
const store = new Map();
const socketServer = new socketio.Server({
    cors: {
        origin: "http://localhost:3001",
    },
});

socketServer.on("connection", (socket) => {
    // socket channel
    console.log(`New socket wit id: ${socket.id} connected`);
    
    const payload = socket.handshake.auth;
    console.log("payload: ", payload);

    const channelId = payload.channel;
    socket.join(channelId);

    // if (!store.has(channelId)) store.set(channelId, [socket.id]);
    // else store.get(channelId).push(socket.id);

    // console.log("store: ", store);

    socket.on("disconnect", () => {
        console.log(`Socket with id: ${socket.id} disconnected.`);
        socket.leave(channelId);

        // if (store.has(channelId)) {
        //     const otherSockets = store
        //         .get(channelId)
        //         .filter((id) => id !== socket.id);
        //     store.set(channelId, otherSockets);
        // }
        // console.log("store: ", store);
    });

});

module.exports = {
    store,
    socketServer,
};
