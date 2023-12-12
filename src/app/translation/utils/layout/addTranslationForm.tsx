"use client";

import React, { useState } from "react";

interface AddTranslationFormProps {
  onSubmit: (key: string, value: string) => void;
}

const AddTranslationForm: React.FC<AddTranslationFormProps> = ({ onSubmit }) => {
  const [newTranslation, setNewTranslation] = useState({
    key: "",
    value: "",
  });

  const handleAddTranslation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(newTranslation.key, newTranslation.value);
    // Optionally, you can clear the form fields
    setNewTranslation({ key: "", value: "" });
  };

  return (
    <form onSubmit={handleAddTranslation} className="px-4 py-2 flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Translation Key:
        <input
          type="text"
          name="translationKey"
          placeholder="Translation Key"
          value={newTranslation.key}
          onChange={(e) =>
            setNewTranslation({
              ...newTranslation,
              key: e.target.value,
            })
          }
          className="border rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Translation Value:
        <input
          type="text"
          name="translationValue"
          placeholder="Translation Value"
          value={newTranslation.value}
          onChange={(e) =>
            setNewTranslation({
              ...newTranslation,
              value: e.target.value,
            })
          }
          className="border rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </label>
      <button
        type="submit"
        className="border border-solid  px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        Add Translation
      </button>
    </form>
  );
};

export default AddTranslationForm;
