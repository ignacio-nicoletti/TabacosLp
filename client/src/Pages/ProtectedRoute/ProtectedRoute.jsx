import {Navigate, Outlet, useLocation} from 'react-router-dom';

import {GetDecodedCookie} from '../../utils/DecodedCookie';
// import {getUserDetail} from '../../functions/fetchingUsers';
import {useEffect, useRef, useState} from 'react';
import {DecodedToken} from '../../utils/DecodedToken';
import InstanceOfAxios from '../../utils/intanceAxios';

export const ProtectedRoute = ({children}) => {
  const {pathname} = useLocation ();
  const UserRoutes = ['/profile'];
  const AdminRoutes = ['/admin/home'];

  const rolRef = useRef (null);
  const [isLoading, setIsLoading] = useState (true);
  const token = GetDecodedCookie ('cookieToken');

  useEffect (
    () => {
      const fetchData = async () => {
        if (token) {
          const {value} = DecodedToken (token); //devuelve el id del user
          if (value) {
            try {
              let data;
              data = await InstanceOfAxios (
                `${process.env.REACT_APP_URL_API}/admin/${value}`,
                'GET',
                undefined,
                token
              );

              if (data === null) {
                data = await InstanceOfAxios (
                  `${process.env.REACT_APP_URL_API}/user/${value}`,
                  'GET',
                  undefined,
                  token
                );
              }
             
              rolRef.current = data.Rol; //Declara el rol
            } catch (error) {
              rolRef.current = null; //manejar el error
            } finally {
              setIsLoading (false); //finaliza la promesa y pone el loading en false
            }
          }
        }
      };

      fetchData ();
    },
    [token]
  );

  if (isLoading) {
    return <div>Loading...</div>;

    //aca poner un skeleton
  }

  if (token === undefined) {
    return <Navigate to={'/login'} />;
  }

  if (rolRef.current === 'ROL_User' && !UserRoutes.includes (pathname)) {
    return <Navigate to={'/login'} />;
  }

  if (rolRef.current === 'ROL_Admin' && !AdminRoutes.includes (pathname)) {
    return <Navigate to={'/login'} />;
  }
  return children;
};
