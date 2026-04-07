import EventCard from "../components/EventCard";
import Countdown from "../components/Countdown";
import { subEvents } from "../data/events";

const Home = () => {

  return (
    <div>
      <div className="poster-hero relative text-center py-12 md:py-20 px-4 md:px-6 rounded-2xl overflow-hidden shadow-poster">
        <div className="relative z-10 text-white">
          <div className="inline-block mb-4">
            <span className="ribbon text-lg md:text-2xl">UITNODIGING</span>
          </div>

          <h1 className="poster-title text-5xl md:text-8xl text-yellow-400 drop-shadow-lg mb-3">
            PINKSTEREN
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold text-white/90 mb-4">
            Mei 20 – Mei 25, 2026
          </h2>
          <Countdown targetDate="2026-05-20T12:00:00" />
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Aankomende evenementen
        </h2>
        <div className="flex flex-col">
          {subEvents.map(({ description: _desc, ...event }, index) => (
            <EventCard key={index} {...event} compact />
          ))}
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-6">
          📍 Locatie
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            title="Pinksteren Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2418.0346626473615!2d5.053741676269066!3d52.69546787210765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c8aeb9161830b9%3A0xd5643f703d536087!2sGanker%2041%2C%201688%20CS%20Nibbixwoud!5e0!3m2!1sen!2snl!4v1774033972336!5m2!1sen!2snl"
            loading="lazy"
            className="w-full h-64 md:h-96"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Home;
