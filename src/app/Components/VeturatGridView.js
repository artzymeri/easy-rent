import React from "react";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Veturat/veturat-grid-view.css";
import CarsTest from "../TestingValues/CarsTest";
import VeturatFooter from "./VeturatFooter";
import { LocalGasStationOutlined, RestoreOutlined } from "@mui/icons-material";

const VeturatListView = () => {
  const checkStatus = (carStatus) => {
    if (carStatus == "available") {
      return <div className="status-badge available">Gati</div>;
    } else if (carStatus == "rented") {
      return <div className="status-badge rented">Zënë</div>;
    } else if (carStatus == "in-service") {
      return <div className="status-badge in-service">servis</div>;
    }
  };

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
              <div className="veturat-grid-item-car-info">
                <h3
                  style={{
                    fontWeight: "300",
                    lineHeight: "25px",
                  }}
                >
                  {car.make}
                  <br />
                  <span style={{ fontWeight: "bold" }}>{car.model}</span>
                </h3>
                <h2 style={{ color: "orangered" }}>
                  {car.price}€{" "}
                  <span style={{ fontSize: "15px", fontWeight: "300" }}>
                    {" "}
                    / ditë
                  </span>
                </h2>
              </div>
              <div className="veturat-grid-item-car-perks">
                <div className="veturat-grid-item-car-perks-item">
                  <LocalGasStationOutlined sx={{ color: "#015c92" }} />
                  <h5>{car.fuel}</h5>
                </div>
                <div className="veturat-grid-item-car-perks-item">
                  <svg
                    className="transmission-grid-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 122.88 122.88"
                  >
                    <title>manual-transmission</title>
                    <path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.23,61.23,0,0,1,61.44,0Zm4.07,82.09a6.67,6.67,0,1,1-8.14,0V68.62H42.31V82.09a6.67,6.67,0,1,1-8.14,0V46.17a6.67,6.67,0,1,1,8.14,0V60.48H57.37V46.17a6.67,6.67,0,1,1,8.14,0V60.48H80.57V46.17a6.67,6.67,0,1,1,8.14,0V64a4.41,4.41,0,0,1,0,.52,4.07,4.07,0,0,1-4.07,4.07H65.51V82.09Zm33-57.76a52.46,52.46,0,1,0,15.38,37.11A52.29,52.29,0,0,0,98.55,24.33Z" />
                  </svg>
                  <h5>{car.transmission}</h5>
                </div>
                <div className="veturat-grid-item-car-perks-item">
                  <RestoreOutlined sx={{ color: "#015c92" }} />
                  <h5>{car.year}</h5>
                </div>
              </div>
              <button
                style={{
                  width: "calc(100% - 30px)",
                  margin: "5px 15px 15px 15px",
                  border: "0px solid transparent",
                  background: "#015c92",
                  color: "white",
                  padding: "10px 0px",
                  borderRadius: "6px",
                }}
              >
                Detajet
              </button>
            </div>
          );
        })}
      </div>
      <VeturatFooter />
    </>
  );
};

export default VeturatListView;
