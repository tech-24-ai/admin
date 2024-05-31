import ErrorPage from "pages/Errors/ErrorPage.js";
import LoginPage from "pages/Auth/LoginPage.js";
import ForgotPage from "pages/Auth/ForgotPage";
import ConfirmPage from "pages/Auth/ConfirmPage";

const dashRoutes = [
  {
    path: "/login-page",
    name: "Login Page",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/forgot-page",
    name: "Forgot Page",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: ForgotPage,
    layout: "/auth"
  },
  {
    path: "/forgot_resetpassword",
    name: "Confirm Page",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: ConfirmPage,
    layout: "/auth"
  },
  {
    path: "/error-page",
    name: "Error Page",
    rtlName: "صفحة الخطأ",
    mini: "E",
    rtlMini: "البريد",
    component: ErrorPage,
    layout: "/auth"
  }
];
export default dashRoutes;
