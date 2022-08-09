import { PetsTable } from "../styled/PetsTable.styled";
import { TableHeader } from "../styled/TableHeader.styled";
import { TableRow } from "../styled/TableRow.styled";
import { TableData } from "../styled/TableData.styled";

import { getPets } from "../service/petsAPI";

import { useDispatch, useSelector } from "react-redux";
import { add } from "../reducers/petsSlice";
import { usePaginated } from "../customHooks/usePaginated";
import { PaginateButtons } from "../styled/PaginateButtons.styled";
import { PaginateButton } from "../styled/PaginateButton.styled";
import { Selector } from "../styled/Selector.styled";
import { useEffect, useRef, useState } from "react";

import TableEdit from "./TableEdit";
import DeletePet from "./DeletePet";

export default function Pets() {
  const [showModal, setShowModal] = useState(false);
  const [petIndex, setPetIndex] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const petGetter = useRef(getPets);

  const { next, prev, hasMoreContent, data, page, setPage } = usePaginated(
    petGetter.current,
    pageSize
  );

  useEffect(() => {
    dispatch(add(data));
  }, [data, dispatch]);

  if (!pets) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        {showModal && (
          <DeletePet
            showModal={showModal}
            setShowModal={setShowModal}
            index={petIndex}
            onDelete={() => {
              petGetter.current = (...params) => getPets(...params);
            }}
          />
        )}
        <Selector
          value={pageSize}
          onChange={(e) => {
            setPageSize(parseInt(e.target.value));
            setPage(0);
          }}
          name="page-size"
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </Selector>
        <PetsTable>
          <thead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Edit</TableHeader>
              <TableHeader>Delete</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {pets.map((pet, index) => {
              return (
                <TableRow highlighted={index % 2} key={index}>
                  <TableData>{pet.id}</TableData>
                  <TableData>{pet.name ? pet.name : "No name"}</TableData>
                  <TableData>{pet.status}</TableData>
                  <TableData>
                    <TableEdit
                      icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNSAyMWgtNXYtMmg1djJ6bTMuNDI0LTUuNzE4bDQuNDAyIDQuMzk5LTUuODI2IDEuMzE5IDEuNDI0LTUuNzE4em0xNS41NzYtNi43NDhsLTkuNjg5IDkuODA0LTQuNTM2LTQuNTM2IDkuNjg5LTkuODAyIDQuNTM2IDQuNTM0eiIvPjwvc3ZnPg=="
                      link={`/pets/${pet.id}`}
                    />
                  </TableData>
                  <TableData>
                    <img
                      width={"20px"}
                      src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjAgMjBoLTE1LjI1Yy0uNDE0IDAtLjc1LjMzNi0uNzUuNzVzLjMzNi43NS43NS43NWgxNS43NWMuNTMgMCAxLS40NyAxLTF2LTE1Ljc1YzAtLjQxNC0uMzM2LS43NS0uNzUtLjc1cy0uNzUuMzM2LS43NS43NXptLTEtMTdjMC0uNDc4LS4zNzktMS0xLTFoLTE1Yy0uNjIgMC0xIC41MTktMSAxdjE1YzAgLjYyMS41MiAxIDEgMWgxNWMuNDc4IDAgMS0uMzc5IDEtMXptLTguNTAzIDYuNDM3IDIuMjE5LTIuMjJjLjE0Ni0uMTQ2LjMzOC0uMjE5LjUzLS4yMTkuNDA0IDAgLjc1MS4zMjUuNzUxLjc1IDAgLjE5My0uMDczLjM4NC0uMjE5LjUzMWwtMi4yMiAyLjIyIDIuMjIyIDIuMjIyYy4xNDcuMTQ3LjIyLjMzOS4yMi41MyAwIC40MjctLjM0OS43NTEtLjc1Ljc1MS0uMTkyIDAtLjM4NS0uMDczLS41MzEtLjIxOWwtMi4yMjItMi4yMjMtMi4yMjMgMi4yMjNjLS4xNDYuMTQ2LS4zMzguMjE5LS41My4yMTktLjQwMSAwLS43NTEtLjMyNC0uNzUxLS43NTEgMC0uMTkxLjA3My0uMzgzLjIyLS41M2wyLjIyMi0yLjIyMi0yLjIxOS0yLjIyYy0uMTQ2LS4xNDctLjIxOS0uMzM4LS4yMTktLjUzMSAwLS40MjUuMzQ2LS43NS43NS0uNzUuMTkyIDAgLjM4NC4wNzMuNTMuMjE5eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+"
                      onClick={() => {
                        setShowModal(true);
                        setPetIndex(pet.id);
                      }}
                      alt="delete"
                    />
                  </TableData>
                </TableRow>
              );
            })}
          </tbody>
        </PetsTable>
        <PaginateButtons>
          <PaginateButton disabled={page === 0} onClick={prev}>
            <svg
              width={"40px"}
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591 1.299-1.002 3.945-3.044 5.498-4.243z" />
            </svg>
          </PaginateButton>
          <PaginateButton disabled={!hasMoreContent} onClick={next}>
            <svg
              width={"40px"}
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" />
            </svg>
          </PaginateButton>
        </PaginateButtons>
      </>
    );
  }
}
