import { useState, useEffect, useMemo } from "react";

import styles from "./autocomplete.module.scss";

const CustomAutocomplete: React.FC<{
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ options, value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options, inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setSelectedIndex(-1);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    onChange(option);
    setIsOptionsVisible(false);
  };

  const handleClearInput = () => {
    setInputValue("");
    setSelectedIndex(-1);
    onChange("");
  };

  // Gère le délai avant la fermeture de la liste pour permettre le clic sur les options
  const handleBlur = () => {
    setTimeout(() => setIsOptionsVisible(false), 200);
  };

  // Gestion des touches de navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOptionsVisible) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
        );
        break;

      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
        );
        break;

      case "Enter":
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredOptions.length) {
          handleOptionClick(filteredOptions[selectedIndex]);
        }
        break;

      case "Escape":
        event.preventDefault();
        setIsOptionsVisible(false);
        break;

      default:
        break;
    }
  };

  return (
    <div className={styles.autocomplete}>
      <div className={styles.autocomplete__inputContainer}>
        <input
          id="autocomplete-input"
          className={styles.autocomplete__input}
          type="text"
          value={inputValue}
          onFocus={() => setIsOptionsVisible(true)}
          onBlur={handleBlur}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Gestion des touches
          placeholder={placeholder}
          aria-owns="autocomplete-list"
          aria-autocomplete="list"
        />
        {inputValue && (
          <button
            type="button"
            className={styles.autocomplete__clearButton}
            onClick={handleClearInput}
            aria-label="Clear input"
          >
            &times;
          </button>
        )}
      </div>
      {filteredOptions.length > 0 && isOptionsVisible && (
        <ul
          id="autocomplete-list"
          role="listbox"
          className={
            styles.autocomplete__list +
            " " +
            (isOptionsVisible ? styles["open"] : "")
          }
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={selectedIndex === index}
              className={`${styles.autocomplete__item} ${
                selectedIndex === index ? styles["highlighted"] : ""
              }`} // Ajouter une classe pour l'élément sélectionné
              onClick={() => handleOptionClick(option)}
              tabIndex={0} // Permet de naviguer avec Tab
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomAutocomplete;
