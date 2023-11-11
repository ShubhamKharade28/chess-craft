export type WaitScreenProps = {
    room: string,
    role: string,
}

const WaitScreen = ({room,role}: WaitScreenProps) => {
    return (
        <div className="flex flex-col-reverse justify-center items-center gap-5 text-white">
            <h3>Waiting for an opponent...</h3>
            <h4>Room: {room}</h4>
            <h4>Role: {role}</h4>
        </div>
    )
}

export default WaitScreen;