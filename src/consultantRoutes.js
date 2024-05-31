// @material-ui/icons
import AppsIcon from "@material-ui/icons/Apps";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import RateCard from "@material-ui/icons/LocalAtm";
import WorkHistory from "@material-ui/icons/WorkOutlineOutlined";
import Grain from "@material-ui/icons/Grain";

import MoneyIcon from "@material-ui/icons/Money";
import Description from "@material-ui/icons/Description";
import CancelBooking from "@material-ui/icons/CancelPresentation";

import { PermissionHelper, UserHelper } from "_helpers";
import ChatIcon from "@material-ui/icons/Chat";
import Review from "@material-ui/icons/Assessment";
import Report from "@material-ui/icons/Assessment";
const dashRoutes = [];

dashRoutes.push({
  path: "/dashboard",
  name: "Dashboard",
  rtlName: "",
  mini: "",
  rtlMini: "",
  icon: DashboardIcon,
  state: "dashboardCollapse",
  layout: "/consultant",
});

// if (PermissionHelper.checkMainPermission(["view_technology"])) {
//   dashRoutes.push({
//     path: "/technology",
//     name: "Technology",
//     rtlName: "",
//     mini: "",
//     rtlMini: "",
//     icon: Grain,
//     state: "techCollapse",
//     layout: "/consultant",
//   });
// }
if (UserHelper.isConsultant() && !UserHelper.isServiceProvider()) {
  if (PermissionHelper.checkMainPermission(["view_work_experience"])) {
    dashRoutes.push({
      path: "/work_experience",
      name: "Work Experience",
      rtlName: "",
      mini: "",
      rtlMini: "",
      icon: WorkHistory,
      state: "WorkCollapse",
      layout: "/consultant",
    });
  }
}

if (PermissionHelper.checkMainPermission(["view_schedule"])) {
  dashRoutes.push({
    collapse: true,
    name: "Schedule",
    rtlName: "",
    icon: Schedule,
    state: "ScheduleCollapse",
    views: [
      {
        path: "/weekly_schedule",
        name: "Scheduling Weekly",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/consultant",
      },
      {
        path: "/daily_schedule",
        name: "Scheduling Daily",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/consultant",
      },
    ],
  });
}
if (PermissionHelper.checkMainPermission(["view_rate_card"])) {
  dashRoutes.push({
    path: "/rate_card",
    name: "Rate Card",
    rtlName: "",
    mini: "",
    rtlMini: "",
    icon: RateCard,
    state: "RateCardCollapse",
    layout: "/consultant",
  });
}
if (PermissionHelper.checkMainPermission(["view_booking"])) {
  dashRoutes.push({
    collapse: true,
    name: "Booking",
    rtlName: "",
    icon: Description,
    state: "DashboardCollapse",
    views: [
      {
        path: "/past_booking",
        name: "Past Booking",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/consultant",
      },
      {
        path: "/upcoming_booking",
        name: "Upcoming Booking",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/consultant",
      },
      {
        path: "/refund_request",
        name: "Refund Request",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/consultant",
      },
    ],
  });
}
if (PermissionHelper.checkMainPermission(["view_chat_history"])) {
  dashRoutes.push({
    path: "/chat-history",
    name: "Chat History",
    rtlName: "",
    mini: "",
    rtlMini: "",
    icon: ChatIcon,
    state: "chatCollapse",
    layout: "/consultant",
  });
}
if (PermissionHelper.checkMainPermission(["view_consultant_payout"])) {
  dashRoutes.push({
    path: "/payout",
    name: "Payout History",
    rtlName: "",
    mini: "",
    rtlMini: "",
    icon: MoneyIcon,
    state: "refundCollapse",
    layout: "/consultant",
  });
}
if (PermissionHelper.checkMainPermission(["view_booking"])) {
  dashRoutes.push({
    collapse: true,
    name: "Reports",
    rtlName: "",
    icon: Description,
    state: "ReportsCollapse",
    views: [
      {
        path: "/consultant-payout-reports",
        name: "Consultant Payout Reports",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/consultant",
      },
      {
        path: "/booking-reports",
        name: "Booking Reports",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/consultant",
      },
    ],
  });
}
export default dashRoutes;
