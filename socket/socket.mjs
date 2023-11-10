
import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "*",
    }
});

const rooms = {};

io.on('connect', (socket) => {

    socket.emit('message', 'Connected to the room');

    // Handle room joining and role assignment
    socket.on('joinRoom', () => {
        let userRoom;

        // Find an available room with fewer than two players
        const availableRoom = Object.keys(rooms).find(room => io.sockets.adapter.rooms.get(room).size < 2);

        if(availableRoom){
            userRoom = availableRoom;
        }else{
            // Create a room if no available room is found
            userRoom = generateRoomName();
            rooms[userRoom] = [];
        }

        socket.join(userRoom);
        rooms[userRoom].push(socket.id);

        console.log('User ', socket.id, ' joined the room ', userRoom);

        // Determine the user's role (black or white)
        const roomSize = io.sockets.adapter.rooms.get(userRoom).size;  
        const userRole = roomSize > 1 ? 'white': 'black';

        // Broadcast to the user's role to everyone in the room
        io.to(socket.id).emit('roleAssigned', userRole);
        io.to(userRoom).emit('roomAssigned', userRoom);

        socket.on('message', (data) => {
            // Broadcast the message to the users in the room
            io.to(data.room).except(socket.id).emit('message', data.message);
        });
    });

    socket.on('disconnect', () => {
        console.log('User ', socket.id, ' disconnected');

        // Find the room the user was in 
        const userRoom = Object.keys(rooms).find(room => rooms[room].includes(socket.id));
        
        if(userRoom){
            // Remove the user from the room
            rooms[userRoom] = rooms[userRoom].filter(id => id !== socket.id);

            // If the room is empty, delete it
            if (rooms[userRoom].length === 0) {
                delete rooms[userRoom];
            }

            // Broadcast to the room when a user leaves
            io.to(userRoom).emit('message', `User ${socket.id} left the room`);
        }
    })
});

function generateRoomName() {
    return 'room' + Math.round(Math.random()*100000);
}

io.listen(3001);