import { useEffect } from "react";

export function History({ history }) {

  return (
    <>
      {history.map((message, index) => {
        return (
          <div className="flex items-start gap-2.5 mb-3" key={`message-${index}`}>
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="Jese image"
            />
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {message.user}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {
                new Date(message.timestamp).getHours() + ':' + new Date(message.timestamp).getMinutes() + ':' + new Date(message.timestamp).getSeconds()
                }
                </span>
              </div>
              <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {message.message}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
