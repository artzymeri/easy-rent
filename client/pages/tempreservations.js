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
  Print,
  SwapVert,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
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
import axios from "axios";
import Sidebar from "@/app/Components/Sidebar";

const TempReservationsList = (props) => {
  const [loading, setLoading] = useState(true);

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:1234/gettempreservations")
      .then((res) => {
        setReservations(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const approveReservation = (reservation) => {
    setLoading(true);
    axios
      .post(
        `http://localhost:1234/approvetempreservation/${reservation.id}`,
        reservation
      )
      .then((res) => {
        axios.get("http://localhost:1234/gettempreservations").then((res) => {
          setReservations(res.data);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteReservation = (reservation) => {
    setLoading(true);
    axios
      .post(`http://localhost:1234/deletetempreservation/${reservation.id}`)
      .then((res) => {
        axios.get("http://localhost:1234/gettempreservations").then((res) => {
          setReservations(res.data);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Sidebar>
      {loading && <CircularProgress />}
      {!loading && (
        <div className="reservations-list-container">
          {reservations && reservations.length > 0
            ? reservations.map((reservation, index) => {
                return (
                  <div
                    className="reservations-list-item"
                    style={{ justifyContent: "space-between" }}
                    key={index}
                  >
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
                        {reservation.clientNameSurnameD1}
                      </span>
                      <span>{reservation.carInfo}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>
                        {dayjs(reservation.startTime).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      </span>
                      <span>
                        {dayjs(reservation.endTime).format("DD/MM/YYYY HH:mm")}
                      </span>
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          deleteReservation(reservation);
                        }}
                      >
                        Fshij
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          approveReservation(reservation);
                        }}
                      >
                        Aprovo
                      </Button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      )}
    </Sidebar>
  );
};

export default TempReservationsList;
