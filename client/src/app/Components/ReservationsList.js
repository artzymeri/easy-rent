import React from "react";
import "@/app/Styling/Reservimet/reservations_list.css";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";

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
      return true;
    } else if (dayjs(reservation.endTime).isSame(endOfDay, "day")) {
      console.log(`${reservation.clientNameSurname} is departing today`);
      return true;
    } else if (
      dayjs(currentDay).isBetween(
        reservation.startTime,
        reservation.endTime,
        null,
        "[]"
      )
    ) {
      console.log(`${reservation.clientNameSurname}`, "is between");
      return true;
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
                    <div>{checkIfBetween(reservation)}</div>
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
