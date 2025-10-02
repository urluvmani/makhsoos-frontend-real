import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-gray-300 py-8 px-6 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Copyright */}
        <p className="text-sm md:text-base text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-yellow-500 font-semibold">
            Makhsoos Store
          </span>
          . All rights reserved.
        </p>

        {/* Links with icons */}
        <div className="flex gap-6 text-lg">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300 relative group"
          >
            <FaFacebookF />
            <span className="text-sm">Facebook</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300"></span>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-pink-500 transition-colors duration-300 relative group"
          >
            <FaInstagram />
            <span className="text-sm">Instagram</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-pink-500 group-hover:w-full transition-all duration-300"></span>
          </a>

          <a
            href="mailto:support@makhsoos.com"
            className="flex items-center gap-2 hover:text-green-500 transition-colors duration-300 relative group"
          >
            <FaEnvelope />
            <span className="text-sm">Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-500 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
