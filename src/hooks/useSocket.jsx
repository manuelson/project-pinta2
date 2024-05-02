import socketIO from "socket.io-client";
const socket = socketIO(import.meta.env.VITE_SOCKET_IO_URL, {
  auth: {
    token: "valid",
  },
});

export function useSocket() {
  return socket;
}
