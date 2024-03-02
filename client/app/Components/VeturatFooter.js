import React from "react";
import "@/app/Styling/Veturat/veturat-footer.css";

const VeturatFooter = () =>{
    return (
        <div className="veturat-list-footer">
        <div className="veturat-list-footer-item">
          <label for="availability-select">Filtro sipas statusit:</label>
          <select id="availability-select" className="veturat-availability-select">
            <option>Të Gjitha</option>
            <option>Lirë</option>
            <option>Zënë</option>
            <option>Servis</option>
          </select>
        </div>
        <div className="veturat-list-footer-divider"></div>
        <div className="veturat-list-footer-item">
          <label for="availability-select">Filtro sipas derivateve:</label>
          <select id="availability-select" className="veturat-availability-select">
            <option>Të Gjitha</option>
            <option>Naftë</option>
            <option>Benzinë</option>
            <option>Elektrikë</option>
          </select>
        </div>
        <div className="veturat-list-footer-divider"></div>
        <div className="veturat-list-footer-item">
          <label for="availability-select">Filtro sipas transmisionit:</label>
          <select id="availability-select" className="veturat-availability-select">
            <option>Të Gjitha</option>
            <option>Manual</option>
            <option>Automatik</option>
          </select>
        </div>
        <div className="veturat-list-footer-divider"></div>
        <div className="veturat-list-footer-item">
          <label for="availability-select">Filtro sipas vitit:</label>
          <select id="availability-select" className="veturat-availability-select">
            <option>Të Gjitha</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
            <option>2017</option>
            <option>2016</option>
            <option>2015</option>
            <option>2014</option>
            <option>2013</option>
            <option>2012</option>
            <option>2011</option>
            <option>2010</option>
            <option>2009</option>
            <option>2008</option>
            <option>2007</option>
            <option>2006</option>
            <option>2005</option>
            <option>2004</option>
          </select>
        </div>
      </div>
    )
}

export default VeturatFooter;