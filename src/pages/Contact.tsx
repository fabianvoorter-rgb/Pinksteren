import { useState } from "react";

const Contact = () => {
  const [type, setType] = useState<"bonte" | "padel">("bonte");
  const [email, setEmail] = useState("");

  // Bonte fields
  const [namen, setNamen] = useState("");
  const [actNaam, setActNaam] = useState("");
  const [benodigdheden, setBenodigdheden] = useState("");

  // Padel fields
  const [padelNaam, setPadelNaam] = useState("");
  const [racket, setRacket] = useState<"yes" | "no">("no");

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatusMessage(null);

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Vul een geldig e-mailadres in.");
      return;
    }

    let subject = "Aanmelding ";
    let body = "";

    if (type === "bonte") {
      if (!namen || !actNaam) {
        setError("Vul alstublieft Namen en Naam van act in.");
        return;
      }
      subject += "Bonte middag";
      body += `Type: Bonte middag\nNamen: ${namen}\nNaam van act: ${actNaam}\nBenodigdheden: ${benodigdheden}\n`;
    } else {
      if (!padelNaam) {
        setError("Vul alstublieft Naam in voor Padel.");
        return;
      }
      subject += "Padel";
      body += `Type: Padel\nNaam: ${padelNaam}\nRacket aanwezig: ${racket === "yes" ? "Ja" : "Nee"}\n`;
    }

    body += `\nContact email: ${email}`;

    // Check for Formspree endpoint first (VITE_FORMSPREE_ENDPOINT)
    const env = (import.meta as any).env || {};
    const formspreeEndpoint = env.VITE_FORMSPREE_ENDPOINT;

    if (formspreeEndpoint) {
      setStatusMessage("Versturen... Formspree proberen...");
      try {
        const res = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _subject: subject,
            message: body,
            reply_to: email,
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Formspree error: ${res.status} ${text}`);
        }

        setStatusMessage("E-mail succesvol verzonden via Formspree.");
        return;
      } catch (err: any) {
        console.error(err);
        setError("Formspree fout: fallback naar automatisch alternatief.");
        // continue to fallbacks
      }
    }

    // Try to send automatically using EmailJS REST API if env vars are present
    const serviceId = env.VITE_EMAILJS_SERVICE_ID;
    const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = env.VITE_EMAILJS_PUBLIC_KEY; // EmailJS user/public key

    if (serviceId && templateId && publicKey) {
      setStatusMessage("Versturen... proberen automatisch te verzenden via EmailJS...");
      try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              subject,
              message: body,
              reply_to: email,
            },
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`EmailJS error: ${res.status} ${text}`);
        }

        setStatusMessage("E-mail succesvol verzonden via EmailJS.");
        return;
      } catch (err: any) {
        console.error(err);
        setError("Er is een fout opgetreden bij het verzenden via EmailJS. Er wordt een e-mailclient geopend als fallback.");
        // continue to mailto fallback
      }
    }

    // Final fallback to mailto if no server-side option succeeded
    const mailto = `mailto:fabianvoorter@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatusMessage("E-mail client geopend. Controleer je e-mail en klik op verzenden.");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Opgeven padel/bonte middag</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              checked={type === "bonte"}
              onChange={() => setType("bonte")}
            />
            Bonte middag
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              checked={type === "padel"}
              onChange={() => setType("padel")}
            />
            Padel
          </label>
        </div>

        {type === "bonte" ? (
          <div className="space-y-3">
            <input value={namen} onChange={(e) => setNamen(e.target.value)} type="text" placeholder="Eigen naam of namen" className="w-full p-3 border rounded-lg" />
            <input value={actNaam} onChange={(e) => setActNaam(e.target.value)} type="text" placeholder="Naam van act" className="w-full p-3 border rounded-lg" />
            <textarea value={benodigdheden} onChange={(e) => setBenodigdheden(e.target.value)} placeholder="Benodigdheden" className="w-full p-3 border rounded-lg" rows={3} />
          </div>
        ) : (
          <div className="space-y-3">
            <input value={padelNaam} onChange={(e) => setPadelNaam(e.target.value)} type="text" placeholder="Naam" className="w-full p-3 border rounded-lg" />
            <div className="flex items-center gap-4">
              Eigen racket:
              <label className="flex items-center gap-2">
                <input type="radio" name="racket" checked={racket === "yes"} onChange={() => setRacket("yes")} /> Ja
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="racket" checked={racket === "no"} onChange={() => setRacket("no")} /> Nee
              </label>
            </div>
          </div>
        )}

        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Jouw e-mail" className="w-full p-3 border rounded-lg" />

        {error && <div className="text-red-600">{error}</div>}
        {statusMessage && <div className="text-green-600">{statusMessage}</div>}

        <button type="submit" className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700">
          Verstuur
        </button>
      </form>
    </div>
  );
};

export default Contact;
