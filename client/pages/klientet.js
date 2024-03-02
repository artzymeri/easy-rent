import Sidebar from "@/app/Components/Sidebar";
import React from "react";
import "@/app/Styling/global-styling.css";
import "@/app/Styling/Klientet/klientet.css";
import { DataGrid } from "@mui/x-data-grid";

const Klientet = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 20 },
    { id: 6, lastName: "Melisandre", firstName: "Adam", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 10, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 11, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 12, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 13, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 14, lastName: "Targaryen", firstName: "Daenerys", age: 20 },
    { id: 15, lastName: "Melisandre", firstName: "Adam", age: 150 },
    { id: 16, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 17, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 18, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <Sidebar>
      <input
        className="klientet-search"
        placeholder="Kërko klientët..."
        type="text"
      />
      <div
        className="m-t-50 dataGrid"
        style={{ height: "calc(100dvh - 120px)" }}
      >
        <DataGrid
          style={{
            boxShadow: "0px 3px 10px #015d924d",
            color: "#015c92",
            borderRadius: "12px",
            background: 'white'
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
    </Sidebar>
  );
};

export default Klientet;
