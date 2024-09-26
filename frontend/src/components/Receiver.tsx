import React, { useEffect } from "react";

const Receiver = () => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "receiver" }));
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      let pc :RTCPeerConnection |null =null;
      if (message.type === "createOffer") {
         pc = new RTCPeerConnection();
        pc.setRemoteDescription(message.sdp);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        pc.onicecandidate = (event) => {
          console.log(event);

          if (event.candidate) {
            socket.send(
              JSON.stringify({
                type: "iceCandidates",
                candidate: event.candidate,
              })
            );
          }
        };
        socket.send(
          JSON.stringify({ type: "ceateAnswer", sdp: pc.localDescription })
        );
      } else if (message.type === "iceCandidates") {
        if(pc!==null){
            // @ts-ignore
            pc.addIceCandidate(message.candidate)
        }
      }
    };
  }, []);
  return <div>hello receiver</div>;
};

export default Receiver;
