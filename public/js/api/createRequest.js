const createRequest = (options = {}, callback) => {
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
        xhr.open(options.method, sendUrl);
        xhr.send(formData);
    } catch (error) {
        callback(error, xhr.response);
    }

    xhr.addEventListener('load', () => {
        options.callback(null, xhr.response);
    });
};