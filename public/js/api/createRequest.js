const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let sendUrl = options.url;
    let formData = new FormData();
    if (options.data) {
        if (options.method === 'GET') {
            Object.entries(options.data).forEach(([key, value]) => {
                sendUrl += `${key}=${value}`;
            });
            sendUrl = sendUrl.slice(0, -1);
        } else {
            Object.entries(options.data).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }
    }

    try {
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                options.callback(xhr.response.error, xhr.response);
            }
        });
    } catch (error) {
        options.callback(error);
    }
};