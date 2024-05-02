
export function History({history}) {

  return (
    <div>
      {history.map((message, index) => {
        return (
          <div key={index}>
            <p>{message.user}: {message.message}</p>
            <p>{message.timestamp}</p>
          </div>
        );
      })}
    </div>
  );
}
