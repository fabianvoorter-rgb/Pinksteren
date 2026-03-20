import EventCard from "../components/EventCard";
import Countdown from "../components/Countdown";

const Home = () => {
  const subEvents = [
    { title: "Main Stage", description: "Live music all night.", location: "Central Park Arena" },
    { title: "DJ Arena", description: "Electronic beats.", location: "Neon Dome Tent" },
    { title: "Food Village", description: "Street food zone.", location: "Sunset Boulevard" },
    { title: "Art Zone", description: "Creative workshops.", location: "Garden Area" },
  ];

  return (
    <div>
      <div className="relative text-white text-center py-24 px-6 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-90"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6">
            SUMMER FESTIVAL 2026
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold">
            June 12 – June 15, 2026
          </h2>
          <Countdown targetDate="2026-06-12T12:00:00" />
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Festival Highlights
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {subEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-6">
          📍 Festival Location
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            title="Festival Location"
            src="https://www.google.com/maps?q=Central+Park,+New+York&output=embed"
            width="100%"
            height="400"
            loading="lazy"
            className="w-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Home;
