import Sidebar from "@/app/Components/Sidebar";
import {
  AddAPhoto,
  ArrowLeft,
  ArrowRight,
  CloseFullscreen,
  Delete,
  Error,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "@/app/Styling/Reservimet/calendar.css";
import "@/app/Styling/Reservimet/calendar_day_colors.css";
import "@/app/Styling/Reservimet/reservimet.css";
import CarsTest from "@/app/TestingValues/CarsTest";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Reservimet = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1234/getreservations").then((res) => {
      setReservations(res.data);
    });
  }, []);

  const [selectedReservationDialog, setSelectedReservationDialog] =
    useState(false);

  const [editState, setEditState] = useState(false);

  const [selectedReservation, setSelectedReservation] = useState({
    firstAndLastName: null,
    phoneNumber: null,
    documentId: null,
    carInfo: null,
    startTime: null,
    endTime: null,
    imagesArray: null,
  });

  const [images, setImages] = useState([]);

  const [clickedImage, setClickedImage] = useState(null);

  const handleCarSelectChange = (carinfo) => {
    setSelectedReservation({
      ...selectedReservation,
      carInfo: carinfo.target.value,
    });
  };

  const handleStartTime = (startTimeValue) => {
    setSelectedReservation({
      ...selectedReservation,
      startTime: startTimeValue.format(),
    });
  };

  const handleEndTime = (endTimeValue) => {
    setSelectedReservation({
      ...selectedReservation,
      endTime: endTimeValue.format(),
    });
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    // Convert each file to base64 and store in an array
    const promises = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      promises.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
      );
    }

    // Resolve all promises and update the state with base64 strings
    Promise.all(promises)
      .then((base64Images) => {
        setImages((prevImages) => [...prevImages, ...base64Images]);
        saveImages(base64Images);
      })
      .finally(() => {
        setSelectedReservationDialog(true);
      });
  };

  const deleteImage = (deletedimage) => {
    const newArray = JSON.parse(selectedReservation.imagesArray).filter(
      (image) => deletedimage !== image
    );
    setSelectedReservation({
      ...selectedReservation,
      imagesArray: JSON.stringify(newArray),
    });
  };

  const saveImages = (images) => {
    let previousArray = JSON.parse(selectedReservation.imagesArray) || [];
    images.map((image) => {
      previousArray.push(image);
    });
    setSelectedReservation({
      ...selectedReservation,
      imagesArray: JSON.stringify(previousArray),
    });
  };

  const handleReservationSelection = (reservation_object) => {
    setSelectedReservation({
      ...selectedReservation,
      id: reservation_object.id,
      firstAndLastName: reservation_object.clientNameSurname,
      phoneNumber: reservation_object.clientPhoneNumber,
      documentId: reservation_object.clientDocumentId,
      carInfo: reservation_object.carInfo,
      startTime: reservation_object.startTime,
      endTime: reservation_object.endTime,
      imagesArray: reservation_object.imagesArray,
    });
  };

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

  const saveEditReservation = () => {
    axios
      .post(`http://localhost:1234/editreservation/${selectedReservation.id}`, {
        selectedReservation,
      })
      .then((res) => {
        const { title, message } = res.data;
        axios.get("http://localhost:1234/getreservations").then((res) => {
          setReservations(res.data);
        });
      });
  };

  return (
    <Sidebar>
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
            imagesArray: null,
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
          <div className="edit-dialog-images-container">
            {JSON.parse(selectedReservation.imagesArray)
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
                imagesArray: null,
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
                axios
                  .post(
                    `http://localhost:1234/deletereservation/${selectedReservation.id}`
                  )
                  .then(() => {
                    axios
                      .get("http://localhost:1234/getreservations")
                      .then((res) => {
                        setReservations(res.data);
                      });
                  });
                setSelectedReservation({
                  firstAndLastName: null,
                  phoneNumber: null,
                  documentId: null,
                  carInfo: null,
                  startTime: null,
                  endTime: null,
                  imagesArray: null,
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
                  saveEditReservation();
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
                          onClick={() => {
                            handleReservationSelection(reservation);
                            setSelectedReservationDialog(true);
                          }}
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
