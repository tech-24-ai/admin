// @material-ui/icons
import AppsIcon from "@material-ui/icons/Apps";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import UserIcon from "@material-ui/icons/Person";
import VendorIcon from "@material-ui/icons/PersonPin";
import PartnerIcon from "@material-ui/icons/Accessibility";
import HistoryIcon from "@material-ui/icons/History";
import SettingIcon from "@material-ui/icons/Settings";
import MoneyIcon from "@material-ui/icons/Money";
import VisitorIcon from "@material-ui/icons/PersonAdd";
import ContactIcon from "@material-ui/icons/Call";
import ModuleIcon from "@material-ui/icons/ViewModule";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FlowIcon from "@material-ui/icons/PieChart";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import { PermissionHelper } from "_helpers";
import AcUnitIcon from "@material-ui/icons/AcUnit";
var dashRoutes = [];

// Dashboard
dashRoutes.push({
  collapse: true,
  name: "Dashboard",
  rtlName: "",
  icon: DashboardIcon,
  state: "DashboardCollapse",
  views: [
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    },
    // temporary commented start
    // {
    //   path: "/midashboard",
    //   name: "MI Dashboard",
    //   rtlName: "",
    //   mini: "",
    //   rtlMini: "",
    //   layout: "/admin",
    // },
    // temporary commented end
    {
      path: "/consultant_dashboard",
      name: "Consultant Dashboard",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    },
  ],
});

// dashRoutes.push(
//     {
//         path: "/dashboard",
//         name: "Dashboard",
//         rtlName: "",
//         icon: DashboardIcon,
//         layout: "/admin"
//     }
// )

