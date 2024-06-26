import React, { useState, useEffect } from "react";

export default function CountDown(props) {
  const { date } = props;
  console.log(date);
  const targetDate = new Date(date);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-flow-row sm:grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": timeLeft.days }}></span>
        </span>
        <span className="font-semibold text-placeholder text-xl">Days</span>
      </div>
      <span className="text-placeholder font-semibold text-5xl">:</span>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": timeLeft.hours }}></span>
        </span>
        <span className="font-semibold text-placeholder text-xl">Hours</span>
      </div>
      <span className="text-placeholder font-semibold text-5xl">:</span>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": timeLeft.minutes }}></span>
        </span>
        <span className="font-semibold text-placeholder text-xl">Minutes</span>
      </div>
      <span className="text-placeholder font-semibold text-5xl">:</span>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": timeLeft.seconds }}></span>
        </span>
        <span className="font-semibold text-placeholder text-xl">Seconds</span>
      </div>
    </div>
  );
}
