import React, { useEffect, useState } from "react";
import "@/app/Styling/Reservimet/reservations_list.css";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import {
  AccessTime,
  AddAPhoto,
  ArrowDownward,
  ArrowUpward,
  CloseFullscreen,
  Delete,
  Error,
  SwapVert,
} from "@mui/icons-material";
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

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

const ReservationsList = (props) => {
  const {
    reservations,
    currentDay,
    deleteReservation,
    saveEditReservation,
    selectedReservationDialog,
    editState,
    clickedImage,
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
  } = props;

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
      return "arriving";
    } else if (dayjs(reservation.endTime).isSame(endOfDay, "day")) {
      return "departing";
    } else if (
      dayjs(currentDay).isBetween(
        reservation.startTime,
        reservation.endTime,
        null,
        "[]"
      )
    ) {
      return "between";
    } else {
      return false;
    }
  };

  const checkActivity = (reservation) => {
    if (reservation.active) {
      return "active-reservation";
    } else {
      return "inactive-reservation";
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
            firstAndLastName: null,
            phoneNumber: null,
            documentId: null,
            carInfo: null,
            startTime: null,
            endTime: null,
            imagesArray: JSON.stringify([]),
          });
        }}
      >
        <DialogContent dividers>
          <TextField
            disabled={!editState}
            variant="outlined"
            label="Emri dhe Mbiemri"
            fullWidth
            style={{ background: "white" }}
            value={selectedReservation.firstAndLastName}
            onChange={(e) => {
              setSelectedReservation({
                ...selectedReservation,
                firstAndLastName: e.target.value,
              });
            }}
          />
          <TextField
            disabled={!editState}
            label="Numri Telefonit"
            variant="outlined"
            fullWidth
            style={{ background: "white", marginTop: "15px" }}
            value={selectedReservation.phoneNumber}
            onChange={(e) => {
              setSelectedReservation({
                ...selectedReservation,
                phoneNumber: e.target.value,
              });
            }}
          />
          <TextField
            disabled={!editState}
            label="Kodi Leternjoftimit"
            variant="outlined"
            fullWidth
            style={{ background: "white", marginTop: "15px" }}
            value={selectedReservation.documentId}
            onChange={(e) => {
              setSelectedReservation({
                ...selectedReservation,
                documentId: e.target.value,
              });
            }}
          />
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
              {carsData.map((car) => {
                return (
                  <MenuItem
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
            onChange={(e) => {
              setNumberOfDays(parseInt(e.target.value));
            }}
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
              setTotalPrice(parseInt(e.target.value));
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
                          alt={index}
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
            control={<Switch defaultChecked />}
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
                firstAndLastName: null,
                phoneNumber: null,
                documentId: null,
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
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteReservation(selectedReservation.id);
                setSelectedReservation({
                  firstAndLastName: null,
                  phoneNumber: null,
                  documentId: null,
                  carInfo: null,
                  startTime: null,
                  endTime: null,
                  imagesArray: JSON.stringify([]),
                });
                setSelectedReservationDialog(false);
              }}
            >
              Fshi Reservimin
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
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleReservationSelection(reservation);
                          setSelectedReservationDialog(true);
                        }}
                      >
                        Edito
                      </Button>
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
