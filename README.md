# WebRTC Video Streaming App

This project implements a simple WebRTC video streaming application using WebSockets for signaling. It allows a sender to stream video to a receiver in real time.

## Features

- **Real-time Video Streaming**: Stream video from the sender to the receiver using WebRTC.
- **WebSocket Signaling**: Use WebSockets to handle signaling messages for establishing the peer connection.
- **User Interaction for Playback**: Video playback is initiated by user interaction to comply with browser autoplay policies.

## Technologies Used

- **Frontend**: React
- **WebRTC**: For real-time video communication
- **WebSocket**: For signaling
- **HTML5 Video**: To display the video stream

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A local server or a WebSocket server running on `ws://localhost:8080`.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

### Usage

1. Open two instances of your web browser (or two different browsers).
2. In the first instance, navigate to the Sender component to start streaming video.
3. In the second instance, navigate to the Receiver component to view the streamed video.
4. Click the "Play Video" button in the receiver to start video playback.

## Code Structure

- **Receiver.tsx**: Handles the receiving of the video stream and displays it.
- **Sender.tsx**: Manages video capture and streaming to the receiver.

## Troubleshooting

- Ensure that your WebSocket server is running and accessible at the specified URL.
- Check the browser console for any errors related to WebRTC or WebSocket connections.

## License

This project is licensed under the MIT License.
