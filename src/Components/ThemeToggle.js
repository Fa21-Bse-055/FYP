import React from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css"; // For styling the toggle switch

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle">
      <Toggle
        defaultChecked={theme === "dark"}
        icons={{
          checked: "🌙", // Moon icon for dark theme
          unchecked: "☀️" // Sun icon for light theme
        }}
        onChange={toggleTheme}
      />
    </div>
  );
};

export default ThemeToggle;
