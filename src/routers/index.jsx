import { Route } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import MovieDetailPage from "../pages/movie-detail";
import RegisterPage from "../pages/register";
import AuthTemplate from "../template/AuthTemplate";
import HomeTemplate from "../template/HomeTemplate";
import AuthCheck, { roleUser } from "../HOC/AuthCheck";
import UserInforPage from "../pages/info-user";
import AdminTemplate from "../template/AdminTemplate";
import AdminHomepage from "../pages/admin/home";
import MovieAdminPage from "../pages/admin/movie";

const routers = [
  {
    path: "",
    element: <HomeTemplate />,
    child: [
      {
        path: "",
        element: (
          <AuthCheck>
            <HomePage />
          </AuthCheck>
        ),
      },
      {
        path: "/detail/:movieId",
        element: (
          <AuthCheck isNeedLogin={true}>
            <MovieDetailPage />
          </AuthCheck>
        ),
      },
      {
        path: "/info",
        element: (
          <AuthCheck isNeedLogin={true}>
            <UserInforPage />
          </AuthCheck>
        ),
      },
    ],
  },
  {
    path: "",
    element: <AuthTemplate />,
    child: [
      {
        path: "/login",

        element: (
          <AuthCheck isNeedLogin={false}>
            <LoginPage />,
          </AuthCheck>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthCheck isNeedLogin={false}>
            <RegisterPage />,
          </AuthCheck>
        ),
      },
    ],
  },
  {
    element: <AdminTemplate />,
    path: "/admin",
    child: [
      {
        path: "",
        element: (
          <AuthCheck isNeedLogin={true} pagePermission={roleUser.ADMIN}>
            <AdminHomepage />
          </AuthCheck>
        ),
      },
      {
        path: "movie",
        element: (
          <AuthCheck isNeedLogin={true} pagePermission={roleUser.ADMIN}>
            <MovieAdminPage />
          </AuthCheck>
        ),
      },
    ],
  },
];

export const renderRoutes = () => {
  return routers.map((template, index) => {
    return (
      <Route path={template.path} element={template.element} key={index}>
        {/* <Route path="" element={<HomePage />} />
            <Route path="/detail" element={<MovieDetailPage />} /> */}
        {template.child.map((item, indexChild) => {
          return (
            <Route path={item.path} element={item.element} key={indexChild} />
          );
        })}
      </Route>
    );
  });
};
