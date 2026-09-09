import app from "./src/server/app.js";
import http from "http";
import { initSocket } from "./src/socket/socket.js";

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Serveur lancé avec succès`);
});
