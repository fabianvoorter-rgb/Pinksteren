import EventCard from "../components/EventCard";
import { subEvents } from "../data/events";

const Planning = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-10 text-center">Highlights</h2>
      <div className="flex flex-col">
        {subEvents.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default Planning;
