const Contact = () => {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" />
        <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" />
        <textarea placeholder="Your Message" className="w-full p-3 border rounded-lg" rows={4} />
        <button className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
