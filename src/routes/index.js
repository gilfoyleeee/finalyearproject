import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";


// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import AuthLayout from "../layouts/auth";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { element: <RegisterPage />, path: "register" },
        { element: <VerifyOTPPage />, path: "verifyotp" },
        { element: <LoginPage />, path: "login" },
        { element: <ResetPwPage />, path: "resetpw" },
        { element: <SetNewPwPage />, path: "setnewpw" },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        { path: "conversation", element: <Conversation /> },
        { path: "chats", element: <Chats /> },
        { path: "groupchat", element: <GroupChatPage /> },
        { path: "call", element: <CallPage /> },
        { path: "userprofile", element: <UserProfilePage /> },
        { path: "contact", element: <Contact /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);

const Conversation = Loadable(
  lazy(() => import("../pages/dashboard/Conversation"))
);
const Chats = Loadable(lazy(() => import("../pages/dashboard/Chats")));
const Contact = Loadable(lazy(() => import("../sections/main/Contact")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const VerifyOTPPage = Loadable(lazy(() => import("../pages/auth/VerifyOTP")));
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const ResetPwPage = Loadable(lazy(() => import("../pages/auth/ResetPassword")));
const SetNewPwPage = Loadable(lazy(() => import("../pages/auth/SetNewPw")));

const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings/Settings")));

const CallPage = Loadable(lazy(() => import("../pages/dashboard/Call")));
const GroupChatPage = Loadable(
  lazy(() => import("../pages/dashboard/GroupChat"))
);
const UserProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Settings/UserProfile"))
);

const Page404 = Loadable(lazy(() => import("../pages/Page404")));
