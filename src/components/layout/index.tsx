import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ico from '../../assets/svg/Union.svg'
import { useAppSelector } from '../../store';
import { LoadingScreen } from '../atoms/loading';

import {
  AppShell,
  Header,
  Image,
} from "@mantine/core"


import { IError } from '../../models';
import { ServerError } from '../atoms/Modal/ServerError/server-error';
import { Links } from '../header/Links';
import { API } from '../../store/services/Service';

export const Layout = () => {
  const { data: tokenData } = API.useAuthorizationUserQuery({login: 'sergei.stralenia@gmail.com', password:'paralect123', client_id:2356, client_secret:'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948', hr:0} )
  const [rejectedEndpointName, setRejectedEndpointName] = useState<string | undefined>('undefined');
  const queries = useAppSelector((state) => state.api.queries);
  const mutations = useAppSelector((state) => state.api.mutations);
  const isSomeQueryPending = Object.values(queries).some((query) => query?.status === 'pending');
  const isSomeMutationPending = Object.values(mutations).some(
    (query) => query?.status === 'pending'  
  );

  localStorage.setItem('tokenData', JSON.stringify(tokenData));
if(tokenData?.access_token) localStorage.setItem('token', tokenData?.access_token);
  
  useEffect(() => {
    const rejectedQuery = Object.values(queries).find((query) => query?.status === 'rejected');

    if (rejectedQuery && rejectedQuery.endpointName) {
      // setRejectedEndpointName(displayError(rejectedQuery.endpointName));
      // setRejectedEndpointName(rejectedQuery.error?.message);
      if (rejectedQuery?.error?.message) {
        setRejectedEndpointName(rejectedQuery.error?.message);
      } else setRejectedEndpointName('ошибка квери');
    } else {
      setRejectedEndpointName(undefined);
    }
  }, [queries]);

  useEffect(() => {
    const rejectedMutation = Object.values(mutations).find(
      (mutation) => mutation?.status === 'rejected'
    );
    // тут по хорошему серилизовать бы кастомную ошибку, но у меня пока не вышло
    const serverError = rejectedMutation?.error as IError;
    if (rejectedMutation && rejectedMutation.endpointName) {
      // setRejectedEndpointName(displayError(rejectedMutation.endpointName));
      if (serverError?.data?.message) {
        setRejectedEndpointName(serverError.data.message);
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
            width: "100vw",
            height: "100%",
            paddingLeft: '0px',
            display: 'flex',
    
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }
        }}
        fixed

        header={
          <Header height={84} p="md">
            <div style={{
              display: "flex", alignItems: 'center', height: "100%", maxWidth: "1440px", marginLeft: 'auto', paddingLeft: '160px',
              marginRight: 'auto',
              paddingRight: '300px',
            }}>


              <div style={{
                display: 'flex', gap: '7px', alignItems: 'center', fontFamily: 'Poppins', fontWeight: '600',
                fontSize: '24px', lineHeight: '36px', letterSpacing: '-0.02em'
              }}>   <Image maw={30} mx="auto" radius="md" src={ico} alt="Random image" />Jobored</div>
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
