import { useState } from "react";

interface PasswordOption {
  title: string;
  selected: boolean;
}

type Props = {
  length: number;
  options: PasswordOption[];
};

enum PasswordCharacters {
  UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVXYZ",
  LOWERCASE = "abcdefghijklmnopqrstuvxyz",
  SYMBOLS = "!@#$%^&*()",
  NUMBERS = "0123456789",
}

export const usePasswordGenerator = ({ length, options }: Props) => {
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const generatePassword = () => {
    let generatedPassword = "";
    let chunk = "";

    options.forEach((option) => {
      if (option.selected) {
        if (option.title === "Uppercase characters (A-Z)") {
          chunk += PasswordCharacters.UPPERCASE;
        } else if (option.title === "Lowercase characters (a-z)") {
          chunk += PasswordCharacters.LOWERCASE;
        } else if (option.title === "Numbers (0-9)") {
          chunk += PasswordCharacters.NUMBERS;
        } else if (option.title === "Symbols (%$#@!^()*&)") {
          chunk += PasswordCharacters.SYMBOLS;
        }
      }
    });

    if (chunk.length) {
      for (let i = 1; i <= length; ++i) {
        generatedPassword += chunk[Math.floor(Math.random() * chunk.length)];
      }
      setPassword(generatedPassword);
    } else {
      setError(new Error("Please select an option!"));
    }
  };

  return {
    password,
    error,
    generatePassword,
  };
};
