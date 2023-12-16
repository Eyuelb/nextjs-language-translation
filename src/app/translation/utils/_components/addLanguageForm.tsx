import React, { useState } from "react";

interface AddLanguageFormProps {
  onAddLanguage: (language: string) => void;
}

const AddLanguageForm: React.FC<AddLanguageFormProps> = ({ onAddLanguage }) => {
  const [newLanguage, setNewLanguage] = useState("");

  const handleAddLanguage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddLanguage(newLanguage);
    // Optionally, you can clear the form field
    setNewLanguage("");
  };

  return (
    <form onSubmit={handleAddLanguage} className="px-4 py-2 flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        New Language:
        <input
          type="text"
          name="newLanguage"
          placeholder="New Language"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
          className="border rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </label>
      <button
        type="submit"
        className="border border-solid  px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        Add Language
      </button>
    </form>
  );
};

export default AddLanguageForm;
