import './App.css';
import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";


function App() {
  const [user, setUser] = React.useState({});

  function handleResponseChange(response) {
    console.log("the response token from: ", response.credential);
    var userObject = jwt_decode(response.credential);
    console.log("the user object from: ", userObject);
    setUser(userObject);
    document.getElementById("loginDiv").style.display = "none";
  }

  function handleSignOut(){
    setUser({});
    document.getElementById("loginDiv").style.display = "block";
  }

useEffect(() => {
  /* global google */
   google.accounts.id.initialize({
     client_id: "852275804755-f9fjn9s11ab9q4jrhfti30tug1c1ofpk.apps.googleusercontent.com",
     callback: handleResponseChange,
   })
 
   google.accounts.id.renderButton(
     document.getElementById("loginDiv"),
     {theme: "black", size: "large"}
   )

   google.accounts.id.prompt();
 }, []);



  return (
    <div className="App">
      <div id='loginDiv'></div>

      <div>
        <img src={user.picture} />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>

      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign out</button>
      ) }
    </div>
  );
}

export default App;
