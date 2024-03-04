import Sidebar from "../src/app/Components/Sidebar";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import "@/app/Styling/Reservimet/reservimet.css";
import Calendar from "@/app/Components/Calendar";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import ReservationsList from "@/app/Components/ReservationsList";
import axios from "axios";

const Reservimet = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const [currentDay, setCurrentDay] = useState(dayjs());

  const [calendarActive, setCalendarActive] = useState(true);
  const [reservationsListActive, setReservationsListActive] = useState(false);

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1234/getreservations").then((res) => {
      setReservations(res.data);
    });
  }, []);

  const generateDaysInMonth = (month) => {
    const daysInMonth = month.daysInMonth();
    const firstDayOfMonth = month.startOf("month");
    const daysArray = [];

    for (let i = 0; i < daysInMonth; i++) {
      const day = firstDayOfMonth.add(i, "day");
      daysArray.push({
        date: day,
      });
    }

    return daysArray;
  };
  const daysInMonth = generateDaysInMonth(currentMonth);

  const formatMonth = (month) => {
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

  const previousDay = () => {
    const newDay = currentDay.add(1, "day"); // Use dayjs add function to move to next day
    setCurrentDay(newDay);
  };

  const nextDay = () => {
    const newDay = currentDay.subtract(1, "day"); // Use dayjs subtract function to move to previous day
    setCurrentDay(newDay);
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
          <div className="reservimet-header-view-switch-buttons">
            {calendarActive ? (
              <Button variant="contained">Kalendari</Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => {
                  setReservationsListActive(false);
                  setCalendarActive(true);
                }}
              >
                Kalendari
              </Button>
            )}
            {reservationsListActive ? (
              <Button variant="contained">Lista Ditore</Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => {
                  setCalendarActive(false);
                  setReservationsListActive(true);
                }}
              >
                Lista Ditore
              </Button>
            )}
          </div>
          <div className="reservimet-header-date-navigator">
            <div className="reservimet-header-date-navigator-arrows">
              {calendarActive ? (
                <ArrowLeft
                  onClick={previousMonth}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <ArrowLeft
                  onClick={previousDay}
                  style={{ cursor: "pointer" }}
                />
              )}
              {calendarActive ? (
                <ArrowRight onClick={nextMonth} style={{ cursor: "pointer" }} />
              ) : (
                <ArrowRight onClick={nextDay} style={{ cursor: "pointer" }} />
              )}
            </div>
            {calendarActive ? (
              <h5>{formatMonth(currentMonth)}</h5>
            ) : (
              <h5>{currentDay.format("DD MM YYYY")}</h5>
            )}
          </div>
        </div>
        {calendarActive && (
          <Calendar daysInMonth={daysInMonth} reservations={reservations} />
        )}
        {reservationsListActive && (
          <ReservationsList
            reservations={reservations}
            currentDay={currentDay}
          />
        )}
      </div>
    </Sidebar>
  );
};

export default Reservimet;