// Consultant
if (PermissionHelper.checkMainPermission(["view_consultant_manager"])) {
  let views = [];
  if (PermissionHelper.checkMainPermission(["view_consultant"])) {
    views.push({
      path: "/consultant",
      name: "Consultant",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_booking"])) {
    let subViews = [];
    subViews.push(
      // {
      //   path: "/booking",
      //   name: "Booking",
      //   rtlName: "",
      //   mini: "",
      //   rtlMini: "",
      //   layout: "/admin",
      // },
      {
        path: "/upcoming_booking",
        name: "Upcoming Booking",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      },
      {
        path: "/past_booking",
        name: "Past Booking",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      }
    );
    if (PermissionHelper.checkMainPermission(["view_booking_logs"])) {
      subViews.push({
        path: "/booking_logs",
        name: "Booking Logs",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      });
    }
    if (PermissionHelper.checkMainPermission(["view_booking_transactions"])) {
      subViews.push({
        path: "/booking_transaction",
        name: "Booking Transaction",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      });
    }
    if (PermissionHelper.checkMainPermission(["view_booking_transactions"])) {
      subViews.push({
        path: "/refund_request",
        name: "Refund Request",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      });
    }
    views.push({
      collapse: true,
      name: "Booking",
      rtlName: "",
      state: "BookingCollapse",
      views: subViews,
    });
  }
  if (PermissionHelper.checkMainPermission(["view_reviews"])) {
    views.push({
      path: "/reviews",
      name: "Reviews",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_credit_purchase"])) {
    views.push(
      // {
      //   path: "/visitor_credit_history",
      //   name: "Visitor Credit History",
      //   rtlName: "",
      //   mini: "",
      //   rtlMini: "",
      //   layout: "/admin",
      // },
      {
        path: "/visitor_credit_purchase",
        name: "Visitor Credit Purchase",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      }
    );
  }
  if (PermissionHelper.checkMainPermission(["view_chat_history"])) {
    views.push({
      path: "/chat-history",
      name: "Chat History",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_free_addons"])) {
    views.push({
      path: "/free_addons",
      name: "Free Addons for Booking",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_consultant_payout"])) {
    views.push({
      path: "/consultant_payout",
      name: "Consultant Payout History",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }

  if (PermissionHelper.checkMainPermission(["view_complaints"])) {
    views.push({
      path: "/search-log",
      name: "Search Log",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_complaints"])) {
    views.push({
      path: "/complaints",
      name: "Complaints",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  dashRoutes.push({
    collapse: true,
    name: "Consultant",
    rtlName: "",
    icon: PeopleIcon,
    state: "ConsultantCollapse",
    views: views,
  });
  if (PermissionHelper.checkMainPermission(["view_booking"])) {
    let subViews = [];
    subViews.push(
      {
        path: "/booking-reports",
        name: "Booking Reports",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      },
      {
        path: "/consultant-reports",
        name: "Consultant Reports",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      },
      {
        path: "/consultant-payout-reports",
        name: "Consultant Payout Reports",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      }
    );
    // if (PermissionHelper.checkMainPermission(["view_booking_logs"])) {
    //   subViews.push({
    //     path: "/visitor-reports",
    //     name: "Visitor Reports",
    //     rtlName: "",
    //     mini: "",
    //     rtlMini: "",
    //     layout: "/admin",
    //   });
    // }
    if (PermissionHelper.checkMainPermission(["view_booking_transactions"])) {
      subViews.push({
        path: "/visitor-credit-reports",
        name: "Visitor Credit Reports",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      });
    }
    if (PermissionHelper.checkMainPermission(["view_booking_transactions"])) {
      subViews.push({
        path: "/visitor-credit-purchase-reports",
        name: "Visitor Credit Purchase Report",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      });
    }
    views.push({
      collapse: true,
      name: "Reports",
      rtlName: "",
      state: "ReportsCollapse",
      views: subViews,
    });
  }
}

// User Manager
if (PermissionHelper.checkMainPermission(["view_user_manager"])) {
  let views = [];
  if (PermissionHelper.checkMainPermission(["view_permission_group"])) {
    views.push({
      path: "/permission_groups",
      name: "Permission Group",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_permission"])) {
    views.push({
      path: "/permissions",
      name: "Permissions",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_roles"])) {
    views.push({
      path: "/roles",
      name: "Roles",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_users"])) {
    views.push({
      path: "/users",
      name: "Users",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }

  dashRoutes.push({
    collapse: true,
    name: "User Manager",
    rtlName: "",
    icon: UserIcon,
    state: "userModuleCollapse",
    views: views,
  });
}

// Master Manager
if (PermissionHelper.checkMainPermission(["view_master_manager"])) {
  let views = [];
  if (PermissionHelper.checkMainPermission(["view_country_groups"])) {
    views.push({
      path: "/country_groups",
      name: "Country Groups",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_countries"])) {
    views.push({
      path: "/countries",
      name: "Countries",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
    views.push({
      path: "/timezone",
      name: "Time Zone",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_industries"])) {
    views.push({
      path: "/industries",
      name: "Industries",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_skills"])) {
    views.push({
      path: "/skills",
      name: "Skills",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_pages"])) {
    views.push({
      path: "/pages",
      name: "Pages",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_rss"])) {
    views.push({
      path: "/rss",
      name: "RSS",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_currency"])) {
    views.push({
      path: "/currency",
      name: "Currency",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }

  // Master Manager
  dashRoutes.push({
    collapse: true,
    name: "Master Manager",
    rtlName: "",
    icon: AppsIcon,
    state: "MasterModuleCollapse",
    views: views,
  });
}
// temporary commented start
// // Vendor Manager
// if (PermissionHelper.checkMainPermission(["view_vendor_manager"])) {
//   let views = [];
//   if (PermissionHelper.checkMainPermission(["view_vendors"])) {
//     views.push({
//       path: "/vendors",
//       name: "Vendors",
//       rtlName: "",
//       mini: "",
//       rtlMini: "",
//       layout: "/admin",
//     });
//   }

//   if (PermissionHelper.checkMainPermission(["view_vendor_category"])) {
//     views.push({
//       path: "/vendor_category",
//       name: "Vendor Category",
//       rtlName: "",
//       mini: "",
//       rtlMini: "",
//       layout: "/admin",
//     });
//   }

//   dashRoutes.push({
//     collapse: true,
//     name: "Vendor Manager",
//     rtlName: "",
//     icon: VendorIcon,
//     state: "VendorModuleCollapse",
//     views: views,
//   });
// }
// temporary commented end

//End User
{
  let views = [];
  if (true) {
    // FAQ Module

    if (PermissionHelper.checkMainPermission(["view_faq_manager"])) {
      let subViews = [];
      if (PermissionHelper.checkMainPermission(["view_faq_category"])) {
        subViews.push({
          path: "/FAQ-Category",
          name: "FAQ Category",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      if (PermissionHelper.checkMainPermission(["view_faq_list"])) {
        subViews.push({
          path: "/FAQ-list",
          name: "FAQ",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      views.push({
        collapse: true,
        name: "FAQ Manager",
        rtlName: "",
        state: "FAQModuleCollapse",
        views: subViews,
      });
    }

    // Blog Manager

    if (PermissionHelper.checkMainPermission(["View_blog_manager"])) {
      views.push({
        collapse: true,
        name: "Blog Manager",
        rtlName: "",
        state: "BlogModuleCollapse",
        views: [
          {
            path: "/Blog-List",
            name: "Blog",
            rtlName: "",
            mini: "",
            rtlMini: "",
            layout: "/admin",
          },
        ],
      });
    }

    // Visitor Manager
    if (PermissionHelper.checkMainPermission(["view_visitor_manager"])) {
      let subViews = [];

      // if (PermissionHelper.checkMainPermission(['view_visitor_group'])) {
      //     views.push({
      //         path: "/visitor_groups",
      //         name: "Visitor Groups",
      //         rtlName: "",
      //         mini: "",
      //         rtlMini: "",
      //         layout: "/admin"
      //     })
      // }

      if (PermissionHelper.checkMainPermission(["view_visitors"])) {
        subViews.push({
          path: "/visitors",
          name: "Visitors",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
        subViews.push({
          path: "/guestvisitors",
          name: "Guest Visitors",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      views.push({
        collapse: true,
        name: "Visitor Manager",
        rtlName: "",
        state: "VisitorModuleCollapse",
        views: subViews,
      });
    }

    // Contact Manager
    if (PermissionHelper.checkMainPermission(["view_contact_manager"])) {
      let subViews = [];
      if (PermissionHelper.checkMainPermission(["view_contact_types"])) {
        subViews.push({
          path: "/contact_types",
          name: "Contact Types",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      if (PermissionHelper.checkMainPermission(["view_contact_details"])) {
        subViews.push({
          path: "/contacts",
          name: "Contacts",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      views.push({
        collapse: true,
        name: "Contact Manager",
        rtlName: "",
        state: "ContactModuleCollapse",
        views: subViews,
      });
    }

    // Module Manager
    if (PermissionHelper.checkMainPermission(["view_module_manager"])) {
      let subViews = [];
      if (PermissionHelper.checkMainPermission(["view_module_categories"])) {
        subViews.push({
          path: "/categories",
          name: "Module Categories",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      // subViews.push({
      //   path: "/donation",
      //   name: "Donation History",
      //   rtlName: "",
      //   mini: "",
      //   rtlMini: "",
      //   layout: "/admin",
      // });

      if (PermissionHelper.checkMainPermission(["view_document_types"])) {
        subViews.push({
          path: "/document_types",
          name: "Document Types",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      if (PermissionHelper.checkMainPermission(["view_documents"])) {
        subViews.push({
          path: "/documents",
          name: "Documents",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      if (PermissionHelper.checkMainPermission(["view_modules"])) {
        subViews.push({
          path: "/modules",
          name: "Modules",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      if (PermissionHelper.checkMainPermission(["view_products"])) {
        subViews.push({
          path: "/products",
          name: "Products",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      views.push({
        collapse: true,
        name: "Module Manager",
        rtlName: "",
        state: "ModulesCollapse",
        views: subViews,
      });
    }

    // Question Manager
    if (PermissionHelper.checkMainPermission(["view_question_manager"])) {
      let subViews = [];
      if (PermissionHelper.checkMainPermission(["view_question_steps"])) {
        subViews.push({
          path: "/steps",
          name: "Question Steps",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      if (PermissionHelper.checkMainPermission(["view_options"])) {
        subViews.push({
          path: "/options",
          name: "Options",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      if (PermissionHelper.checkMainPermission(["view_sub_options"])) {
        subViews.push({
          path: "/sub_options",
          name: "Sub Options",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      if (PermissionHelper.checkMainPermission(["view_questions"])) {
        subViews.push({
          path: "/questions",
          name: "Questions",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      views.push({
        collapse: true,
        name: "Question Manager",
        rtlName: "",
        state: "QuestionsCollapse",
        views: subViews,
      });
    }

    // Flow Manager
    if (PermissionHelper.checkMainPermission(["view_flow_manager"])) {
      views.push({
        collapse: true,
        name: "Flow Manager",
        rtlName: "",
        state: "FlowsCollapse",
        views: [
          {
            path: "/flows",
            name: "Flows",
            rtlName: "",
            mini: "",
            rtlMini: "",
            layout: "/admin",
          },
        ],
      });
    }

    // EU Subscription Manager
    if (PermissionHelper.checkMainPermission(["view_subscription_manager"])) {
      let subViews = [];
      if (PermissionHelper.checkMainPermission(["view_eusubscription_plan"])) {
        subViews.push({
          path: "/eusubscription-plan",
          name: "Plans",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      if (PermissionHelper.checkMainPermission(["view_eusubscriptions"])) {
        subViews.push({
          path: "/eusubscriptions",
          name: "Subscriptions",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      if (PermissionHelper.checkMainPermission(["view_eusubscriptions"])) {
        subViews.push({
          path: "/eusubscription-pending",
          name: "Subscriptions Pending",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      if (PermissionHelper.checkMainPermission(["view_eutransactions"])) {
        subViews.push({
          path: "/eutransactions",
          name: "Transaction History",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      if (PermissionHelper.checkMainPermission(["view_eudocpurchases"])) {
        subViews.push({
          path: "/eudocpurchases",
          name: "Document Purchase History",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      views.push({
        collapse: true,
        name: "Subscription Manager",
        rtlName: "",
        state: "SubscriptionsCollapse",
        views: subViews,
      });
    }

    // Report Manager
    if (PermissionHelper.checkMainPermission(["view_visitor_report_manager"])) {
      let subViews = [];

      subViews.push({
        path: "/ip_logs",
        name: "Visitor IP Log",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      });

      subViews.push({
        path: "/login_logs",
        name: "Visitor Login Log",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      });

      if (PermissionHelper.checkMainPermission(["view_search_report"])) {
        subViews.push({
          path: "/search_reports",
          name: "Visitor Search Report",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }

      if (
        PermissionHelper.checkMainPermission(["view_product_search_report"])
      ) {
        subViews.push({
          path: "/product_search_reports",
          name: "Visitor Product Search",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      if (PermissionHelper.checkMainPermission(["view_option_search_report"])) {
        subViews.push({
          path: "/option_search_reports",
          name: "Visitor Question & Options",
          rtlName: "",
          mini: "",
          rtlMini: "",
          layout: "/admin",
        });
      }
      views.push({
        collapse: true,
        name: "Visitor Report",
        rtlName: "",
        state: "ReportCollapse",
        views: subViews,
      });
    }
    views.push({
      path: "/donation",
      name: "Donation History",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
    dashRoutes.push({
      collapse: true,
      name: "End User",
      rtlName: "",
      icon: CardMembershipIcon,
      state: "EuSegmentModuleCollapse",
      views: views,
    });
  }
}
// temporary commented start
// //Segment Manager
// if (PermissionHelper.checkMainPermission(["view_mi_segment_manager"])) {
//   let views = [];
//   if (PermissionHelper.checkMainPermission(["view_mi_segment"])) {
//     views.push({
//       path: "/mi-segment",
//       name: "MI Segment",
//       rtlName: "",
//       mini: "",
//       rtlMini: "",
//       layout: "/admin",
//     });
//   }

//   if (PermissionHelper.checkMainPermission(["view_mi_investor"])) {
//     views.push({
//       path: "/investor",
//       name: "Investor",
//       rtlName: "",
//       mini: "",
//       rtlMini: "",
//       layout: "/admin",
//     });
//   }

//   if (PermissionHelper.checkMainPermission(["view_mi_contacts"])) {
//     views.push({
//       path: "/mi_contacts",
//       name: "MI Contacts",
//       rtlName: "",
//       mini: "",
//       rtlMini: "",
//       layout: "/admin",
//     });
//   }

//   //Subscription Manager for MI
//   {
//     let subViews = [];

//     if (PermissionHelper.checkMainPermission(["view_subscription_plan"])) {
//       subViews.push({
//         path: "/subscription-plan",
//         name: "Plans",
//         rtlName: "",
//         mini: "",
//         rtlMini: "",
//         layout: "/admin",
//       });
//     }

//     if (PermissionHelper.checkMainPermission(["view_subscriptions"])) {
//       subViews.push({
//         path: "/subscriptions",
//         name: "Subscriptions",
//         rtlName: "",
//         mini: "",
//         rtlMini: "",
//         layout: "/admin",
//       });
//     }

//     if (PermissionHelper.checkMainPermission(["view_transactions"])) {
//       subViews.push({
//         path: "/transactions",
//         name: "Transaction History",
//         rtlName: "",
//         mini: "",
//         rtlMini: "",
//         layout: "/admin",
//       });
//     }

//     if (
//       PermissionHelper.checkMainPermission(["view_mi_subscription_manager"])
//     ) {
//       views.push({
//         collapse: true,
//         name: "Subscription Manager",
//         rtlName: "",
//         state: "SubscriptionModuleCollapse",
//         views: subViews,
//       });
//     }
//   }

//   //Competative landscape
//   if (PermissionHelper.checkMainPermission(["view_competative_manager"])) {
//     views.push({
//       path: "/competitivelandscape",
//       name: "Competitive Landscape",
//       rtlName: "",
//       mini: "",
//       rtlMini: "",
//       layout: "/admin",
//     });
//   }

//   //Pricing Manager for MI
//   {
//     let subViews = [];

//     if (PermissionHelper.checkMainPermission(["view_pricing_model"])) {
//       subViews.push({
//         path: "/Pricing-model",
//         name: "Pricing Model",
//         rtlName: "",
//         mini: "",
//         rtlMini: "",
//         layout: "/admin",
//       });
//     }

//     if (PermissionHelper.checkMainPermission(["view_pricing_configuration"])) {
//       subViews.push({
//         path: "/pricing-configuration",
//         name: "Pricing Configuration",
//         rtlName: "",
//         mini: "",
//         rtlMini: "",
//         layout: "/admin",
//       });
//     }

//     // Pricing Manager
//     if (PermissionHelper.checkMainPermission(["view_pricing_manager"])) {
//       views.push({
//         collapse: true,
//         name: "Pricing Manager",
//         rtlName: "",
//         state: "PricingModuleCollapse",
//         views: subViews,
//       });
//     }
//   }

//   //Partner Manager
//   {
//     if (PermissionHelper.checkMainPermission(["view_partner_manager"])) {
//       let subViews = [];
//       if (PermissionHelper.checkMainPermission(["view_partners"])) {
//         subViews.push({
//           path: "/partners",
//           name: "Partners",
//           rtlName: "",
//           mini: "",
//           rtlMini: "",
//           layout: "/admin",
//         });
//       }

//       if (PermissionHelper.checkMainPermission(["view_partners_types"])) {
//         subViews.push({
//           path: "/partner-types",
//           name: "Partner Type",
//           rtlName: "",
//           mini: "",
//           rtlMini: "",
//           layout: "/admin",
//         });
//       }

//       views.push({
//         collapse: true,
//         name: "Partner Manager",
//         rtlName: "",
//         state: "PartnerModuleCollapse",
//         views: subViews,
//       });
//     }
//   }

//   dashRoutes.push({
//     collapse: true,
//     name: "Market Intelligence",
//     rtlName: "",
//     icon: BusinessCenterIcon,
//     state: "MISegmentModuleCollapse",
//     views: views,
//   });
// }
// temporary commented end

// Setting
if (PermissionHelper.checkMainPermission(["view_setting_manager"])) {
  dashRoutes.push({
    collapse: true,
    name: "Setting",
    rtlName: "",
    icon: SettingIcon,
    state: "SettingCollapse",
    views: [
      {
        path: "/cron-jobs",
        name: "Cron Jobs",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      },
      {
        path: "/config",
        name: "Config",
        rtlName: "",
        mini: "",
        rtlMini: "",
        layout: "/admin",
      },
      // temporary commented start
      // {
      //   path: "/market-product",
      //   name: "Market Product",
      //   rtlName: "",
      //   mini: "",
      //   rtlMini: "",
      //   layout: "/admin",
      // },
      // temporary commented end
    ],
  });
}

// Logs
if (PermissionHelper.checkMainPermission(["view_logs_manager"])) {
  let views = [];
  if (PermissionHelper.checkMainPermission(["view_cron_logs"])) {
    views.push({
      path: "/cron-logs",
      name: "Cron Logs",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_api_logs"])) {
    views.push({
      path: "/api_logs",
      name: "API Logs",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_nubela_logs"])) {
    views.push({
      path: "/nubela_logs",
      name: "Nubela Logs",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_signal_hire_logs"])) {
    views.push({
      path: "/signal_logs",
      name: "Signal Hire Logs",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_anomaly_logs"])) {
    views.push({
      path: "/anomaly",
      name: "Anomaly",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }

  dashRoutes.push({
    collapse: true,
    name: "Logs",
    rtlName: "",
    icon: HistoryIcon,
    state: "LogsCollapse",
    views: views,
  });
}

if (PermissionHelper.checkMainPermission(["view_community_manager"])) {
  let views = [];
  if (PermissionHelper.checkMainPermission(["view_tags"])) {
    views.push({
      path: "/tags",
      name: "Tags",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }

  // if (PermissionHelper.checkMainPermission(["view_visitor_technology"])) {  
  //   views.push({
  //     path: "/technology",
  //     name: "Technology",
  //     rtlName: "",
  //     mini: "",
  //     rtlMini: "",
  //     layout: "/admin",
  //   });
  // }

  // if (PermissionHelper.checkMainPermission(["view_report_abuse_types"])) {
  //   views.push({
  //     path: "/report_abuse/type",
  //     name: "Report Abuse Type",
  //     rtlName: "",
  //     mini: "",
  //     rtlMini: "",
  //     layout: "/admin",
  //   });
  // }

  if (PermissionHelper.checkMainPermission(["view_community"])) { 
    views.push({
      path: "/communities",
      name: "Community",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }
   
  if (PermissionHelper.checkMainPermission(["view_community_query"])) { 
    views.push({
      path: "/community-posts",
      name: "Community Queries",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }

  if (PermissionHelper.checkMainPermission(["view_badge"])) { 
    views.push({
      path: "/badge",
      name: "Badge",
      rtlName: "",
      mini: "",
      rtlMini: "",
      layout: "/admin",
    });
  }  

  // if (PermissionHelper.checkMainPermission(["view_report_abuses"])) {
  //   views.push({
  //     path: "/report-abuses",
  //     name: "Report Abuses",
  //     rtlName: "",
  //     mini: "",
  //     rtlMini: "",
  //     layout: "/admin",
  //   });
  // }

  dashRoutes.push({
    collapse: true,
    name: "Community",
    rtlName: "",
    icon: AppsIcon,
    state: "CommunityModuleCollapse",
    views: views,
  });
  
} 
export default dashRoutes;
