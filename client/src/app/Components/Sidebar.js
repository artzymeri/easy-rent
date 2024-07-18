import React, { useEffect, useState } from "react";
import "@/app/Styling/Sidebar/sidebar.css";
import {
  Add,
  CalendarMonth,
  Close,
  DirectionsCar,
  Fitbit,
  Home,
  Logout,
  MenuBook,
  Person2,
  RssFeed,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { Menu } from "@mui/material";
import { GridMenuIcon } from "@mui/x-data-grid";
import axios from "axios";

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
    title: "Reservimet",
    link: "/reservimet",
    icon: <CalendarMonth />,
  },
  {
    title: "Shto Reservim",
    link: "/shtoreservim",
    icon: <Add />,
  },
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

  const [sidebarMobile, setSidebarMobile] = useState("none");

  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        position: "relative",
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
      <div className="sidebar-mobile" style={{ display: `${sidebarMobile}` }}>
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#015c92",
            borderRadius: "5px",
            zIndex: "999",
          }}
        >
          <Close
            style={{ color: "white" }}
            onClick={() => {
              setSidebarMobile("none");
            }}
          />
        </div>
        <div className="sidebar-mobile-title-logo">
          <Fitbit sx={{ color: "orangered", height: "30px", width: "30px" }} />
          EasyRent
        </div>
        <div className="sidebar-mobile-navigation-buttons">
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
        <div className="sidebar-mobile-bottom-profile">
          <div>
            <Logout />
            <span>Shkyçu</span>
          </div>
        </div>
      </div>
      <div
        className="sidebar-mobile-button"
        onClick={() => {
          setSidebarMobile("flex");
        }}
      >
        <GridMenuIcon />
      </div>
      <div className="content" style={{ width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
