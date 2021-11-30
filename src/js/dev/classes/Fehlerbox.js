/** Modul Fehlerbox ist für die Fehler-Anzeige auf der Webseite verantwortlich */

export default class Fehlerbox {

    /** Constructor übergibt einen Fehlertext und einen Array
     * @prop {String} _fehlertext
     * @prop {Array} _formular_fehler
     * @prop {Element} _html
     */
    
    constructor(fehlertext,formular_fehler) {
        this._fehlertext = fehlertext;
        this._formular_fehler = formular_fehler;
        this._html = this._html_generieren();
    }

    /**
     * Generiert HTML der Fehlerbox für jeden Fehler im formular_fehler-Array
     * @returns {Element} fehlerbox
     */
    _html_generieren() {

            let fehlerbox = document.createElement("div");
            fehlerbox.setAttribute("class","fehlerbox");
        
            let fehlertext = document.createElement("span");
            fehlertext.textContent = this._fehlertext;
            fehlerbox.insertAdjacentElement("afterbegin",fehlertext);
        
            let fehlerliste = document.createElement("ul");
            this._formular_fehler.forEach(fehler => {
               let listenpunkt = document.createElement("li");
               listenpunkt.textContent = fehler;
               fehlerliste.insertAdjacentElement("beforeend",listenpunkt);
        
            });
        
            fehlerbox.insertAdjacentElement("beforeend",fehlerliste);
        
            return fehlerbox;
    }
    
    /**
     * Methode entfernt alte und fügt neue Fehlerbox im Eingabeformular ein
     */
    anzeigen() {
        this._entfernen();
        let container = document.querySelector("#eingabeformular-container");
        if (container !== null) {
            container.insertAdjacentElement("afterbegin", this._html);
            }
        }

        /** Entfernt alte Fehlerbox auf der Seite falls vorhanden */
        _entfernen() {
        let alte_fehlerbox = document.querySelector(".fehlerbox");
      
        if (alte_fehlerbox !== null) {
            alte_fehlerbox.remove();
        }
    }

        
    }   


    

