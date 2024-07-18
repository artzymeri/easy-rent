import React, { useEffect, useState } from "react";
import "@/app/Styling/Reservimet/calendar.css";
import "@/app/Styling/Reservimet/calendar_day_colors.css";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import {
  AddAPhoto,
  CloseFullscreen,
  Delete,
  Error,
  Print,
} from "@mui/icons-material";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

const Calendar = (props) => {
  const {
    daysInMonth,
    reservations,
    deleteReservation,
    saveEditReservation,
    viewSelectedDay,
    clickedImage,
    selectedReservationDialog,
    editState,
    selectedReservation,
    handleCarSelectChange,
    handleStartTime,
    handleEndTime,
    handleReservationSelection,
    setSelectedReservationDialog,
    setImages,
    setEditState,
    setSelectedReservation,
    handleFileChange,
    deleteImage,
    setClickedImage,
    setSelectedCar,
    carsData,
    handleAvailabilityChange,
  } = props;

  const generatePDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1234/generatepdfapi",
        { selectedReservation },
        { responseType: "blob" }
      );

      const downloadLink = document.createElement("a");
      const blob = new Blob([response.data], { type: "application/pdf" });

      console.log(blob)
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.setAttribute("download", `aaa.pdf`);
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={clickedImage} onClose={() => setClickedImage(null)}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "transparent",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              width: "30px",
              height: "30px",
              background: "white",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
            }}
            onClick={() => setClickedImage(null)}
          >
            <CloseFullscreen sx={{ height: "18px", width: "18px" }} />
          </div>
          <img src={clickedImage} style={{ width: "100%", height: "auto" }} />
        </div>
      </Dialog>
      <Dialog
        open={selectedReservationDialog}
        onClose={() => {
          setImages([]);
          setSelectedReservationDialog(false);
          setEditState(false);
          setSelectedReservation({
            firstAndLastNameD1: null,
            phoneNumberD1: null,
            documentIdD1: null,
            addressD1: null,
            firstAndLastNameD2: null,
            phoneNumberD2: null,
            documentIdD2: null,
            addressD2: null,
            carInfo: null,
            carId: null,
            startTime: null,
            endTime: null,
            imagesArray: "[]",
          });
        }}
      >
        <DialogContent dividers>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <h5
                style={{
                  textAlign: "center",
                  padding: "5px 10px",
                  background: "#015c92",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Shoferi 1
              </h5>
              <TextField
                disabled={!editState}
                variant="outlined"
                label="Emri dhe Mbiemri"
                fullWidth
                style={{ background: "white" }}
                value={selectedReservation.firstAndLastNameD1}
                onChange={(e) => {
                  setSelectedReservation({
                    ...selectedReservation,
                    firstAndLastNameD1: e.target.value,
                  });
                }}
              />
              <TextField
                disabled={!editState}
                label="Numri Telefonit"
                variant="outlined"
                fullWidth
                style={{ background: "white" }}
                value={selectedReservation.phoneNumberD1}
                onChange={(e) => {
                  setSelectedReservation({
                    ...selectedReservation,
                    phoneNumberD1: e.target.value,
                  });
                }}
              />
              <TextField
                disabled={!editState}
                label="Numri i Dokumentit Personal"
                variant="outlined"
                fullWidth
                style={{ background: "white" }}
                value={selectedReservation.documentIdD1}
                onChange={(e) => {
                  setSelectedReservation({
                    ...selectedReservation,
                    documentIdD1: e.target.value,
                  });
                }}
              />
              <TextField
                disabled={!editState}
                label="Adresa"
                variant="outlined"
                fullWidth
                style={{ background: "white" }}
                value={selectedReservation.addressD1}
                onChange={(e) => {
                  setSelectedReservation({
                    ...selectedReservation,
                    addressD1: e.target.value,
                  });
                }}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <h5
                style={{
                  textAlign: "center",
                  padding: "5px 10px",
                  background: "#015c92",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Shoferi 2
              </h5>
              <TextField
                disabled={!editState}
                variant="outlined"
                label="Emri dhe Mbiemri"
                fullWidth
                style={{ background: "white" }}
                value={selectedReservation.firstAndLastNameD2}
                onChange={(e) => {
                  setSelectedReservation({
                    ...selectedReservation,
                    firstAndLastNameD2: e.target.value,
                  });
                }}
              />
              <TextField
                disabled={!editState}
                label="Numri Telefonit"
                variant="outlined"
                fullWidth
                style={{ background: "white" }}
                value={selectedReservation.phoneNumberD2}
                onChange={(e) => {
                  setSelectedReservation({
                    ...selectedReservation,
                    phoneNumberD2: e.target.value,
                  });
                }}
              />
              <TextField
                disabled={!editState}
                label="Numri i Dokumentit Personal"
                variant="outlined"
                fullWidth
                style={{ background: "white" }}
                value={selectedReservation.documentIdD2}
                onChange={(e) => {
                  setSelectedReservation({
                    ...selectedReservation,
                    documentIdD2: e.target.value,
                  });
                }}
              />
              <TextField
                disabled={!editState}
                label="Adresa"
                variant="outlined"
                fullWidth
                style={{ background: "white" }}
                value={selectedReservation.addressD2}
                onChange={(e) => {
                  setSelectedReservation({
                    ...selectedReservation,
                    addressD2: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <FormControl
            disabled={!editState}
            style={{ marginTop: "15px" }}
            fullWidth
          >
            <InputLabel id="demo-simple-select-label">Vetura</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedReservation.carInfo}
              label="Vetura"
              onChange={handleCarSelectChange}
              style={{ background: "white" }}
            >
              {carsData.map((car, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={car.make + " " + car.model}
                    onClick={() => {
                      setSelectedCar(car);
                    }}
                  >
                    {car.make} {car.model}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            disabled={!editState}
            label="Çmimi për ditë"
            variant="outlined"
            fullWidth
            style={{ background: "white", marginTop: "15px" }}
            value={selectedReservation.pricePerDay}
            onChange={(e) => {
              setSelectedReservation({
                ...selectedReservation,
                pricePerDay: e.target.value,
              });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              disabled={!editState}
              label="Koha e fillimit"
              sx={{ width: "100%", background: "white", marginTop: "15px" }}
              onChange={handleStartTime}
              value={dayjs(selectedReservation.startTime)}
            />
            <DateTimePicker
              disabled={!editState}
              label="Koha e mbarimit"
              sx={{ width: "100%", background: "white", marginTop: "15px" }}
              onChange={handleEndTime}
              value={dayjs(selectedReservation.endTime)}
            />
          </LocalizationProvider>
          <TextField
            disabled={!editState}
            label="Numri i ditëve"
            variant="outlined"
            fullWidth
            style={{ background: "white", marginTop: "15px" }}
            value={selectedReservation.numberOfDays || ""}
            inputProps={{
              readOnly: true,
            }}
          />
          <TextField
            disabled={!editState}
            label="Totali i Çmimit"
            variant="outlined"
            fullWidth
            style={{ background: "white", marginTop: "15px" }}
            value={selectedReservation.totalPrice || ""}
            onChange={(e) => {
              setSelectedReservation({
                ...selectedReservation,
                totalPrice: parseInt(e.target.value),
              });
            }}
          />
          <div className="edit-dialog-images-container">
            {JSON.parse(selectedReservation.imagesArray).length > 0
              ? JSON.parse(selectedReservation.imagesArray).map(
                  (image, index) => {
                    return (
                      <div className="edit-dialog-images-item" key={index}>
                        {editState && (
                          <div
                            className="edit-dialog-images-delete-item"
                            onClick={() => deleteImage(image)}
                          >
                            <Delete sx={{ color: "red" }} />
                          </div>
                        )}
                        <img
                          src={image}
                          onClick={() => setClickedImage(image)}
                        />
                      </div>
                    );
                  }
                )
              : !editState && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Error sx={{ color: "gray" }} />
                    <span style={{ color: "gray", textWrap: "nowrap" }}>
                      Reservimi nuk ka fotografi
                    </span>
                  </div>
                )}
            {editState && (
              <div
                className="edit-dialog-images-item"
                style={{ border: "1px dashed lightgray" }}
              >
                <input
                  style={{
                    opacity: "0",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    top: "0",
                    bottom: "0",
                    zIndex: "2",
                    cursor: "alias",
                  }}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                <AddAPhoto
                  sx={{ color: "#015c92", height: "33px", width: "33px" }}
                />
              </div>
            )}
          </div>
          <FormControlLabel
            disabled={!editState}
            control={
              <Switch
                checked={selectedReservation.active}
                onChange={handleAvailabilityChange}
              />
            }
            label="Aktive"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          />
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setSelectedReservation({
                firstAndLastNameD1: null,
                phoneNumberD1: null,
                documentIdD1: null,
                addressD1: null,
                firstAndLastNameD2: null,
                phoneNumberD2: null,
                documentIdD2: null,
                addressD2: null,
                carInfo: null,
                startTime: null,
                endTime: null,
                imagesArray: "[]",
              });
              setEditState(false);
              setSelectedReservationDialog(false);
              setImages([]);
            }}
          >
            Mbyll
          </Button>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Button variant="contained" color="warning" onClick={generatePDF}>
              <Print />
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteReservation(selectedReservation.id);
                setSelectedReservation({
                  firstAndLastNameD1: null,
                  phoneNumberD1: null,
                  documentIdD1: null,
                  addressD1: null,
                  firstAndLastNameD2: null,
                  phoneNumberD2: null,
                  documentIdD2: null,
                  addressD2: null,
                  carInfo: null,
                  startTime: null,
                  endTime: null,
                  imagesArray: "[]",
                });
                setSelectedReservationDialog(false);
              }}
            >
              <Delete />
            </Button>
            {editState ? (
              <Button
                variant="contained"
                onClick={() => {
                  saveEditReservation(
                    selectedReservation.id,
                    selectedReservation
                  );
                  setImages([]);
                  setEditState(false);
                  setSelectedReservationDialog(false);
                }}
              >
                Ruaj
              </Button>
            ) : (
              <Button variant="contained" onClick={() => setEditState(true)}>
                Edito
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
      <div className="calendar-wrapper">
        {daysInMonth.map((day) => {
          return (
            <div
              className="calendar-day-box"
              key={day.date.format("YYYY-MM-DD")}
            >
              <div className="calendar-day-box-header">
                <span
                  onClick={() => {
                    viewSelectedDay(day.date);
                  }}
                >
                  {day.date.format("D")}
                </span>
              </div>
              <div className="calendar-day-box-reservations-container">
                {reservations.map((reservation, index) => {
                  const reservationDateStart = dayjs(
                    reservation.startTime
                  ).format("YYYY-MM-DD");
                  const reservationDateEnd = dayjs(reservation.endTime).format(
                    "YYYY-MM-DD"
                  );
                  const todayDate = dayjs(day.date).format("YYYY-MM-DD");
                  if (
                    dayjs(todayDate).isSameOrBefore(
                      reservationDateEnd,
                      "day"
                    ) &&
                    dayjs(todayDate).isSameOrAfter(reservationDateStart, "day")
                  ) {
                    return (
                      <div
                        className={`nr-${index} calendar-day-box-reservations-item`}
                        key={index}
                        onClick={() => {
                          handleReservationSelection(reservation);
                          setSelectedReservationDialog(true);
                        }}
                      >
                        {reservation.clientNameSurnameD1}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
