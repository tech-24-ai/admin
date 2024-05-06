import Dashboard from "views/Dashboard/Dashboard.js";
import MIDashboard from "views/Dashboard/MIDashboard.js";
import ConsultantDashboard from "views/Dashboard/ConsultantDashboard";

//Consultant Module
import ConsultantTabForm from "pages/ConsultantModule/FormTab";
import ConsultantForm from "pages/ConsultantModule/Consultant/Form";
import ConsultantList from "pages/ConsultantModule/Consultant/List";

import WorkExperienceForm from "pages/ConsultantModule/WorkExperience/Form";
import WorkExperienceList from "pages/ConsultantModule/WorkExperience/List";

import TechnologyForm from "pages/ConsultantModule/Technology/Form";
import TechnologyList from "pages/ConsultantModule/Technology/List";

import SearchlogList from "pages/ConsultantModule/SearchLog/List";

import RateCardForm from "pages/ConsultantModule/RateCard/Form";
import RateCardList from "pages/ConsultantModule/RateCard/List";

import ConsultantSchedulingForm from "pages/ConsultantModule/ConsultantScheduling/Form";
import ConsultantSchedulingList from "pages/ConsultantModule/ConsultantScheduling/List";

import ConsultantSchedulingDailyForm from "pages/ConsultantModule/ConsultantSchedulingDaily/Form";
import ConsultantSchedulingDailyList from "pages/ConsultantModule/ConsultantSchedulingDaily/List";

// import ComplaintsForm from "pages/ConsultantModule/Complaints/Form";
import ComplaintsList from "pages/ConsultantModule/Complaints/List";

import ReviewsForm from "pages/ConsultantModule/Reviews/Form";
import ReviewsList from "pages/ConsultantModule/Reviews/List";

import VisitorChatLogForm from "pages/ConsultantModule/VisitorChat/Form";
import VisitorChatLogList from "pages/ConsultantModule/VisitorChat/List";
import VisitorChatLogView from "pages/ConsultantModule/VisitorChat/View";

import ChatHistoryList from "pages/ConsultantModule/ChatHistory/List";
import ChatHistoryForm from "pages/ConsultantModule/ChatHistory/Form";

import ConsultantPayoutHistoryList from "pages/ConsultantModule/ConsultantPayoutHistory/List";
import ConsultantPayoutHistoryForm from "pages/ConsultantModule/ConsultantPayoutHistory/Form";

import FreeAddonsList from "pages/ConsultantModule/FreeAddonsForBooking/List";
import FreeAddonsForm from "pages/ConsultantModule/FreeAddonsForBooking/Form";

import PastBookingList from "pages/ConsultantModule/PastBooking/List";
import PastBookingForm from "pages/ConsultantModule/PastBooking/Form";

import RefundRequestList from "pages/ConsultantModule/RefundRequest/List";
import RefundRequestForm from "pages/ConsultantModule/RefundRequest/Form";

import ReportsList from "pages/ConsultantModule/Reports/List";
import ReportsForm from "pages/ConsultantModule/Reports/Form";

import BookingReportsList from "pages/ConsultantModule/BookingReports/List";

import ConsultantReportsForm from "pages/ConsultantModule/ConsultantReports/Form";
import ConsultantReportsList from "pages/ConsultantModule/ConsultantReports/List";

import ConsultantPayoutReportsForm from "pages/ConsultantModule/ConsultantPayoutReports/Form";
import ConsultantPayoutReportsList from "pages/ConsultantModule/ConsultantPayoutReports/List";

import VisitorReportsForm from "pages/ConsultantModule/VisitorReports/Form";
import VisitorReportsList from "pages/ConsultantModule/VisitorReports/List";

import VisitorCreditReportsForm from "pages/ConsultantModule/VisitorCreditReports/Form";
import VisitorCreditReportsList from "pages/ConsultantModule/VisitorCreditReports/List";

import VisitorCreditPurchaseReportsList from "pages/ConsultantModule/VisitorCreditPurchaseReports/List";

import BookingList from "pages/ConsultantModule/Booking/List";
import BookingForm from "pages/ConsultantModule/Booking/Form";

import UpcomingBookingList from "pages/ConsultantModule/UpcomingBooking/List";
import UpcomingBookingForm from "pages/ConsultantModule/UpcomingBooking/Form";

import VisitorCreditHistoryList from "pages/ConsultantModule/VisitorCreditHistory/List";
import VisitorCreditHistoryForm from "pages/ConsultantModule/VisitorCreditHistory/Form";

import VisitorCreditPurchaseList from "pages/ConsultantModule/VisitorCreditPurchase/List";
import VisitorCreditPurchaseForm from "pages/ConsultantModule/VisitorCreditPurchase/Form";

import BookingLogsList from "pages/ConsultantModule/BookingLogs/List";
// import BookingLogsForm from "pages/ConsultantModule/BookingLogs/Form";

import BookingTransaction from "pages/ConsultantModule/BookingTransaction/List";

// FAQ Module
import FAQ from "pages/FAQModule/FAQCategory/List.js";
import FAQForm from "pages/FAQModule/FAQCategory/Form.js";
import FAQS from "pages/FAQModule/FAQ/List.js";
import FAQs from "pages/FAQModule/FAQ/Form.js";

// Blog Module
import BlogCategory from "pages/BlogModule/BlogCategory/List.js";
import BlogCategoryForm from "pages/BlogModule/BlogCategory/Form.js";
import BlogLists from "pages/BlogModule/Blog/List.js";
import BlogListForm from "pages/BlogModule/Blog/Form.js";

// User Module
import PermissionGroupList from "pages/UserModule/PermissionGroups/List.js";
import PermissionGroupForm from "pages/UserModule/PermissionGroups/Form.js";

import PermissionList from "pages/UserModule/Permissions/List.js";
import PermissionForm from "pages/UserModule/Permissions/Form.js";

import RolesList from "pages/UserModule/Roles/List.js";
import RoleForm from "pages/UserModule/Roles/Form.js";

import UsersList from "pages/UserModule/User/List.js";
import UserForm from "pages/UserModule/User/Form.js";
import ProfileForm from "pages/UserModule/User/ProfileForm.js";
import ConsultantProfileForm from "pages/UserModule/User/ConsultantProfileForm.js";

// Location Module
import CountriesList from "pages/LocationModule/Countries/List.js";
import CountryForm from "pages/LocationModule/Countries/Form.js";

import TimeZoneList from "pages/LocationModule/TimeZone/List.js";
import TimeZoneForm from "pages/LocationModule/TimeZone/Form.js";

import CountryGroupList from "pages/LocationModule/CountryGroup/List.js";
import CountryGroupForm from "pages/LocationModule/CountryGroup/Form.js";
import IndustryList from "pages/ProductModule/Industries/List.js";
import IndustryForm from "pages/ProductModule/Industries/Form.js";

// Master Module
import RssList from "pages/MasterModule/RSS/List.js";
import RssForm from "pages/MasterModule/RSS/Form.js";

import SkillsList from "pages/MasterModule/Skills/List";
import SkillsForm from "pages/MasterModule/Skills/Form";

import CurrencyList from "pages/MasterModule/Currency/List.js";
import CurrencyForm from "pages/MasterModule/Currency/Form.js";

// Product Module
import CategoriesList from "pages/ProductModule/Categories/List.js";
import CategoryForm from "pages/ProductModule/Categories/Form.js";

import ProductList from "pages/ProductModule/Products/List.js";
import ProductForm from "pages/ProductModule/Products/Form.js";

import StepList from "pages/ProductModule/Steps/List.js";
import StepForm from "pages/ProductModule/Steps/Form.js";

import ModulesList from "pages/ProductModule/Modules/List.js";
import ModulesForm from "pages/ProductModule/Modules/Form.js";

import FlowsList from "pages/ProductModule/Flows/List.js";
import FlowsForm from "pages/ProductModule/Flows/Form.js";

import QuestionsList from "pages/ProductModule/Questions/List.js";
import QuestionsForm from "pages/ProductModule/Questions/Form.js";

import OptionsList from "pages/ProductModule/Options/List.js";
import OptionsForm from "pages/ProductModule/Options/Form.js";
import SubOptionsList from "pages/ProductModule/SubOptions/List.js";
import SubOptionsForm from "pages/ProductModule/SubOptions/Form.js";

// Contact Module
import ContactTypeList from "pages/ContactModule/ContactTypes/List.js";
import ContactTypeForm from "pages/ContactModule/ContactTypes/Form.js";
import ContactList from "pages/ContactModule/Contacts/List.js";
import ContactForm from "pages/ContactModule/Contacts/Form.js";
import ContactView from "pages/ContactModule/Contacts/View.js";

// Document Module
import DocumentTypeList from "pages/DocumentModule/DocumentTypes/List.js";
import DocumentTypeForm from "pages/DocumentModule/DocumentTypes/Form.js";
import DocumentList from "pages/DocumentModule/Documents/List.js";
import DocumentForm from "pages/DocumentModule/Documents/Form.js";

