import Sidebar from "../src/app/Components/Sidebar";
import React, { useEffect, useState } from "react";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Veturat/veturat-listing.css";
import "@/app/Styling/Reservimet/shtoreservim.css";
import { Add, GridView, Tune, ViewList } from "@mui/icons-material";
import VeturatListView from "../src/app/Components/VeturatListView";
import VeturatGridView from "../src/app/Components/VeturatGridView";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

const Veturat = () => {
  const [carsData, setCarsData] = useState([]);

  const [carViewMode, setCarViewMode] = useState("list");

  const [addCarDialog, setAddCarDialog] = useState(false);

  const [newCar, setNewCar] = useState({
    make: null,
    model: null,
    year: null,
    transmission: null,
    fuel: null,
    engine: null,
    color: null,
    price: null,
    label: null,
    expiryDate: null,
    image: null,
  });

  useEffect(() => {
    axios.get("http://localhost:1234/getveturat").then((res) => {
      console.log(res.data);
      setCarsData(res.data);
    });
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataURL = event.target.result;
        console.log(imageDataURL);
        setNewCar({ ...newCar, image: imageDataURL });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAddCar = () => {
    axios.post("http://localhost:1234/addveture", { newCar }).then((res) => {
      setNewCar({
        make: null,
        model: null,
        year: null,
        transmission: null,
        fuel: null,
        engine: null,
        color: null,
        price: null,
        label: null,
        expiryDate: null,
        image: null,
      });
      setAddCarDialog(false);
    });
  };

  return (
    <Sidebar>
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
            value={newCar.make}
            style={{ background: "white" }}
            onChange={(e) => {
              setNewCar({ ...newCar, make: e.target.value });
            }}
          />
          <TextField
            label="Modeli"
            value={newCar.model}
            style={{ background: "white" }}
            onChange={(e) => {
              setNewCar({ ...newCar, model: e.target.value });
            }}
          />

          <TextField
            label="Viti veturës"
            value={newCar.year}
            style={{ background: "white" }}
            type="number"
            onChange={(e) => {
              setNewCar({ ...newCar, year: e.target.value });
            }}
          />
          <TextField
            label="Transmisioni"
            value={newCar.transmission}
            style={{ background: "white" }}
            onChange={(e) => {
              setNewCar({ ...newCar, transmission: e.target.value });
            }}
          />
          <TextField
            label="Derivati"
            value={newCar.fuel}
            style={{ background: "white" }}
            onChange={(e) => {
              setNewCar({ ...newCar, fuel: e.target.value });
            }}
          />
          <TextField
            label="Motori"
            value={newCar.engine}
            style={{ background: "white" }}
            onChange={(e) => {
              setNewCar({ ...newCar, engine: e.target.value });
            }}
          />
          <TextField
            label="Ngjyra"
            value={newCar.color}
            style={{ background: "white" }}
            onChange={(e) => {
              setNewCar({ ...newCar, color: e.target.value });
            }}
          />
          <TextField
            label="Çmimi për ditë"
            type="number"
            value={newCar.price}
            style={{ background: "white" }}
            onChange={(e) => {
              setNewCar({ ...newCar, price: e.target.value });
            }}
          />
          <TextField
            label="Targat"
            value={newCar.label}
            style={{ background: "white" }}
            onChange={(e) => {
              setNewCar({ ...newCar, label: e.target.value });
            }}
          />
          <TextField
            label="Data e Skadimit"
            value={newCar.expiryDate}
            style={{ background: "white" }}
            onChange={(e) => {
              setNewCar({ ...newCar, expiryDate: e.target.value });
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-uploader"
          />
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
            onClick={() => {
              setNewCar({
                make: null,
                model: null,
                year: null,
                transmission: null,
                fuel: null,
                engine: null,
                color: null,
                price: null,
                label: null,
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
        <VeturatListView carsData={carsData} />
      ) : (
        <VeturatGridView carsData={carsData} />
      )}
    </Sidebar>
  );
};

export default Veturat;
