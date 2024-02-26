import React from "react";
import "@/app/Styling/Sidebar/sidebar.css";
import {
  Add,
  CalendarMonth,
  DirectionsCar,
  Fitbit,
  Home,
  Logout,
  Person2,
} from "@mui/icons-material";
import { useRouter } from "next/router";

const navigationOptions = [
  {
    title: "Ballina",
    link: "/",
    icon: <Home />,
  },
  {
    title: "Veturat",
    link: "/veturat",
    icon: <DirectionsCar />,
  },
  {
    title: "Klientët",
    link: "/klientet",
    icon: <Person2 />,
  },
  {
    title: "Reservimet",
    link: "/reservimet",
    icon: <CalendarMonth />,
  },
  {
    title: "Shto Reservim",
    link: "/shtoreservim",
    icon: <Add />,
  }
];

const Sidebar = ({ children }) => {
  const router = useRouter();

  const activateButtonClass = (navigation) => {
    if (router.pathname == navigation.link) {
      return "sidebar-navigation-button sidebar-navigation-button-active";
    } else {
      return "sidebar-navigation-button";
    }
  };

  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
      }}
    >
      <div className="sidebar">
        <div className="sidebar-title-logo">
          <Fitbit sx={{ color: "orangered", height: "30px", width: "30px" }} />
          EasyRent
        </div>
        <div className="sidebar-navigation-buttons">
          {navigationOptions.map((navigation, index) => {
            return (
              <div
                key={index}
                className={activateButtonClass(navigation)}
                onClick={() => {
                  router.push(navigation.link);
                }}
              >
                {navigation.icon}
                <span>{navigation.title}</span>
              </div>
            );
          })}
        </div>
        <div className="sidebar-bottom-profile">
          <div>
            <Logout />
            <span>Shkyçu</span>
          </div>
        </div>
      </div>
      <div className="content" style={{ width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
