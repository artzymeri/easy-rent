import React, { useEffect, useState } from "react";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Home/home.css";
import Sidebar from "../src/app/Components/Sidebar";
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
import axios from "axios";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useRouter } from "next/router";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Home = () => {
  const router = useRouter();

  const [dayRevenue, setDayRevenue] = useState(0);

  const [veturatTotal, setVeturatTotal] = useState(0);
  const [veturatActive, setVeturatActive] = useState(0);
  const [veturatInActive, setVeturatInActive] = useState(0);
  const [reservations, setReservations] = useState([]);

  const [currentDay, setCurrentDay] = useState(dayjs());

  const fetchActiveReservations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/reservations/active"
      );

      const activeReservations = response.data;

      let totalRevenue = 0;
      const today = dayjs().startOf("day");

      activeReservations.forEach((reservation) => {
        const startDate = dayjs(reservation.startTime);
        const endDate = dayjs(reservation.endTime);

        if (
          startDate.isSameOrBefore(today.endOf("day")) &&
          endDate.isSameOrAfter(today)
        ) {
          totalRevenue = totalRevenue + parseInt(reservation.pricePerDay);
        }
      });
      setDayRevenue(totalRevenue);
    } catch (error) {
      console.error("Error fetching or calculating day revenue:", error);
    }
  };

  const getActiveVeturatToday = async () => {
    try {
      let veturatData;
      let reservationsData;
      let todaysReservations = [];
      let veturatActive = [];
      let veturatInActive = [];

      const veturatResponse = await axios.get(
        "http://localhost:1234/getveturat"
      );

      veturatData = veturatResponse.data;

      const reservationsResponse = await axios.get(
        "http://localhost:1234/reservations/active"
      );

      reservationsData = reservationsResponse.data;

      setReservations(reservationsData);

      const today = dayjs().startOf("day");

      reservationsData.forEach((reservation) => {
        const startDate = dayjs(reservation.startTime);
        const endDate = dayjs(reservation.endTime);

        if (
          startDate.isSameOrBefore(today.endOf("day")) &&
          endDate.isSameOrAfter(today)
        ) {
          todaysReservations.push(reservation);
        }
      });

      todaysReservations.forEach((reservation) => {
        veturatInActive = veturatData.filter(
          (veture) => veture.carId == reservation.carId
        );
      });

      todaysReservations.forEach((reservation) => {
        veturatActive = veturatData.filter(
          (veture) => veture.carId !== reservation.carId
        );
      });

      setVeturatTotal(veturatTotal);
      setVeturatActive(veturatActive);
      setVeturatInActive(veturatInActive);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchActiveReservations();
    getActiveVeturatToday();
  }, []);

  const checkIfBetween = (reservation) => {
    const startOfDay = dayjs(currentDay).startOf("day");
    const endOfDay = dayjs(currentDay).endOf("day");

    if (dayjs(reservation.startTime).isSame(startOfDay, "day")) {
      return "departing";
    } else if (dayjs(reservation.endTime).isSame(endOfDay, "day")) {
      return "arriving";
    } else {
      return false;
    }
  };

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
              {dayRevenue}€
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
              {veturatActive?.length || 0} Vetura
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
              {veturatInActive?.length || 0} Vetura
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "45%",
            flexGrow: "1",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              height: "50px",
              background: "#015c92",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              color: "white",
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
              Reservimet e sotme
            </span>
          </div>
          <div className="home-todays-exchange">
            <div className="home-todays-exchange-item">
              {reservations.map((row) => {
                if (checkIfBetween(row) == "departing") {
                  return (
                    <div
                      className="home-todays-exchange-row"
                      key={row.id}
                      onClick={() => {
                        router.push("/reservimet");
                      }}
                    >
                      <span
                        style={{
                          justifyContent: "flex-start",
                          width: "50%",
                        }}
                      >
                        <DirectionsCar
                          sx={{ height: "15px", color: "orangered" }}
                        />
                        {row.carInfo}
                      </span>
                      <span
                        style={{
                          justifyContent: "flex-start",
                          width: "50%",
                        }}
                      >
                        <Person sx={{ height: "15px", color: "orangered" }} />
                        {row.clientNameSurnameD1}
                      </span>
                      <span
                        style={{
                          justifyContent: "flex-end",
                          width: "100px",
                        }}
                      >
                        <AccessTime
                          sx={{ height: "15px", color: "orangered" }}
                        />
                        {dayjs(row.startTime).format("HH:MM")}
                      </span>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            {reservations.every(
              (row) => checkIfBetween(row) !== "departing"
            ) && (
              <div
                className="home-todays-exchange-item"
                style={{ color: "#015c92", width: "100%" }}
              >
                <h4
                  style={{ textAlign: "center", width: "100%", height: "39px" }}
                >
                  Nuk ka reservime që fillojnë sot!
                </h4>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "45%",
            flexGrow: "1",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              height: "50px",
              background: "#015c92",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              color: "white",
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
          </div>
          <div className="home-todays-exchange">
            <div className="home-todays-exchange-item">
              {reservations.map((row) => {
                if (checkIfBetween(row) == "arriving") {
                  return (
                    <div
                      className="home-todays-exchange-row"
                      key={row.id}
                      onClick={() => {
                        router.push("/reservimet");
                      }}
                    >
                      <span
                        style={{
                          justifyContent: "flex-start",
                          width: "50%",
                        }}
                      >
                        <DirectionsCar
                          sx={{ height: "15px", color: "orangered" }}
                        />
                        {row.carInfo}
                      </span>
                      <span
                        style={{
                          justifyContent: "flex-start",
                          width: "50%",
                        }}
                      >
                        <Person sx={{ height: "15px", color: "orangered" }} />
                        {row.clientNameSurnameD1}
                      </span>
                      <span
                        style={{
                          justifyContent: "flex-end",
                          width: "100px",
                        }}
                      >
                        <AccessTime
                          sx={{ height: "15px", color: "orangered" }}
                        />
                        {dayjs(row.startTime).format("HH:MM")}
                      </span>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            {reservations.every(
              (row) => checkIfBetween(row) !== "arriving"
            ) && (
              <div
                className="home-todays-exchange-item"
                style={{ color: "#015c92", width: "100%" }}
              >
                <h4
                  style={{ textAlign: "center", width: "100%", height: "39px" }}
                >
                  Nuk ka reservime që mbarojnë sot!
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Home;
