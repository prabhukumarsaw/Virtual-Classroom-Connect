import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../page/dashboard/Home";
import GlobalRoom from "../page/dashboard/GlobalRoom";
import AuthFragment from '../page/Authentication/SignIn'
import SignUp from "../page/Authentication/SignUp";
import Room from "../layout/Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthFragment />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "main",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "globalfragment",
        element: <GlobalRoom />,
      },
      
    ],
  },

  {
    path: "room",
    element: <Room />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "globalfragment",
        element: <GlobalRoom />,
      },
      
    ],
  },

]);

export default router;
