/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
    /**
     * Устанавливает полученный элемент
     * в свойство element.
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (!element) {
            throw new Error('Ошибка! Элемент не существует')
        }
        this.element = element;
        this.registerEvents()
    }

    /**
     * Регистрирует обработчики нажатия на
     * кнопки «Новый доход» и «Новый расход».
     * При нажатии вызывает Modal.open() для
     * экземпляра окна
     * */
    registerEvents() {
        const transactionButtons = document.querySelectorAll('.btn-block');
        transactionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                switch (e.closest('button').classList[2]) {
                    case'btn-success': {
                        App.getModal('newIncome').open();
                        break;
                    }
                    case 'btn-danger': {
                        App.getModal('newExpense').open();
                        break;
                    }
                }
            })
        })
    }
}
