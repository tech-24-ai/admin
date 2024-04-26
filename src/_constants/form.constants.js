export const OptionTypes = [
  {
    id: "textbox",
    name: "Textbox",
  },
  {
    id: "checkbox",
    name: "Checkbox",
  },
  {
    id: "radiobox",
    name: "Radiobox",
  },
  {
    id: "multi_radiobox",
    name: "Multi Select Radiobox",
  },
  {
    id: "select",
    name: "Select",
  },
  // {
  //     id: 'multi_select',
  //     name: 'Multi Select',
  // },
  // {
  //     id: 'country_select',
  //     name: 'Country Select',
  // },
  // {
  //     id: 'industry_select',
  //     name: 'Industry Select',
  // }
];

export const SUBSCRIPTION_CATEGORY = [
  {
    id: "basic",
    name: "Basic",
  },
  {
    id: "advance",
    name: "Advance",
  },
  {
    id: "enterprise",
    name: "Enterprise",
  },
];
export const FREE_ADDON_TYPE = [
  { id: "technology", name: "Technology" },
  { id: "document", name: "Document" },
];
export const BOOKING_STATUS_TYPE = [
  { id: "confirmed", name: "Confirmed" },
  { id: "cancelled", name: "Cancelled" },
  { id: "pending", name: "Pending" },
];
export const CO_TRANSACTION_TYPE = [
  { id: "Online", name: "Online" },
  { id: "Offline", name: "Offline" },
  { id: "Credit", name: "Credit" },
];

export const SKILL_TYPE = [
  { id: "dev ops", name: "Dev Ops" },
  { id: "it expert", name: "IT Expert" },
  { id: "front end developer", name: "Front End Developer" },
  { id: " back end developer", name: "Back End Developer" },
  { id: "full stack developer", name: "Full Stack Developer" },
];

export const DURATION_TYPE = [
  { id: 30, name: "30" },
  { id: 45, name: "45" },
  { id: 60, name: "60" },
  { id: 75, name: "75" },
  { id: 90, name: "90" },
  { id: 105, name: "105" },
  { id: 120, name: "120" },
];

export const EU_TRANSACTION_TYPE = [
  { id: 1, name: "Subscription" },
  { id: 2, name: "Document Purchase" },
];

export const EU_SUBSCRIPTION_CATEGORY = [
  {
    id: "1",
    name: "Basic",
  },
  {
    id: "2",
    name: "Advance",
  },
  {
    id: "3",
    name: "Premium",
  },
];

export const EU_DOCUMENT_CATEGORY = [
  {
    id: "2",
    name: "Modules",
  },
  {
    id: "3",
    name: "Template Toolkit",
  },
];

export const EU_DOCUMENT_CATEGORY_TYPE = [
  {
    id: "research",
    name: "Research",
  },
  {
    id: "template",
    name: "Template",
  },
];

export const TYPE = [
  {
    id: "enduser",
    name: "Enduser",
  },
  {
    id: "mi",
    name: "MI",
  },
];

export const DAY_TYPE = [
  {
    id: "0",
    name: "Mon",
  },
  {
    id: "1",
    name: "Tue",
  },
  {
    id: "2",
    name: "Wed",
  },
  {
    id: "3",
    name: "Thu",
  },
  {
    id: "4",
    name: "Fri",
  },
  {
    id: "5",
    name: "Sat",
  },
  {
    id: "6",
    name: "Sun",
  },
];

export const SCHEDULING_TYPE = [
  {
    id: "weekly",
    name: "Weekly",
  },
  {
    id: "daily",
    name: "Daily",
  },
];

export const BLOG_STATUS = [
  {
    id: "0",
    name: "Inactive",
  },
  {
    id: "1",
    name: "Active",
  },
  {
    id: "2",
    name: "Draft",
  },
];

export const ANOMALY_STATUS = [
  {
    id: "0",
    name: "Open",
  },
  {
    id: "1",
    name: "Closed",
  },
];

export const COMPANY_TYPE = [
  {
    id: "public",
    name: "Public",
  },
  {
    id: "private",
    name: "Private",
  },
];
export const QUARTER = [
  {
    id: "ALL",
    name: "ALL",
  },
  {
    id: "Q4",
    name: "Q4",
  },
  {
    id: "Q3",
    name: "Q3",
  },
  {
    id: "Q2",
    name: "Q2",
  },
  {
    id: "Q1",
    name: "Q1",
  },
];

export const MONTH = [
  {
    id: "JAN",
    name: "JAN",
  },
  {
    id: "FEB",
    name: "FEB",
  },
  {
    id: "MAR",
    name: "MAR",
  },
  {
    id: "APR",
    name: "APR",
  },
  {
    id: "MAY",
    name: "MAY",
  },
  {
    id: "JUN",
    name: "JUN",
  },
  {
    id: "JUL",
    name: "JUL",
  },
  {
    id: "AUG",
    name: "AUG",
  },
  {
    id: "SEP",
    name: "SEP",
  },
  {
    id: "OCT",
    name: "OCT",
  },
  {
    id: "NOV",
    name: "NOV",
  },
  {
    id: "DEC",
    name: "DEC",
  },
];
export const YEAR = (start = 2015, end = 2050) => {
  let year = [];
  while (start <= end) {
    year.push({
      id: start,
      name: start,
    });
    start++;
  }
  return year;
};

