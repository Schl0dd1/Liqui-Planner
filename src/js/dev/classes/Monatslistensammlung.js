import Monatsliste from "./Monatsliste.js";

/** die Klasse stellt alle Methoden und Eigenschaften für die gesammte Monatslistensammlung zur Verfügung */
export default class Monatslistensammlung {

    /** der Constructor generiert bei Initiierung eine Liste mit den jeweiligen Monatslisten sowie das HTML
     * @property {Array} _monatslisten
     * @property {Element} _html
     */

    constructor() {
        this._monatslisten = [];
        this._html = this._html_generieren();
    }

    /**
     * Generiert aus Eintragsdatum den Eintragsmonat und das Jahr und legt nach vorhanden-sein eine neue Monatsliste an oder fügt den Eintrag der entsprechenden Monatsliste zu
     * @param {Object} eintrag 
     */
    _eintrag_hinzufuegen(eintrag) {
        let eintragsmonat = eintrag.datum().toLocaleString("de-DE", {month: "numeric"});
        let eintragsjahr = eintrag.datum().toLocaleString("de-DE", {year: "numeric"});
        let monatsliste_vorhanden = false;
        this._monatslisten.forEach(monatsliste => {
            if (eintragsmonat === monatsliste.monat() && eintragsjahr === monatsliste.jahr()) {
                monatsliste.eintrag_hinzufuegen(eintrag);
                monatsliste_vorhanden = true;
            }
        });
        if (!monatsliste_vorhanden) {
            this._monatsliste_hinzufuegen(eintragsjahr, eintragsmonat, eintrag);
        }
    }

    /**
     * Fügt der Monatslistensammlung eine neue Monatsliste mit dem übergebenen Eintrag hinzu und pusht sie in _monatslisten
     * @param {*} jahr 
     * @param {*} monat 
     * @param {Object} eintrag 
     */
    _monatsliste_hinzufuegen(jahr, monat, eintrag) {
        let neue_monatsliste = new Monatsliste(jahr, monat);
        neue_monatsliste.eintrag_hinzufuegen(eintrag);
        this._monatslisten.push(neue_monatsliste);
    }

    /**
     * Generiert das HTML für die komplette Monatslistensammlung und fügt mit der methode monatsliste.html für jeden Eintrag in _monatslisten eine Monatsliste hinzu
     * @returns {Element} monatslisten
     */
    _html_generieren() {
        
        let monatslisten = document.createElement("section");
        monatslisten.setAttribute("id", "monatslisten");

        this._monatslisten.forEach(monatsliste => {
            monatslisten.insertAdjacentElement("beforeend", monatsliste.html());
        });

        return monatslisten;
    }

    /**
     * sortiert alle Monatslisten mit absteigend nach Datum (aktuellstes Datum immer oben)
     */
    _monatslisten_sortieren() {
        this._monatslisten.sort((monatsliste_a, monatsliste_b) => {
            if (monatsliste_a.jahr() < monatsliste_b.jahr()) {
                return 1;
            } else if (monatsliste_a.jahr() > monatsliste_b.jahr()) {
                return -1;
            } else {
                if (monatsliste_a.monat() < monatsliste_b.monat()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });
    }

    /**
     * öffentliche Methode setzt _monatslisten auf null und generiert basierend auf den Einträgen im dem eintraege-Array eine neue Monatslistensammlung mit den jeweiligen Monatslisten
     * @param {Array} eintraege 
     */
    aktualisieren(eintraege) {
        this._monatslisten = [];
        eintraege.forEach(eintrag => this._eintrag_hinzufuegen(eintrag));
        this._monatslisten_sortieren();
        this._html = this._html_generieren();
        this.anzeigen();
    }

    /** Entfernt alte Monatslisten */
    _entfernen(){
       let monatslistensammlung = document.querySelector("#monatslisten");
        if (monatslistensammlung !== null) {
            monatslistensammlung.remove();
        }
    }
       
    /**
     * Entfernt alte Monatslisten mit der Methode _entfernen und zeigt aktualisierte Monatsliste auf der Seite an
     */
    anzeigen() {
        let eingabeformular_container = document.querySelector("#eingabeformular-container");
        if (eingabeformular_container !== null) {
        this._entfernen();
        eingabeformular_container.insertAdjacentElement("afterend", this._html);
        }
    }
}
