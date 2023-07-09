import { React } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import CreateAccount from "./CreateAccount.js";
import LoginPage from "./LoginPage.js";
import NavigationBar from "./NavigationBar.js";
import LoadSpinner from "./components/LoadSpinner.js";
import UserRecommendations from "./UserRecommendations.js";
import UserInterests from "./UserInterests.js";
import UserPlayedGames from "./UserPlayedGames.js";
import VideoGameDetails from "./VideoGameDetails.js";
import SearchUsers from "./SearchUsers.js";
import Follows from "./Follows.js";
import FollowGames from "./FollowGames.js";
import SearchResults from "./SearchResults.js";
import Explore from "./Explore.js";
import Home from "./Home.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const user = JSON.parse(secureLocalStorage.getItem("user"))
    ? JSON.parse(secureLocalStorage.getItem("user"))
    : secureLocalStorage.setItem("authorized", false);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route
          path={`/dashboard/recommendations`}
          element={<UserRecommendations />}
        />
        <Route path={`/dashboard/interests`} element={<UserInterests />} />
        <Route path={`/dashboard/gamesplayed`} element={<UserPlayedGames />} />
        <Route
          path={`/games/details/:game_id`}
          element={<VideoGameDetails />}
        />
        <Route path="/find" element={<SearchUsers />} />
        <Route
          path={`/dashboard/following`}
          element={<Follows user={user} />}
        />
        <Route
          path={`/dashboard/following/:followUserId`}
          element={<FollowGames />}
        />
        <Route path={`/search/games`} element={<SearchResults />} />
        <Route path="/signout" element={<Navigate to="/explore" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
