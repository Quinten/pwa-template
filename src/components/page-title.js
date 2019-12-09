import styles from './_page-title.css';

class PageTitle extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = `<h1 class="${styles.h1}">Javascript rocks!!!</h1>`; // we will figure out binding and shadowroot stuff later
    }
}
window.customElements.define('page-title', PageTitle);
