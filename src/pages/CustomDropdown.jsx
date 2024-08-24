import React, { useState } from "react";


const CustomSelect = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <div className="custom-select">
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="custom-select-arrow">&#9660;</div>
    </div>
  );
};

// Example usage:
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const CustomDropdown = () => {
  const handleSelectChange = (selectedValue) => {
    // Do something with the selected value
    console.log(selectedValue);
  };

  return (
    <div>
      <h1>Your Component</h1>
      <CustomSelect options={options} onChange={handleSelectChange} />
    </div>
  );
};

export default CustomDropdown;
