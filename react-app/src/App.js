import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SpacecraftGallery from "./components/SpacecraftGallery";
import SpacecraftDetails from "./components/SpacecraftDetails";
import CreateSpacecraft from "./components/CreateSpacecraft";
import EditSpacecraft from "./components/EditSpacecraft";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/spacecrafts/:id/edit">
            <EditSpacecraft />
          </Route>
          <Route exact path="/spacecrafts/new">
            <CreateSpacecraft />
          </Route>
          <Route exact path="/spacecrafts">
            <SpacecraftGallery />
          </Route>
          <Route exact path="/spacecrafts/:id">
            <SpacecraftDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
