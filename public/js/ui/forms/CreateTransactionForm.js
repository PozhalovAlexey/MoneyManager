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
    const accountsSelect = this.element.querySelector(".accounts-select");
    let accountsList = document.querySelector(".accounts-panel");
    const accountsPanelHeader = document.querySelector(
      ".accounts-panel-header"
    );
    Account.list((err, { data, success }) => {
      if (success) {
        accountsSelect.innerHTML = data.reduce((html, { id, name }) => {
          return html + `<option value="${id}">${name}</option>`;
        }, "");
        const menuItems = accountsList.getElementsByClassName("menu-item");
        Array.from(menuItems).forEach((e) => e.remove());

        data.forEach(({ id, sum, name }) => {
          let li = document.createElement("li");
          li.classList.add("menu-item");
          li.innerHTML = `<a href="#">
                    <span>${name}</span> / <span>${sum}</span> ₽
                </a>`;
          accountsList.appendChild(li);
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
