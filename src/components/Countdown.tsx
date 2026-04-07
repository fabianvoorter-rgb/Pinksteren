import { useEffect, useState } from "react";

interface Props {
  targetDate: string;
}

const Countdown = ({ targetDate }: Props) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) return null;

    return {
      dagen: Math.floor(difference / (1000 * 60 * 60 * 24)),
      uren: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minuten: Math.floor((difference / 1000 / 60) % 60),
      seconden: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return <div>Pinksteren begint!</div>;

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6 text-white px-2">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div
          key={key}
          className="bg-white/10 backdrop-blur-md px-3 py-2 sm:px-6 sm:py-4 rounded-xl text-center shadow-lg min-w-[64px] flex flex-col items-center"
          aria-label={`${key} remaining`}
        >
          <div className="text-2xl sm:text-3xl font-bold leading-tight">{value}</div>
          <div className="text-xs sm:text-sm uppercase mt-1">{key}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
