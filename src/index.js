import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Navbar from "./components/Navbar";
import UpdatePet from "./components/UpdatePet";
import AddPet from "./components/AddPet";
import Pets from "./components/Pets";
import Home from "./components/Home";

import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import petsReducer from "./reducers/petsSlice";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const store = configureStore({
  reducer: {
    pets: petsReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="pets" element={<Pets />} />
        <Route path="pets/:petID" element={<UpdatePet />} />
        <Route path="pets/add" element={<AddPet />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
