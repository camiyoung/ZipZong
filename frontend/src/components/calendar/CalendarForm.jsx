import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";

export default function CalendarForm() {
  const [value, onChange] = useState(new Date());

  return (
    <Calendar
      className="
        my-auto
        w-1/5
        max-width
      "
      onChange={onChange}
      value={value}
    />
  );
}
