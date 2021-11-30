/** Das Modul Monatsliste ist für die jeweiligen Monatslisten im Haushaltsbuch zuständig */

export default class Monatsliste {

    /** der Constuctor übergibt bei Initiierung Jahr und Monat der neu initiierten Monatsliste, enthält eine Liste für die Einträge der initiierten Monatsliste und eine Variable für die Bilanz des jeweiligen Monats sowie das HTML für die Liste
     * @prop {}
     * @prop {}
     * @prop {Array} _eintraege der Monatsliste
     * @prop {Number} _bilanz
     * @prop {Element} _html
     */
    constructor(jahr,monat){
        this._jahr = jahr;
        this._monat = monat;
        this._eintraege = [];
        this._bilanz = 0;
        this._html = this._html_generieren();
    }

    jahr() {
        return this._jahr;
    }

    monat() {
        return this._monat;
    }

    html() {
        return this._html;
    }

    /**
     * Diese öffentliche Methode fügt der Liste _eintraege ein neues Objekt hinzu und aktualisiert die jeweilige Monatsliste und ihre Bilanz
     * @param {Object} eintrag 
     */
    eintrag_hinzufuegen(eintrag) {
        this._eintraege.push(eintrag);
        this._bilanz_generieren();
        this._aktualisieren();
        
    }

    /**
     * Generiert das HTML der jeweiligen Monatsliste, für jedes Objekt in _eintraege wird ein Eintrag generiert
     * @returns {Element} monatsliste
     */
    _html_generieren(){
        let monatsliste = document.createElement("article");
        monatsliste.setAttribute("class","monatsliste");
        let eintrag_datum = new Date(this._jahr,this._monat - 1).toLocaleString("de-DE", {month: "long", year: "numeric"});
        let monatsbilanz;
        this._bilanz < 0 ? monatsbilanz="monatsbilanz negativ" : monatsbilanz = "monatsbilanz positiv";

        monatsliste.innerHTML = `
        <h2><span class="monat-jahr"> ${eintrag_datum}</span>
            <span class="${monatsbilanz}"> ${(this._bilanz / 100).toFixed(2).replace(".",",")} €</span>
        </h2>`;

        let eintragsliste = document.createElement("ul");
        this._eintraege.forEach(eintrag => eintragsliste.insertAdjacentElement("beforeend",eintrag.html()));
        monatsliste.insertAdjacentElement("beforeend",eintragsliste);

        return monatsliste;

    }
    /**
     * Methode sortiert die eintraege im Array _eintraege nach Datum und überschreibt dabei das alte Array
     */
     //https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     _eintraege_sortieren() {
         
        this._eintraege.sort((a,b) => { 
            if(a.datum() > b.datum()) {
                return -1;
            } else if (a.datum() < b.datum()){
                return 1;
            } else {
                if (a.timestamp() > b.timestamp()) {
                    return -1;
                } else {
                    return 1;
                }
            }
        })
    }

    /**
     * Methode aktualisiert die jeweilige Monatsliste, indem alle Einträge sortiert und das HTML neu generiert wird
     */
    _aktualisieren() {
        this._eintraege_sortieren();
        this._html = this._html_generieren();
    }

    /**
     * Methode aktualisiert die _bilanz für die jeweilige Monatsliste aus den Einträgen in _eintraege
     */
    _bilanz_generieren() {
        let bilanz = 0;
        if (this._eintraege !== null){
            this._eintraege.forEach(b => {
                if (b.typ() === "ausgabe") {
                bilanz -= b.betrag();
                } else {
                bilanz += b.betrag();
            }
            });
        }
        
        this._bilanz = bilanz;
    }

}