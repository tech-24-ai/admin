const getUser = () => {
  let data = null;
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userDetail = user.user;

    if (userDetail) {
      data = userDetail;
    }
  }
  return data;
};

const isConsultant = () => {
  let status = false;
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userDetail = user.user;

    if (userDetail && userDetail.role === "Consultant") {
      status = true;
    }
  }
  return status;
};

const isServiceProvider = () => {
  let status = false;
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userDetail = user.user;

    if (
      userDetail &&
      userDetail.role === "Consultant" &&
      userDetail.isCompany
    ) {
      status = true;
    }
  }
  return status;
};

export const UserHelper = {
  isConsultant,
  isServiceProvider,
  getUser,
};
