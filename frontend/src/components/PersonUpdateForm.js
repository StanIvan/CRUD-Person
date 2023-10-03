import React, { useState, useEffect } from "react";
import { usePersonContext } from "../hooks/usePersonsContext";
import { useParams, useNavigate } from "react-router-dom";

const PersonUpdateForm = () => {
  const { dispatch } = usePersonContext();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchPersonData();
  }, []);

  const fetchPersonData = async () => {
    let result = await fetch(`/api/persons/${params.id}`);
    result = await result.json();
    setName(result.name);
    setSurname(result.surname);
    setCity(result.city);
    setAddress(result.address);
    setPhone(result.phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const person = { name, surname, city, address, phone };
    //body of request
    const response = await fetch(`/api/persons/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(person),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      console.log(json);
      dispatch({ type: "UPDATE_PERSON", payload: json });
      navigate("/");
    }
  };

  return (
    <form className="create-person" onSubmit={handleSubmit}>
      <h3>Update person</h3>
      <label>Set name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={emptyFields.includes("name") ? "error" : ""}
      ></input>
      <label>Set surname:</label>
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        className={emptyFields.includes("surname") ? "error" : ""}
      ></input>
      <label>Set city:</label>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={emptyFields.includes("city") ? "error" : ""}
      ></input>
      <label>Set address:</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className={emptyFields.includes("address") ? "error" : ""}
      ></input>
      <label>Set phone:</label>
      <input
        type="number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={emptyFields.includes("phone") ? "error" : ""}
      ></input>
      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PersonUpdateForm;
