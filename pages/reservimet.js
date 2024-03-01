import Sidebar from "@/app/Components/Sidebar";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "@/app/Styling/Reservimet/calendar.css";
import "@/app/Styling/Reservimet/calendar_day_colors.css";
import "@/app/Styling/Reservimet/reservimet.css";
import axios from "axios";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Reservimet = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1234/getreservations").then((res) => {
      setReservations(res.data);
    });
  }, []);

  const [currentMonth, setCurrentMonth] = useState(dayjs()); // Initialize with current month using dayjs

  // Function to generate an array of objects representing each day of the month
  const generateDaysInMonth = (month) => {
    const daysInMonth = month.daysInMonth();
    const firstDayOfMonth = month.startOf("month");
    const daysArray = [];

    for (let i = 0; i < daysInMonth; i++) {
      const day = firstDayOfMonth.add(i, "day");
      daysArray.push({
        date: day,
        // Add any additional properties you may need
      });
    }

    return daysArray;
  };

  // Generate array of objects representing each day of the current month
  const daysInMonth = generateDaysInMonth(currentMonth);

  const formatMonth = (month) => {
    console.log(month.format("MMMM YYYY"));
    if (month.format("MMMM YYYY") == `January ${month.format("YYYY")}`) {
      return `Janar ${month.format("YYYY")}`;
    } else if (
      month.format("MMMM YYYY") == `February ${month.format("YYYY")}`
    ) {
      return `Shkurt ${month.format("YYYY")}`;
    } else if (month.format("MMMM YYYY") == `March ${month.format("YYYY")}`) {
      return `Mars ${month.format("YYYY")}`;
    } else if (month.format("MMMM YYYY") == `April ${month.format("YYYY")}`) {
      return `Prill ${month.format("YYYY")}`;
    } else if (month.format("MMMM YYYY") == `May ${month.format("YYYY")}`) {
      return `Maj ${month.format("YYYY")}`;
    } else if (month.format("MMMM YYYY") == `June ${month.format("YYYY")}`) {
      return `Qershor ${month.format("YYYY")}`;
    } else if (month.format("MMMM YYYY") == `July ${month.format("YYYY")}`) {
      return `Korrik ${month.format("YYYY")}`;
    } else if (month.format("MMMM YYYY") == `August ${month.format("YYYY")}`) {
      return `Gusht ${month.format("YYYY")}`;
    } else if (
      month.format("MMMM YYYY") == `September ${month.format("YYYY")}`
    ) {
      return `Shtator ${month.format("YYYY")}`;
    } else if (month.format("MMMM YYYY") == `October ${month.format("YYYY")}`) {
      return `Tetor ${month.format("YYYY")}`;
    } else if (
      month.format("MMMM YYYY") == `November ${month.format("YYYY")}`
    ) {
      return `Nëntor ${month.format("YYYY")}`;
    } else if (
      month.format("MMMM YYYY") == `December ${month.format("YYYY")}`
    ) {
      return `Dhjetor ${month.format("YYYY")}`;
    }
  };

  const previousMonth = () => {
    const newMonth = currentMonth.subtract(1, "month"); // Use dayjs subtract function to move to previous month
    setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = currentMonth.add(1, "month"); // Use dayjs add function to move to next month
    setCurrentMonth(newMonth);
  };

  return (
    <Sidebar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="reservimet-header-container">
          <h3>Reservimet</h3>
          <div className="reservimet-header-date-navigator">
            <div className="reservimet-header-date-navigator-arrows">
              <ArrowLeft
                onClick={previousMonth}
                style={{ cursor: "pointer" }}
              />
              <ArrowRight onClick={nextMonth} style={{ cursor: "pointer" }} />
            </div>
            <h5>{formatMonth(currentMonth)}</h5>
          </div>
        </div>
        <div className="calendar-wrapper">
          {daysInMonth.map((day) => {
            return (
              <div
                className="calendar-day-box"
                key={day.date.format("YYYY-MM-DD")}
              >
                <div className="calendar-day-box-header">
                  <span>{day.date.format("D")}</span>
                </div>
                <div className="calendar-day-box-reservations-container">
                  {reservations.map((reservation, index) => {
                    const reservationDateStart = dayjs(
                      reservation.startTime
                    ).format("YYYY-MM-DD");
                    const reservationDateEnd = dayjs(
                      reservation.endTime
                    ).format("YYYY-MM-DD");
                    const todayDate = dayjs(day.date).format("YYYY-MM-DD");
                    if (
                      dayjs(todayDate).isSameOrBefore(
                        reservationDateEnd,
                        "day"
                      ) &&
                      dayjs(todayDate).isSameOrAfter(
                        reservationDateStart,
                        "day"
                      )
                    ) {
                      return (
                        <div
                          className={`nr-${index} calendar-day-box-reservations-item`}
                        >
                          {reservation.clientNameSurname}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Sidebar>
  );
};

export default Reservimet;
