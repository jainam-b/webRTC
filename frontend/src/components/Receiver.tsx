import React, { useEffect, useRef } from "react";

const Receiver = () => {
 const videoref=useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "receiver" }));
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      let pc: RTCPeerConnection | null = null;

      if (message.type === "createOffer") {
        pc = new RTCPeerConnection();
        pc.setRemoteDescription(message.sdp);
        pc.onicecandidate = (event) => {
          console.log(event);
          if (event.candidate) {
            socket.send(
              JSON.stringify({
                type: "iceCandidates",
                candidate: event.candidate, }));
          }
        };
        pc.ontrack=(event)=>{
          console.log(event);
          if(videoref.current){
            videoref.current.srcObject=new MediaStream([event.track])
          }

          
        }
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
       
        socket.send(
          JSON.stringify({ type: "ceateAnswer", sdp: pc.localDescription })
        );
      } else if (message.type === "iceCandidates") {
        if (pc !== null) {
          // @ts-ignore
          pc.addIceCandidate(message.candidate);
        }
      }
    };
  }, []);
  return <div>hello receiver

    <div>
      <video ref={videoref}></video>
    </div>
  </div>;
};

export default Receiver;
