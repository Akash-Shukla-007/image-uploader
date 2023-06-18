import React, { useState } from "react";
import "../src/css/App.css";
import ApplicationNavigation from "./Navigation/ApplicationNavigation";

function App() {
  const [isSignUp, setIsSignUp] = useState(true);

  return <ApplicationNavigation />;
}

export default App;
