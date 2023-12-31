import { useEffect, useState } from "react";
import "./PasswordGenerator.css";
import { usePasswordGenerator } from "../../hooks/usePasswordGenerator";
import { useClipBoardCopier } from "use-clipboard-copier";
import { Toaster, toast } from "react-hot-toast";

type Props = {};

interface PasswordOption {
  title: string;
  selected: boolean;
}

export const PasswordGenerator: React.FC = (props: Props) => {
  const [length, setLength] = useState(4);
  const [options, setOptions] = useState([
    { title: "Uppercase characters (A-Z)", selected: false },
    { title: "Lowercase characters (a-z)", selected: false },
    { title: "Numbers (0-9)", selected: false },
    { title: "Symbols (%$#@!^()*&)", selected: false },
  ]);
  const { password, error, generatePassword } = usePasswordGenerator({
    length,
    options,
  });
  const { isCopied, clipBoardRef, copyToClipBoard } = useClipBoardCopier(750);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const handleOptionSelect = (selectedOption: PasswordOption) => {
    setOptions((prevOptions: PasswordOption[]) => {
      return prevOptions.map((option) => {
        if (selectedOption.title === option.title) {
          return { ...selectedOption, selected: !selectedOption.selected };
        }
        return option;
      });
    });
  };

  return (
    <div className="password-generator-container">
      <Toaster position="top-center" reverseOrder={false} />
      {password && (
        <div className="generated-password-container">
          <p ref={clipBoardRef}>{password}</p>
          <button onClick={copyToClipBoard}>
            {!isCopied ? (
              <>
                <i className="fi fi-rr-file"></i>
                <span>Copy</span>
              </>
            ) : (
              <>
                <i className="fi fi-rr-assept-document"></i>
                <span>Copied</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="password-length-container">
        <div>
          <p>Length</p>
          <p>{length}</p>
        </div>
        <input
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          type="range"
          min={4}
          max={20}
        />
      </div>
      <div className="options-container">
        {options.map((option, id) => {
          return (
            <div key={id}>
              <input
                onChange={() => handleOptionSelect(option)}
                checked={option.selected}
                name="option"
                type="checkbox"
              />
              <label htmlFor="option">{option.title}</label>
            </div>
          );
        })}
      </div>
      <div className="btn-container">
        <button onClick={generatePassword}>Generate Password</button>
      </div>
    </div>
  );
};
