import { isLoggedInVar } from "../apollo";
import { LS_TOKEN } from "../constants";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Podcasts } from "../pages/listener/podcasts";
import { NotFound } from "../404";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Episodes } from "../pages/listener/episodes";
import { Search } from "../pages/listener/search";
import { EditeProfile } from "../pages/editProfile";
import React from "react";
import { MyPodcasts } from "../pages/host/my-podcasts";
import { AddPodcast } from "../pages/host/add-podcast";
import { MyPodcast } from "../pages/host/my-podcast";
import { AddEpisode } from "../pages/host/add-episode";

/*
const ListenerRoutes = [
    <Route key={1} path="/" exact>
        <Podcasts />
    </Route>,
    <Route key={2} path="/podcasts/:id">
        <Episodes />
    </Route>
];*/
//@todo edit profile search 추가필요
const listenerRoutes = [
  {
    path: "/",
    component: <Podcasts />,
  },
  {
    path: "/podcasts/:id",
    component: <Episodes />,
  },
  {
    path: "/search",
    component: <Search />,
  },
];

const commonRoutes = [
  {
    path: "/editprofile",
    component: <EditeProfile />,
  },
];

const hostRoutes = [
  {
    path: "/",
    component: <MyPodcasts />,
  },
  {
    path: "/add-podcast",
    component: <AddPodcast />,
  },
  {
    path: "/mypodcast/:id",
    component: <MyPodcast />,
  },
  {
    path: "/add-episode/:id",
    component: <AddEpisode />,
  },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Listener" &&
          listenerRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === "Host" &&
          hostRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map((route) => (
          <Route exact key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
