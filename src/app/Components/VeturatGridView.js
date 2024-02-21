import React from "react";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Veturat/veturat-grid-view.css";
import CarsTest from "../TestingValues/CarsTest";
import VeturatFooter from "./VeturatFooter";

const VeturatListView = () => {

  const checkStatus = (carStatus) => {
    if (carStatus == 'available') {
      return (
        <div className="status-badge available">
          Gati
        </div>
      )
    } else if (carStatus == 'rented') {
      return (
        <div className="status-badge rented">
          Zënë
        </div>
      )
    } else if (carStatus == 'in-service') {
      return (
        <div className="status-badge in-service">
          servis
        </div>
      )
    }
  }

  return (
    <>
      <div className="m-t-50 veturat-grid-view-wrapper">
        {CarsTest.map((car) => {
          return (
            <div key={car.id} className="veturat-grid-item">
              <div className="veturat-grid-status-badge">
                {checkStatus(car.availablility)}
              </div>
              <div className="veturat-grid-item-image-container">
                <img src={car.photoLink} />
              </div>
            </div>
          );
        })}
      </div>
      <VeturatFooter />
    </>
  );
};

export default VeturatListView;
