import { useRef } from "react";
import emailjs from "emailjs-com";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

function Contato() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    form.current.time.value = new Date().toLocaleString();

    emailjs
      .sendForm(
        "service_8j2uywc",
        "template_ltx01ih",
        form.current,
        "rPeAG_2dczraEPq03"
      )
      .then(
        () => {
          alert("Mensagem enviada com sucesso!");
          form.current.reset();
        },
        (error) => {
          alert("Erro ao enviar: " + error.text);
        }
      );
  };

  return (
    <div
      id="contato"
      className="min-h-screen bg-gradient-to-t from-orange-700 via-gray-900 to-gray-950 flex flex-col items-center justify-center p-6"
    >
      <h2 className="text-[40px] text-orange-600 font-extrabold mb-8 text-center">
        Contato
      </h2>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-white flex flex-col items-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          className="w-full p-3 mb-4 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          className="w-full p-3 mb-4 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
          required
        />

        <textarea
          name="message"
          placeholder="Sua mensagem"
          className="w-full p-3 mb-4 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
          required
        />

        <input type="hidden" name="time" />

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 transition text-white font-semibold py-3 rounded mt-2"
        >
          Enviar
        </button>

        <div className="mt-8 w-full flex flex-wrap justify-center gap-6 text-3xl">
          <a
            href="https://wa.me/5581989567057"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition flex justify-center items-center"
          >
            <FaWhatsapp className="text-green-500" />
          </a>

          <a
            href="https://www.linkedin.com/in/joalisson-lemos/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition flex justify-center items-center"
          >
            <FaLinkedin className="text-blue-600" />
          </a>

          <a
            href="https://github.com/joalisson-lemos"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition flex justify-center items-center"
          >
            <FaGithub className="text-gray-200" />
          </a>
        </div>
      </form>
    </div>
  );
}

export default Contato;
