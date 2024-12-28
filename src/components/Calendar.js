import React, { useState } from "react";

export default function CalendarPicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    console.log("Selected Date:", selectedDate);
    console.log("Time:", startTime, "to", endTime);
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = hour.toString().padStart(2, "0");
      slots.push(`${formattedHour}:00`);
      slots.push(`${formattedHour}:30`);
    }
    return slots;
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const renderCalendar = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
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
    <div className="flex flex-col py-0 px-1 rounded-lg  border border-gray-300 w-full bg-blue-200">
      {/* Calendar */}
      <div className="flex justify-between w-full   gap-10">
        <div className="w-full">
          <div className="text-lg font-normal">April 2024</div>
          <div className="grid grid-cols-7 gap-5 ">
            <div className="text-gray-500">Su</div>
            <div className="text-gray-500">Mo</div>
            <div className="text-gray-500">Tu</div>
            <div className="text-gray-500">We</div>
            <div className="text-gray-500">Th</div>
            <div className="text-gray-500">Fr</div>
            <div className="text-gray-500">Sa</div>
            {renderCalendar()}
          </div>
        </div>

        {/* Time Slots */}
        <div className="w-full">
          <div className="mb-2 text-lg font-normal ">
            {selectedDate
              ? selectedDate.toDateString()
              : "Select a date from the calendar"}
          </div>



          <div className="flex flex-col  space-y-2 w-auto">
            <div>
              <label className="block text-sm font-medium">Start Time</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
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
                onChange={(e) => setEndTime(e.target.value)}
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
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => {
            setSelectedDate(null);
            setStartTime("");
            setEndTime("");
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save date and time
        </button>
      </div>
    </div>
  );
}
