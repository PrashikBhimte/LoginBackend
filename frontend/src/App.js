import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
 
function App() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnClick = async (event) => {
    event.preventDefault();
    try {
      const responce = await axios.post("http://localhost:8000/submit", { username : name, password : password }, {});
      setMessage("Successfull login, Hello " + responce.data.name);
    }
    catch (error) {
      setMessage('Credientails not found!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await axios.get("http://localhost:8000/");
        setMessage(responce.data.message);
      }
      catch (error) {
        setMessage(error.message);
      }
    };

    fetchData();

  }, []);

  return (
    <div className="App">
    <form action='#' >
      <h1>{message}</h1>
      <label>UserName : <input autoComplete='true' type="text" name='username' id='nameInput' value={name} onChange={handleChangeName}></input></label>
      <label>Password : <input autoComplete='true' type="text" name='password' id='passwordInput' value={password} onChange={handleChangePassword}></input></label>
      <button type='submit' onClick={handleOnClick}>SUBMIT</button>
    </form>
    </div>
  );
}

export default App;
