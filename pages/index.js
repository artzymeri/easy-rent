import React from "react";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Home/home.css";
import Sidebar from "@/app/Components/Sidebar";
import {
  AccessTime,
  AccountBalanceWallet,
  CarCrash,
  CarRental,
  DirectionsCar,
  MinorCrash,
  NoCrash,
  Person,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const todaysArrivalArray = [
  {
    carName: "Audi",
    carModel: "A4",
    client: "Adrian Martioni",
    time: "10:30",
  },
  {
    carName: "BMW",
    carModel: "M3",
    client: "John Smith",
    time: "11:30",
  },
  {
    carName: "VW",
    carModel: "Golf 8",
    client: "Martin Zumari",
    time: "12:00",
  },
  {
    carName: "Skoda",
    carModel: "Octavia",
    client: "Hudi Astrazzi",
    time: "14:30",
  },
  {
    carName: "Mercedes-Benz",
    carModel: "E-Class",
    client: "Yumari Anton",
    time: "15:00",
  },
  {
    carName: "BMW",
    carModel: "M3",
    client: "John Smith",
    time: "11:30",
  },
  {
    carName: "VW",
    carModel: "Golf 8",
    client: "Martin Zumari",
    time: "12:00",
  },
  {
    carName: "Skoda",
    carModel: "Octavia",
    client: "Hudi Astrazzi",
    time: "14:30",
  },
  {
    carName: "Mercedes-Benz",
    carModel: "E-Class",
    client: "Yumari Anton",
    time: "15:00",
  },
];

const todaysDepartureArray = [
  {
    carName: "BMW",
    carModel: "M2",
    client: "Gargino Mazicci",
    time: "10:30",
  },
  {
    carName: "Mercedes-Benz",
    carModel: "E-Class",
    client: "Yumari Anton",
    time: "11:00",
  },
  {
    carName: "VW",
    carModel: "Golf 8",
    client: "Martin Zumari",
    time: "12:00",
  },
  {
    carName: "BMW",
    carModel: "M3",
    client: "John Smith",
    time: "16:30",
  },
];

const Home = () => {
  return (
    <Sidebar>
      <div className="home-content">
        <div className="home-top-wrapper">
          <div className="home-item-top">
            <div>
              <AccountBalanceWallet sx={{ color: "#015c92" }} />
              <span>Totali Ditor</span>
            </div>
            <div
              style={{
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: "700",
              }}
            >
              1210€
            </div>
          </div>
          <div className="home-item-top">
            <div>
              <NoCrash sx={{ color: "#015c92" }} />
              <span>Veturat e Lira</span>
            </div>
            <div
              style={{
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: "700",
              }}
            >
              12 Vetura
            </div>
          </div>
          <div className="home-item-top">
            <div>
              <CarRental sx={{ color: "#015c92" }} />
              <span>Veturat e Zëna</span>
            </div>
            <div
              style={{
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: "700",
              }}
            >
              34 Vetura
            </div>
          </div>
          <div className="home-item-top">
            <div>
              <CarCrash sx={{ color: "#015c92" }} />
              <span>Veturat Jashtë Funksionit</span>
            </div>
            <div
              style={{
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: "700",
              }}
            >
              3 Vetura
            </div>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              height: "50px",
              background: "white",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              color: "#015c92",
              fontWeight: "500",
              fontSize: "20px",
            }}
          >
            <span
              style={{
                flexGrow: "1",
                textAlign: "center",
              }}
            >
              Mbërritjet e sotme
            </span>
            <span
              style={{
                flexGrow: "1",
                textAlign: "center",
              }}
            >
              Reservimet e sotme
            </span>
          </div>
          <div className="home-todays-exchange">
            <div className="home-todays-exchange-item">
              {todaysArrivalArray.map((row) => {
                return (
                  <div className="home-todays-exchange-row">
                    <span
                      style={{
                        justifyContent: "flex-start",
                        width: "50%",
                      }}
                    >
                      <DirectionsCar
                        sx={{ height: "15px", color: "orangered" }}
                      />
                      {row.carName} {row.carModel}
                    </span>
                    <span
                      style={{
                        justifyContent: "flex-start",
                        width: "50%",
                      }}
                    >
                      <Person sx={{ height: "15px", color: "orangered" }} />
                      {row.client}
                    </span>
                    <span
                      style={{
                        justifyContent: "flex-end",
                        width: "100px",
                      }}
                    >
                      <AccessTime sx={{ height: "15px", color: "orangered" }} />
                      {row.time}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="home-todays-exchange-item">
              {todaysDepartureArray.map((row) => {
                return (
                  <div className="home-todays-exchange-row">
                    <span
                      style={{
                        justifyContent: "flex-start",
                        width: "50%",
                      }}
                    >
                      <DirectionsCar
                        sx={{ height: "15px", color: "orangered" }}
                      />
                      {row.carName} {row.carModel}
                    </span>
                    <span
                      style={{
                        justifyContent: "flex-start",
                        width: "50%",
                      }}
                    >
                      <Person sx={{ height: "15px", color: "orangered" }} />
                      {row.client}
                    </span>
                    <span
                      style={{
                        justifyContent: "flex-end",
                        width: "100px",
                      }}
                    >
                      <AccessTime sx={{ height: "15px", color: "orangered" }} />
                      {row.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Home;
