import React, { useEffect, useState } from "react";
import "@/app/Styling/Home/home.css";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Home/CarsList.css";
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
  Skeleton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import {
  AddBox,
  CarRental,
  Euro,
  LocalGasStation,
  LocationCity,
  LocationOn,
  Phone,
  Print,
  SensorDoor,
  TimeToLeave,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import introImage from "@/app/autokeys.webp";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";

const HomeView = () => {
  const [carsData, setCarsData] = useState([]);

  const [reservationDialog, setReservationDialog] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
    carMake: null,
    carModel: null,
    carLabel: null,
    carColor: null,
    pricePerDay: null,
    startTime: null,
    endTime: null,
    numberOfDays: null,
    totalPrice: null,
  });

  const handleStartTime = (startTimeValue) => {
    setSelectedReservation((prevState) => ({
      ...prevState,
      startTime: startTimeValue.format(),
    }));
  };

  const handleEndTime = (endTimeValue) => {
    setSelectedReservation((prevState) => ({
      ...prevState,
      endTime: endTimeValue.format(),
    }));
  };

  useEffect(() => {
    calculateDays(selectedReservation.startTime, selectedReservation.endTime);
  }, [selectedReservation.startTime, selectedReservation.endTime]);

  useEffect(() => {
    calculateTotalPrice(
      selectedReservation.pricePerDay,
      selectedReservation.numberOfDays
    );
  }, [selectedReservation.pricePerDay, selectedReservation.numberOfDays]);

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
    if (selectedCar !== null) {
      setSelectedReservation({
        ...selectedReservation,
        pricePerDay: selectedCar.price,
        carId: selectedCar.carId,
        carMake: selectedCar.make,
        carModel: selectedCar.model,
        carColor: selectedCar.color,
        carLabel: selectedCar.label,
        carInfo: `${selectedCar.make} ${selectedCar.model}`
      });
    }
  }, [selectedCar]);

  useEffect(() => {
    axios.get("http://localhost:1234/getveturat").then((res) => {
      setCarsData(res.data);
    });
  }, []);

  const addReservation = (object) => {
    axios
      .post(`http://localhost:1234/savetempreservation/`, {
        object,
      })
      .then((res) => {
        const { title, message } = res.data;
        setReservationDialog(false);
      });
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={reservationDialog}
        onClose={() => {
          setReservationDialog(false);
          setSelectedReservation({
            ...selectedReservation,
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
          <TextField
            disabled
            placeholder="Çmimi për ditë"
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
              label="Koha e fillimit"
              sx={{ width: "100%", background: "white", marginTop: "15px" }}
              onChange={handleStartTime}
              value={dayjs(selectedReservation.startTime)}
            />
            <DateTimePicker
              label="Koha e mbarimit"
              sx={{ width: "100%", background: "white", marginTop: "15px" }}
              onChange={handleEndTime}
              value={dayjs(selectedReservation.endTime)}
            />
          </LocalizationProvider>
          <TextField
            disabled
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
            disabled
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
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setSelectedReservation({
                ...selectedReservation,
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
              });
              setReservationDialog(false);
            }}
          >
            Mbyll
          </Button>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                addReservation(selectedReservation);
                setReservationDialog(false);
              }}
            >
              Reservo
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <div className="index-parent">
        {/* <div className="index-navbar">
        <h4>RentaCarCompany</h4>
        <input
          className="index-navbar-search"
          placeholder="Kërko veturën..."
          type="text"
        />
      </div> */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="index-intro"
        >
          <img src={introImage.src} />
          <div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="intro-text"
          >
            <h2>RentaCarCompany</h2>
            <h6>Zgjidh veturën tënde për kohë të caktuar!</h6>
          </div>
        </motion.div>
        <div className="cars-body">
          {carsData && carsData.length > 0 ? (
            <div className="cars-container">
              {carsData.map((car, index) => {
                return (
                  <div className="car-card" key={index}>
                    <img
                      style={{
                        width: "100%",
                        height: "200px",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      src={car.image}
                    />
                    <div className="car-card-info-wrapper">
                      <div className="car-card-info-child car-card-info-child-top">
                        <h2 className="car-title-holder">
                          {car.make} {car.model}
                        </h2>
                        <div className="car-card-info-subchild">
                          <Euro
                            sx={{ fontSize: "40px", color: "blueviolet" }}
                          ></Euro>
                          <h1 style={{ color: "blueviolet" }}>{car.price}</h1>
                          <p style={{ color: "blueviolet", fontWeight: "600" }}>
                            / ditë
                          </p>
                        </div>
                      </div>
                      <div className="horizontal-line"></div>
                      <div className="car-card-info-child">
                        <div className="car-card-info-subchild">
                          <TimeToLeave></TimeToLeave> {car.transmission}
                        </div>
                        <div className="car-card-info-subchild">
                          <SensorDoor></SensorDoor> {car.doors} dyer
                        </div>
                        <div className="car-card-info-subchild">
                          <LocalGasStation></LocalGasStation> {car.fuel}
                        </div>
                      </div>
                      <div className="horizontal-line"></div>
                      <div className="car-card-info-child car-card-button-wrapper">
                        <button
                          className="car-card-button"
                          onClick={() => {
                            setReservationDialog(true);
                            setSelectedCar(car)
                          }}
                        >
                          <CarRental sx={{ color: "whitesmoke" }}></CarRental>
                          Reservo
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="index-footer">
          <div>
            <LocationOn />
            <p>Adresa e Kompanisë, Shteti</p>
          </div>
          <div>
            <Phone />
            +383 49 222 222
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeView;
