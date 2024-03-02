import Sidebar from "../src/app/Components/Sidebar";
import React, { useState } from "react";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Veturat/veturat-listing.css";
import { GridView, Tune, ViewList } from "@mui/icons-material";
import VeturatListView from "../src/app/Components/VeturatListView";
import VeturatGridView from "../src/app/Components/VeturatGridView";

const Veturat = () => {
  const [carViewMode, setCarViewMode] = useState("list");

  return (
    <Sidebar>
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
          <button className="veturat-listing-button">
            <Tune />
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
      {carViewMode == "list" ? <VeturatListView /> : <VeturatGridView />}
    </Sidebar>
  );
};

export default Veturat;
