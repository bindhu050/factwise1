import logo from "./logo.svg";
import Accordion from "./Accordion";
import CelebritiesArray from "./celebrities.json";
import { useState } from "react";

function App() {
  const [celebrities, setCelebrities] = useState(CelebritiesArray);
  const updateUser = (update, edit, setEdit) => {
    let userArray = celebrities;
    let objIndex = celebrities.findIndex((obj) => obj.id == update.id);
    userArray[objIndex] = update;
    setCelebrities([...userArray]);
    setEdit(0);
  };
  const deleteUser = (deleteUser) => {
    let userArray = celebrities;
    userArray = userArray.filter(function (user) {
      return user.id !== deleteUser.id;
    });
    setCelebrities([...userArray]);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center my-3">
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search User"
            />
          </div>
        </div>
        <div className="accordion" id="accordionExample">
          {celebrities.map((celeb) => (
            <Accordion
              celeb={celeb}
              key={celeb.id}
              updateUser={updateUser}
              deleteUser={deleteUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
