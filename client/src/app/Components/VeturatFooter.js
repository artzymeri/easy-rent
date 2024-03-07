import React from "react";
import "@/app/Styling/Veturat/veturat-footer.css";

const VeturatFooter = () => {
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 2004; year--) {
      years.push(year);
    }
    return years;
  };
  return (
    <div className="veturat-list-footer">
      <div className="veturat-list-footer-item">
        <label for="availability-select">Filtro sipas statusit:</label>
        <select
          id="availability-select"
          className="veturat-availability-select"
        >
          <option>Të Gjitha</option>
          <option>Lirë</option>
          <option>Zënë</option>
          <option>Servis</option>
        </select>
      </div>
      <div className="veturat-list-footer-divider"></div>
      <div className="veturat-list-footer-item">
        <label for="availability-select">Filtro sipas derivateve:</label>
        <select
          id="availability-select"
          className="veturat-availability-select"
        >
          <option>Të Gjitha</option>
          <option>Naftë</option>
          <option>Benzinë</option>
          <option>Elektrikë</option>
        </select>
      </div>
      <div className="veturat-list-footer-divider"></div>
      <div className="veturat-list-footer-item">
        <label for="availability-select">Filtro sipas transmisionit:</label>
        <select
          id="availability-select"
          className="veturat-availability-select"
        >
          <option>Të Gjitha</option>
          <option>Manual</option>
          <option>Automatik</option>
        </select>
      </div>
      <div className="veturat-list-footer-divider"></div>
      <div className="veturat-list-footer-item">
        <label for="availability-select">Filtro sipas vitit:</label>
        <select
          id="availability-select"
          className="veturat-availability-select"
        >
          <option>Të Gjitha</option>
          {generateYears().map((year, index) => (
            <option key={index}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VeturatFooter;
