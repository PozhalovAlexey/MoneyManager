const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  let sendUrl = options.url;
  let formData = new FormData();
  if (options.data) {
    if (options.method === "GET") {
      Object.entries(options.data).forEach(([key, value]) => {
        sendUrl += `?${key}=${value}&`;
      });
      sendUrl = sendUrl.slice(0, -1);
    } else {
      Object.entries(options.data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
  }
  xhr.addEventListener("load", function () {
    options.callback(null, xhr.response);
  });
  try {
    xhr.open(options.method, sendUrl);
    xhr.send(formData);
  } catch (error) {
    options.callback(error);
  }
};
