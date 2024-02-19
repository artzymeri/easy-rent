import React from "react";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Veturat/veturat-list-view.css";
import CarsTest from "../TestingValues/CarsTest";

const VeturatListView = () => {
  return (
    <>
      <div className="m-t-50 veturat-list-view-wrapper">
        {CarsTest.map((car) => {
          return (
            <div key={car.id} className="veturat-list-item">
              <img src={car.photoLink} />
            </div>
          );
        })}
      </div>
      <div className="veturat-list-footer"></div>
    </>
  );
};

export default VeturatListView;
