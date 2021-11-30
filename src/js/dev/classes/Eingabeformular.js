/**
 * Das Modul "Eingabeformular" ist für das Eingabeformular der Anwendung zuständig
 * @module class/Eingabeformular
 */

import Fehlerbox from "./Fehlerbox.js";
import liqui_planner from "../liqui-planner.js";


/**
 * Die Klasse Eingabeformular stellt alle Eigenschaften u Methoden des Eingabeformulars zur Verfügung, inklusive HTML und EVENTs
 */

export default class Eingabeformular {

  /**
   * Konstruktor generiert bei Instanziierung das HTML des Eingabeformulars
   * @prop {Element} _html - das HTML des Eingabeformulars
   */

    constructor() {
        this._html = this._html_generieren();
    }


    /**
     * Diese private Methode extrahiert die im Eingabeformular eingegebenen Daten aus 
     * dem Submit-Event des Eingabeformulars
     * @param {Event} submit_event
     * @returns {Object} - einfaches Objekt mit den Rohdaten des Eingabeformulars
     */

    _formulardaten_holen(submit_event) {
      return {
          titel:  submit_event.target.elements.titel.value,
          betrag:  submit_event.target.elements.betrag.value,
          einnahme:  submit_event.target.elements.einnahme.checked,
          ausgabe:  submit_event.target.elements.ausgabe.checked,
          datum:  submit_event.target.elements.datum.valueAsDate
      }  ;
    }

    /**
     * Verarbeitet die Daten aus der _formulardaten_holen-Methode weiter für die Ausgabe
     * @param {Object} daten 
     * @returns {Object} - ein Objekt mit den verarbeiteten Daten des Eingabeformulars
     */

    _formulardaten_verarbeiten(daten) {
      return {
        titel: daten.titel.trim(),
        betrag: parseFloat(daten.betrag) * 100,
        typ: daten.einnahme === false ? "ausgabe" : "einnahme",
        datum: daten.datum
      }
    }

    /**
     * Methode validiert die Daten aus der Methode _formulardaten_verarbeiten und fügt dem Array Fehlermeldungen für jeden gefundenen  Fehler einen Eintrag hinzu
     * @param {Object} daten 
     * @returns {Array} - returns Array fehlermeldungen, 
     */

    _formulardaten_validieren(daten) { //daten ist in dem fall das objekt aus formulardaten verarbeiten
        let fehlermeldungen = [];

        if (isNaN(daten.betrag)) {
          fehlermeldungen.push("Betrag");
        }

        if (daten.titel === "" ){
          fehlermeldungen.push("Titel");
        };

        if (daten.datum === null) {
          fehlermeldungen.push("Datum");
        }

        return fehlermeldungen;

    }

    /**
     * Setzt das Datumsfeld im Eingabeformular Datum auf das aktuelle Datum von heute
     */

    _datum_aktualisieren(){
      let datumsinput = document.querySelector("#datum");
      if(datumsinput !== null) {
        datumsinput.valueAsDate = new Date(); //datum auf das aktuelle datum setzen
      }
      

    }
    
    /**
     * Methode generiert HTML für das Eingabeformular als
     * @returns {Element} eingabeformular - HTML für das Eingabeformular als section eingabeformular mit der ID eingabeformular-container
     */
          
   _html_generieren() {
       let eingabeformular = document.createElement("section");
       eingabeformular.setAttribute("id","eingabeformular-container");
       eingabeformular.innerHTML = `
       <!-- Formular -->
       <form id="eingabeformular" action="#" method="get"></form>
       <!-- Titel -->
       <div class="eingabeformular-zeile">
         <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
       </div>
       <!-- Titel-Typ-Eingabezeile -->
       <div class="eingabeformular-zeile">
         <div class="titel-typ-eingabe-gruppe">
           <label for="titel">Titel</label>
           <input
             type="text"
             id="titel"
             form="eingabeformular"
             name="titel"
             placeholder="z.B. Einkaufen"
             size="10"
             title="Titel des Eintrags"
             
           />
           <input
             type="radio"
             id="einnahme"
             name="typ"
             value="einnahme"
             form="eingabeformular"
             title="Typ des Eintrags"
           />
           <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
           <input
             type="radio"
             id="ausgabe"
             name="typ"
             value="ausgabe"
             form="eingabeformular"
             title="Typ des Eintrags"
             checked
           />
           <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
         </div>
       </div>
       <!-- Betrag-Datum-Eingabezeile -->
       <div class="eingabeformular-zeile">
         <div class="betrag-datum-eingabe-gruppe">
           <label for="betrag">Betrag</label>
           <input
             type="number"
             min="0.01"
             id="betrag"
             name="betrag"
             form="eingabeformular"
             placeholder="z.B. 10,42"
             size="10"
             step="0.01"
             title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)"
             
           />
           <label for="datum">Datum</label>
           <input
             type="date"
             id="datum"
             name="datum"
             form="eingabeformular"
             size="10"
             title="Datum des Eintrags"
             
           />
         </div>
       </div>
       <!-- Absenden-Button -->
       <div class="eingabeformular-zeile">
         <button class="standard" type="submit" form="eingabeformular">
           Hinzufügen
         </button>
       </div>`;
       this._absenden_event_hinzufuegen(eingabeformular);
       return eingabeformular;
   }

   /**
    * Zeigt das Eingabeformular auf der Webseite mit aktuellem Datum an
    */

   anzeigen() {
     let nav = document.querySelector("#navigationsleiste");
     if (nav !== null) {
       nav.insertAdjacentElement("afterend", this._html);
       this._datum_aktualisieren();
     }
       
   }

   /**
    * Diese Funktion überprüft beim clicken auf den Button die Einträge nach Fehlern und führt entsprechend die funktion eintrag_hinzufuegen aus der Klasse Haushaltsbuch aus oder generiert eine Fehlermeldung, wobei alte fehlermeldungen zuvor gelöscht werden.
    * @param {Element} eingabeformular - Formular
    */

   _absenden_event_hinzufuegen(eingabeformular) {
      eingabeformular.querySelector("#eingabeformular").addEventListener("submit", e =>  {
          e.preventDefault(); 
          let formulardaten = this._formulardaten_verarbeiten(this._formulardaten_holen(e)); 
          
          let formular_fehler = this._formulardaten_validieren(formulardaten);
          
          if (formular_fehler.length === 0 ) {
             liqui_planner.eintrag_hinzufuegen(formulardaten);
             let alte_fehlerbox = document.querySelector(".fehlerbox");
             if (alte_fehlerbox !== null) {
                 alte_fehlerbox.remove();
             };
             e.target.reset();
             this._datum_aktualisieren();
           
          } else {
             let fehler = new Fehlerbox("Folgende Felder wurden nicht korrekt ausgefüllt:", formular_fehler);
             fehler.anzeigen();      
          }
      });
   }
}; 
      
    
