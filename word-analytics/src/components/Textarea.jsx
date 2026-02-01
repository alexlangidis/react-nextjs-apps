import { useState } from "react";
import Warning from "./Warning";

export default function Textarea({ text, setText }) {
  const [warningText, setWarningText] = useState("");

  const handleChange = (e) => {
    let newText = e.target.value;

    if (newText.includes("<script>")) {
      setWarningText("No script tags allowed!");
      newText = newText.replace("<script>", "");
    } else if (newText.includes("@")) {
      setWarningText("No @ tags allowed!");
      newText = newText.replace("@", "");
    } else {
      setWarningText("");
    }
    setText(newText);
  };

  return (
    <>
      <textarea
        value={text}
        onChange={handleChange}
        className="textarea"
        placeholder="Enter your text..."
        spellCheck={false}
      />
      {<Warning warningText={warningText} />}
    </>
  );
}
