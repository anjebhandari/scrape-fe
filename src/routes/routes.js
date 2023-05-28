import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from '../App';
import WatchList from "../app/watchlist";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
        path: '/watchlist',
        element: <WatchList />
    }
]);
  
export default router;
