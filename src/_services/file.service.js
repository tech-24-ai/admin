import { apiConfig } from "./api";
import { configConstants } from "../_constants";
export const fileService = {
  _upload,
  _download,
  _import,
};

function _upload(file, type) {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  let url;
  if (type === "document") {
    url = "/upload/document";
  } else {
    url = "/upload/image";
  }

  return apiConfig.post(url, formData, config);
}

function _download(url) {
  let serverUrl = "";
  serverUrl = process.env.REACT_APP_URL;
  const finalUrl = `${serverUrl}${url}`;

  window.open(finalUrl);
}

function _import(url, file) {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  return apiConfig.post(url, formData, config);
}
