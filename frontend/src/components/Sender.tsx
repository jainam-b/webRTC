import React, { useEffect, useState } from 'react'

const Sender = () => {
    const [socket, setsocket] = useState<WebSocket | null>(null)
    useEffect(()=>{
        const socket = new WebSocket("ws://localhost:8080");
        socket.onopen=()=>{
            socket.send(JSON.stringify({type:"sender"}))
        } 
        setsocket(socket)
       },[]);
    async function startSendingVideo(){
        if(!socket) return ;
        const pc = new RTCPeerConnection();
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        pc.onicecandidate=(event)=>{
            console.log(event);
            
            if(event.candidate){
                socket.send(JSON.stringify({type:'iceCandidates' , candidate:event.candidate}))
            }
        }
        socket?.send(JSON.stringify({type:"createOffer",sdp:pc.localDescription}));

        socket.onmessage=(event)=>{
            const data=JSON.parse(event.data);
            if(data.type==='createAnswer'){
                pc.setRemoteDescription(data.sdp)
            }else if (data.type==='iceCandidates'){
                pc.addIceCandidate(data.candidate);
            }

        }
    }
  return (
    <div>
        <button onClick={startSendingVideo}>Send Video</button>
      hello sender 
    </div>
  )
}

export default Sender
