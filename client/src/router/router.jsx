import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../page/dashboard/Home";
import GlobalRoom from "../page/dashboard/GlobalRoom";
import AuthFragment from '../page/Authentication/SignIn'
import Room from "../layout/Room";
import RoomHome from "../page/classroom/RoomHome";
import StatProfile from "../page/dashboard/StatProfile";
import PrivateRouter from '../PrivateRouter/PrivateRouter'
import EditProfile from "../page/dashboard/EditProfile";
import TestPage from "../page/dashboard/TestPage";
import VirtualRoom from '../page/virtualroom/VirtualRoom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthFragment />,
  },
  {
    path: "/editProfile",
    element: <EditProfile />,
  },
  {
    path: "main",
    element: <PrivateRouter><Main /></PrivateRouter>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "globalfragment",
        element: <GlobalRoom />,
      },
      {
        path: "statprofile",
        element: <StatProfile />,
      },
      {
        path: "testpage",
        element: <TestPage />,
      },
      
      
    ],
  },
  {
    path: "virualroom/:roomId",
    element: <Room />
  },
  {
    path: "room/:roomId",
    element: <PrivateRouter><Room /></PrivateRouter>,
  },

]);

export default router;
