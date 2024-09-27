import { createBrowserRouter } from "react-router-dom";
import HomeComponent from "../page/dashboard/HomeComponent/Home";
import RoomComponent from "../page/dashboard/RoomComponent/GlobalRoom";
import AuthFragment from "../page/Authentication/SignIn";
import Signup from "../page/Authentication/Signup";
import Room from "../layout/Room";
import RoomHome from "../page/classroom/RoomHome";
import ProfileComopnent from "../page/dashboard/ProfileComponent/StatProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import TestPage from "../page/dashboard/TestPage";
import Layout from "../layout/layout";
import ProtectedRoomRoute from "@/PrivateRouter/ProtectedRoomRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthFragment />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "main",
    element: (
      <PrivateRouter>
        <Layout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <HomeComponent />,
      },
      {
        path: "globalfragment",
        element: <RoomComponent />,
      },
      {
        path: "ProfileComopnent",
        element: <ProfileComopnent />,
      },
      {
        path: "testpage",
        element: <TestPage />,
      },
    ],
  },
  // {
  //   path: "virualroom/:roomId",
  //   element: <Room />
  // },
  {
    path: "room/:roomId",
    element: (
      <PrivateRouter>
        <Room />
      </PrivateRouter>
    ),
  },
]);

export default router;
