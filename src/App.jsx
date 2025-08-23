import { Button } from "antd";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import MovieDetailPage from "./pages/movie-detail";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomeTemplate from "./template/HomeTemplate";
import AuthTemplate from "./template/AuthTemplate";
import { renderRoutes } from "./routers";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
