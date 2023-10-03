import { useEffect /*useState*/ } from "react";

//components
import PersonDetails from "../components/PersonDetails";
import PersonForm from "../components/PersonForm";
import { usePersonContext } from "../hooks/usePersonsContext";
import TableHeader from "../components/TableHeader";
//import PersonUpdateForm from "../components/PersonUpdateForm";
const Home = () => {
  //const [persons, setPersons] = useState(null);
  const { persons, dispatch } = usePersonContext();
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await fetch("/api/persons");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch({ type: "SET_PERSONS", payload: data });
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      }
    };
    fetchPersons();
  }, [dispatch]);

  return (
    <div className="home">
      <h2>User Data Table </h2>
      <div className="persons">
        {persons && persons.length > 0 && (
          <table>
            <thead>
              <TableHeader />
            </thead>
            <tbody>
              {persons.map((person, index) => (
                <PersonDetails
                  key={person._id}
                  person={person}
                  ID={index + 1}
                />
              ))}
            </tbody>
          </table>
        )}
        <PersonForm />
      </div>
    </div>
  );
};

export default Home;
