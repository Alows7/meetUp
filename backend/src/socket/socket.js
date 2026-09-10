import { Server } from "socket.io";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.io);
    });
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error("Socket.io is not initialized");
  return io;
}
