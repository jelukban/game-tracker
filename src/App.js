import { React } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import CreateAccount from "./components/createAccount/CreateAccount.js";
import LoginPage from "./components/login/LoginPage.js";
import NavigationBar from "./components/navigation/NavigationBar.js";
import LoadSpinner from "./components/common/LoadSpinner.js";
import UserRecommendations from "./components/profile/UserRecommendations.js";
import UserInterests from "./components/profile/UserInterests.js";
import UserPlayedGames from "./components/profile/UserPlayedGames.js";
import VideoGameDetails from "./components/videoGame/VideoGameDetails.js";
import SearchUsers from "./components/search/SearchUsers.js";
import Follows from "./components/profile/Follows.js";
import FollowGames from "./components/profile/FollowGames.js";
import SearchResults from "./components/search/SearchResults.js";
import Explore from "./components/explore/Explore.js";
import Home from "./components/home/Home.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

function App() {
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
        <Route path={`/dashboard/following`} element={<Follows />} />
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
