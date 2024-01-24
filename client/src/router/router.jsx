import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../page/dashboard/Home";
import GlobalFragment from "../page/dashboard/GlobalFragment";
import AuthFragment from '../page/Authentication/SignIn'
import SignUp from "../page/Authentication/SignUp";

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
        element: <GlobalFragment />,
      },
      
    ],
  },
]);

export default router;
