const Footer = () => {
  return (
    <footer className="bg-gray-100   dark:text-white dark:bg-slate-100/12 mt-10">
      <div className="container mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 dark:text-white ">
          &copy; {new Date().getFullYear()} <span className="dark:text-yellow-500 font-semibold">Makhsoos Store</span>. All rights reserved.
        </p>
        <div className="flex gap-4 mt-3 md:mt-0 ">
          <a href="https://facebook.com" target="_blank" className="dark:text-white  text-gray-500 hover:text-blue-600">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" className="dark:text-white  text-gray-500 hover:text-pink-600">
            Instagram
          </a>
          <a href="mailto:support@makhsoos.com" className="dark:text-white  text-gray-500 hover:text-green-600">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
