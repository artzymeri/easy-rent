import Sidebar from "@/app/Components/Sidebar";
import React, { useState } from "react";
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
import CarsTest from "@/app/TestingValues/CarsTest";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AddAPhoto, Close, Delete } from "@mui/icons-material";

const ShtoReservim = () => {
  const [newReservation, setNewReservation] = useState({
    firstAndLastName: null,
    phoneNumber: null,
    documentId: null,
    carInfo: null,
    startTime: null,
    endTime: null,
  });

  const [images, setImages] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

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

  const addReservation = () => {
    // Here comes the function to add the reservation to backend from newReservation object
    console.log(images);
  };

  return (
    <Sidebar>
      <Dialog
        open={openDialog}
        onClose={() => {
          setImages([]);
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
        <DialogContent style={{ background: "whitesmoke" }}>
          <ImageList
            sx={{ width: 500, height: 450, marginTop: "4px" }}
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
          </ImageList>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(false);
            }}
          >
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
