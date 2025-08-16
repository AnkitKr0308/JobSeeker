import React, { useState } from "react";
import "../../css/calendar.css";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ value, onChange }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((year) => year - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((year) => year + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const renderDates = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const blanks = Array(firstDay).fill(null);
    const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...blanks, ...dates];
  };

  const handleDateClick = (date) => {
    if (!date) return;
    const newDate = new Date(currentYear, currentMonth, date);

    setSelectedDate(newDate);

    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(":");
      newDate.setHours(hours, minutes, 0);
      onChange(newDate);
    } else {
      onChange(newDate);
    }
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    if (selectedDate) {
      const newDateTime = new Date(selectedDate);
      const [hours, minutes] = e.target.value.split(":");
      newDateTime.setHours(hours, minutes, 0);
      onChange(newDateTime);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={prevMonth}>&lt;</button>
          <h3>{`${monthNames[currentMonth]} ${currentYear}`}</h3>
          <button onClick={nextMonth}>&gt;</button>
        </div>

        <div className="calendar-body">
          {dayNames.map((day) => (
            <div key={day} className="day">
              {day}
            </div>
          ))}
          {renderDates().map((date, index) => {
            const isToday =
              date === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();
            const isSelected =
              selectedDate &&
              date === selectedDate.getDate() &&
              currentMonth === selectedDate.getMonth() &&
              currentYear === selectedDate.getFullYear();
            return (
              <div
                key={index}
                className={`date ${isToday ? "today" : ""} ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => handleDateClick(date)}
              >
                {date || ""}
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="time-selector">
          <label>
            Select time:{" "}
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
            />
          </label>
          <input
            type="text"
            readOnly
            value={
              selectedTime
                ? `${selectedDate.toDateString()} ${selectedTime}`
                : selectedDate.toDateString()
            }
            placeholder="Selected date and time"
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
