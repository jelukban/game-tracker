import { React, useState, useEffect, Fragment } from "react";
import {
  Link,
  BrowserRouter,
  Route,
  Navigate,
  Routes,
  redirect,
  useNavigate,
} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import CreateAccount from "./CreateAccount.js";
import GamePage from "./GamePage.js";
import LoginPage from "./LoginPage.js";
import Navigationbar from "./Navbar.js";
import LoadScreen from "./LoadScreen.js";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(() => {
    const userInput = JSON.parse(secureLocalStorage.getItem("user"));
    if (userInput !== null) {
      setIsLoggedIn(true);
      return userInput;
    }
    return "";
  });

  const [gameId, setGameId] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [searchGames, setSearchGames] = useState([]);
  const [showError, setShowError] = useState({ show: false, message: "" });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.authorization === true) {
          let tempData = {
            id: result.data.user_id,
            firstName: result.data.first_name,
            lastName: result.data.last_name,
            email: result.data.email,
          };
          setUser(tempData);
          secureLocalStorage.setItem("user", JSON.stringify(tempData));
          setIsLoggedIn(true);
        } else if (result.message === "Account not found") {
          setShowError({
            show: true,
            message: "Account not found or password incorrect",
          });
        }
      });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    fetch("/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.has_account === "True") {
          let tempData = {
            id: result.user_id,
            firstName: result.first_name,
            lastName: result.last_name,
            email: result.email,
            password: result.password,
          };
          setUser(tempData);
          secureLocalStorage.setItem("user", JSON.stringify(tempData));
          setIsLoggedIn(true);
        } else if (result.status === "Requirements not filled") {
          setShowError({ show: true, message: "Requirements not filled" });
        } else if (result.status === "Account with this email already exists") {
          setShowError({
            show: true,
            message: "Account with this email already exists",
          });
        }
      });
  };

  const handleSignOut = (e) => {
    setUser({});
    secureLocalStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const handleSearchResults = (e) => {
    e.preventDefault();

    let queryString = new URLSearchParams({
      gameName: searchName,
    }).toString();
    let url = `/search/games?${queryString}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setSearchGames(result.data);
      });
  };

  return (
    <BrowserRouter>
      <Navigationbar
        isLoggedIn={isLoggedIn}
        signOut={handleSignOut}
        handleSearchResults={handleSearchResults}
        setSearchName={(e) => setSearchName(e.target.value)}
        user={user}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to={`/dashboard/${user.id}/recommendations`} />
            ) : (
              <LoginPage
                handleSubmit={handleLoginSubmit}
                setEmail={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                setPassword={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                showError={showError}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to={`/dashboard/${user.id}/recommendations`} />
            ) : (
              <CreateAccount
                handleSubmit={handleCreateSubmit}
                setFirstName={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                setLastName={(e) =>
                  setUser({ ...user, lastName: e.target.value })
                }
                setEmail={(e) => setUser({ ...user, email: e.target.value })}
                setPassword={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                showError={showError}
              />
            )
          }
        />
        <Route
          path={`/dashboard/${user.id}/recommendations`}
          element={<UserRecommendations user={user} />}
        />
        <Route
          path={`/dashboard/${user.id}/interests`}
          element={<UserInterests user={user} />}
        />
        <Route
          path={`/dashboard/${user.id}/gamesplayed`}
          element={<UserPlayedGames user={user} />}
        />
        <Route
          path={`/games/details/:game_id`}
          element={<VideoGameDetails isLoggedIn={isLoggedIn} user={user} />}
        />
        <Route path="/find" element={<SearchUsers followerUserInfo={user} />} />
        <Route
          path={`/dashboard/${user.id}/following`}
          element={<Follows user={user} />}
        />
        <Route
          path={`/dashboard/${user.id}/following/:followUserId`}
          element={<FollowGames userId={user.id} />}
        />
        <Route
          path="/search/results"
          element={<SearchResults games={searchGames} />}
        />
        <Route path="/signout" element={<Navigate to="/explore" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
