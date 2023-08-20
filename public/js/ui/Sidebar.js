/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
        const toggleBtn = document.querySelector('a.sidebar-toggle')
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const sidebarMini = document.querySelector('body.sidebar-mini');
            if (sidebarMini.classList.contains('sidebar-open')) {
                sidebarMini.classList.remove('sidebar-open')
                sidebarMini.classList.add('sidebar-collapse');
            } else {
                sidebarMini.classList.remove('sidebar-collapse')
                sidebarMini.classList.add('sidebar-open')
            }
        })
    }

    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регистрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() {
        const sidebarButtons = document.querySelectorAll('.sidebar-menu');
        sidebarButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                switch (e.target.closest('li').classList[1]) {
                    case 'menu-item_login':
                        App.getModal('login').open()
                        break;
                    case 'menu-item_register':
                        App.getModal('register').open()
                        break;
                    case 'menu-item_logout':
                        User.logout((response) => App.setState('init'))
                        break;
                }
            })
        })
    }
}