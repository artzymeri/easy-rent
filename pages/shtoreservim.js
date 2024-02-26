import Sidebar from "@/app/Components/Sidebar";
import React from "react";
import "@/app/Styling/global-styling.css"
import { MenuItem, TextField, } from "@mui/material";
import CarsTest from "@/app/TestingValues/CarsTest";
import { DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ShtoReservim = () => {
    return (
        <Sidebar>
            <h3 style={{textAlign: 'center', fontWeight: '400'}}>Shto Reservim</h3>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '50%', marginTop: '50px', gap: '15px'}}>
                    <TextField placeholder="Emri dhe mbiemri" variant="outlined" fullWidth />
                    <TextField placeholder="Numri Telefonit" variant="outlined" fullWidth />
                    <TextField placeholder="Kodi Leternjoftimit" variant="outlined" fullWidth />
                    <TextField select placeholder="Zgjidh Veturën" variant="outlined" fullWidth>
                        {CarsTest.map((car)=>{
                            return (
                                <MenuItem>{car.make} {car.model}</MenuItem>
                            )
                        })}
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker />
                        <DateTimePicker />
                    </LocalizationProvider>
                </div>
            </div>
        </Sidebar>
    )
}

export default ShtoReservim;