// Vendor Module
import VendorTabForm from "pages/VendorModule/FormTab.js";
import VendorList from "pages/VendorModule/Vendors/List.js";
import VendorForm from "pages/VendorModule/Vendors/Form.js";

import VendorCategoryList from "pages/VendorModule/VendorCategory/List.js";
import VendorCategoryForm from "pages/VendorModule/VendorCategory/Form.js";

import KeyPeopleList from "pages/VendorModule/KeyPeople/List.js";
import KeyPeopleForm from "pages/VendorModule/KeyPeople/Form.js";

import LocationsList from "pages/VendorModule/Locations/List.js";
import LocationsForm from "pages/VendorModule/Locations/Form.js";

import FinancialsList from "pages/VendorModule/Financials/List.js";
import FinancialsForm from "pages/VendorModule/Financials/Form.js";

import FundingList from "pages/VendorModule/Funding/List.js";
import FundingForm from "pages/VendorModule/Funding/Form.js";

import EmployeeJobCountList from "pages/VendorModule/EmployeeJobCount/List.js";
import EmployeeJobCountForm from "pages/VendorModule/EmployeeJobCount/Form.js";

import AcquisitionList from "pages/VendorModule/Acquisition/List.js";
import AcquisitionForm from "pages/VendorModule/Acquisition/Form.js";

import PatentList from "pages/VendorModule/PatentList/List.js";
import PatentForm from "pages/VendorModule/PatentList/Form.js";

import GoogleTrendList from "pages/VendorModule/GoogleTrend/List.js";
import GoogleTrendForm from "pages/VendorModule/GoogleTrend/Form.js";

import IpsList from "pages/VendorModule/Ips/List.js";
import IpsForm from "pages/VendorModule/Ips/Form.js";

import ITMAPScoreList from "pages/VendorModule/ITMAPScore/List.js";
import ITMAPScoreForm from "pages/VendorModule/ITMAPScore/Form.js";

import TwitterDataList from "pages/VendorModule/TwitterData/List.js";
import TwitterDataForm from "pages/VendorModule/TwitterData/Form.js";

import WebTrafficList from "pages/VendorModule/WebTraffic/List.js";
import WebTrafficForm from "pages/VendorModule/WebTraffic/Form.js";

import VendorDocumentList from "pages/VendorModule/DocumentList/List.js";
import VendorDocumentForm from "pages/VendorModule/DocumentList/Form.js";

import NewsList from "pages/VendorModule/NewsList/List.js";
import NewsForm from "pages/VendorModule/NewsList/Form.js";

import CompetitiveDynamicList from "pages/VendorModule/CompetitiveDynamic/List.js";
import CompetitiveDynamicForm from "pages/VendorModule/CompetitiveDynamic/Form.js";

//MI Segment
import MISegmentList from "pages/MISegmentModule/MISegment/List.js";
import MISegmentForm from "pages/MISegmentModule/MISegment/Form.js";
import MiContacts from "pages/MISegmentModule/MIContacts/List.js";
import MiView from "pages/MISegmentModule/MIContacts/View.js";

//Investor Segment
import InvestorList from "pages/InvestorModule/Investor/List.js";
import InvestorForm from "pages/InvestorModule/Investor/Form.js";

//Partner Segment
import PartnerList from "pages/PartnerModule/Partners/List.js";
import PartnerForm from "pages/PartnerModule/Partners/Form.js";

//Partner Type Segment
import PartnerTypeList from "pages/PartnerModule/PartnerType/List";
import PartnerTypeForm from "pages/PartnerModule/PartnerType/Form.js";

//Pricing Model Segment
import PricingModelList from "pages/PricingModule/PricingModel/List";
import PricingModelForm from "pages/PricingModule/PricingModel/Form.js";
import PricingConfigurationList from "pages/PricingModule/PricingConfiguration/List";
import PricingConfigurationForm from "pages/PricingModule/PricingConfiguration/Form.js";

//Subscription Plan Segment
import SubscriptionPlanList from "pages/SubscriptionManager/SubscriptionsPlans/List";
import SubscriptionPlanForm from "pages/SubscriptionManager/SubscriptionsPlans/Form.js";

//Donation
import DonationHistoryList from "pages/MasterModule/Donation/List";

//Transaction List
import TransactionsList from "pages/SubscriptionManager/TransactionHistory/List";
import TransactionsView from "pages/SubscriptionManager/TransactionHistory/View";

//EuSubscription Plan Segment
import EuSubscriptionPlanList from "pages/SubscriptionManager/EuSubscriptionsPlans/List";
import EuSubscriptionPlanForm from "pages/SubscriptionManager/EuSubscriptionsPlans/Form.js";

//EuSubscription List
import EuSubscriptionList from "pages/SubscriptionManager/EuSubscriptions/List";
import EuSubscriptionsForm from "pages/SubscriptionManager/EuSubscriptions/Form.js";

//EuSubscription pending List
import EuSubscriptionPendingList from "pages/SubscriptionManager/EuSubscriptionPendings/List.js";
import EuSubscriptionPendingForm from "pages/SubscriptionManager/EuSubscriptionPendings/Form.js";

//EuTransaction List
import EuTransactionsList from "pages/SubscriptionManager/EuTransactionHistory/List";
import EuTransactionsView from "pages/SubscriptionManager/EuTransactionHistory/View";

//Eu Document Purchase List
import EuDocPurchaseList from "pages/SubscriptionManager/EuDocPurchaseHistory/List";
import EuDocPurchaseView from "pages/SubscriptionManager/EuDocPurchaseHistory/View";

//Subscription Segment
import SubscriptionList from "pages/SubscriptionManager/Subscriptions/List";
import SubscriptionsForm from "pages/SubscriptionManager/Subscriptions/Form.js";

//Competitive Segment
import CompetitiveLandscapeList from "pages/CompetitiveModule/CompetitiveDynamic";

// Visitor Module
import VisitorGroupList from "pages/VisitorModule/VisitorGroups/List.js";
import VisitorGroupForm from "pages/VisitorModule/VisitorGroups/Form.js";
import VisitorList from "pages/VisitorModule/Visitors/List.js";
import VisitorForm from "pages/VisitorModule/Visitors/Form.js";
import IPLogList from "pages/VisitorModule/IPs/List.js";
import APILogList from "pages/VisitorModule/APIs/List.js";
import VisitorLoginLogList from "pages/VisitorModule/Visitors/LoginList";

// Page Module
import PageList from "pages/LocationModule/Pages/List.js";
import PageForm from "pages/LocationModule/Pages/Form.js";

// Report Module
import SearchReport from "pages/ReportModule/SearchReport/List.js";
import ProductSearchReport from "pages/ReportModule/SearchReport/Product.js";
import OptionSearchReport from "pages/ReportModule/SearchReport/Options.js";

// import { BlogCategory } from "pages/BlogModule/BlogCategory/List";
import GuestList from "pages/VisitorModule/Visitors/GuestList";

//Setting Module
import CronList from "pages/SettingModule/Cron/List.js";
import CronForm from "pages/SettingModule/Cron/Form.js";
import CronLogsList from "pages/SettingModule/Cron/Logs.js";
import ConfigList from "pages/SettingModule/Config/List.js";
import MarketProductList from "pages/SettingModule/MarketProduct/List.js";
import ConfigForm from "pages/SettingModule/Config/Form.js";
import AnomalyList from "pages/SettingModule/Anomaly/List.js";
import AnomalyForm from "pages/SettingModule/Anomaly/Form.js";
import NubelaLogList from "pages/SettingModule/Nubela/Logs.js";
import SignalHireLogList from "pages/SettingModule/SignalHire/Logs.js";

// Community Tags Lists
import TagsList from "pages/CommunityModule/Tags/List.js";
import TagsForm from "pages/CommunityModule/Tags/Form.js";

import CommunityList from "pages/CommunityModule/Community/List.js";
import CommunityMembersList from "pages/CommunityModule/Community/MembersList.js";
import CommunityForm from "pages/CommunityModule/Community/Form.js";

import VisitorTechnologyList from "pages/CommunityModule/Technology/List.js";
import VisitorTechnologyForm from "pages/CommunityModule/Technology/Form.js";

import ReportAbuseTypesList from "pages/CommunityModule/ReportAbuseTypes/List.js";
import ReportAbuseTypesForm from "pages/CommunityModule/ReportAbuseTypes/Form.js";

import CommunityPostList from "pages/CommunityModule/CommunityPost/List.js";
import CommunityPostForm from "pages/CommunityModule/CommunityPost/Form.js";

