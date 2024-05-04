import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Board } from "src/components/Board/Board";
import { History } from "src/components/Chat/History";
import { InputText } from "src/components/Chat/InputText";
import { useSocket } from "src/hooks/useSocket";

const GamePage = () => {
  const params = useParams();
  const socket = useSocket();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (params.id) {
      console.log(params.id);
    }
  }, [params]);

  socket.on("chatMessageResponse", (message) => {
    setHistory([...history, message]);
  });

  return (
    <div className="flex">
      <Board />
      <div className="flex-auto px-5">
        <History history={history} />
        <InputText />

      </div>
    </div>
  );
};

export default GamePage;
