import React, { useEffect, useState } from "react";
import "@/app/Styling/Home/home.css";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Home/CarsList.css";
import axios from "axios";
import { Skeleton } from "@mui/material";
import {
  AddBox,
  CarRental,
  Euro,
  LocalGasStation,
  LocationCity,
  LocationOn,
  Phone,
  SensorDoor,
  TimeToLeave,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import introImage from "@/app/autokeys.webp";

const HomeView = () => {
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1234/getveturat").then((res) => {
      setCarsData(res.data);
    });
  }, []);

  console.log(introImage);

  return (
    <div className="index-parent">
      {/* <div className="index-navbar">
        <h4>RentaCarCompany</h4>
        <input
          className="index-navbar-search"
          placeholder="Kërko veturën..."
          type="text"
        />
      </div> */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="index-intro"
      >
        <img src={introImage.src} />
        <div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="intro-text"
        >
          <h2>RentaCarCompany</h2>
          <h6>Zgjidh veturën tënde për kohë të caktuar!</h6>
        </div>
      </motion.div>
      <div className="cars-body">
        {carsData && carsData.length > 0 ? (
          <div className="cars-container">
            {carsData.map((car, index) => {
              return (
                <div className="car-card" key={index}>
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src={car.image}
                  />
                  <div className="car-card-info-wrapper">
                    <div className="car-card-info-child car-card-info-child-top">
                      <h2 className="car-title-holder">
                        {car.make} {car.model}
                      </h2>
                      <div className="car-card-info-subchild">
                        <Euro
                          sx={{ fontSize: "40px", color: "blueviolet" }}
                        ></Euro>
                        <h1 style={{ color: "blueviolet" }}>{car.price}</h1>
                        <p style={{ color: "blueviolet", fontWeight: "600" }}>
                          / ditë
                        </p>
                      </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="car-card-info-child">
                      <div className="car-card-info-subchild">
                        <TimeToLeave></TimeToLeave> {car.transmission}
                      </div>
                      <div className="car-card-info-subchild">
                        <SensorDoor></SensorDoor> {car.doors} dyer
                      </div>
                      <div className="car-card-info-subchild">
                        <LocalGasStation></LocalGasStation> {car.fuel}
                      </div>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="car-card-info-child car-card-button-wrapper">
                      <button className="car-card-button">
                        <CarRental sx={{ color: "whitesmoke" }}></CarRental>
                        Reservo
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="index-footer">
        <div>
          <LocationOn />
          <p>Adresa e Kompanisë, Shteti</p>
        </div>
        <div>
          <Phone />
          +383 49 222 222
        </div>
      </div>
    </div>
  );
};

export default HomeView;
