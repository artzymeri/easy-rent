import Sidebar from "../src/app/Components/Sidebar";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import "@/app/Styling/Reservimet/reservimet.css";
import Calendar from "@/app/Components/Calendar";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import ReservationsList from "@/app/Components/ReservationsList";
import axios from "axios";

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

  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const [currentDay, setCurrentDay] = useState(dayjs());

  const [calendarActive, setCalendarActive] = useState(true);

  const [reservationsListActive, setReservationsListActive] = useState(false);

  const [reservations, setReservations] = useState([]);

  const [carsData, setCarsData] = useState([]);

  const [selectedCar, setSelectedCar] = useState(null);

  const [selectedReservationDialog, setSelectedReservationDialog] =
    useState(false);

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
    console.log(selectedReservation.startTime, selectedReservation.endTime);
    axios
      .post(`http://localhost:1234/editreservation/${reservationId}`, {
        object,
      })
      .then((res) => {
        const { title, message } = res.data;
        axios.get("http://localhost:1234/getreservations").then((res) => {
          setReservations(res.data);
        });
      });
  };

  const handleAvailabilityChange = (event) => {
    setSelectedReservation({
      ...selectedReservation,
      active: event.target.checked,
    });
  };

  console.log(selectedReservation.startTime, selectedReservation.endTime);

  return (
    <Sidebar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="reservimet-header-container">
          <div className="reservimet-header-view-switch-buttons">
            {calendarActive ? (
              <Button variant="contained">Kalendari</Button>
            ) : (
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
            {reservationsListActive ? (
              <Button variant="contained">Lista Ditore</Button>
            ) : (
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
