/** Modul ist für die korrekte Anzeige der Gesamtbilanz in der Sidebar verantwortlich */

export default class Gesamtbilanz {

    constructor() {
        this._einnahmen = 0;
        this._ausgaben = 0;
        this._gesamtbilanz = 0;
        this._html = this._html_generieren();
    }

    /**
     * Setzt die Bilanz auf 0, aktualisiert anhand der eintraege-Liste eine neue Bilanz und generiert den HTML Eintrag
     * @param {Object} eintraege 
     */
    aktualisieren(eintraege) {
        this._einnahmen = 0;
        this._ausgaben = 0;
        this._gesamtbilanz = 0;

        eintraege.forEach((eintrag) => {

            
            switch (eintrag.typ()){
            case "ausgabe":
                this._ausgaben += eintrag.betrag();
                this._gesamtbilanz  -= eintrag.betrag();
                break;
            case "einnahme":
                this._einnahmen += eintrag.betrag();
                this._gesamtbilanz  += eintrag.betrag();
                break;
            default:
                console.log('Typ nicht bekannt');
                break;
            }
        })
        this._html = this._html_generieren();
        this.anzeigen();   
    }

    /**
     * Generiert das HTML für die Gesamtbilanz
     * @returns {Element} gesamtbilanz
     */
    _html_generieren() {
        let gesamtbilanz = document.createElement("aside");
        gesamtbilanz.setAttribute("id","gesamtbilanz");
        
        let ueberschrift = document.createElement("h1");
        ueberschrift.textContent = "Gesamtbilanz";
        gesamtbilanz.insertAdjacentElement("afterbegin",ueberschrift);
        
        let einnahmen = document.createElement("div");
        einnahmen.setAttribute("class","gesamtbilanz-zeile einnahmen");
       ueberschrift.insertAdjacentElement("afterend",einnahmen);
       let text = document.createElement("span");
       text.textContent = "Einnahmen";
       einnahmen.insertAdjacentElement("afterbegin",text);
       let zahl = document.createElement("span");
       zahl.textContent = `${(this._einnahmen / 100).toFixed(2).replace(".",",")} €`;
       einnahmen.insertAdjacentElement("beforeend",zahl);

       let ausgaben = document.createElement("div");
       ausgaben.setAttribute("class","gesamtbilanz-zeile ausgaben");
      einnahmen.insertAdjacentElement("afterend", ausgaben);
      let text2 = document.createElement("span");
      text2.textContent = "Ausgaben";
      ausgaben.insertAdjacentElement("afterbegin",text2);
      let zahl2 = document.createElement("span");
      zahl2.textContent = `${(this._ausgaben / 100).toFixed(2).replace(".",",")} €`;
      ausgaben.insertAdjacentElement("beforeend",zahl2);

      let gesamt = document.createElement("div");
      gesamt.setAttribute("class","gesamtbilanz-zeile bilanz");
     ausgaben.insertAdjacentElement("afterend", gesamt);
     let text3 = document.createElement("span");
     text3.textContent = "Bilanz";
     gesamt.insertAdjacentElement("afterbegin",text3);
     let zahl3 = document.createElement("span");
     
     this._gesamtbilanz>= 0 ? zahl3.setAttribute("class","positiv") : zahl3.setAttribute("class","negativ");

     zahl3.textContent = `${(this._gesamtbilanz / 100).toFixed(2).replace(".",",")} €`;
     gesamt.insertAdjacentElement("beforeend",zahl3);

     return gesamtbilanz;
    }

    /** entfernt alte Gesamtbilanz */
    _entfernen() {
        let bilanz = document.querySelector("#gesamtbilanz");
        if (bilanz !==null) {
            bilanz.remove();
        } 
    }

    /** Fügt das HTML der Gesamtbilanz in der Webseite ein */
    anzeigen() {
        this._entfernen();
        document.querySelector("body").insertAdjacentElement("beforeend", this._html);
    }
}