/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (err, response) => {
      if (response && response.success) {
        const accountsList = this.element.querySelector(".accounts-select");
        accountsList.innerHTML = "";

        response.data.forEach((account) => {
          const option = document.createElement("option");
          option.value = account.id;
          option.textContent = account.name;
          accountsList.appendChild(option);
        });
      }
    });
  }
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      this.element.reset();
      if (response.success) {
        App.getModal("newIncome").close();
        App.getModal("newExpense").close();
        App.update();
      } else {
        alert(response.error);
      }
    });
  }
}
