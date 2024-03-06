import Sidebar from "../src/app/Components/Sidebar";
import React, { useEffect, useState } from "react";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Reservimet/shtoreservim.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CarsTest from "../src/app/TestingValues/CarsTest";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AddAPhoto, Close, Delete } from "@mui/icons-material";
import axios from "axios";

const ShtoReservim = () => {
  const [newReservation, setNewReservation] = useState({
    firstAndLastName: null,
    phoneNumber: null,
    documentId: null,
    carInfo: null,
    pricePerDay: null,
    numberOfDays: null,
    totalPrice: null,
    startTime: null,
    endTime: null,
    imagesArray: null,
  });

  const [images, setImages] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedCar, setSelectedCar] = useState(null);

  const [numberOfDays, setNumberOfDays] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const handleCarSelectChange = (car) => {
    setNewReservation({
      ...newReservation,
      carInfo: car.target.value,
    });
    setTotalPrice(0); // Reset total price when car changes
  };

  const handleStartTime = (startTimeValue) => {
    setNewReservation({
      ...newReservation,
      startTime: startTimeValue.format(),
    });
    calculateDays(startTimeValue, newReservation.endTime);
  };

  const handleEndTime = (endTimeValue) => {
    setNewReservation({
      ...newReservation,
      endTime: endTimeValue.format(),
    });
    calculateDays(newReservation.startTime, endTimeValue);
  };

  const calculateDays = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const days = endDate.diff(startDate, "days") + 1; // Adding 1 to include both start and end dates
    setNumberOfDays(days);
  };

  const calculateTotalPrice = (price, totalDays) => {
    if (price == null || price == "") {
      return;
    } else if (totalDays == null || totalDays == "") {
      return;
    } else {
      setTotalPrice(parseInt(price) * parseInt(totalDays));
    }
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
      })
      .finally(() => {
        setOpenDialog(true);
      });
  };

  const deleteImage = (deletedimage) => {
    const newArray = images.filter((image) => deletedimage !== image);
    setImages(newArray);
  };

  const saveImages = () => {
    setNewReservation({ ...newReservation, imagesArray: images });
    setOpenDialog(false);
  };

  const addReservation = () => {
    axios
      .post("http://localhost:1234/addreservation", {
        newReservation,
      })
      .then(() => {
        window.location.reload();
      });
  };

  useEffect(() => {
    if (selectedCar !== null) {
      calculateTotalPrice(selectedCar.price, numberOfDays);
    }
  }, [selectedCar, numberOfDays]);

  return (
    <Sidebar>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <DialogTitle
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            color: "#015c92",
          }}
        >
          Fotografitë e veturës
        </DialogTitle>
        <DialogContent
          sx={{ padding: "5px" }}
          style={{ background: "whitesmoke" }}
        >
          <ImageList
            sx={{ width: 500, height: 450, marginTop: "5px" }}
            cols={3}
            rowHeight={164}
          >
            {images.map((image, index) => (
              <ImageListItem
                style={{
                  position: "relative",
                  border: "1px solid #015c92",
                  borderRadius: "12px",
                }}
                key={index}
              >
                <div
                  onClick={() => {
                    deleteImage(image);
                  }}
                  style={{
                    position: "absolute",
                    top: "5px",
                    left: "5px",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "white",
                    borderRadius: "7px",
                    cursor: "pointer",
                    border: "1px solid lightgray",
                  }}
                >
                  <Delete sx={{ color: "red" }} />
                </div>
                <img
                  srcSet={image}
                  src={image}
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
            <div
              style={{
                width: "162px",
                height: "162px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                borderRadius: "12px",
                border: "1px solid #015c92",
                cursor: "pointer",
                position: "relative",
                zIndex: "1",
              }}
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
          </ImageList>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setImages([]);
              setOpenDialog(false);
            }}
          >
            Mbyll
          </Button>
          <Button variant="contained" onClick={saveImages}>
            Ruaj
          </Button>
        </DialogActions>
      </Dialog>
      <h3 style={{ textAlign: "center", fontWeight: "700", color: "#015c92" }}>
        Shto Reservim
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          maxHeight: "100%",
          overflowY: "auto",
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
            onChange={(e) => {
              setNewReservation({
                ...newReservation,
                firstAndLastName: e.target.value,
              });
            }}
          />
          <TextField
            label="Numri Telefonit"
            variant="outlined"
            fullWidth
            style={{ background: "white" }}
            value={newReservation.phoneNumber}
            onChange={(e) => {
              setNewReservation({
                ...newReservation,
                phoneNumber: e.target.value,
              });
            }}
          />
          <TextField
            label="Kodi Leternjoftimit"
            variant="outlined"
            fullWidth
            style={{ background: "white" }}
            value={newReservation.documentId}
            onChange={(e) => {
              setNewReservation({
                ...newReservation,
                documentId: e.target.value,
              });
            }}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Koha e fillimit"
              sx={{ width: "100%", background: "white" }}
              onChange={handleStartTime}
              value={newReservation.startTime}
            />
            <DateTimePicker
              label="Koha e mbarimit"
              sx={{ width: "100%", background: "white" }}
              onChange={handleEndTime}
              value={newReservation.endTime}
            />
          </LocalizationProvider>
          <TextField
            label="Cmimi në ditë"
            variant="outlined"
            fullWidth
            style={{ background: "white" }}
            value={selectedCar?.price || ""}
            onChange={(e) => {
              setSelectedCar({
                ...selectedCar,
                price: parseInt(e.target.value),
              });
            }}
          />
          <TextField
            label="Numri i ditëve"
            variant="outlined"
            fullWidth
            style={{ background: "white" }}
            value={numberOfDays || ""}
            onChange={(e) => {
              setNumberOfDays(parseInt(e.target.value));
            }}
            inputProps={
              {
                readOnly: true
              }
            }
          />
          <TextField
            label="Totali"
            variant="outlined"
            fullWidth
            style={{ background: "white" }}
            value={totalPrice || ""}
            onChange={(e) => {
              setTotalPrice(parseFloat(e.target.value).toFixed(2));
            }}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="file-uploader"
          />
          <Button
            fullWidth
            variant="contained"
            onClick={addReservation}
            sx={{ height: "56px" }}
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