import CommunityPostReplyList from "pages/CommunityModule/CommunityPostReply/List.js";
import CommunityPostReplyForm from "pages/CommunityModule/CommunityPostReply/Form.js";
import CommunityPostReplyView from "pages/CommunityModule/CommunityPostReply/View.js";
import CommunityPostReplyCommentsList from "pages/CommunityModule/CommunityPostReply/Comments.js";
import CommunityPostReplyCommentForm from "pages/CommunityModule/CommunityPostReply/CommentsForm.js";

import ReportAbusesList from "pages/CommunityModule/ReportAbuses/List.js";
import ReportAbuseView from "pages/CommunityModule/ReportAbuses/View.js";

import BadgeList from "pages/CommunityModule/Badge/List.js";
import BadgeForm from "pages/CommunityModule/Badge/Form.js";

import VisitorCommunityProfile from "pages/CommunityModule/VisitorProfile/View.js";

import NewsAnnouncementList from "pages/CommunityModule/NewsAnnouncement/List.js";
import NewsAnnouncementForm from "pages/CommunityModule/NewsAnnouncement/Form.js";

import ResearchTopicsList from "pages/DocumentModule/ResearchTopics/List.js";
import ResearchTopicsForm from "pages/DocumentModule/ResearchTopics/Form.js";

import ResearchTagsList from "pages/DocumentModule/ResearchTags/List.js";
import ResearchTagsForm from "pages/DocumentModule/ResearchTags/Form.js";

import { PermissionHelper, UserHelper } from "_helpers";
import { ImageOutlined } from "@material-ui/icons";

var dashRoutes = [];

// Dashboard
dashRoutes.push({
  path: "/dashboard",
  component: Dashboard,
  layout: "/admin",
});
// temporary commented start
// dashRoutes.push({
//   path: "/midashboard",
//   component: MIDashboard,
//   layout: "/admin",
// });
// temporary commented end
dashRoutes.push({
  path: "/consultant_dashboard",
  component: ConsultantDashboard,
  layout: "/admin",
});

