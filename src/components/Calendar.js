import React, { useState } from "react";

export default function CalendarPicker({ onSelectDateTime }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onSelectDateTime) {
      onSelectDateTime({ date, startTime, endTime });
    }
  };

  const handleTimeChange = (type, value) => {
    if (type === "start") setStartTime(value);
    if (type === "end") setEndTime(value);
    if (onSelectDateTime) {
      onSelectDateTime({
        date: selectedDate,
        startTime: type === "start" ? value : startTime,
        endTime: type === "end" ? value : endTime,
      });
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      slots.push(`${formattedHour}:00 ${period}`);
      slots.push(`${formattedHour}:30 ${period}`);
    }
    return slots;
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const renderCalendar = () => {
    const totalDays = daysInMonth(selectedMonth, selectedYear);

    const days = [];
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      days.push(date);
    }

    return days.map((date) => (
      <button
        key={date.toDateString()}
        onClick={() => handleDateClick(date)}
        className={`p-2 rounded-lg ${
          selectedDate?.toDateString() === date.toDateString()
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200"
        }`}
      >
        {date.getDate()}
      </button>
    ));
  };

  return (
    <div className="flex flex-col py-0 px-1 rounded-lg border border-gray-300 w-full">
      <div className="flex justify-right   items-center mb-4 space-x-4">
        <div>
          <label className="block text-sm font-medium">Select Year:</label>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border border-gray-300 rounded-lg p-2 w-20"
          >
            {Array.from({ length: 21 }, (_, i) => 2025 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border border-gray-300 rounded-lg p-2 w-32"
          >
            {[
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
            ].map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
        {renderCalendar()}
      </div>

      <div className="flex flex-col space-y-2 mb-4">
        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <select
            value={startTime}
            onChange={(e) => handleTimeChange("start", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="">Select Start Time</option>
            {generateTimeSlots().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">End Time</label>
          <select
            value={endTime}
            onChange={(e) => handleTimeChange("end", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="">Select End Time</option>
            {generateTimeSlots().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedDate && (
        <div className="p-4 border-t border-gray-300">
          <h3 className="text-lg font-medium">Selected Details:</h3>
          <p>Date: {selectedDate.toDateString()}</p>
          <p>Start Time: {startTime || "Not selected"}</p>
          <p>End Time: {endTime || "Not selected"}</p>
        </div>
      )}
    </div>
  );
}
