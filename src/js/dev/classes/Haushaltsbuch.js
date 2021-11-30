import Navigationsleiste from "./Navigationsleiste.js";
import Eingabeformular from "./Eingabeformular.js";
import Monatslistensammlung from "./Monatslistensammlung.js";
import Gesamtbilanz from "./Gesamtbilanz.js";
import Eintrag from "./Eintrag.js";

/** das Modul Haushaltsbuch stellt die Klasse Haushaltsbuch zur Verfügung
 * die Klasse Haushaltsbuch vereint alle Klassen für das Haushaltsbuch */

export default class Haushaltsbuch {

    /**
     * Der Konstruktor setzt bei Instaziierung der Klasse "Haushaltsbuch" alle 
     * u.g. Eigenschaften des Haushaltsbuchs und instanziiert damit die Bestandteile der Anwendung.
     * Außerdem stellt der Konstruktor mithilfe der Methode this._wiederherstellen() bei Instanziierung 
     * den bisherigen Zustand des Haushaltsbuch wieder her.
     * @property {Array} _eintraege - ein Arrays mit den Eintrags-Objekten des Haushaltsbuchs
     * @prop {Object} _navigationsleiste - die Navigationsleiste der Anwendung als Instanz von Navigationsleiste()
     * @prop {Object} _eingabeformular - die Eingabeformular der Anwendung als Instanz von Eingabeformular()
     * @prop {Object} _monatslistensammlung - die Monatslistensammlung als Instanz von Monatslistensammlung()
     * @prop {Object} _gesamtbilanz - die Gesamtbilanz als Instanz von Gesamtbilanz()
     */
    constructor() {
        this._eintraege = [];
        this._navigationsleiste = new Navigationsleiste();
        this._eingabeformular = new Eingabeformular();
        this._monatslistensammlung = new Monatslistensammlung();
        this._gesamtbilanz = new Gesamtbilanz();
        this._wiederherstellen();
       
    }

    /**
     * Diese Methode instanziiert anhand der im Eingabeformular eingegebenen
     * Eintragsdaten einen neuen Eintrag und fügt diesen zur Sammlun aller Einträge (this._eintraege) hinzu. 
     * Anschließend wird auch noch die Monatslistensammlung und die Gesamtbilanz aktualisiert 
     * und der neue Zustand des Haushaltsbuchs gespeichert.
     * @param {Object} eintragsdaten - ein Objekt mit den Daten eines Eintrags
     */
        eintrag_hinzufuegen(eintragsdaten) {
            let neuer_eintrag = new Eintrag(
                eintragsdaten.titel,
                eintragsdaten.betrag,
                eintragsdaten.typ,
                eintragsdaten.datum
            );

            this._eintraege.push(neuer_eintrag);
            this._monatslistensammlung.aktualisieren(this._eintraege);
            this._gesamtbilanz.aktualisieren(this._eintraege);
            this._speichern();
             
        }

        /**
         * Methode speichert die Liste _eintraege als JSON-String im Locale Storage, so dass sie in der nächsten Session wieder abrufbar ist.
         */
        _speichern() {
             let eintraege_string = JSON.stringify(this._eintraege);
             localStorage.setItem("eintraege",eintraege_string);
        }

        /**
         * Methode holt JSON-String aus dem Local Storage und generiert daraus die bereits vorhandenen Einträge auf der Webseite
         */
        _wiederherstellen() {
            let gespeicherte_eintraege = JSON.parse(localStorage.getItem("eintraege"));
            if(gespeicherte_eintraege !== null) {
                console.log(gespeicherte_eintraege);
                gespeicherte_eintraege.forEach( eintrag => {
                    this.eintrag_hinzufuegen({
                        titel: eintrag._titel,
                        betrag: eintrag._betrag,
                        typ: eintrag._typ,
                        datum: new Date(eintrag._datum)
                    });
                })
            }
            
        }


    /**
     * Diese Methode entfernt einen Eintrag anhand seines Erstellungs-Timestamps aus der 
     * Sammlung aller Einträge (this._eintraege). Anschließend wird auch noch die 
     * Monatslistensammlung und die Gesamtbilanz aktualisiert und der neue Zustand 
     * des Haushaltsbuchs gespeichert. 
     * @param {Number} timestamp 
     */
        eintrag_entfernen(timestamp) {
            let start_index;
            for (let i = 0; i < this._eintraege.length; i++) {
                if (this._eintraege[i].timestamp() === parseInt(timestamp)) {
                    start_index = i;
                    break;
                }
            }
            this._eintraege.splice(start_index, 1);
            this._monatslistensammlung.aktualisieren(this._eintraege);
            this._gesamtbilanz.aktualisieren(this._eintraege);
            this._speichern();
        }  

    /** Methode startet die Anzeige des Haushaltsbuches auf der Webseite, dabei wird die Nav angezeigt sowie das Eingabeformular, Monatslisten und Gesamtbilanz */
    start() {
        this._navigationsleiste.anzeigen();
        this._eingabeformular.anzeigen();
        this._monatslistensammlung.anzeigen();
        this._gesamtbilanz.anzeigen();
    }

}