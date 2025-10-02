import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;

      // root html element پر dark class add/remove کریں
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newMode;
    });
  };

  // optional: refresh پر previous theme restore کر دے
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setDarkMode(true);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
