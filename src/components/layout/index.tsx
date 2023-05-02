import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { LoadingScreen } from '../atoms/loading';

import {
  AppShell,
  Header,
} from "@mantine/core"
import styles from './stylesLayout.module.css';
import { IError } from '../../models';
import { ServerError } from '../atoms/Modal/ServerError/server-error';
import { Links } from '../header/Links';
import { API } from '../../store/services/Service';

export const Layout = () => {
  const { data: tokenData } = API.useAuthorizationUserQuery({ login: 'sergei.stralenia@gmail.com', password: 'paralect123', client_id: 2356, client_secret: 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948', hr: 0 })
  const [rejectedEndpointName, setRejectedEndpointName] = useState<string | undefined>('undefined');
  const queries = useAppSelector((state) => state.api.queries);
  const mutations = useAppSelector((state) => state.api.mutations);
  const isSomeQueryPending = Object.values(queries).some((query) => query?.status === 'pending');
  const isSomeMutationPending = Object.values(mutations).some(
    (query) => query?.status === 'pending'
  );

  localStorage.setItem('tokenData', JSON.stringify(tokenData));
  if (tokenData?.access_token) localStorage.setItem('token', tokenData?.access_token);

  useEffect(() => {
    const rejectedQuery = Object.values(queries).find((query) => query?.status === 'rejected');

    if (rejectedQuery && rejectedQuery.endpointName) {
      if (rejectedQuery?.error?.message) {
        setRejectedEndpointName(rejectedQuery.error?.message);
      } else setRejectedEndpointName('ошибка запроса');
    } else {
      setRejectedEndpointName(undefined);
    }
  }, [queries]);

  useEffect(() => {
    const rejectedMutation = Object.values(mutations).find(
      (mutation) => mutation?.status === 'rejected'
    );

    const serverError = rejectedMutation?.error as IError;
    if (rejectedMutation && rejectedMutation.endpointName) {
      if (serverError?.error?.message) {
        setRejectedEndpointName(serverError.error.message);
      } else setRejectedEndpointName('ошибка с сервера на мутацию');
    } else {
      setRejectedEndpointName(undefined);
    }
  }, [mutations]);
  return (
    <AppShell
      styles={{
        main: {
          background: '#F5F5F5',
          width: "100%",
          height: "100%",
          paddingLeft: '0px',
          paddingRight: '0px',
          display: 'flex',
          justifyContent: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '85px',
          letterSpacing: ' 0.045em',
        }
      }}
      fixed

      header={
        <Header height={84} p="md">
          <div  className={styles.heder}>
            <div className={styles.heder__logo} >   <div className='logo' />Jobored</div>
            <Links />
          </div>
        </Header>
      }

    >
      <>     {isSomeQueryPending && <LoadingScreen />}
        {isSomeMutationPending && <LoadingScreen />}
        {rejectedEndpointName && (
          <ServerError
            message={rejectedEndpointName}
            close={() => setRejectedEndpointName(undefined)} />
        )}</>
      <Outlet />
    </AppShell>

  );
};
