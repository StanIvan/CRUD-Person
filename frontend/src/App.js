import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages and components
import Home from "./pages/Home";
import PersonUpdateForm from "./components/PersonUpdateForm";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/api/persons/:id"
              element={<PersonUpdateForm />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
