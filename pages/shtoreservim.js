import Sidebar from "@/app/Components/Sidebar";
import React, { useState } from "react";
import "@/app/Styling/global-styling.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CarsTest from "@/app/TestingValues/CarsTest";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ShtoReservim = () => {
  const [newReservation, setNewReservation] = useState({
    firstAndLastName: null,
    phoneNumber: null,
    documentId: null,
    carInfo: null,
    startTime: null,
    endTime: null,
  });

  const handleCarSelectChange = (carinfo) => {
    setNewReservation({ ...newReservation, carInfo: carinfo.target.value });
  };

  const handleStartTime = (startTimeValue) => {
    setNewReservation({
      ...newReservation,
      startTime: startTimeValue.format(),
    });
  };

  const handleEndTime = (endTimeValue) => {
    setNewReservation({
      ...newReservation,
      endTime: endTimeValue.format(),
    });
  };

  const addReservation = () => {
    // Here comes the function to add the reservation to backend from newReservation object
  };

  return (
    <Sidebar>
      <h3 style={{ textAlign: "center", fontWeight: "700", color: "#015c92" }}>
        Shto Reservim
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "400px",
            marginTop: "50px",
            gap: "15px",
          }}
        >
          <TextField
            variant="outlined"
            label="Emri dhe Mbiemri"
            fullWidth
            style={{ background: "white" }}
            value={newReservation.firstAndLastName}
          />
          <TextField
            label="Numri Telefonit"
            variant="outlined"
            fullWidth
            style={{ background: "white" }}
            value={newReservation.phoneNumber}
          />
          <TextField
            label="Kodi Leternjoftimit"
            variant="outlined"
            fullWidth
            style={{ background: "white" }}
            value={newReservation.documentId}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Vetura</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newReservation.carInfo}
              label="Vetura"
              onChange={handleCarSelectChange}
              style={{ background: "white" }}
            >
              {CarsTest.map((car) => {
                return (
                  <MenuItem value={car.make + " " + car.model}>
                    {car.make} {car.model}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Koha e fillimit"
              sx={{ width: "100%", background: "white" }}
              onChange={handleStartTime}
            />
            <DateTimePicker
              label="Koha e mbarimit"
              sx={{ width: "100%", background: "white" }}
              onChange={handleEndTime}
            />
          </LocalizationProvider>
          <Button
            fullWidth
            variant="contained"
            onClick={addReservation}
            size="large"
          >
            Shto Reservimin
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};

export default ShtoReservim;