export const STATUS = [
  { id: "1", name: "Active" },
  { id: "0", name: "In Active" },
];
export const SUBSCRIPTION_STATUS = [
  { id: "Pending", name: "Pending" },
  { id: "Approved", name: "Approved" },
  { id: "Rejected", name: "Rejected" },
];
export const DIRECTORS = [{ id: 1, name: "Yes" }, { id: 0, name: "No" }];
export const EXECUTIVE_MANAGEMENT = [
  { id: 1, name: "Management" },
  { id: 0, name: "Employee" },
];
export const INVESTOR_STATUS = [
  { id: 1, name: "Active" },
  { id: 2, name: "In Active" },
  { id: 3, name: "Pending" },
  { id: 4, name: "Rejected" },
];

export const DATA_SOURCE = [{ id: 1, name: "API" }, { id: 0, name: "MANUAL" }];
export const ORG_SIZE = [
  { id: "0 - 10", name: "0 - 10" },
  { id: "10 - 100", name: "10 - 100" },
  { id: "100 - 1000", name: "100 - 1000" },
  { id: "1000+", name: "1000+" },
];

export const PLAN_DURATION = [
  { id: "Monthly", name: "Monthly" },
  { id: "Yearly", name: "Yearly" },
];

export const STATIC_PLAN_DURATION = [
  { id: "Monthly", name: "Monthly" },
  { id: "Yearly", name: "Yearly" },
];

export const PLAN_TYPE = [
  { id: "Static", name: "Static" },
  { id: "Custom", name: "Custom" },
];

export const CRON_FREQUENCY = [
  { id: "ONCE", name: "ONCE" },
  { id: "DAILY", name: "DAILY" },
  { id: "WEEKLY", name: "WEEKLY" },
  { id: "MONTHLY", name: "MONTHLY" },
  { id: "QUATERLY", name: "QUATERLY" },
  { id: "HALF_YEARLY", name: "HALF_YEARLY" },
  { id: "YEARLY", name: "YEARLY" },
];

export const CRON_TYPE = [
  { id: "COMPANY_DETAILS", name: "COMPANY DETAILS" },
  // { id: "KEY_PEOPLE", name: "KEY PEOPLE" },
  { id: "FINANCIALS", name: "FINANCIALS" },
  // { id: "LOCATIONS", name: "LOCATIONS" },
  // { id: "EMP_COUNT", name: "TOTAL EMPPLOYEE COUNT" },
  // { id: "JOB_COUNT", name: "TOTAL JOB COUNT" },
  // { id: "ACQUISITIONS", name: "ACQUISITIONS DETAILS" },
  { id: "IP_PATENT", name: "IP/PATENT" },
  { id: "WEB_TRAFFIC", name: "WEB TRAFFIC" },
  { id: "GOOGLE_TRENDS", name: "GOOGLE TRENDS" },
  { id: "TWITTER_DATA", name: "TWITTER DATA" },
  // { id: "TWITTER_MENTIONS", name: "TWITTER MENTIONS" },
  { id: "NEWS_LIST", name: "NEWS LIST" },
  { id: "MI_SUBSCRIPTION", name: "MI SUBSCRIPTION" },
  { id: "EU_SUBSCRIPTION", name: "EU SUBSCRIPTION" },
  { id: "VENDOR_LOGO_UPDATE", name: "VENDOR LOGO UPDATE" },
  { id: "VENDOR_DETAILS", name: "VENDOR DETAILS" },
  { id: "VISITOR_LINKEDIN_DETAILS", name: "VISITOR LINKEDIN DETAILS" },
  { id: "VENDOR_LINKEDIN_LOGO", name: "VENDOR LINKEDIN LOGO" },
  { id: "FETCH_404_PRODUCTS", name: "FETCH 404 PRODUCTS" },
  {
    id: "SERVICE_PROVIDER_LINKEDIN_LOGO",
    name: "SERVICE PROVIDER LINKEDIN LOGO",
  },
];

export const COMMUNITY_POST_STATUS = [
  { id: "0", name: "Pending" },
  { id: "1", name: "Approved" },
  { id: "2", name: "Rejected" },
];

export const COMMUNITY_POST_DISCUSSION_STATUS = [
  { id: "0", name: "No" },
  { id: "1", name: "Yes" },
];

export const DOCUMENT_CONTENT_TYPE = [
  { id: 1, name: "Upload Doc/Docx format" },
  { id: 2, name: "Via Google Docs" },
  { id: 3, name: "Upload PDF/PPTX/Excel" },
  { id: 4, name: "Add Manual Content" },
];


export const DOCUMENT_STATUS = [
  {
    id: "0",
    name: "Inactive",
  },
  {
    id: "1",
    name: "Active",
  },
  {
    id: "2",
    name: "Draft",
  },
  {
    id: "3",
    name: "Approved",
  }
];
