import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Layout from '../components/layout';
import AuthService from '../services/AuthService';

function PublicRouting() {
  const publicRoutes = [
    {
      exact: true,
      route: '/home',
      component: React.lazy(() => import('../pages/Home/index')),
    },
  ];

  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => <Component {...props} />} />
  );

  return (
    <Routes>
      {publicRoutes.map((item, index) => (
        <PublicRoute
          key={index}
          exact={item.exact}
          path={item.route}
          component={item.component}
        />
      ))}
    </Routes>
  );
}

const PrivateRouting = ({ version, history }) => {
  const loading = false;
  const routes = [
    {
      exact: true,
      route: '/',
      component: React.lazy(() => import('../pages/Home/index')),
    },
  ];

  const handleClickTitle = (event) => {
    event.preventDefault();
    history.push('/');
  };

  async function setToken(token) {
    await localStorage.setItem('token', token);
  }

  function getToken() {
    const token = localStorage.getItem('token');
    return token === undefined ? false : token;
  }

  if (!getToken()) {
    return <Login setToken={setToken} />;
  }

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          AuthService.isAuthenticated() ? (
            <Component history={history} {...props} />
          ) : (
            <Navigate
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />
    );
  };

  if (loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color='primary' />
      </Backdrop>
    );
  }

  return (
    <React.Fragment>
      <Layout
        title='Federação Mapeada'
        version={version}
        onClickTitle={handleClickTitle}
        content={
          <Routes>
            {routes.map((item, index) => (
              <PrivateRoute
                key={index}
                exact={item.exact}
                path={item.route}
                component={item.component}
              />
            ))}
          </Routes>
        }
      />
    </React.Fragment>
  );
};

function Router({ version }) {
  const history = useNavigate();

  function Routing() {
    if (window.location.pathname.search('/public/') !== -1)
      return <PublicRouting />;
    else return <PrivateRouting version={version} history={history} />;
  }

  return <Routing />;
}

export default Router;
