import Monatsliste from"./Monatsliste_min.js";export default class Monatslistensammlung{constructor(){this._monatslisten=[],this._html=this._html_generieren()}_eintrag_hinzufuegen(e){let t=e.datum().toLocaleString("de-DE",{month:"numeric"}),n=e.datum().toLocaleString("de-DE",{year:"numeric"}),i=!1;this._monatslisten.forEach(s=>{t===s.monat()&&n===s.jahr()&&(s.eintrag_hinzufuegen(e),i=!0)}),i||this._monatsliste_hinzufuegen(n,t,e)}_monatsliste_hinzufuegen(e,t,n){let i=new Monatsliste(e,t);i.eintrag_hinzufuegen(n),this._monatslisten.push(i)}_html_generieren(){let e=document.createElement("section");return e.setAttribute("id","monatslisten"),this._monatslisten.forEach(t=>{e.insertAdjacentElement("beforeend",t.html())}),e}_monatslisten_sortieren(){this._monatslisten.sort((e,t)=>e.jahr()<t.jahr()?1:e.jahr()>t.jahr()?-1:e.monat()<t.monat()?1:-1)}aktualisieren(e){this._monatslisten=[],e.forEach(e=>this._eintrag_hinzufuegen(e)),this._monatslisten_sortieren(),this._html=this._html_generieren(),this.anzeigen()}_entfernen(){let e=document.querySelector("#monatslisten");null!==e&&e.remove()}anzeigen(){let e=document.querySelector("#eingabeformular-container");null!==e&&(this._entfernen(),e.insertAdjacentElement("afterend",this._html))}};