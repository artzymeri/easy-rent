import Sidebar from "@/app/Components/Sidebar";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React, { useState } from "react";
import dayjs from "dayjs";

const Reservimet = () => {

  const [currentMonth, setCurrentMonth] = useState(dayjs()); // Initialize with current month using dayjs

  // Function to generate an array of objects representing each day of the month
  const generateDaysInMonth = (month) => {
    const daysInMonth = month.daysInMonth();
    const firstDayOfMonth = month.startOf('month');
    const daysArray = [];

    for (let i = 0; i < daysInMonth; i++) {
      const day = firstDayOfMonth.add(i, 'day');
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
    return month.format('MMMM YYYY'); // Use dayjs formatting function to display month and year
  };

  const previousMonth = () => {
    const newMonth = currentMonth.subtract(1, 'month'); // Use dayjs subtract function to move to previous month
    setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = currentMonth.add(1, 'month'); // Use dayjs add function to move to next month
    setCurrentMonth(newMonth);
  };

  return (
    <Sidebar>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <h3 style={{fontWeight: '400'}}>Reservimet</h3>
          <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
            <div style={{ display: 'flex', gap: '5px'}}>
              <ArrowLeft onClick={previousMonth} style={{cursor: 'pointer'}} />
              <ArrowRight onClick={nextMonth} style={{cursor: 'pointer'}} />
            </div>
            <h5><span style={{fontWeight: '300'}}>Month: </span>{formatMonth(currentMonth)}</h5>
          </div>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', width: '100%', marginTop: '50px', gap: '5px'}}>
          {daysInMonth.map((day)=>{
            return (
              <div style={{display: 'flex', flexGrow: '0', content: '', border: '1px solid gray', height: '125px', flexBasis: '125px', borderRadius: '12px'}}></div>
            )
          })}
        </div>
      </div>
    </Sidebar>
  );
};

export default Reservimet;
