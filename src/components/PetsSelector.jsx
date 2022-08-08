import React, { useEffect, useState } from "react";
import { getPet, getPets } from "../service/petsAPI";
import Select from "react-select";

export default function PetsSelector() {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectorPets, setSelectorPets] = useState([]);
  const [petID, setPetID] = useState(null);
  const [petName, setPetName] = useState(null);
  const [petCategory, setPetCategory] = useState(null);

  useEffect(() => {
    const getPetInfo = async () => {
      const petInfo = await getPet(petID);
      setPetName(petInfo.name ? petInfo.name : "No name");
      setPetCategory(
        petInfo.category && petInfo.category.name
          ? petInfo.category.name
          : "No category"
      );
    };
    getPetInfo();
  }, [petID]);

  const loadPets = async () => {
    setLoading(true);
    const pets = await getPets(offset, 10);
    const newPets = pets.data.map((item, index) => ({
      value: item.id ? item.id : index,
      label: item.name ? item.name : "no name",
    }));
    setSelectorPets((oldSelectorPets) => [...oldSelectorPets, ...newPets]);
    setLoading(false);
  };

  useEffect(() => {
    setOffset((offset) => offset + 10);
    loadPets();
  }, []);

  return (
    <>
      <div style={{ width: "50%", margin: "40px auto" }}>
        <Select
          options={selectorPets}
          isLoading={loading}
          isSearchable={false}
          placeholder="Select a pet..."
          loadingMessage={() => "Loading more pets..."}
          noOptionsMessage={() => "No more pets..."}
          onMenuScrollToBottom={() => {
            setOffset((offset) => offset + 10);
            loadPets();
          }}
          onChange={(newValue) => {
            setPetID(newValue.value);
          }}
        />
      </div>
      <div style={{ width: "100%", textAlign: "center" }}>
        {petID ? (
          <div>
            <h3>Name: {petName}</h3>
            <h3>Category: {petCategory}</h3>
          </div>
        ) : (
          <h3>No pet selected!</h3>
        )}
      </div>
    </>
  );
}
