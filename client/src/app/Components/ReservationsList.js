import React from "react";
import "@/app/Styling/Reservimet/reservations_list.css";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import {
  AccessTime,
  ArrowDownward,
  ArrowUpward,
  SwapVert,
} from "@mui/icons-material";
import { Button } from "@mui/material";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

const ReservationsList = (props) => {
  const reservations = props.reservations;

  const currentDay = props.currentDay;

  console.log(currentDay);

  console.log(reservations);

  const checkIfToday = (reservation) => {
    if (
      dayjs(currentDay).isBetween(
        reservation.startTime,
        reservation.endTime,
        "day",
        "[]"
      )
    ) {
      return true;
    }
  }; // This function returns a boolean to check if the reservation is in the same day as displayed

  const checkIfBetween = (reservation) => {
    const startOfDay = dayjs(currentDay).startOf("day");
    const endOfDay = dayjs(currentDay).endOf("day");

    if (dayjs(reservation.startTime).isSame(startOfDay, "day")) {
      console.log(`${reservation.clientNameSurname} is arriving today`);
      return "arriving";
    } else if (dayjs(reservation.endTime).isSame(endOfDay, "day")) {
      console.log(`${reservation.clientNameSurname} is departing today`);
      return "departing";
    } else if (
      dayjs(currentDay).isBetween(
        reservation.startTime,
        reservation.endTime,
        null,
        "[]"
      )
    ) {
      console.log(`${reservation.clientNameSurname}`, "is between");
      return "between";
    } else {
      console.log(`${reservation.clientNameSurname}`, "is not between");
      return false;
    }
  };

  const checkActivity = (reservation) => {
    if (reservation.active) {
      return "active-reservation";
    } else {
      ("inactive-reservation");
    }
  };

  return (
    <>
      <div className="reservations-list-container">
        {reservations && reservations.length > 0
          ? reservations.map((reservation, index) => {
              if (checkIfToday(reservation)) {
                return (
                  <div className="reservations-list-item" key={index}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        fontSize: "14px",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>
                        {reservation.clientNameSurname}
                      </span>
                      <span>{reservation.carInfo}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5px",
                        flexDirection: "column",
                        fontSize: "13px",
                      }}
                    >
                      <span>Statusi</span>
                      <span
                        className={`reservations-list-item-activity-badge ${checkActivity(
                          reservation
                        )}`}
                      >
                        {reservation.active ? "Aktive" : "Mbyllur"}
                      </span>
                    </div>
                    {checkIfBetween(reservation) == "arriving" ? (
                      <div style={{ flexDirection: "column", gap: "5px" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          <ArrowUpward sx={{ color: "blue" }} />
                          <span>Fillon sot në ora:</span>
                        </div>
                        <span
                          style={{
                            textAlign: "center",
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AccessTime sx={{ width: "17px", height: "17px" }} />
                          {dayjs(reservation.startTime).format("HH : mm")}
                        </span>
                      </div>
                    ) : null}
                    {checkIfBetween(reservation) == "departing" ? (
                      <div style={{ flexDirection: "column", gap: "5px" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          <ArrowDownward sx={{ color: "orangered" }} />
                          <span>Mbaron sot në ora:</span>
                        </div>
                        <span
                          style={{
                            textAlign: "center",
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AccessTime sx={{ width: "17px", height: "17px" }} />
                          {dayjs(reservation.endTime).format("HH : mm")}
                        </span>
                      </div>
                    ) : null}
                    {checkIfBetween(reservation) == "between" ? (
                      <div
                        style={{
                          flexDirection: "row",
                          gap: "5px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SwapVert sx={{ color: "gray" }} />
                        <span>Gjithë ditën</span>
                      </div>
                    ) : null}
                    <div
                      style={{
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button variant="contained">Edito</Button>
                    </div>
                  </div>
                );
              }
            })
          : null}
      </div>
    </>
  );
};

export default ReservationsList;
