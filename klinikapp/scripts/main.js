"use strict"

/*
------- Declaring base elements ---------
 */

const body = document.querySelector(`body`);
const app = document.querySelector(`app`);
let main = document.querySelector(`main`);
const header = document.querySelector(`header`);
const footer = document.querySelector(`footer`);
const backButton = document.getElementById(`back-button`);
const menuButton = document.getElementById(`menu-button`);
const homeButton = document.getElementById(`home-button`);
const searchButton = document.getElementById(`search-button`);
const developerButton = document.getElementById(`developer-button`);
const stack = []

class KlinikAppElement extends HTMLElement {

    constructor() {
        super();
    }

    setInnerHTML(html) {
        this.innerHTML = html;
    }

    setSubText(subtext) {
        this.innerHTML += `<br><span class="button__subtext">${subtext}</span>`
    }

    setData(data) {
        this.data = data;
    }
}

class Button extends KlinikAppElement {

    constructor() {
        super();
    }

    connectedCallback() {
    }

    setUp(jsonData) {
        if (jsonData.html) this.setInnerHTML(jsonData.html);
        if (jsonData.subtext) this.setSubText(jsonData.subtext);
        this.classList.add(`button`);
    }

}

class LoadButton extends Button {

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback()
        this.classList.add(`button--load`);
        this.addEventListener(`click`, this.loadPage)
    }

    loadPage() {
        if (this.main) {
            app.replaceChild(this.main, main);
            main = this.main;
            stack.push([this.data]);
            console.log(stack);
            console.log(`==========================`)
        }
    }

    setUp(jsonData) {
        super.setUp(jsonData);
        if(jsonData.pageToLoad) this.setPageToLoad(jsonData.pageToLoad);
    }

    setPageToLoad(pageData) {
        super.setData(pageData);
        if (!this.data[0].type) {
            this.classList.add(`inactive`);
            this.removeEventListener(`click`, this.loadPage);
        } else {
            this.loader = new Loader(this.data);
            this.main = this.loader.createMainElement();
        }
    }
}

customElements.define(`klinikapp-loadbutton`, LoadButton);

class SectionButton extends Button {

    constructor() {
        super();
        this.connectedElement = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this.nextElementSibling.style.display = `none`;
    }

    setConnectedElementToSibling() {
        this.setConnectedElement(this.nextElementSibling);
    }

    setConnectedElement(element) {
        this.connectedElement = element;
        //TODO: Further checks whether renewing is necessary
        //this.removeEventListener(`click`, this.changeConnectedElementDisplay);
        //this.addEventListener(`click`, this.changeConnectedElementDisplay);
    }

    changeConnectedElementDisplay(e) {
        if (this.connectedElement === null) this.setConnectedElementToSibling();
        if (this.connectedElement.style.display !== `none`) {
            this.connectedElement.style.display = `none`;
        } else this.connectedElement.style.display = `block`;
    }

    setUp(jsonData) {
        super.setUp(jsonData);
        this.classList.add(`button--section`);
        this.addEventListener('click', this.changeConnectedElementDisplay);
    }

}

customElements.define(`klinikapp-sectionbutton`, SectionButton);

class Loader {

    constructor(data) {
        this.data = data;
    }

    createMainElement() {
        const main = document.createElement(`main`);
        this.loadChildrenFor(main, this.data);
        return main;
    }

    section = function (sectionJSON) {
        const section = document.createElement(`section`);
        if (sectionJSON.children) this.loadChildrenFor(section, sectionJSON.children);
        return section;
    }

    sectionButton = function (sectionButtonJSON) {
        const sectionButton = document.createElement(`klinikapp-sectionbutton`);
        sectionButton.setUp(sectionButtonJSON);
        return sectionButton;
    }

    loadButton = function (loadButtonJSON) {
        const loadButton = document.createElement(`klinikapp-loadbutton`);
        loadButton.setUp(loadButtonJSON);
        return loadButton;
    }

