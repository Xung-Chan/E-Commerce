import { Server } from "socket.io";
import { ioServer } from "../index.js";
class SocketService {
    initSocket() {

        ioServer.on("connection", (socket) => {
            console.log(`Socket connected: ${socket.id}`);

            socket.on("joinProduct", (productId: string) => {
                if (!productId) return;
                const room = `product_${productId}`;
                socket.join(room);
                console.log(`Socket ${socket.id} joined room ${room}`);
            });


            socket.on("disconnect", () => {
                console.log(`Socket disconnected: ${socket.id}`);
                socket.rooms.forEach((room) => {
                    socket.leave(room);
                });
            });
        });
    }
};
const socketService = new SocketService();
export default socketService;