import { useState } from "react";
import { usePersonContext } from "../hooks/usePersonsContext";

const PersonForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = usePersonContext();
  const [emptyFields, setEmptyFields] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const person = { name, surname, city, address, phone };
    //body of request
    const response = await fetch("/api/persons", {
      method: "POST",
      body: JSON.stringify(person),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setName("");
      setSurname("");
      setCity("");
      setAddress("");
      setPhone("");
      setError(null);
      setEmptyFields([]);
      console.log(json);
      dispatch({ type: "CREATE_PERSON", payload: json });
    }
  };
  return (
    <form className="create-person" onSubmit={handleSubmit}>
      <h3>Add new person</h3>
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

export default PersonForm;