//Consultant routes
if (PermissionHelper.checkPermission("view_consultant_manager")) {
  dashRoutes.push({
    path: "/dashboard",
    component: ConsultantDashboard,
    layout: "/consultant",
  });
  if (PermissionHelper.checkPermission("view_consultant")) {
    dashRoutes.push(
      dashRoutes.push({
        path: "/consultant",
        component: ConsultantList,
        layout: "/admin",
      })
    );
    if (
      PermissionHelper.checkPermission("add_consultant") ||
      PermissionHelper.checkPermission("edit_consultant")
    ) {
      dashRoutes.push(
        {
          path: "/consultant-form/:id",
          component: ConsultantTabForm,
          layout: "/admin",
        },
        {
          path: "/basic-info",
          component: ConsultantForm,
          layout: "/admin/consultant-form/:id",
        }
      );
    }
  }
  if (PermissionHelper.checkPermission("view_work_experience")) {
    if (UserHelper.isConsultant() && !UserHelper.isServiceProvider()) {
      dashRoutes.push({
        path: "/work_experience",
        component: WorkExperienceList,
        layout: "/consultant",
      });
    }
    dashRoutes.push({
      path: "/work-experience",
      component: WorkExperienceList,
      layout: "/admin/consultant-form/:id",
    });
    if (
      PermissionHelper.checkPermission("add_work_experience") ||
      PermissionHelper.checkPermission("edit_work_experience")
    ) {
      if (UserHelper.isConsultant()) {
        dashRoutes.push({
          path: "/work-experience-form/:childId",
          component: WorkExperienceForm,
          layout: "/consultant",
        });
      } else {
        dashRoutes.push({
          path: "/work-experience-form/:childId",
          component: WorkExperienceForm,
          layout: "/admin/consultant-form/:id",
        });
      }
    }
  }
  // if (PermissionHelper.checkPermission("view_technology")) {
  //   dashRoutes.push(
  //     {
  //       path: "/technology",
  //       component: TechnologyList,
  //       layout: "/consultant",
  //     },
  //     {
  //       path: "/technology",
  //       component: TechnologyList,
  //       layout: "/admin/consultant-form/:id",
  //     }
  //   );
  //   if (
  //     PermissionHelper.checkPermission("add_technology") ||
  //     PermissionHelper.checkPermission("edit_technology")
  //   ) {
  //     if (UserHelper.isConsultant()) {
  //       dashRoutes.push({
  //         path: "/technology-form/:childId",
  //         component: TechnologyForm,
  //         layout: "/consultant",
  //       });
  //     } else {
  //       dashRoutes.push({
  //         path: "/technology-form/:childId",
  //         component: TechnologyForm,
  //         layout: "/admin/consultant-form/:id",
  //       });
  //     }
  //   }
  // }
  if (PermissionHelper.checkPermission("view_schedule")) {
    dashRoutes.push(
      {
        path: "/weekly_schedule",
        component: ConsultantSchedulingList,
        layout: "/consultant",
      },
      {
        path: "/daily_schedule",
        component: ConsultantSchedulingDailyList,
        layout: "/consultant",
      },
      {
        path: "/weekly_scheduling",
        component: ConsultantSchedulingList,
        layout: "/admin/consultant-form/:id",
      },
      {
        path: "/daily_scheduling",
        component: ConsultantSchedulingDailyList,
        layout: "/admin/consultant-form/:id",
      }
    );
    if (
      PermissionHelper.checkPermission("add_schedule") ||
      PermissionHelper.checkPermission("edit_schedule")
    ) {
      if (UserHelper.isConsultant()) {
        dashRoutes.push(
          {
            path: "/consultant-scheduling-form/:childId",
            component: ConsultantSchedulingForm,
            layout: "/consultant",
          },
          {
            path: "/consultant-scheduling-daily-form/:childId",
            component: ConsultantSchedulingDailyForm,
            layout: "/consultant",
          }
        );
      } else {
        dashRoutes.push(
          {
            path: "/consultant-scheduling-form/:childId",
            component: ConsultantSchedulingForm,
            layout: "/admin/consultant-form/:id",
          },
          {
            path: "/consultant-scheduling-daily-form/:childId",
            component: ConsultantSchedulingDailyForm,
            layout: "/admin/consultant-form/:id",
          }
        );
      }
    }
  }
  if (PermissionHelper.checkPermission("view_booking")) {
    dashRoutes.push(
      {
        path: "/past_booking",
        component: PastBookingList,
        layout: "/consultant",
      },
      {
        path: "/upcoming_booking",
        component: UpcomingBookingList,
        layout: "/consultant",
      },
      {
        path: "/past-booking",
        component: PastBookingList,
        layout: "/admin/consultant-form/:id",
      },
      {
        path: "/past_booking",
        component: PastBookingList,
        layout: "/admin",
      },

      {
        path: "/upcoming-booking",
        component: UpcomingBookingList,
        layout: "/admin/consultant-form/:id",
      },
      {
        path: "/upcoming_booking",
        component: UpcomingBookingList,
        layout: "/admin",
      }
    );
    if (PermissionHelper.checkPermission("view_booking_logs")) {
      dashRoutes.push({
        path: "/booking_logs",
        component: BookingLogsList,
        layout: "/admin",
      });
    }
    if (PermissionHelper.checkPermission("view_booking_transactions")) {
      dashRoutes.push({
        path: "/booking_transaction",
        component: BookingTransaction,
        layout: "/admin",
      });
    }

    if (
      PermissionHelper.checkPermission("add_booking") ||
      PermissionHelper.checkPermission("edit_booking")
    ) {
      if (UserHelper.isConsultant()) {
        dashRoutes.push({
          path: "/upcoming-booking-form/:childId",
          component: UpcomingBookingForm,
          layout: "/consultant",
        });
      } else {
        dashRoutes.push({
          path: "/upcoming-booking-form/:childId",
          component: UpcomingBookingForm,
          layout: "/admin",
        });
        dashRoutes.push({
          path: "/upcoming-booking-form/:childId",
          component: UpcomingBookingForm,
          layout: "/admin/consultant-form/:id",
        });
      }
    }
  }
  if (PermissionHelper.checkPermission("view_rate_card")) {
    dashRoutes.push(
      {
        path: "/rate_card",
        component: RateCardList,
        layout: "/consultant",
      },
      {
        path: "/rate-card",
        component: RateCardList,
        layout: "/admin/consultant-form/:id",
      }
    );
    if (
      PermissionHelper.checkPermission("add_rate_card") ||
      PermissionHelper.checkPermission("edit_rate_card")
    ) {
      if (UserHelper.isConsultant()) {
        dashRoutes.push({
          path: "/rate-card-form/:childId",
          component: RateCardForm,
          layout: "/consultant",
        });
      } else {
        dashRoutes.push({
          path: "/rate-card-form/:childId",
          component: RateCardForm,
          layout: "/admin/consultant-form/:id",
        });
      }
    }
  }
  if (PermissionHelper.checkPermission("view_complaints")) {
    dashRoutes.push(
      {
        path: "/complaints",
        component: ComplaintsList,
        layout: "/admin",
      },
      {
        path: "/complaints",
        component: ComplaintsList,
        layout: "/admin/consultant-form/:id",
      }
    );
    if (
      PermissionHelper.checkPermission("add_complaints") ||
      PermissionHelper.checkPermission("edit_complaints")
    ) {
      dashRoutes.push();
    }
  }
  if (PermissionHelper.checkPermission("view_reviews")) {
    dashRoutes.push(
      dashRoutes.push(
        {
          path: "/reviews",
          component: ReviewsList,
          layout: "/admin",
        },
        {
          path: "/reviews",
          component: ReviewsList,
          layout: "/admin/consultant-form/:id",
        }
      )
    );
    if (
      PermissionHelper.checkPermission("add_reviews") ||
      PermissionHelper.checkPermission("edit_reviews")
    ) {
      dashRoutes.push({
        path: "/reviews-form/:id",
        component: ReviewsForm,
        layout: "/admin",
      });
    }
  }
  if (PermissionHelper.checkPermission("view_consultant_payout")) {
    dashRoutes.push(
      {
        path: "/payout",
        component: ConsultantPayoutHistoryList,
        layout: "/consultant",
      },
      {
        path: "/consultant-payout",
        component: ConsultantPayoutHistoryList,
        layout: "/admin/consultant-form/:id",
      },
      {
        path: "/consultant_payout",
        component: ConsultantPayoutHistoryList,
        layout: "/admin",
      }
    );
    if (
      PermissionHelper.checkPermission("add_consultant_payout") ||
      PermissionHelper.checkPermission("edit_consultant_payout")
    ) {
      if (UserHelper.isConsultant()) {
        dashRoutes.push({
          path: "/consultant-payout-form/:childId",
          component: ConsultantPayoutHistoryForm,
          layout: "/consultant",
        });
      } else {
        dashRoutes.push({
          path: "/consultant-payout-form/:childId",
          component: ConsultantPayoutHistoryForm,
          layout: "/admin",
        });
        dashRoutes.push({
          path: "/consultant-payout-form/:childId",
          component: ConsultantPayoutHistoryForm,
          layout: "/admin/consultant-form/:id",
        });
      }
    }
  }
  if (PermissionHelper.checkPermission("view_chat_history")) {
    dashRoutes.push(
      {
        path: "/chat-history",
        component: ChatHistoryList,
        layout: "/consultant",
      },
      {
        path: "/chat-history",
        component: ChatHistoryList,
        layout: "/admin/consultant-form/:id",
      },
      {
        path: "/chat-history",
        component: ChatHistoryList,
        layout: "/admin",
      }
    );
    if (PermissionHelper.checkPermission("view_chat_logs")) {
      // dashRoutes.push({
      //   path: "/chat-log-view/:id",
      //   component: VisitorChatLogView,
      //   layout: "/admin/consultant-form/:id",
      // });

      if (UserHelper.isConsultant()) {
        dashRoutes.push({
          path: "/chat-history-form/:childId",
          component: ChatHistoryForm,
          layout: "/consultant",
        });
      } else {
        dashRoutes.push({
          path: "/chat-history-form/:childId",
          component: ChatHistoryForm,
          layout: "/admin",
        });
        dashRoutes.push({
          path: "/chat-history-form/:childId",
          component: ChatHistoryForm,
          layout: "/admin/consultant-form/:id",
        });
      }
    }
  }
  if (PermissionHelper.checkPermission("view_refund_request")) {
    dashRoutes.push(
      {
        path: "/refund_request",
        component: RefundRequestList,
        layout: "/consultant",
      },
      {
        path: "/refund-request",
        component: RefundRequestList,
        layout: "/admin/consultant-form/:id",
      },
      {
        path: "/refund_request",
        component: RefundRequestList,
        layout: "/admin",
      }
    );
    if (
      PermissionHelper.checkPermission("add_refund_request") ||
      PermissionHelper.checkPermission("edit_refund_request")
    ) {
      if (UserHelper.isConsultant()) {
        dashRoutes.push({
          path: "/refund-request-form/:childId",
          component: RefundRequestForm,
          layout: "/consultant",
        });
      } else {
        dashRoutes.push({
          path: "/refund-request-form/:childId",
          component: RefundRequestForm,
          layout: "/admin",
        });
        dashRoutes.push({
          path: "/refund-request-form/:childId",
          component: RefundRequestForm,
          layout: "/admin/consultant-form/:id",
        });
      }
    }
  }
  if (PermissionHelper.checkPermission("view_credit_purchase")) {
    dashRoutes.push(
      {
        path: "/visitor_credit_history",
        component: VisitorCreditHistoryList,
        layout: "/admin",
      },
      {
        path: "/visitor_credit_purchase",
        component: VisitorCreditPurchaseList,
        layout: "/admin",
      }
    );
    if (
      PermissionHelper.checkPermission("add_credit_purchase") ||
      PermissionHelper.checkPermission("edit_credit_purchase")
    ) {
      // dashRoutes.push({
      //   path: "/visitor-credit-history-form/:id",
      //   component: VisitorCreditHistoryForm,
      //   layout: "/admin",
      // });
      dashRoutes.push({
        path: "/visitor-credit-purchase-form/:id",
        component: VisitorCreditPurchaseForm,
        layout: "/admin",
      });
    }
  }
  if (PermissionHelper.checkPermission("view_free_addons")) {
    dashRoutes.push({
      path: "/free_addons",
      component: FreeAddonsList,
      layout: "/admin",
    });
    if (
      PermissionHelper.checkPermission("add_free_addons") ||
      PermissionHelper.checkPermission("edit_free_addons")
    ) {
      dashRoutes.push({
        path: "/free-addons/:childId",
        component: FreeAddonsForm,
        layout: "/admin/consultant-form/:id",
      });
      if (UserHelper.isConsultant()) {
        dashRoutes.push({
          path: "/free-addons-form/:childId",
          component: FreeAddonsForm,
          layout: "/consultant",
        });
      } else {
        dashRoutes.push({
          path: "/free-addons-form/:childId",
          component: FreeAddonsForm,
          layout: "/admin",
        });
      }
    }
  }
  if (PermissionHelper.checkPermission("view_consultant_report")) {
    dashRoutes.push(
      {
        path: "/booking-reports",
        component: BookingReportsList,
        layout: "/admin",
      },
      {
        path: "/consultant-reports",
        component: ConsultantReportsList,
        layout: "/admin",
      },
      {
        path: "/consultant-payout-reports",
        component: ConsultantPayoutReportsList,
        layout: "/admin",
      },
      {
        path: "/consultant-payout-reports",
        component: ConsultantPayoutReportsList,
        layout: "/consultant",
      },
      {
        path: "/visitor-reports",
        component: VisitorReportsList,
        layout: "/admin",
      },
      {
        path: "/visitor-credit-reports",
        component: VisitorCreditReportsList,
        layout: "/admin",
      },
      {
        path: "/visitor-credit-purchase-reports",
        component: VisitorCreditPurchaseReportsList,
        layout: "/admin",
      },
      {
        path: "/booking-reports",
        component: BookingReportsList,
        layout: "/consultant",
      }
    );
  }
  if (PermissionHelper.checkPermission("view_consultant_report")) {
    dashRoutes.push(
      {
        path: "/reports",
        component: ReportsList,
        layout: "/consultant",
      },
      {
        path: "/reports/:childId",
        component: ReportsForm,
        layout: "/admin/consultant-form/:id",
      }
    );
  }
}

// User Profile
if (UserHelper.isConsultant()) {
  dashRoutes.push({
    path: "/profile-form",
    component: ConsultantProfileForm,
    layout: "/consultant",
  });
} else {
  dashRoutes.push({
    path: "/profile-form",
    component: ProfileForm,
    layout: "/admin",
  });
}

// User Manager
if (PermissionHelper.checkPermission("view_user_manager")) {
  if (PermissionHelper.checkPermission("view_permission_group")) {
    dashRoutes.push({
      path: "/permission_groups",
      component: PermissionGroupList,
      layout: "/admin",
    });
    if (PermissionHelper.checkPermission("edit_permission_group")) {
      dashRoutes.push({
        path: "/permission-group-form/:id",
        component: PermissionGroupForm,
        layout: "/admin",
      });
    }
  }

  if (PermissionHelper.checkPermission("view_permission")) {
    dashRoutes.push({
      path: "/permissions",
      component: PermissionList,
      layout: "/admin",
    });
    if (PermissionHelper.checkPermission("edit_permission")) {
      dashRoutes.push({
        path: "/permission-form/:id",
        component: PermissionForm,
        layout: "/admin",
      });
    }
  }
  if (PermissionHelper.checkPermission("view_roles")) {
    dashRoutes.push({
      path: "/roles",
      component: RolesList,
      layout: "/admin",
    });
    if (
      PermissionHelper.checkPermission("add_roles") ||
      PermissionHelper.checkPermission("edit_roles")
    ) {
      dashRoutes.push({
        path: "/role-form/:id",
        component: RoleForm,
        layout: "/admin",
      });
    }
  }
  if (PermissionHelper.checkPermission("view_users")) {
    dashRoutes.push({
      path: "/users",
      component: UsersList,
      layout: "/admin",
    });
    if (
      PermissionHelper.checkPermission("add_users") ||
      PermissionHelper.checkPermission("edit_users")
    ) {
      dashRoutes.push({
        path: "/user-form/:id",
        component: UserForm,
        layout: "/admin",
      });
    }
  }
}

