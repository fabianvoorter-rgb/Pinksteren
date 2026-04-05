interface Props {
  title: string;
  description?: string;
  date: string;
  time: string;
  image: string;
  compact?: boolean;
}

const EventCard = ({ title, description, date, time, image, compact }: Props) => {
  return (
    // Stack on small screens, row on md+
    <div className={`flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${compact ? "mb-3" : "mb-6"}`}>
      <div className={`flex flex-col justify-center flex-1 ${compact ? "p-4" : "p-8"}`}>
        <h3 className={`font-bold text-gray-900 mb-1 ${compact ? "text-lg" : "text-2xl mb-2"}`}>{title}</h3>
        {description && <p className="text-gray-500 mb-5">{description}</p>}
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="flex items-center gap-1 text-purple-600 font-medium">
            <span>📅</span> {date}
          </span>
          <span className="flex items-center gap-1 text-pink-600 font-medium">
            <span>🕐</span> {time}
          </span>
        </div>
      </div>
      <div className={`flex-shrink-0 ${compact ? "w-full md:w-40" : "w-full md:w-64"}`}>
        <img
          src={image}
          alt={title}
          className={`w-full h-48 ${compact ? "md:h-40" : "md:h-full"} object-cover`}
        />
      </div>
    </div>
  );
};

export default EventCard;
