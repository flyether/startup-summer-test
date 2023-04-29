import { Routes, Route, Navigate } from 'react-router-dom';

import { WelcomePage } from '../../pages/WelcomePage';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import ErrorBoundary from '../../utils/ErrorBoundary';
import { Layout } from '../layout';
import { Url } from '../../models/constants';


const GlobalRoute = () => {
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <Layout />
          </ErrorBoundary>
        }
      >
        <Route index={true} element={<Navigate to={Url.PATH_FIND}  />} />

      


        <Route index={true} element={<WelcomePage />} />
        <Route path={Url.PATH_FIND}  element={<WelcomePage />} />
        <Route path={Url.PATH_FAVORITE} element={<WelcomePage />} />
        <Route path="registration" element={<WelcomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route />
      </Route>
    </Routes>
  );
};

export default GlobalRoute;