// Master Manager
if (PermissionHelper.checkPermission("view_master_manager")) {
  if (PermissionHelper.checkPermission("view_country_groups")) {
    dashRoutes.push({
      path: "/country_groups",
      component: CountryGroupList,
      layout: "/admin",
    });

    if (
      PermissionHelper.checkPermission("add_country_groups") ||
      PermissionHelper.checkPermission("edit_country_groups")
    ) {
      dashRoutes.push({
        path: "/country-group-form/:id",
        component: CountryGroupForm,
        layout: "/admin",
      });
    }
  }
  if (PermissionHelper.checkPermission("view_countries")) {
    dashRoutes.push({
      path: "/countries",
      component: CountriesList,
      layout: "/admin",
    });

    dashRoutes.push({
      path: "/timezone",
      component: TimeZoneList,
      layout: "/admin",
    });
    if (
      PermissionHelper.checkPermission("add_countries") ||
      PermissionHelper.checkPermission("edit_countries")
    ) {
      dashRoutes.push({
        path: "/country-form/:id",
        component: CountryForm,
        layout: "/admin",
      });
      dashRoutes.push({
        path: "/timezone-form/:id",
        component: TimeZoneForm,
        layout: "/admin",
      });
    }
  }
  if (PermissionHelper.checkPermission("view_industries")) {
    dashRoutes.push({
      path: "/industries",
      component: IndustryList,
      layout: "/admin",
    });

    if (
      PermissionHelper.checkPermission("add_industries") ||
      PermissionHelper.checkPermission("edit_industries")
    ) {
      dashRoutes.push({
        path: "/industry-form/:id",
        component: IndustryForm,
        layout: "/admin",
      });
    }
  }
  if (PermissionHelper.checkPermission("view_skills")) {
    dashRoutes.push({
      path: "/skills",
      component: SkillsList,
      layout: "/admin",
    });

    if (
      PermissionHelper.checkPermission("add_skills") ||
      PermissionHelper.checkPermission("edit_skills")
    ) {
      dashRoutes.push({
        path: "/skills-form/:id",
        component: SkillsForm,
        layout: "/admin",
      });
    }
  }
  if (PermissionHelper.checkPermission("view_pages")) {
    dashRoutes.push({
      path: "/pages",
      component: PageList,
      layout: "/admin",
    });

    if (PermissionHelper.checkPermission("edit_pages")) {
      dashRoutes.push({
        path: "/page-form/:id",
        component: PageForm,
        layout: "/admin",
      });
    }
  }
  if (PermissionHelper.checkPermission("view_rss")) {
    dashRoutes.push({
      path: "/rss",
      component: RssList,
      layout: "/admin",
    });

    if (
      PermissionHelper.checkPermission("add_rss") ||
      PermissionHelper.checkPermission("edit_rss")
    ) {
      dashRoutes.push({
        path: "/rss-form/:id",
        component: RssForm,
        layout: "/admin",
      });
    }
  }
  if (PermissionHelper.checkPermission("view_currency")) {
    dashRoutes.push({
      path: "/currency",
      component: CurrencyList,
      layout: "/admin",
    });

    if (
      PermissionHelper.checkPermission("add_currency") ||
      PermissionHelper.checkPermission("edit_currency")
    ) {
      dashRoutes.push({
        path: "/currency-form/:id",
        component: CurrencyForm,
        layout: "/admin",
      });
    }
  }
}
// temporary commented start
// // Vendor Manager
if (PermissionHelper.checkPermission("view_vendor_manager")) {
  if (PermissionHelper.checkPermission("view_vendors")) {
    dashRoutes.push({
      path: "/vendors",
      component: VendorList,
      layout: "/admin",
    });
  }
  if (
    PermissionHelper.checkPermission("add_vendors") ||
    PermissionHelper.checkPermission("edit_vendors")
  ) {
    dashRoutes.push(
      {
        path: "/vendor-form/:id",
        component: VendorTabForm,
        layout: "/admin",
      },
      {
        path: "/basic-info",
        component: VendorForm,
        layout: "/admin/vendor-form/:id",
      },
      {
        path: "/key-people",
        component: KeyPeopleList,
        layout: "/admin/vendor-form/:id",
      },
      {
        path: "/locations",
        component: LocationsList,
        layout: "/admin/vendor-form/:id",
      },
      {
        path: "/financials",
        component: FinancialsList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/funding",
        component: FundingList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/employee-job-count",
        component: EmployeeJobCountList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/acquisition",
        component: AcquisitionList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/patents",
        component: PatentList,
        layout: "/admin/vendor-form/:id",
      },
      {
        path: "/google-trend",
        component: GoogleTrendList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/ips",
        component: IpsList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/itmap-score",
        component: ITMAPScoreList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/twitter-data",
        component: TwitterDataList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/web-traffic",
        component: WebTrafficList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/news-list",
        component: NewsList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/document-list",
        component: VendorDocumentList,
        layout: "/admin/vendor-form/:id",
      },

      {
        path: "/competitive-dynamic",
        component: CompetitiveDynamicList,
        layout: "/admin/vendor-form/:id",
      }
    );
  }

//   if (
//     PermissionHelper.checkPermission("add_vendor_key_people") ||
//     PermissionHelper.checkPermission("edit_vendor_key_people")
//   ) {
//     dashRoutes.push({
//       path: "/key-people-form/:childId",
//       component: KeyPeopleForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }

//   if (
//     PermissionHelper.checkPermission("add_vendor_financials") ||
//     PermissionHelper.checkPermission("edit_vendor_financials")
//   ) {
//     dashRoutes.push({
//       path: "/financials-form/:childId",
//       component: FinancialsForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_locations") ||
//     PermissionHelper.checkPermission("edit_vendor_locations")
//   ) {
//     dashRoutes.push({
//       path: "/locations-form/:childId",
//       component: LocationsForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_employee_job_count") ||
//     PermissionHelper.checkPermission("edit_vendor_employee_job_count")
//   ) {
//     dashRoutes.push({
//       path: "/employee-job-count-form/:childId",
//       component: EmployeeJobCountForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_funding") ||
//     PermissionHelper.checkPermission("edit_vendor_funding")
//   ) {
//     dashRoutes.push({
//       path: "/funding-form/:childId",
//       component: FundingForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_acquisition") ||
//     PermissionHelper.checkPermission("edit_vendor_acquisition")
//   ) {
//     dashRoutes.push({
//       path: "/acquisition-form/:childId",
//       component: AcquisitionForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_ips") ||
//     PermissionHelper.checkPermission("edit_vendor_ips")
//   ) {
//     dashRoutes.push({
//       path: "/ips-form/:childId",
//       component: IpsForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_patent_list") ||
//     PermissionHelper.checkPermission("edit_vendor_patent_list")
//   ) {
//     dashRoutes.push({
//       path: "/patents-form/:childId",
//       component: PatentForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_itmap_score") ||
//     PermissionHelper.checkPermission("edit_vendor_itmap_score")
//   ) {
//     dashRoutes.push({
//       path: "/itmap-score-form/:childId",
//       component: ITMAPScoreForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_web_traffic") ||
//     PermissionHelper.checkPermission("edit_vendor_web_traffic")
//   ) {
//     dashRoutes.push({
//       path: "/web-traffic-form/:childId",
//       component: WebTrafficForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_google_trend") ||
//     PermissionHelper.checkPermission("edit_vendor_google_trend")
//   ) {
//     dashRoutes.push({
//       path: "/google-trend-form/:childId",
//       component: GoogleTrendForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_twitter_data") ||
//     PermissionHelper.checkPermission("edit_vendor_twitter_data")
//   ) {
//     dashRoutes.push({
//       path: "/twitter-data-form/:childId",
//       component: TwitterDataForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_competitive_dynamic") ||
//     PermissionHelper.checkPermission("edit_vendor_competitive_dynamic")
//   ) {
//     dashRoutes.push({
//       path: "/competitive-dynamic-form/:childId",
//       component: CompetitiveDynamicForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_news") ||
//     PermissionHelper.checkPermission("edit_vendor_news")
//   ) {
//     dashRoutes.push({
//       path: "/news-list-form/:childId",
//       component: NewsForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }
//   if (
//     PermissionHelper.checkPermission("add_vendor_documents") ||
//     PermissionHelper.checkPermission("edit_vendor_documents")
//   ) {
//     dashRoutes.push({
//       path: "/document-list-form/:childId",
//       component: VendorDocumentForm,
//       layout: "/admin/vendor-form/:id",
//     });
//   }

  if (PermissionHelper.checkPermission("view_vendor_category")) {
    dashRoutes.push({
      path: "/vendor_category",
      component: VendorCategoryList,
      layout: "/admin",
    });
  }

  if (
    PermissionHelper.checkPermission("add_vendor_category") ||
    PermissionHelper.checkPermission("edit_vendor_category")
  ) {
    dashRoutes.push({
      path: "/vendor-category-form/:id",
      component: VendorCategoryForm,
      layout: "/admin",
    });
  }
// }
// temporary commented end
//search log
// if (PermissionHelper.checkPermission("view_work_experience")) {
//   if (UserHelper.isConsultant() && !UserHelper.isServiceProvider()) {
//     dashRoutes.push({
//       path: "/search-log",
//       component: SearchlogList,
//       layout: "/consultant",
//     });
//   }
}
dashRoutes.push({
  path: "/search-log",
  component: SearchlogList,
  layout: "/admin/consultant-form/:id",
});
dashRoutes.push({
  path: "/search-log",
  component: SearchlogList,
  layout: "/admin",
});
// End User
dashRoutes.push({
  path: "/donation",
  component: DonationHistoryList,
  layout: "/admin",
});
if (true) {
  // FAQ Manager
  if (PermissionHelper.checkPermission("view_faq_manager")) {
    if (PermissionHelper.checkPermission("view_faq_category")) {
      dashRoutes.push({
        path: "/FAQ-Category",
        component: FAQ,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_faq_category") ||
        PermissionHelper.checkPermission("edit_faq_category")
      ) {
        dashRoutes.push({
          path: "/FAQ-Category-form/:id",
          component: FAQForm,
          layout: "/admin",
        });
      }
    }

    if (PermissionHelper.checkPermission("view_faq_list")) {
      dashRoutes.push({
        path: "/FAQ-list",
        component: FAQS,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_faq_list") ||
        PermissionHelper.checkPermission("edit_faq_list")
      ) {
        dashRoutes.push({
          path: "/FAQ-list-form/:id",
          component: FAQs,
          layout: "/admin",
        });
      }
    }
  }

  // Blog Manager
  if (PermissionHelper.checkPermission("View_blog_manager")) {
    dashRoutes.push(
      {
        path: "/Blog-List",
        component: BlogLists,
        layout: "/admin",
      },
      {
        path: "/Blog-Category",
        component: BlogCategory,
        layout: "/admin",
      },
      {
        path: "/Blog-Category-form/:id",
        component: BlogCategoryForm,
        layout: "/admin",
      }
    );

    if (
      PermissionHelper.checkPermission("add_blog_manager") ||
      PermissionHelper.checkPermission("edit_blog_manager")
    ) {
      dashRoutes.push({
        path: "/Blog-List-form/:id",
        component: BlogListForm,
        layout: "/admin",
      });
    }
  }

  // Visitor Manager
  if (PermissionHelper.checkPermission("view_visitor_manager")) {
    if (PermissionHelper.checkPermission("view_visitors")) {
      dashRoutes.push(
        {
          path: "/visitors",
          component: VisitorList,
          layout: "/admin",
        },
        {
          path: "/guestvisitors",
          component: GuestList,
          layout: "/admin",
        }
      );

      if (
        PermissionHelper.checkPermission("add_visitors") ||
        PermissionHelper.checkPermission("edit_visitors")
      ) {
        dashRoutes.push({
          path: "/visitor-form/:id",
          component: VisitorForm,
          layout: "/admin",
        });
      }
    }

    if (PermissionHelper.checkPermission("view_visitor_group")) {
      dashRoutes.push({
        path: "/visitor_groups",
        component: VisitorGroupList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_visitor_groups") ||
        PermissionHelper.checkPermission("edit_visitor_groups")
      ) {
        dashRoutes.push({
          path: "/visitor-group-form/:id",
          component: VisitorGroupForm,
          layout: "/admin",
        });
      }
    }
  }

  // Contact Manager
  if (PermissionHelper.checkPermission("view_contact_manager")) {
    if (PermissionHelper.checkPermission("view_contact_types")) {
      dashRoutes.push({
        path: "/contact_types",
        component: ContactTypeList,
        layout: "/admin",
      });

      if (PermissionHelper.checkPermission("edit_contact_types")) {
        dashRoutes.push({
          path: "/contact-type-form/:id",
          component: ContactTypeForm,
          layout: "/admin",
        });
      }
    }

    if (PermissionHelper.checkPermission("view_contact_details")) {
      dashRoutes.push(
        {
          path: "/contacts",
          component: ContactList,
          layout: "/admin",
        },
        {
          path: "/contact-view/:id",
          component: ContactView,
          layout: "/admin",
        }
      );

      if (PermissionHelper.checkPermission("edit_contact_details")) {
        dashRoutes.push({
          path: "/contact-form/:id",
          component: ContactForm,
          layout: "/admin",
        });
      }
    }
  }

  // Module Manager
  if (PermissionHelper.checkPermission("view_module_manager")) {
    if (PermissionHelper.checkPermission("view_module_categories")) {
      dashRoutes.push({
        path: "/categories",
        component: CategoriesList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_module_categories") ||
        PermissionHelper.checkPermission("edit_module_categories")
      ) {
        dashRoutes.push({
          path: "/category-form/:id",
          component: CategoryForm,
          layout: "/admin",
        });
      }
    }

    if (PermissionHelper.checkPermission("view_document_types")) {
      dashRoutes.push({
        path: "/document_types",
        component: DocumentTypeList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_document_types") ||
        PermissionHelper.checkPermission("edit_document_types")
      ) {
        dashRoutes.push({
          path: "/document-type-form/:id",
          component: DocumentTypeForm,
          layout: "/admin",
        });
      }
    }

    if (PermissionHelper.checkPermission("view_research_topics")) {
      dashRoutes.push({
        path: "/research-topics",
        component: ResearchTopicsList,
        layout: "/admin",
      });
      
      if (
        PermissionHelper.checkPermission("add_research_topic") ||
        PermissionHelper.checkPermission("edit_research_topic")
      ) {
        dashRoutes.push({
          path: "/research-topics-form/:id",
          component: ResearchTopicsForm,
          layout: "/admin",
        });
      }  
    }  

    if (PermissionHelper.checkPermission("view_research_tags")) {
      dashRoutes.push({
        path: "/research-tags",
        component: ResearchTagsList,
        layout: "/admin",
      });
  
      if (
        PermissionHelper.checkPermission("add_research_tag") ||
        PermissionHelper.checkPermission("edit_research_tag")
      ) {
        dashRoutes.push({
          path: "/research-tags-form/:id",
          component: ResearchTagsForm,
          layout: "/admin",
        });
      }  
    }  

    if (PermissionHelper.checkPermission("view_documents")) {
      dashRoutes.push({
        path: "/documents",
        component: DocumentList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_documents") ||
        PermissionHelper.checkPermission("edit_documents")
      ) {
        dashRoutes.push({
          path: "/document-form/:id",
          component: DocumentForm,
          layout: "/admin",
        });
      }
    }

    if (PermissionHelper.checkPermission("view_modules")) {
      dashRoutes.push({
        path: "/modules",
        component: ModulesList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_documents") ||
        PermissionHelper.checkPermission("edit_documents")
      ) {
        dashRoutes.push({
          path: "/module-form/:id",
          component: ModulesForm,
          layout: "/admin",
        });
      }
    }

    if (PermissionHelper.checkPermission("view_products")) {
      dashRoutes.push({
        path: "/products",
        component: ProductList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_products") ||
        PermissionHelper.checkPermission("edit_products")
      ) {
        dashRoutes.push({
          path: "/product-form/:id",
          component: ProductForm,
          layout: "/admin",
        });
      }
    }
  }
  // Question Manager
  if (PermissionHelper.checkPermission("view_question_manager")) {
    if (PermissionHelper.checkPermission("view_question_steps")) {
      dashRoutes.push({
        path: "/steps",
        component: StepList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_question_steps") ||
        PermissionHelper.checkPermission("edit_question_steps")
      ) {
        dashRoutes.push({
          path: "/step-form/:id",
          component: StepForm,
          layout: "/admin",
        });
      }
    }

    if (PermissionHelper.checkPermission("view_options")) {
      dashRoutes.push({
        path: "/options",
        component: OptionsList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_options") ||
        PermissionHelper.checkPermission("edit_options")
      ) {
        dashRoutes.push({
          path: "/option-form/:id",
          component: OptionsForm,
          layout: "/admin",
        });
      }
    }

    if (PermissionHelper.checkPermission("view_sub_options")) {
      dashRoutes.push({
        path: "/sub_options",
        component: SubOptionsList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_sub_options") ||
        PermissionHelper.checkPermission("edit_sub_options")
      ) {
        dashRoutes.push({
          path: "/sub-option-form/:id",
          component: SubOptionsForm,
          layout: "/admin",
        });
      }
    }

    if (PermissionHelper.checkPermission("view_questions")) {
      dashRoutes.push({
        path: "/questions",
        component: QuestionsList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_questions") ||
        PermissionHelper.checkPermission("edit_questions")
      ) {
        dashRoutes.push({
          path: "/question-form/:id",
          component: QuestionsForm,
          layout: "/admin",
        });
      }
    }
  }

  // Flow Manager
  if (PermissionHelper.checkPermission("view_flow_manager")) {
    if (PermissionHelper.checkPermission("view_flow")) {
      dashRoutes.push({
        path: "/flows",
        component: FlowsList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_flow") ||
        PermissionHelper.checkPermission("edit_flow")
      ) {
        dashRoutes.push({
          path: "/flow-form/:id",
          component: FlowsForm,
          layout: "/admin",
        });
      }
    }
  }
  // EU Subscription Manager
  if (PermissionHelper.checkPermission("view_subscription_manager")) {
    if (PermissionHelper.checkPermission("view_eusubscription_plan")) {
      dashRoutes.push({
        path: "/eusubscription-plan",
        component: EuSubscriptionPlanList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_eusubscription_plan") ||
        PermissionHelper.checkPermission("edit_eusubscription_plan")
      ) {
        dashRoutes.push({
          path: "/eusubscription-plan-form/:id",
          component: EuSubscriptionPlanForm,
          layout: "/admin",
        });
      }
    }
    if (PermissionHelper.checkPermission("view_eusubscriptions")) {
      dashRoutes.push(
        {
          path: "/eusubscriptions",
          component: EuSubscriptionList,
          layout: "/admin",
        },
        {
          path: "/eusubscription-pending",
          component: EuSubscriptionPendingList,
          layout: "/admin",
        }
      );

      if (
        PermissionHelper.checkPermission("add_eusubscriptions") ||
        PermissionHelper.checkPermission("edit_eusubscriptions")
      ) {
        dashRoutes.push(
          {
            path: "/eusubscriptions-form/:id",
            component: EuSubscriptionsForm,
            layout: "/admin",
          },
          {
            path: "/eusubscription-pending-form/:id",
            component: EuSubscriptionPendingForm,
            layout: "/admin",
          }
        );
      }
    }
    if (PermissionHelper.checkPermission("view_eutransactions")) {
      dashRoutes.push({
        path: "/eutransactions",
        component: EuTransactionsList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_eutransactions") ||
        PermissionHelper.checkPermission("edit_eutransactions")
      ) {
        dashRoutes.push({
          path: "/eutransaction-view/:id",
          component: EuTransactionsView,
          layout: "/admin",
        });
      }
    }
    if (PermissionHelper.checkPermission("view_eudocpurchases")) {
      dashRoutes.push({
        path: "/eudocpurchases",
        component: EuDocPurchaseList,
        layout: "/admin",
      });

      if (
        PermissionHelper.checkPermission("add_eudocpurchases") ||
        PermissionHelper.checkPermission("edit_eudocpurchases")
      ) {
        dashRoutes.push({
          path: "/eudocpurchases-view/:id",
          component: EuDocPurchaseView,
          layout: "/admin",
        });
      }
    }
  }
  // Report Manager
  if (PermissionHelper.checkPermission("view_visitor_report_manager")) {
    if (PermissionHelper.checkPermission("view_visitor_ip_logs")) {
      dashRoutes.push({
        path: "/ip_logs",
        component: IPLogList,
        layout: "/admin",
      });
    }
    if (PermissionHelper.checkPermission("view_visitor_login_logs")) {
      dashRoutes.push({
        path: "/login_logs",
        component: VisitorLoginLogList,
        layout: "/admin",
      });
    }
    if (PermissionHelper.checkPermission("view_search_report")) {
      dashRoutes.push({
        path: "/search_reports",
        component: SearchReport,
        layout: "/admin",
      });
    }
    if (PermissionHelper.checkPermission("view_product_search_report")) {
      dashRoutes.push({
        path: "/product_search_reports",
        component: ProductSearchReport,
        layout: "/admin",
      });
    }

    if (PermissionHelper.checkPermission("view_option_search_report")) {
      dashRoutes.push({
        path: "/option_search_reports",
        component: OptionSearchReport,
        layout: "/admin",
      });
    }
  }
}
// temporary commented start
// // MI Manager
// if (PermissionHelper.checkMainPermission(["view_mi_segment_manager"])) {
//   if (PermissionHelper.checkMainPermission(["view_mi_segment"])) {
//     dashRoutes.push({
//       path: "/mi-segment",
//       component: MISegmentList,
//       layout: "/admin",
//     });
//     if (
//       PermissionHelper.checkMainPermission(["add_mi_segment"]) ||
//       PermissionHelper.checkMainPermission(["edit_mi_segment"])
//     ) {
//       dashRoutes.push({
//         path: "/mi-segment-form/:id",
//         component: MISegmentForm,
//         layout: "/admin",
//       });
//     }
//   }
//   if (PermissionHelper.checkMainPermission(["view_mi_investor"])) {
//     dashRoutes.push({
//       path: "/investor",
//       component: InvestorList,
//       layout: "/admin",
//     });
//     if (
//       PermissionHelper.checkMainPermission(["add_mi_investor"]) ||
//       PermissionHelper.checkMainPermission(["edit_mi_investor"])
//     ) {
//       dashRoutes.push({
//         path: "/investor-form/:id",
//         component: InvestorForm,
//         layout: "/admin",
//       });
//     }
//   }
//   if (PermissionHelper.checkMainPermission(["view_mi_contacts"])) {
//     dashRoutes.push({
//       path: "/mi_contacts",
//       component: MiContacts,
//       layout: "/admin",
//     });
//     if (
//       PermissionHelper.checkMainPermission(["add_mi_contacts"]) ||
//       PermissionHelper.checkMainPermission(["edit_mi_contacts"])
//     ) {
//       dashRoutes.push({
//         path: "/mi-view/:id",
//         component: MiView,
//         layout: "/admin",
//       });
//     }
//   }
//   //Mi Subscription Manager
//   if (PermissionHelper.checkPermission("view_mi_subscription_manager")) {
//     if (PermissionHelper.checkPermission("view_subscription_plan")) {
//       dashRoutes.push({
//         path: "/subscription-plan",
//         component: SubscriptionPlanList,
//         layout: "/admin",
//       });
//       if (
//         PermissionHelper.checkPermission("add_subscription_plan") ||
//         PermissionHelper.checkPermission("edit_subscription_plan")
//       ) {
//         dashRoutes.push({
//           path: "/subscription-plan-form/:id",
//           component: SubscriptionPlanForm,
//           layout: "/admin",
//         });
//       }
//     }

//     if (PermissionHelper.checkPermission("view_subscriptions")) {
//       dashRoutes.push({
//         path: "/subscriptions",
//         component: SubscriptionList,
//         layout: "/admin",
//       });
//       if (
//         PermissionHelper.checkPermission("add_subscriptions") ||
//         PermissionHelper.checkPermission("edit_subscriptions")
//       ) {
//         dashRoutes.push({
//           path: "/subscriptions-form/:id",
//           component: SubscriptionsForm,
//           layout: "/admin",
//         });
//       }
//     }

//     if (PermissionHelper.checkPermission("view_transactions")) {
//       dashRoutes.push({
//         path: "/transactions",
//         component: TransactionsList,
//         layout: "/admin",
//       });
//       if (
//         PermissionHelper.checkPermission("add_transactions") ||
//         PermissionHelper.checkPermission("edit_transactions")
//       ) {
//         dashRoutes.push({
//           path: "/transaction-view/:id",
//           component: TransactionsView,
//           layout: "/admin",
//         });
//       }
//     }
//   }

//   // Competative landscape
//   if (PermissionHelper.checkPermission("view_competative_manager")) {
//     dashRoutes.push({
//       path: "/competitivelandscape",
//       component: CompetitiveLandscapeList,
//       layout: "/admin",
//     });
//   }

//   // MI Pricing Manager
//   if (PermissionHelper.checkPermission("view_pricing_manager")) {
//     if (PermissionHelper.checkPermission("view_pricing_model")) {
//       dashRoutes.push({
//         path: "/pricing-model",
//         component: PricingModelList,
//         layout: "/admin",
//       });
//       if (
//         PermissionHelper.checkPermission("add_pricing_model") ||
//         PermissionHelper.checkPermission("edit_pricing_model")
//       ) {
//         dashRoutes.push({
//           path: "/pricing-model-form/:id",
//           component: PricingModelForm,
//           layout: "/admin",
//         });
//       }
//     }

//     if (PermissionHelper.checkPermission("view_pricing_configuration")) {
//       dashRoutes.push({
//         path: "/pricing-configuration",
//         component: PricingConfigurationList,
//         layout: "/admin",
//       });
//       if (
//         PermissionHelper.checkPermission("add_pricing_configuration") ||
//         PermissionHelper.checkPermission("edit_pricing_configuration")
//       ) {
//         dashRoutes.push({
//           path: "/pricing-configuration-form/:id",
//           component: PricingConfigurationForm,
//           layout: "/admin",
//         });
//       }
//     }
//   }

//   // MI Partner Manager
//   if (PermissionHelper.checkPermission("view_partner_manager")) {
//     if (PermissionHelper.checkPermission("view_partners")) {
//       dashRoutes.push({
//         path: "/partners",
//         component: PartnerList,
//         layout: "/admin",
//       });
//       if (
//         PermissionHelper.checkPermission("add_partners") ||
//         PermissionHelper.checkPermission("edit_partners")
//       ) {
//         dashRoutes.push({
//           path: "/partners-form/:id",
//           component: PartnerForm,
//           layout: "/admin",
//         });
//       }
//     }

//     if (PermissionHelper.checkPermission("view_partners_types")) {
//       dashRoutes.push({
//         path: "/partner-types",
//         component: PartnerTypeList,
//         layout: "/admin",
//       });
//       if (
//         PermissionHelper.checkPermission("add_partners_types") ||
//         PermissionHelper.checkPermission("edit_partners_types")
//       ) {
//         dashRoutes.push({
//           path: "/partner-types-form/:id",
//           component: PartnerTypeForm,
//           layout: "/admin",
//         });
//       }
//     }
//   }
// }
// temporary commented end

// Setting Manager
if (PermissionHelper.checkMainPermission(["view_setting_manager"])) {
  if (PermissionHelper.checkMainPermission(["view_cron_manager"])) {
    dashRoutes.push({
      path: "/cron-jobs",
      component: CronList,
      layout: "/admin",
    });
    if (
      PermissionHelper.checkMainPermission(["add_cron_job"]) ||
      PermissionHelper.checkMainPermission(["edit_cron_job"])
    ) {
      dashRoutes.push({
        path: "/cron-jobs-form/:id",
        component: CronForm,
        layout: "/admin",
      });
    }
  }

  dashRoutes.push(
    {
      path: "/config",
      component: ConfigList,
      layout: "/admin",
    },
    {
      path: "/config-form/:id",
      component: ConfigForm,
      layout: "/admin",
    }

    // temporary commented start
    // {
    //   path: "/market-product",
    //   component: MarketProductList,
    //   layout: "/admin",
    // }

    // temporary commented end
  );
}

// Log Manager
if (PermissionHelper.checkMainPermission(["view_logs_manager"])) {
  if (PermissionHelper.checkMainPermission(["view_cron_logs"])) {
    dashRoutes.push({
      path: "/cron-logs",
      component: CronLogsList,
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_api_logs"])) {
    dashRoutes.push({
      path: "/api_logs",
      component: APILogList,
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_nubela_logs"])) {
    dashRoutes.push({
      path: "/nubela_logs",
      component: NubelaLogList,
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_signal_hire_logs"])) {
    dashRoutes.push({
      path: "/signal_logs",
      component: SignalHireLogList,
      layout: "/admin",
    });
  }
  if (PermissionHelper.checkMainPermission(["view_anomaly_logs"])) {
    dashRoutes.push(
      {
        path: "/anomaly",
        component: AnomalyList,
        layout: "/admin",
      },
      {
        path: "/anomaly-form/:id",
        component: AnomalyForm,
        layout: "/admin",
      }
    );
  }
}

if(PermissionHelper.checkMainPermission(["view_community_manager"]))
{
  if (PermissionHelper.checkMainPermission(["view_tags"])) {  
    dashRoutes.push({
      path: "/tags",
      component: TagsList,
      layout: "/admin",
    });

    if (PermissionHelper.checkPermission("add_tags") || PermissionHelper.checkPermission("edit_tags")) {
      dashRoutes.push({
        path: "/tags-form/:id",
        component: TagsForm,
        layout: "/admin",
      });
    } 
  } 

  if (PermissionHelper.checkMainPermission(["view_visitor_technology"])) {    
    dashRoutes.push({
      path: "/technology",
      component: VisitorTechnologyList,
      layout: "/admin",
    });
    
    if (PermissionHelper.checkPermission("add_visitor_technology") || PermissionHelper.checkPermission("edit_visitor_technology")) {
      dashRoutes.push({
        path: "/technology-form/:id",
        component: VisitorTechnologyForm,
        layout: "/admin",
      });
    }  
  }

  if (PermissionHelper.checkMainPermission(["view_report_abuse_types"])) { 
    dashRoutes.push({
      path: "/report_abuse/type",
      component: ReportAbuseTypesList,
      layout: "/admin",
    });

    if (PermissionHelper.checkPermission("add_report_abuse_types") || PermissionHelper.checkPermission("edit_report_abuse_types")) {  
      dashRoutes.push({
        path: "/report-abuse-type-form/:id",
        component: ReportAbuseTypesForm,
        layout: "/admin",
      });
    }  
  }

  if (PermissionHelper.checkMainPermission(["view_community"])) { 
    dashRoutes.push({
      path: "/communities",
      component: CommunityList,
      layout: "/admin",
    });

    dashRoutes.push({
      path: "/community-members/:id",
      component: CommunityMembersList,
      layout: "/admin",
    });

    if (PermissionHelper.checkPermission("add_community") || PermissionHelper.checkPermission("edit_community")) {  
      dashRoutes.push({
        path: "/communities-form/:id",
        component: CommunityForm,
        layout: "/admin",
      });
    }  
  }

  if (PermissionHelper.checkMainPermission(["view_community_query"])) { 
    dashRoutes.push({
      path: "/community-posts",
      component: CommunityPostList,
      layout: "/admin",
    });

    dashRoutes.push({
      path: "/community-posts-lists/:id",
      component: CommunityPostList,
      layout: "/admin",
    });

    if (PermissionHelper.checkPermission("edit_community_query")) {  
      dashRoutes.push({
        path: "/community-posts-form/:id",
        component: CommunityPostForm,
        layout: "/admin",
      });  
    }
  }

  if (PermissionHelper.checkMainPermission(["view_community_query_answer"])) { 
    dashRoutes.push({
      path: "/community-posts-reply/:id",
      component: CommunityPostReplyList,
      layout: "/admin",
    });

    dashRoutes.push({
      path: "/community-posts-reply-view/:id",
      component: CommunityPostReplyView,
      layout: "/admin",
    });

    dashRoutes.push({
      path: "/community-posts-reply-comments/:id/:depth_level_2?/:depth_level_3?/:depth_level_4?/:depth_level_5?",
      component: CommunityPostReplyCommentsList,
      layout: "/admin",
    });

    dashRoutes.push({
      path: "/community-posts-reply-comments-form/:id",
      component: CommunityPostReplyCommentForm,
      layout: "/admin",
    });
    
    if (PermissionHelper.checkPermission("edit_community_query_answer")) {  
      dashRoutes.push({
        path: "/community-posts-reply-form/:id",
        component: CommunityPostReplyForm,
        layout: "/admin",
      });
    }
  }    

  if (PermissionHelper.checkMainPermission(["view_report_abuses"])) { 
    dashRoutes.push({
      path: "/report-abuses",
      component: ReportAbusesList,
      layout: "/admin",
    });

    dashRoutes.push({
      path: "/report-abuse-view/:id",
      component: ReportAbuseView,
      layout: "/admin",
    });
  }

  if (PermissionHelper.checkMainPermission(["view_badge"])) { 
    dashRoutes.push({
      path: "/badge",
      component: BadgeList,
      layout: "/admin",
    });
    
    if (PermissionHelper.checkPermission("add_badge") || PermissionHelper.checkPermission("edit_badge")) {  
      dashRoutes.push({
        path: "/badge-form/:id",
        component: BadgeForm,
        layout: "/admin",
      });
    }    
  }

  if (PermissionHelper.checkMainPermission(["view_visitor_community_profile"])) { 
    dashRoutes.push({
      path: "/visitor-community-profile/:id",
      component: VisitorCommunityProfile,
      layout: "/admin",
    });
  }  
  
  if (PermissionHelper.checkMainPermission(["view_news_announcements"])) {
    dashRoutes.push({
      path: "/news-announcements",
      component: NewsAnnouncementList,
      layout: "/admin",
    });
    
    if (PermissionHelper.checkPermission("add_news_announcements") || PermissionHelper.checkPermission("edit_news_announcements")) {
      dashRoutes.push({
        path: "/news-announcements-form/:id",
        component: NewsAnnouncementForm,
        layout: "/admin",
      });
    }
  }
    
}  

export default dashRoutes;
