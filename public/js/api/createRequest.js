const createRequest = (options = {}, callback) => {
    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append('name', 'demo');
    formData.append('email', 'demo@demo');
    formData.append('password', 'demo');
    xhr.open('GET', 'https://localhost:8000');
    xhr.responseType = 'json';
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(null, xhr.response);
        } else {
            callback(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`));
        }
    };
    xhr.send(formData);
};
createRequest({}, function (error, response) {
    if (error) {
        console.error(error);
    } else {
        console.log(response);
    }
});