import React, { useEffect, useState } from "react";
import { PetsTable } from "./styled/PetsTable.styled";
import { TableHeader } from "./styled/TableHeader.styled";
import { TableRow } from "./styled/TableRow.styled";
import { TableData } from "./styled/TableData.styled";
import { fetchDataByID } from "./service/fetchDataByID";

export default function Pets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchDataByID("https://petstore.swagger.io/v2/pet/").then((fetchedData) => {
      setPets(fetchedData.filter((data) => data));
    });
  }, []);

  if (pets === []) {
    console.log("ok");
    return <p>"Loading..."</p>;
  } else {
    return (
      <>
        <PetsTable>
          <thead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
              <TableRow highlighted={index % 2} key={pet.id}>
                <TableData>{pet.id}</TableData>
                <TableData>
                  {pet.category ? pet.category.name : "No category"}
                </TableData>
                <TableData>{pet.name ? pet.name : "No name"}</TableData>
                <TableData>{pet.status}</TableData>
              </TableRow>
            ))}
          </tbody>
        </PetsTable>
      </>
    );
  }
}
