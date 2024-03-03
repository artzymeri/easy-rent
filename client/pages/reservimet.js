import Sidebar from "../src/app/Components/Sidebar";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import "@/app/Styling/Reservimet/reservimet.css";
import Calendar from "@/app/Components/Calendar";
import { useState } from "react";
import dayjs from "dayjs";

const Reservimet = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs()); // Initialize with current month using dayjs

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
        <Calendar daysInMonth={daysInMonth} />
      </div>
    </Sidebar>
  );
};

export default Reservimet;
