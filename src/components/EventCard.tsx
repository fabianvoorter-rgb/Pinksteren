interface Props {
  title: string;
  description?: string;
  date: string;
  time: string;
  image: string;
  subtitle?: string;
  compact?: boolean;
}

const EventCard = ({ title, description, date, time, image, subtitle, compact }: Props) => {
  return (
    <div className={`flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ${compact ? "mb-3" : "mb-6"}`}>
      <div className={`flex-shrink-0 ${compact ? "w-full md:w-40" : "w-full md:w-64"}`}>
        <img
          src={image}
          alt={title}
          className={`w-full ${compact ? 'h-36 md:h-40' : 'h-48 md:h-56'} object-cover`}
        />
      </div>
      <div className={`flex flex-col justify-center flex-1 ${compact ? "p-4" : "p-6 md:p-8"} bg-gradient-to-r from-white/90 to-white/70`}>
  <h3 className={`font-extrabold text-gray-900 mb-1 ${compact ? "text-lg" : "text-2xl mb-2"}`}>{title}</h3>
  {subtitle && <div className={`text-md font-bold ${compact ? 'text-gray-700' : 'text-gray-600'} mb-2`}>{subtitle}</div>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        <div className="flex flex-wrap gap-3 text-sm items-center">
          <span className="flex items-center gap-2 text-green-700 font-semibold">
            <span>📅</span> {date}
          </span>
          <span className="flex items-center gap-2 text-red-500 font-semibold">
            <span>🕐</span> {time}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
