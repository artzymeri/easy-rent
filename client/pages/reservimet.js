import Sidebar from "../src/app/Components/Sidebar";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import "@/app/Styling/Reservimet/reservimet.css";
import Calendar from "@/app/Components/Calendar";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import ReservationsList from "@/app/Components/ReservationsList";
import axios from "axios";

const Reservimet = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const [currentDay, setCurrentDay] = useState(dayjs());

  const [calendarActive, setCalendarActive] = useState(true);
  const [reservationsListActive, setReservationsListActive] = useState(false);

  const [reservations, setReservations] = useState([]);

  const [selectedReservationDialog, setSelectedReservationDialog] =
    useState(false);

  const [selectedReservation, setSelectedReservation] = useState({
    firstAndLastName: null,
    phoneNumber: null,
    documentId: null,
    carInfo: null,
    startTime: null,
    endTime: null,
    imagesArray: null,
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

  useEffect(() => {
    axios.get("http://localhost:1234/getreservations").then((res) => {
      setReservations(res.data);
    });
  }, []);

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
          />
        )}
      </div>
    </Sidebar>
  );
};

export default Reservimet;
