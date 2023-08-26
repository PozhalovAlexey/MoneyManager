/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
    /**
     * Создаёт счёт с помощью Account.create и закрывает
     * окно в случае успеха, а также вызывает App.update()
     * и сбрасывает форму
     * */
    onSubmit(data) {
        Account.create(data, (error, response) => {
            this.element.reset()
            if (response.success) {
                App.getModal('createAccount').close()
                App.update()
            } else {
                alert(response.error)
            }
        })
    }
}