"use client";
import { useState, useEffect } from "react";
import { socket } from "../../lib/socket/socket-client";

const SendMessage = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<string>>([]);
    const [room, setRoom] = useState<string|null>(null);
    const [role, setRole] = useState<string|null>(null);

    useEffect(() => {
        function onConnect(){
            setIsConnected(true);
            socket.emit('joinRoom');
        }
        function onDisconnect(){
            setIsConnected(false);
        }
        function onMessage(msg: string){
            console.log('message received: ', msg);
            setMessages(prev => [...prev, msg]);
        }
        function onRoomJoined(userRoom: string){
            setRoom(userRoom);
            console.log(userRoom);
        }
        function onRoleAssigned(userRole: string){
            if(!room) {setRole(userRole);}
            console.log(userRole);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('message', onMessage);
        socket.on('roomAssigned', onRoomJoined)
        socket.on('roleAssigned', onRoleAssigned);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message', onMessage);
            socket.off('roomJoined', onRoomJoined);
            socket.off('roleAssigned', onRoleAssigned);
        }
    }, [])

    function sendMessage() {
        socket.emit('message', { room, message });
    }

    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
        setRoom(null);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3 mt-10">
            <div className="text-lg block">
                State : {isConnected ? <span>Connected to room {room}</span>: <span>Not connected</span>}
            </div>
            <div className="text-lg">Role : {role}</div>
            <div className="flex gap-3">
                <button onClick={connect} className="py-2 px-4 bg-green-500 text-white rounded-lg">Connect</button>
                <button onClick={disconnect} className="py-2 px-4 bg-red-500 text-white rounded-lg">Disconnect</button>
            </div>
            <div className="flex justify-center items-center gap-3 m-10">
                <input className=" p-2 border-2 border-blue-950 outline-none rounded" type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button onClick={() => sendMessage()} className="p-2 outline-none bg-black text-white rounded-lg">Send</button>
            </div>
            <div className="flex flex-col justify-center items-start">
                {messages.map((message) => (
                    <span>{message}</span>
                ))}
            </div>
        </div>
    )
}

export default SendMessage;