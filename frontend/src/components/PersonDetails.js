import React from "react";
import { usePersonContext } from "../hooks/usePersonsContext";
import { Link } from "react-router-dom";

//date fns
import format from "date-fns/format";
const PersonDetails = ({ person, ID }) => {
  const { dispatch } = usePersonContext();
  const handleClick = async () => {
    const response = await fetch("/api/persons/" + person._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_PERSON", payload: json });
    }
  };

  return (
    <tr key={person._id}>
      <td>{ID}</td>
      <td>{person.name}</td>
      <td>{person.surname}</td>
      <td>{person.city}</td>
      <td>{person.address}</td>
      <td>{person.phone}</td>
      <td>{format(new Date(person.createdAt), "dd/MM/yy")}</td>
      <td>
        <button>
          <Link
            to={"/api/persons/" + person._id}
            style={{ textDecoration: "none", color: "black" }}
          >
            update
          </Link>
        </button>
      </td>
      <td>
        <button onClick={handleClick}>delete</button>
      </td>
    </tr>
  );
};
export default PersonDetails;
