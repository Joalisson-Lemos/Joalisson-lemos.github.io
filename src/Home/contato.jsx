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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-500 flex flex-col items-center justify-center p-4">
      <h2 className="text-[40px] text-orange-600 font-extrabold mb-8 text-center">
        Contato
      </h2>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-white"
      >
        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          className="w-full p-3 mb-4 rounded bg-gray-900 text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          className="w-full p-3 mb-4 rounded bg-gray-900 text-white"
          required
        />

        <textarea
          name="message"
          placeholder="Sua mensagem"
          className="w-full p-3 mb-4 rounded bg-gray-900 text-white"
          required
        />

        <input type="hidden" name="time" />

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 transition text-white font-semibold py-3 rounded"
        >
          Enviar
        </button>

        <div className="mt-6 p-4 rounded-xl bg-gray-900 flex flex-col sm:flex-row gap-6 justify-center text-2xl sm:text-3xl md:text-4xl">
          <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition flex justify-center">
            <a
              href="https://wa.me/5581999999999"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-green-500" />
            </a>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition flex justify-center">
            <a
              href="https://www.linkedin.com/in/seu-usuario/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-600" />
            </a>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition flex justify-center">
            <a
              href="https://github.com/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-gray-200" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Contato;