    paragraph = function (paragraphJSON) {
        const paragraph = document.createElement(`p`);
        paragraph.innerHTML = paragraphJSON.html;
        if(paragraphJSON.subtext) paragraph.innerHTML += `<br><span class="button__subtext">${paragraphJSON.subtext}</span>`
        return paragraph;
    }

    loadChildrenFor(element, JSON) {
        for (let object of JSON) {
            element.appendChild(this[object.type](object));
        }
    }
}

const loadbutton = `loadButton`;
const sectionbutton = `sectionButton`;
const paragraph = `paragraph`;
const section = `section`;


/* ====================================== */
/* ============TESTING=================== */
/* ====================================== */


const starteinstellungen = [
    {
        type: paragraph,
        html: `Einstellungen nach Problembereich:`
    },
    {
        type: sectionbutton,
        html: `Oxygenierung`,
        subtext: `pO<sub>2</sub> &darr;, pCO<sub>2</sub> &harr;`
    },
    {
        type: section,
        children: [
            {
                type: paragraph,
                html: `PEEP 6mbar<br>PS: +3mbar<br>FiO<sub>2</sub>: 50-70%<br><span class="emphasised">&rarr; PEEP</span><br><span class="button__subtext">z.B. Pneumonie, Lungenödem<br>Schrittweise Erhöhung des PEEP bzw. Anpassung nach Klinik.<br>Schrittweise Erhöhung des FiO<sub>2</sub> nach Klinik und BGA<br><span class="lightblue">Wichtig ist hier der PEEP!</span></span>`
            }
        ]
    },
    {
        type: sectionbutton,
        html: `Ventilation`,
        subtext: `pO<sub>2</sub> &darr;, pCO<sub>2</sub> &uarr;`
    },
    {
        type: section,
        children: [
            {
                type: paragraph,
                html: `PEEP 5mbar<br>PS: +8mbar<br>FiO<sub>2</sub>: 30-50%<br><span class="emphasised">&rarr; PS</span><br><span class="button__subtext">z.B. COPD, Asthma, muskuläre Erschöpfung.<br>Schrittweise Anpassung der Druckunterstützung mit dem Patienten zusammen.<br>Bei V.a. Airtrapping (z.B. COPD und Obstruktion) kann es auch sein, dass eine PEEP-Steigerung nötig ist.<br><span class="lightblue">Wichtig ist hier die Druckunterstützung!</span></span> </span>`
            }
        ]
    },
    {
        type: sectionbutton,
        html: `Unklar`
    },
    {
        type: section,
        children: [
            {
                type: paragraph,
                html: "PEEP 5mbar<br>PS: +5mbar<br>FiO<sub>2</sub>: 50%<br>",
                subtext: `Anpassung nach Klinik (Patient, Atemfrequenz, Herzfrequenz, BGA)<br><span class="lightblue">Wichtig ist hier, das Problem zu identifizieren!</span>`
            }
        ]
    }
]

const aufbau = [
    {
        type: paragraph,
        html: `Hier dann ein paar Bilder etc. zum Aufbau des Geräts`
    }
]

const allgemeines = [
    {

    }
]

const startpage = [
    {
        type: loadbutton,
        html: `Aufbau/Anlage`,
        pageToLoad: aufbau
    },
    {
        type: loadbutton,
        html: `Starteinstellungen`,
        pageToLoad: starteinstellungen
    },
    {
        type: loadbutton,
        html: `Allgemeines`,
        pageToLoad: allgemeines
    }
]


const loader = new Loader(startpage);
stack.push(startpage);
const newMain = loader.createMainElement();
app.replaceChild(newMain, main);
main = newMain;

backButton.addEventListener(`click`, () => {
    let backLoader = new Loader(stack[stack.length-2]);
    const newMain = backLoader.createMainElement();
    app.replaceChild(newMain, main);
    main = newMain;
    stack.pop();
})

homeButton.addEventListener(`click`, () => {
    let newMain = loader.createMainElement();
    stack.push(startpage);
    app.replaceChild(newMain, main);
    main = newMain;
})