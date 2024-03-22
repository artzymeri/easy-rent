import Sidebar from "../src/app/Components/Sidebar";
import {
  AddAPhoto,
  ArrowLeft,
  ArrowRight,
  Delete,
  ErrorOutline,
  Print,
  QrCodeScannerOutlined,
} from "@mui/icons-material";
import "@/app/Styling/Reservimet/reservimet.css";
import Calendar from "@/app/Components/Calendar";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  useMediaQuery,
} from "@mui/material";
import ReservationsList from "@/app/Components/ReservationsList";
import axios from "axios";
import QRCodeScanner from "@/app/Components/QRCodeScanner";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTheme } from "@mui/material/styles";

const Reservimet = () => {
  const handleReservationSelection = (reservation_object) => {
    setSelectedReservation({
      ...selectedReservation,
      id: reservation_object.id,
      firstAndLastNameD1: reservation_object.clientNameSurnameD1,
      phoneNumberD1: reservation_object.clientPhoneNumberD1,
      documentIdD1: reservation_object.clientDocumentIdD1,
      addressD1: reservation_object.clientAddressD1,
      firstAndLastNameD2: reservation_object.clientNameSurnameD2,
      phoneNumberD2: reservation_object.clientPhoneNumberD2,
      documentIdD2: reservation_object.clientDocumentIdD2,
      addressD2: reservation_object.clientAddressD2,
      carInfo: reservation_object.carInfo,
      carMake: reservation_object.carMake,
      carModel: reservation_object.carModel,
      carColor: reservation_object.carColor,
      carId: reservation_object.carId,
      carLabel: reservation_object.carLabel,
      pricePerDay: reservation_object.pricePerDay,
      startTime: reservation_object.startTime,
      endTime: reservation_object.endTime,
      numberOfDays: reservation_object.numberOfDays,
      totalPrice: reservation_object.totalPrice,
      imagesArray: reservation_object.imagesArray || "[]",
      active: reservation_object.active,
    });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileView, setMobileView] = useState(false);

  const [qrCodeDialog, setQrCodeDialog] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 770) {
        setMobileView(true);
      }
    }
  }, []);

  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const [currentDay, setCurrentDay] = useState(dayjs());

  const [calendarActive, setCalendarActive] = useState(true);

  const [reservationsListActive, setReservationsListActive] = useState(false);

  const [reservations, setReservations] = useState([]);

  const [carsData, setCarsData] = useState([]);

  const [selectedCar, setSelectedCar] = useState(null);

  const [selectedReservationDialog, setSelectedReservationDialog] =
    useState(false);

  const [reservationsByCar, setReservationsByCar] = useState([]);

  const [reservationsByCarDialog, setReservationsByCarDialog] = useState(false);

  const [selectedReservation, setSelectedReservation] = useState({
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
    pricePerDay: null,
    startTime: null,
    endTime: null,
    numberOfDays: null,
    totalPrice: null,
    imagesArray: "[]",
    active: false,
  });

  const [clickedImage, setClickedImage] = useState(null);

  const [images, setImages] = useState([]);

  const [editState, setEditState] = useState(false);

  const handleCarSelectChange = (carinfo) => {
    setSelectedReservation({
      ...selectedReservation,
      carInfo: carinfo.target.value,
    });
  };

  const handleStartTime = (startTimeValue) => {
    setSelectedReservation(
      (prevState) => ({
        ...prevState,
        startTime: startTimeValue.format(),
      }),
      () => {
        // This callback function will execute after setSelectedReservation is done
        calculateDays(startTimeValue, selectedReservation.endTime);
      }
    );
  };

  const handleEndTime = (endTimeValue) => {
    setSelectedReservation(
      (prevState) => ({
        ...prevState,
        endTime: endTimeValue.format(),
      }),
      () => {
        // This callback function will execute after setSelectedReservation is done
        calculateDays(selectedReservation.startTime, endTimeValue);
      }
    );
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

  useEffect(() => {
    axios.get("http://localhost:1234/getreservations").then((res) => {
      setReservations(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:1234/getveturat").then((res) => {
      setCarsData(res.data);
    });
  }, []);

  const calculateDays = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const days = endDate.diff(startDate, "days") + 1; // Adding 1 to include both start and end dates
    setSelectedReservation({ ...selectedReservation, numberOfDays: days });
  };

  const calculateTotalPrice = (price, numberOfDays) => {
    if (price == null || price == "") {
      return;
    } else if (numberOfDays == null || numberOfDays == "") {
      return;
    } else {
      setSelectedReservation({
        ...selectedReservation,
        totalPrice:
          parseInt(selectedReservation.pricePerDay) *
          parseInt(selectedReservation.numberOfDays),
      });
    }
  };

  useEffect(() => {
    if (selectedReservation.pricePerDay !== null) {
      calculateTotalPrice(
        selectedReservation.pricePerDay,
        selectedReservation.numberOfDays
      );
    }
  }, [selectedReservation.numberOfDays, selectedReservation.pricePerDay]);

  useEffect(() => {
    if (selectedCar !== null) {
      setSelectedReservation({
        ...selectedReservation,
        pricePerDay: selectedCar.price,
        carId: selectedCar.carId
      });
    }
  }, [selectedCar]);

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
    const newDay = currentDay.subtract(1, "day"); // Use dayjs subtract function to move to next day
    setCurrentDay(newDay);
  };

  const nextDay = () => {
    const newDay = currentDay.add(1, "day"); // Use dayjs add function to move to previous day
    setCurrentDay(newDay);
  };

  const viewSelectedDay = (day) => {
    if (mobileView) {
      return;
    }
    setCurrentDay(day);
    setCalendarActive(false);
    setReservationsListActive(true);
  };

  const deleteReservation = (reservationId) => {
    axios
      .post(`http://localhost:1234/deletereservation/${reservationId}`)
      .then(() => {
        axios.get("http://localhost:1234/getreservations").then((res) => {
          setReservations(res.data);
        });
      });
  };

  const saveEditReservation = (reservationId, object) => {
    console.log(object)
    axios
      .post(`http://localhost:1234/editreservation/${reservationId}`, {
        object,
      })
      .then((res) => {
        const { title, message } = res.data;
        axios.get("http://localhost:1234/getreservations").then((res) => {
          setReservations(res.data);
        });
        setReservationsByCarDialog(false);
      });
  };

  const handleAvailabilityChange = (event) => {
    setSelectedReservation({
      ...selectedReservation,
      active: event.target.checked,
    });
  };

  const onNewScanResult = (decodedText, decodedResult) => {
    const veturaCarId = decodedText;
    axios
      .get(`http://localhost:1234/getreservationsbyvetura/${veturaCarId}`)
      .then((res) => {
        setReservationsByCar(res.data);
        setReservationsByCarDialog(true);
        setQrCodeDialog(false);
      });
  };

  const generatePDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1234/generatepdfapi",
        { selectedReservation },
        { responseType: "blob" }
      );

      const downloadLink = document.createElement("a");
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      downloadLink.href = url;
      downloadLink.setAttribute("download", `aaa.pdf`);
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
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
        <Dialog
          fullScreen={fullScreen}
          open={qrCodeDialog}
          onClose={() => {
            setQrCodeDialog(false);
          }}
        >
          <DialogContent>
            <QRCodeScanner
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
            />
          </DialogContent>
          <DialogActions>
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={() => {
                setQrCodeDialog(false);
              }}
            >
              Mbyll
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={reservationsByCarDialog}
          onClose={() => {
            setReservationsByCarDialog(false);
          }}
        >
          <DialogTitle
            borderBottom={"1px solid lightgray"}
            style={{ color: "#015c92", textAlign: "center" }}
          >
            Reservimet nga vetura
          </DialogTitle>
          <DialogContent
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "10px",
              background: "whitesmoke",
            }}
          >
            {reservationsByCar && reservationsByCar.length > 0 ? (
              reservationsByCar.map((reservation) => {
                console.log(dayjs(reservation.startTime).$D);
                return (
                  <div
                    className="reservations-found-item"
                    onClick={() => {
                      setSelectedReservationDialog(true);
                      handleReservationSelection(reservation);
                    }}
                  >
                    <p>{reservation.clientNameSurnameD1}</p>
                    <div>
                      <p>
                        {dayjs(reservation.startTime).$D}/
                        {dayjs(reservation.startTime).$M}/
                        {dayjs(reservation.startTime).$y}
                      </p>
                      <p>
                        {dayjs(reservation.endTime).$D}/
                        {dayjs(reservation.endTime).$M}/
                        {dayjs(reservation.endTime).$y}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: "lightgray" }}>
                Nuk ka reservime aktive me këtë veturë!
              </p>
            )}
          </DialogContent>
          <DialogActions style={{ border: "1px solid lightgray" }}>
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={() => {
                setReservationsByCarDialog(false);
              }}
            >
              Mbyll
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
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
                      <ErrorOutline sx={{ color: "gray" }} />
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
        <div className="reservimet-header-container">
          <div className="reservimet-header-view-switch-buttons">
            {calendarActive
              ? !mobileView && <Button variant="contained">Kalendari</Button>
              : !mobileView && (
                  <Button
                    variant="outlined"
                    style={{ background: "white" }}
                    onClick={() => {
                      setReservationsListActive(false);
                      setCalendarActive(true);
                    }}
                  >
                    Kalendari
                  </Button>
                )}
            {reservationsListActive
              ? !mobileView && <Button variant="contained">Lista Ditore</Button>
              : !mobileView && (
                  <Button
                    variant="outlined"
                    style={{ background: "white" }}
                    onClick={() => {
                      setCalendarActive(false);
                      setReservationsListActive(true);
                    }}
                  >
                    Lista Ditore
                  </Button>
                )}
          </div>
          {mobileView && (
            <Button
              variant="contained"
              fullWidth
              style={{ height: "38px", background: '#015c92' }}
              onClick={() => {
                setQrCodeDialog(true);
              }}
            >
              <QrCodeScannerOutlined />
            </Button>
          )}
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
              <h5>{currentDay.format("DD/MM/YYYY")}</h5>
            )}
          </div>
        </div>
        {calendarActive && (
          <Calendar
            daysInMonth={daysInMonth}
            reservations={reservations}
            deleteReservation={deleteReservation}
            saveEditReservation={saveEditReservation}
            viewSelectedDay={viewSelectedDay}
            clickedImage={clickedImage}
            selectedReservationDialog={selectedReservationDialog}
            editState={editState}
            selectedReservation={selectedReservation}
            handleCarSelectChange={handleCarSelectChange}
            handleStartTime={handleStartTime}
            handleEndTime={handleEndTime}
            handleReservationSelection={handleReservationSelection}
            setSelectedReservationDialog={setSelectedReservationDialog}
            setImages={setImages}
            setEditState={setEditState}
            setSelectedReservation={setSelectedReservation}
            handleFileChange={handleFileChange}
            deleteImage={deleteImage}
            setClickedImage={setClickedImage}
            setSelectedCar={setSelectedCar}
            carsData={carsData}
            handleAvailabilityChange={handleAvailabilityChange}
          />
        )}
        {reservationsListActive && (
          <ReservationsList
            reservations={reservations}
            currentDay={currentDay}
            deleteReservation={deleteReservation}
            saveEditReservation={saveEditReservation}
            clickedImage={clickedImage}
            selectedReservationDialog={selectedReservationDialog}
            editState={editState}
            selectedReservation={selectedReservation}
            handleCarSelectChange={handleCarSelectChange}
            handleStartTime={handleStartTime}
            handleEndTime={handleEndTime}
            handleReservationSelection={handleReservationSelection}
            setSelectedReservationDialog={setSelectedReservationDialog}
            setImages={setImages}
            setEditState={setEditState}
            setSelectedReservation={setSelectedReservation}
            handleFileChange={handleFileChange}
            deleteImage={deleteImage}
            setClickedImage={setClickedImage}
            setSelectedCar={setSelectedCar}
            carsData={carsData}
            handleAvailabilityChange={handleAvailabilityChange}
          />
        )}
      </div>
    </Sidebar>
  );
};

export default Reservimet;
