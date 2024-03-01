import Sidebar from "@/app/Components/Sidebar";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import "@/app/Styling/Reservimet/calendar.css";
import axios from "axios";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);


const Reservimet = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1234/getreservations").then((res) => {
      setReservations(res.data);
      console.log(res.data);
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

  console.log(daysInMonth);

  const formatMonth = (month) => {
    return month.format("MMMM YYYY"); // Use dayjs formatting function to display month and year
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h3 style={{ fontWeight: "400" }}>Reservimet</h3>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "5px" }}>
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
                key={day.date.format('YYYY-MM-DD')} // Adding a unique key for each day
                style={{
                  display: "flex",
                  flexGrow: "0",
                  content: "",
                  border: "1px solid gray",
                  height: "130px",
                  flexBasis: "130px",
                  borderRadius: "12px",
                  padding: "5px",
                }}
              >
                <span>{day.date.format("D")}</span>
                {reservations.map((reservation) => {
                  const reservationDateStart = dayjs(reservation.startTime).format('YYYY-MM-DD');
                  const reservationDateEnd = dayjs(reservation.endTime).format('YYYY-MM-DD');
                  const todayDate = dayjs(day.date).format('YYYY-MM-DD');
                  if(
                    dayjs(todayDate).isSameOrBefore(reservationDateEnd, 'day') &&
                    dayjs(todayDate).isSameOrAfter(reservationDateStart, 'day')
                  ){
                    return (
                      <div>
                        Day
                      </div>
                    )
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Sidebar>
  );
};

export default Reservimet;
