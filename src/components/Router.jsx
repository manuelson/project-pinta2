import { createBrowserRouter } from "react-router-dom"
import { Layout } from "src/layout/Index";
import ErrorPage  from "src/pages/ErrorPage";
import HomePage from "src/pages/HomePage";
import BoardPage from "src/pages/BoardPage";

export const Router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/board",
                element: <BoardPage/>,
            }
        ],
    },
]);
