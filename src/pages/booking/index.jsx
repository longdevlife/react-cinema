import React from "react";
import { Routes, Route } from "react-router-dom";
import SeatSelection from "./components/SeatSelection";
import PaymentForm from "./components/PaymentForm";
import BookingSuccess from "./components/BookingSuccess";

const BookingPage = () => {
  return (
    <Routes>
      <Route path="/:showtimeId" element={<SeatSelection />} />
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="/success" element={<BookingSuccess />} />
    </Routes>
  );
};

export default BookingPage;
