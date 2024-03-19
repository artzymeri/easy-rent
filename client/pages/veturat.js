import Sidebar from "../src/app/Components/Sidebar";
import React, { useEffect, useMemo, useState } from "react";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Veturat/veturat-listing.css";
import "@/app/Styling/Reservimet/shtoreservim.css";
import {
  Add,
  ChangeCircle,
  GridView,
  Tune,
  ViewList,
} from "@mui/icons-material";
import VeturatListView from "../src/app/Components/VeturatListView";
import VeturatGridView from "../src/app/Components/VeturatGridView";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Veturat = () => {
  const [carsData, setCarsData] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const [carViewMode, setCarViewMode] = useState("list");

  const [addCarDialog, setAddCarDialog] = useState(false);

  const [editCarDialog, setEditCarDialog] = useState(false);

  const [deleteCarDialog, setDeleteCarDialog] = useState(false);

  const handleDeleteCarClick = (car) => {
    setCarInfo({
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      transmission: car.transmission,
      fuel: car.fuel,
      engine: car.engine,
      color: car.color,
      price: car.price,
      label: car.label,
      carId: car.carId,
      expiryDate: car.expiryDate,
      image: car.image,
    });
    setDeleteCarDialog(true);
  };

  const [carInfo, setCarInfo] = useState({
    make: null,
    model: null,
    year: null,
    transmission: null,
    fuel: null,
    engine: null,
    color: null,
    price: null,
    label: null,
    carId: null,
    expiryDate: null,
    image: null,
  });

  useEffect(() => {
    axios.get("http://localhost:1234/getveturat").then((res) => {
      console.log("carsFromBackend", res.data);
      setCarsData(res.data);
    });
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataURL = event.target.result;
        setCarInfo({ ...carInfo, image: imageDataURL });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickOnCar = (car) => {
    setCarInfo({
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      transmission: car.transmission,
      fuel: car.fuel,
      engine: car.engine,
      color: car.color,
      price: car.price,
      label: car.label,
      carId: car.carId,
      expiryDate: dayjs(car.expiryDate),
      image: car.image,
    });
    setEditCarDialog(true);
  };

  const handleExpiryDate = (date) => {
    setCarInfo({
      ...carInfo,
      expiryDate: date.format(),
    });
  };

  const saveAddCar = () => {
    if (
      Object.values(carInfo).some((value) => value === null || value === "")
    ) {
      setSnackbarOpen(true);
      return;
    }

    axios.post("http://localhost:1234/addveture", { carInfo }).then((res) => {
      setCarInfo({
        make: null,
        model: null,
        year: null,
        transmission: null,
        fuel: null,
        engine: null,
        color: null,
        price: null,
        label: null,
        carId: null,
        expiryDate: null,
        image: null,
      });
      axios.get("http://localhost:1234/getveturat").then((res) => {
        setCarsData(res.data);
      });
      setAddCarDialog(false);
    });
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const saveEditCar = () => {
    if (
      Object.values(carInfo).some((value) => value === null || value === "")
    ) {
      setSnackbarOpen(true);
      return;
    }

    axios
      .post(`http://localhost:1234/editveture/${carInfo.id}`, { carInfo })
      .then((res) => {
        setCarInfo({
          make: null,
          model: null,
          year: null,
          transmission: null,
          fuel: null,
          engine: null,
          color: null,
          price: null,
          label: null,
          carId: null,
          expiryDate: null,
          image: null,
        });
        axios.get("http://localhost:1234/getveturat").then((res) => {
          setCarsData(res.data);
        });
        setEditCarDialog(false);
      });
  };

  const deleteCar = () => {
    axios.post(`http://localhost:1234/deletevetura/${carInfo.id}`).then(() => {
      setCarInfo({
        make: null,
        model: null,
        year: null,
        transmission: null,
        fuel: null,
        engine: null,
        color: null,
        price: null,
        label: null,
        carId: null,
        expiryDate: null,
        image: null,
      });
      axios.get("http://localhost:1234/getveturat").then((res) => {
        setCarsData(res.data);
      });
      setDeleteCarDialog(false);
    });
  };

  const filteredCarsData = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return carsData.filter((car) => 
        car.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.engine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.fuel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.carId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.transmission.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.year.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return carsData;
  }, [carsData, searchQuery]);

  return (
    <Sidebar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setSnackbarOpen(false);
          }}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Ju lutem plotësoni të gjitha rubrikat
        </Alert>
      </Snackbar>
      <Dialog
        open={addCarDialog}
        onClose={() => {
          setAddCarDialog(false);
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          borderBottom={"1px solid lightgray"}
        >
          Shto Veturë
        </DialogTitle>
        <DialogContent
          sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          style={{
            background: "whitesmoke",
            padding: "20px",
            gap: "10px",
          }}
        >
          <TextField
            label="Marka"
            value={carInfo.make}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, make: e.target.value });
            }}
          />
          <TextField
            label="Modeli"
            value={carInfo.model}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, model: e.target.value });
            }}
          />

          <TextField
            label="Viti veturës"
            value={carInfo.year}
            style={{ background: "white" }}
            type="number"
            onChange={(e) => {
              setCarInfo({ ...carInfo, year: e.target.value });
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Transmisioni</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={carInfo.transmission}
              label="Transmisioni"
              onChange={(e) => {
                setCarInfo({ ...carInfo, transmission: e.target.value });
              }}
              style={{ background: "white" }}
            >
              <MenuItem value="Automatikë">Automatikë</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Derivati</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={carInfo.fuel}
              label="Derivati"
              onChange={(e) => {
                setCarInfo({ ...carInfo, fuel: e.target.value });
              }}
              style={{ background: "white" }}
            >
              <MenuItem value="Naftë">Naftë</MenuItem>
              <MenuItem value="Benzinë">Benzinë</MenuItem>
              <MenuItem value="Elektrikë">Elektrikë</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Motori"
            value={carInfo.engine}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, engine: e.target.value });
            }}
          />
          <TextField
            label="Ngjyra"
            value={carInfo.color}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, color: e.target.value });
            }}
          />
          <TextField
            label="Çmimi për ditë"
            type="number"
            value={carInfo.price}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, price: e.target.value });
            }}
          />
          <TextField
            label="Targat"
            value={carInfo.label}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, label: e.target.value });
            }}
          />
          <TextField
            label="Numri i Shasisë"
            value={carInfo.carId}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, carId: e.target.value });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Skadimi regjistrimit"
              sx={{ width: "100%", background: "white" }}
              onChange={handleExpiryDate}
              value={carInfo.expiryDate}
            />
          </LocalizationProvider>
          {carInfo.image ? (
            <div
              style={{
                width: "100%",
                gridColumn: "span 2",
                borderRadius: "5px",
                position: "relative",
              }}
            >
              <Tooltip title="Ndrysho fotografinë e veturës">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "white",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      opacity: "0",
                      gridColumn: "span 2",
                    }}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-uploader-single"
                  />
                  <ChangeCircle />
                </div>
              </Tooltip>
              <img
                src={carInfo.image}
                style={{ width: "100%", borderRadius: "5px" }}
              />
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-uploader-single"
              style={{ gridColumn: "span 2" }}
            />
          )}
        </DialogContent>
        <DialogActions
          sx={{
            height: "65px",
            border: "1px solid lightgray",
            borderLeft: "0px",
            borderRight: "0px",
            borderBottom: "0px",
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setCarInfo({
                make: null,
                model: null,
                year: null,
                transmission: null,
                fuel: null,
                engine: null,
                color: null,
                price: null,
                label: null,
                carId: null,
                expiryDate: null,
                image: null,
              });
              setAddCarDialog(false);
            }}
          >
            Mbyll
          </Button>
          <Button variant="contained" onClick={saveAddCar}>
            Shto
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editCarDialog}
        onClose={() => {
          setEditCarDialog(false);
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          borderBottom={"1px solid lightgray"}
        >
          Edito Veturën
        </DialogTitle>
        <DialogContent
          sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          style={{
            background: "whitesmoke",
            padding: "20px",
            gap: "10px",
          }}
        >
          <TextField
            label="Marka"
            value={carInfo.make}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, make: e.target.value });
            }}
          />
          <TextField
            label="Modeli"
            value={carInfo.model}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, model: e.target.value });
            }}
          />

          <TextField
            label="Viti veturës"
            value={carInfo.year}
            style={{ background: "white" }}
            type="number"
            onChange={(e) => {
              setCarInfo({ ...carInfo, year: e.target.value });
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Transmisioni</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={carInfo.transmission}
              label="Transmisioni"
              onChange={(e) => {
                setCarInfo({ ...carInfo, transmission: e.target.value });
              }}
              style={{ background: "white" }}
            >
              <MenuItem value="Automatikë">Automatikë</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Derivati</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={carInfo.fuel}
              label="Derivati"
              onChange={(e) => {
                setCarInfo({ ...carInfo, fuel: e.target.value });
              }}
              style={{ background: "white" }}
            >
              <MenuItem value="Naftë">Naftë</MenuItem>
              <MenuItem value="Benzinë">Benzinë</MenuItem>
              <MenuItem value="Elektrikë">Elektrikë</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Motori"
            value={carInfo.engine}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, engine: e.target.value });
            }}
          />
          <TextField
            label="Ngjyra"
            value={carInfo.color}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, color: e.target.value });
            }}
          />
          <TextField
            label="Çmimi për ditë"
            type="number"
            value={carInfo.price}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, price: e.target.value });
            }}
          />
          <TextField
            label="Targat"
            value={carInfo.label}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, label: e.target.value });
            }}
          />
          <TextField
            label="Numri i Shasisë"
            value={carInfo.carId}
            style={{ background: "white" }}
            onChange={(e) => {
              setCarInfo({ ...carInfo, carId: e.target.value });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Skadimi regjistrimit"
              sx={{ width: "100%", background: "white" }}
              onChange={handleExpiryDate}
              value={carInfo.expiryDate}
            />
          </LocalizationProvider>
          {carInfo.image ? (
            <div
              style={{
                width: "100%",
                gridColumn: "span 2",
                borderRadius: "5px",
                position: "relative",
              }}
            >
              <Tooltip title="Ndrysho fotografinë e veturës">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "white",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      opacity: "0",
                      gridColumn: "span 2",
                    }}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-uploader-single"
                  />
                  <ChangeCircle />
                </div>
              </Tooltip>
              <img
                src={carInfo.image}
                style={{ width: "100%", borderRadius: "5px" }}
              />
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-uploader-single"
              style={{ gridColumn: "span 2" }}
            />
          )}
        </DialogContent>
        <DialogActions
          sx={{
            height: "65px",
            border: "1px solid lightgray",
            borderLeft: "0px",
            borderRight: "0px",
            borderBottom: "0px",
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setCarInfo({
                make: null,
                model: null,
                year: null,
                transmission: null,
                fuel: null,
                engine: null,
                color: null,
                price: null,
                label: null,
                carId: null,
                expiryDate: null,
                image: null,
              });
              setEditCarDialog(false);
            }}
          >
            Mbyll
          </Button>
          <Button variant="contained" onClick={saveEditCar}>
            Edito
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteCarDialog}
        onClose={() => {
          setDeleteCarDialog(false);
          setCarInfo({
            make: null,
            model: null,
            year: null,
            transmission: null,
            fuel: null,
            engine: null,
            color: null,
            price: null,
            label: null,
            carId: null,
            expiryDate: null,
            image: null,
          });
        }}
      >
        <DialogContent>
          A doni të fshini veturën e caktuar nga databaza?
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setDeleteCarDialog(false);
              setCarInfo({
                make: null,
                model: null,
                year: null,
                transmission: null,
                fuel: null,
                engine: null,
                color: null,
                price: null,
                label: null,
                carId: null,
                expiryDate: null,
                image: null,
              });
            }}
          >
            Mbyll
          </Button>
          <Button variant="contained" color="error" onClick={deleteCar}>
            Fshij
          </Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="veturat-listing-search"
            type="text"
            placeholder="Kërko veturat..."
            value={searchQuery}
            onChange={(e)=>{
              setSearchQuery(e.target.value)
            }}
          />
          <button
            className="veturat-listing-button add-car-button"
            onClick={() => {
              setAddCarDialog(true);
            }}
          >
            <Add />
            <span>Shto veturë</span>
          </button>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {carViewMode == "list" ? (
            <button
              className="veturat-listing-button list-active"
              onClick={() => {
                setCarViewMode("list");
              }}
            >
              <ViewList />
            </button>
          ) : (
            <button
              className="veturat-listing-button"
              onClick={() => {
                setCarViewMode("list");
              }}
            >
              <ViewList />
            </button>
          )}
          {carViewMode == "grid" ? (
            <button
              className="veturat-listing-button list-active"
              onClick={() => {
                setCarViewMode("grid");
              }}
            >
              <GridView />
            </button>
          ) : (
            <button
              className="veturat-listing-button"
              onClick={() => {
                setCarViewMode("grid");
              }}
            >
              <GridView />
            </button>
          )}
        </div>
      </div>
      {carViewMode == "list" ? (
        <VeturatListView
          carsData={filteredCarsData}
          handleClickOnCar={handleClickOnCar}
          handleDeleteCarClick={handleDeleteCarClick}
        />
      ) : (
        <VeturatGridView
          carsData={filteredCarsData}
          handleClickOnCar={handleClickOnCar}
          handleDeleteCarClick={handleDeleteCarClick}
        />
      )}
    </Sidebar>
  );
};

export default Veturat;
