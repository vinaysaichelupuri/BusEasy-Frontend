import React, { useState, useEffect } from "react";
import "./services.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

export const TravelBooking = () => {
  const location = useLocation();
  const { name } = location.state;

  const { register, handleSubmit,reset } = useForm();
  const [bookings, setBookings] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const [upcomingRides, setUpcomingRides] = useState([]);

  const fetchBookings = async () => {
    const currentDate = new Date().toISOString();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/bookings`,
        { name: name }
      );

      if (response.status === 200) {
        const data = response.data;
        reset()

        const UpcomingRides = data.filter(
          (item) => item.journeyDate >= currentDate
        );
        setUpcomingRides(UpcomingRides);

        const CompletedRides = data.filter(
          (item) => item.journeyDate < currentDate
        );
        setCompletedRides(CompletedRides);
      } else {
        alert("Failed to fetch bookings.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("An error occurred while fetching bookings.");
    }
  };

  const bookBus = async (bookingData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/book`,
        {
          name: name,
          source: bookingData.source,
          destination: bookingData.destination,
          journeyDate: bookingData.journeyDate,
          numberOfTickets: bookingData.numberOfTickets,
        }
      );

      if (response.status === 200) {
        alert("Booking successful!");
        fetchBookings();
      } else {
        alert("Booking failed. Please check your input.");
      }
    } catch (error) {
      console.error("Error booking travel:", error);
      alert("An error occurred while booking travel.");
    }
  };

  useEffect(() => {
    if (name) {
      fetchBookings();
    }
  }, [name]);

  return (
    <div className="travel-container">
      <div className="header">
        <h1>{`Welcome ${name}`}</h1>
      </div>
      <div className="form-container">
        <h2>Book Your Travel</h2>
        <form onSubmit={handleSubmit(bookBus)} className="booking-form">
          <label>
            Source:
            <input
              type="text"
              placeholder="Enter source"
              {...register("source", { required: true })}
            />
          </label>
          <label>
            Destination:
            <input
              type="text"
              placeholder="Enter destination"
              {...register("destination", { required: true })}
            />
          </label>
          <label>
            Journey Date:
            <input
              type="date"
              {...register("journeyDate", { required: true })}
            />
          </label>
          <label>
            Number of Tickets:
            <input
              type="number"
              min="1"
              {...register("numberOfTickets", { required: true })}
            />
          </label>
          <button type="submit">Book</button>
        </form>
      </div>

      <div className="details-container">
        <h2>Booking Details</h2>
        <div className="upcoming-rides">
          <h3>Upcoming Rides</h3>
          {upcomingRides.length > 0 ? (
            <ul>
              {upcomingRides.map((ride) => (
                <li key={ride.id}>
                  {ride.source} to {ride.destination} on{" "}
                  {new Date(ride.journeyDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming rides.</p>
          )}
        </div>
        <div className="completed-rides">
          <h3>Completed Rides</h3>
          {completedRides.length > 0 ? (
            <ul>
              {completedRides.map((ride) => (
                <li key={ride.id}>
                  {ride.source} to {ride.destination} on{" "}
                  {new Date(ride.journeyDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No completed rides.</p>
          )}
        </div>
      </div>
    </div>
  );
};