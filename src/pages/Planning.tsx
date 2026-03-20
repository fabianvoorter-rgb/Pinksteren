const Planning = () => {
  const days = [
    { day: "Day 1", content: "Opening Ceremony & Concerts" },
    { day: "Day 2", content: "Workshops & DJ Night" },
    { day: "Day 3", content: "Art & Cultural Shows" },
    { day: "Day 4", content: "Final Party & Fireworks" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">Event Planning</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {days.map((d, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">{d.day}</h3>
            <p className="text-gray-600">{d.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planning;
