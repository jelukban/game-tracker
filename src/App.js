import { React } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CreateAccount from "./components/createAccount/CreateAccount";
import LoginPage from "./components/login/LoginPage";
import NavigationBar from "./components/common/navigation/NavigationBar.jsx";
import UserRecommendations from "./components/profile/UserRecommendations";
import UserInterests from "./components/common/user/UserInterests";
import UserPlayedGames from "./components/common/user/UserPlayedGames";
import VideoGame from "./components/videoGame/VideoGame.jsx";
import SearchUsers from "./components/search/SearchUsers";
import Follows from "./components/profile/Follows";
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
        <Route path={`/games/details/:game_id`} element={<VideoGame />} />
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
