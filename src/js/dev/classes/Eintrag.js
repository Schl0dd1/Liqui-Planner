/** Das Modul Eintrag generiert die einzelnen Einträge für das Haushaltsbuch */

import liqui_planner from "../liqui-planner.js";

/** Die Klasse Eintrag stellt alle Eigenschaften und Methoden für die jeweiligen Einträge zur Verfügung */
export default class Eintrag {

    /** Der Constructor übergibt bei Instanziierung die Daten für den neuen Eintrag und generiert einen Timestamp sowie das HTML für diesen Eintrag
     * @prop {String} _titel
     * @prop {String} _betrag
     * @prop {String} _typ
     * @prop {date} _datum
     * @prop {Timestamp} _timestamp - aktuelle Zeit beim Absenden des neuen Eintrags
     *  @prop {Element} _html - das HTML des Eintrags
    */
    constructor(titel,betrag,typ,datum) {
        this._titel = titel;
        this._betrag = betrag;
        this._typ = typ;
        this._datum = datum;
        this._timestamp = Date.now();
        this._html = this._html_generieren();
    }

    /** funktionen machen die privaten variablen von außen abrufbar */
    titel(){
        return this._titel;
    }

    betrag(){
        return this._betrag;
    }

    typ(){
        return this._typ;
    }

    datum() {
        return this._datum;
    }

    timestamp() {
        return this._timestamp;
    }

    html() {
        return this._html;
    }


/** Generiert HTML für einen Eintrag 
 * @returns {Element} listenelement
*/
    _html_generieren() {
        let listenelement = document.createElement("li");
    
        this._typ === "einnahme" ? listenelement.setAttribute("class", "einnahme"): listenelement.setAttribute("class","ausgabe");
        listenelement.setAttribute("data-timestamp", this._timestamp);
        
        let datum = document.createElement("span");
        datum.setAttribute("class", "datum");
        console.log(this._datum)
        datum.textContent = this._datum.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
    
        listenelement.insertAdjacentElement("afterbegin", datum);
    
        let titel = document.createElement("span");
        titel.setAttribute("class","titel");
        titel.textContent = this._titel;
        datum.insertAdjacentElement("afterend",titel);
    
        let betrag = document.createElement("span");
        betrag.setAttribute("class","betrag");
        betrag.textContent = `${(this._betrag / 100).toFixed(2).replace(".",",")} €`;
        titel.insertAdjacentElement("afterend",betrag);
    
        let button = document.createElement("button");
        button.setAttribute("class","entfernen-button");
        betrag.insertAdjacentElement("afterend", button);
    
        let i = document.createElement("i");
        i.setAttribute("class","fas fa-trash");
        button.insertAdjacentElement("beforeend", i);
    
        this.eintrag_entfernen_event(listenelement);
        
        return listenelement;
    }

    /**
     * Fügt dem Entfernen-Button die Methode "eintrag_entfernen" aus der Klasse Haushaltbuch als Event hinzu
     * @param {Element} listenpunkt 
     */
    eintrag_entfernen_event(listenpunkt) {
        listenpunkt.querySelector(".entfernen-button").addEventListener("click", e => {
            let timestamp = e.target.parentElement.getAttribute("data-timestamp"); //timestamp von listenpunkt
            liqui_planner.eintrag_entfernen(timestamp);
        })
    }  
}