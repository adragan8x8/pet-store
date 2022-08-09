import React, { useCallback, useEffect, useState } from "react";
import { getPet, getPets } from "../service/petsAPI";
import Select from "react-select";
import { SelectorWrapper } from "../styled/SelectorWrapper.styled";

export default function PetsSelector() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectorPets, setSelectorPets] = useState([]);

  const [petID, setPetID] = useState(null);
  const [petName, setPetName] = useState(null);
  const [petStatus, setPetStatus] = useState(null);

  useEffect(() => {
    if (!petID) return;
    const getPetInfo = async () => {
      const petInfo = await getPet(petID);
      setPetName(petInfo.name ? petInfo.name : "No name");
      setPetStatus(petInfo.status);
    };
    getPetInfo();
  }, [petID]);

  const loadPets = useCallback(async () => {
    setLoading(true);
    const pets = await getPets(page, 10);
    const newPets = pets.data.map((item, index) => ({
      value: item.id,
      label: item.name ? `${item.name}  ${item.id}` : "no name",
    }));
    setSelectorPets((oldSelectorPets) => [...oldSelectorPets, ...newPets]);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadPets();
  }, [loadPets]);

  const colourStyles = {
    option: (styles, { isDisabled }) => {
      return isDisabled
        ? {
            ...styles,
            color: "#808080",
            backgroundColor: "rgb(242, 242, 242)",
            margin: "0px",
            textAlign: "center",
          }
        : { ...styles };
    },
  };

  return (
    <>
      <div style={{ width: "50%", margin: "40px auto" }}>
        <Select
          options={
            loading
              ? [
                  ...selectorPets,
                  {
                    value: "loading",
                    label: "Loading more pets...",
                    isDisabled: true,
                  },
                ]
              : selectorPets
          }
          isLoading={loading}
          isSearchable={false}
          placeholder={loading ? "Loading more pets..." : "Select a pet"}
          onMenuScrollToBottom={() => {
            setPage((page) => page + 1);
            loadPets();
          }}
          onChange={(newValue) => {
            setPetID(newValue.value);
          }}
          styles={colourStyles}
        />
      </div>
      <SelectorWrapper>
        {petID ? (
          <div>
            <h3>ID: {petID}</h3>
            <h3>Name: {petName}</h3>
            <h3>Status: {petStatus}</h3>
          </div>
        ) : (
          <h3>No pet selected!</h3>
        )}
      </SelectorWrapper>
    </>
  );
}
