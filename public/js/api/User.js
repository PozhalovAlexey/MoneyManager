/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
    static  URL = '/user'

    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */
    static setCurrent(user) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
        localStorage.removeItem('user')
    }

    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
        return JSON.parse(localStorage.getItem('user'));
    }

    /**
     * Получает информацию о текущем
     * авторизованном пользователе.
     * */
    static fetch(callback) {
        createRequest({
            url: this.URL + '/current',
            method: 'GET',
            callback: (error, response) => {
                if (response.success) {
                    this.setCurrent(response.user)
                } else {
                    this.unsetCurrent()
                }
                callback(error, response)
            }
        })
    }

    /**
     * Производит попытку авторизации.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static login(data, callback) {
        createRequest({
            url: this.URL + '/login',
            method: 'POST',
            data,
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        });
    }

    /**
     * Производит попытку регистрации пользователя.
     * После успешной авторизации необходимо
     * сохранить пользователя через метод
     * User.setCurrent.
     * */
    static register(data, callback) {
        createRequest({
            url: this.URL + '/register',
            method: 'POST',
            callback: (error, response) => {
                if (response.user) {
                    const user = {
                        name: response.user.name,
                        id: response.user.id
                    }
                    User.setCurrent(user)
                }
                callback(error, response)
            }
        })
    }

    /**
     * Производит выход из приложения. После успешного
     * выхода необходимо вызвать метод User.unsetCurrent
     * */
    static logout(callback) {
        createRequest({
            url: this.URL + '/logout',
            method: 'POST',
            callback: (error, response) => {
                if (response) {
                    User.unsetCurrent()
                }
                callback(error, response)
            }
        })
    }
}
