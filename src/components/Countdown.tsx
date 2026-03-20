import { useEffect, useState } from "react";

interface Props {
  targetDate: string;
}

const Countdown = ({ targetDate }: Props) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return <div>Festival Started!</div>;

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8 text-white">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl text-center shadow-lg">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm uppercase">{key}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
