import { React } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CreateAccount from "./components/createAccount/CreateAccount";
import LoginPage from "./components/login/LoginPage.jsx";
import NavigationBar from "./components/common/navigation/NavigationBar.jsx";
import UserRecommendations from "./components/profile/UserRecommendations";
import UserInterests from "./components/profile/UserInterests.jsx";
import UserPlayedGames from "./components/profile/UserPlayedGames.jsx";
import VideoGameDetails from "./components/videoGame/VideoGameDetails.jsx";
import SearchUsers from "./components/search/SearchUsers";
import FollowsList from "./components/profile/FollowsList.jsx";
import FollowGames from "./components/profile/FollowGames";
import SearchResults from "./components/search/SearchResults";
import Explore from "./components/explore/Explore";
import Home from "./components/home/Home";
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
        <Route path={`/dashboard/following`} element={<FollowsList />} />
        <Route path={`/dashboard/following/:user`} element={<FollowGames />} />
        <Route path={`/search/games`} element={<SearchResults />} />
        <Route path="/signout" element={<Navigate to="/explore" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
