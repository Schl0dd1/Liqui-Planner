import Navigationsleiste from"./Navigationsleiste_min.js";import Eingabeformular from"./Eingabeformular_min.js";import Monatslistensammlung from"./Monatslistensammlung_min.js";import Gesamtbilanz from"./Gesamtbilanz_min.js";import Eintrag from"./Eintrag_min.js";export default class Haushaltsbuch{constructor(){this._eintraege=[],this._navigationsleiste=new Navigationsleiste,this._eingabeformular=new Eingabeformular,this._monatslistensammlung=new Monatslistensammlung,this._gesamtbilanz=new Gesamtbilanz,this._wiederherstellen()}eintrag_hinzufuegen(e){let t=new Eintrag(e.titel,e.betrag,e.typ,e.datum);this._eintraege.push(t),this._monatslistensammlung.aktualisieren(this._eintraege),this._gesamtbilanz.aktualisieren(this._eintraege),this._speichern()}_speichern(){let e=JSON.stringify(this._eintraege);localStorage.setItem("eintraege",e)}_wiederherstellen(){let e=JSON.parse(localStorage.getItem("eintraege"));null!==e&&(console.log(e),e.forEach(e=>{this.eintrag_hinzufuegen({titel:e._titel,betrag:e._betrag,typ:e._typ,datum:new Date(e._datum)})}))}eintrag_entfernen(e){let t;for(let i=0;i<this._eintraege.length;i++)if(this._eintraege[i].timestamp()===parseInt(e)){t=i;break}this._eintraege.splice(t,1),this._monatslistensammlung.aktualisieren(this._eintraege),this._gesamtbilanz.aktualisieren(this._eintraege),this._speichern()}start(){this._navigationsleiste.anzeigen(),this._eingabeformular.anzeigen(),this._monatslistensammlung.anzeigen(),this._gesamtbilanz.anzeigen()}};