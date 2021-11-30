/** Modul stellt die Klasse Navigationsleiste zur Verfügung */

export default class Navigationsleiste {
    constructor() {
        this._html = this._html_generieren();
    }

    _html_generieren() {
        let navigation = document.createElement("nav");navigation.setAttribute("id","navigationsleiste");
        navigation.innerHTML = `<a href="index.html"><span id="markenname">Liqui-Planner</span></a>`;
        return navigation;
    }

    anzeigen() {
        
        let b = document.querySelector("body");
        if (b !== null) {
           b.insertAdjacentElement("afterbegin",this._html); 
        }
    } 
}