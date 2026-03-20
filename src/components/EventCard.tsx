interface Props {
  title: string;
  description: string;
  location: string;
}

const EventCard = ({ title, description, location }: Props) => {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition transform duration-300">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="opacity-90 mb-4">{description}</p>
      <div className="text-sm bg-white/20 px-3 py-2 rounded-lg inline-block">
        📍 {location}
      </div>
    </div>
  );
};

export default EventCard;
