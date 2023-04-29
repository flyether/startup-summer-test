
import { Authorization, JobSearchParams, ResponseVacancies, VerificationToken } from '../../models';
import { Url } from '../../models/constants';
import { setToken } from '../slices/Slice';

import { commonApi } from './common.api';

export const API = commonApi.injectEndpoints({
  endpoints: (build) => ({
    authorizationUser: build.query< VerificationToken, Authorization>({
      query: ({ login, password, client_id, client_secret, hr }) => ({ 
        url: Url.PATH_AUTH,
        params: { login, password, client_id, client_secret, hr },
       }),
       async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setToken(result.data.access_token));
      
        } catch (e) {
          console.error('userApi getByID error', e);
        }
      },
    }),

    vacanciesSearch: build.query< ResponseVacancies, JobSearchParams>({
      query: ({published=1, keyword = '', payment_from = 0, payment_to = 0, catalogues = [] }) => ({
        url: Url.PATH_VACANCIES,
        params: {published, keyword, payment_from, payment_to, catalogues },
       }),
    
    }),
    
    // authorizationUser: build.mutation<UserResponse, AuthorizationData>({
    //   query: (userInfo) => ({
    //     url: '/oauth2/password/',
    //     method: 'POST',
    //     body: userInfo,
    //   }),
    //   async onQueryStarted({}, { dispatch, queryFulfilled }) {
    //     try {
    //       const result = await queryFulfilled;
    //       // dispatch(setUser(result.data));
    //     } catch (e) {
    //       console.error('userApi Authorization error', e);
    //     }
    //   },
    // }),

    // setPassword: build.mutation<UserResponse, IResetPassword>({
    //   query: (userInfo) => ({
    //     url: 'users/set_password/',
    //     method: 'POST',
    //     body: userInfo,
    //   }),
    // }),

    // verificationTokenPost: build.mutation<UserResponse, VerificationToken>({
    //   query: (token) => ({
    //     url: '/validate-email',
    //     method: 'POST',
    //     body: token,
    //   }),
    //   async onQueryStarted({}, { dispatch, queryFulfilled }) {
    //     try {
    //       const result = await queryFulfilled;
    //       // dispatch(setUser(result.data));
    //     } catch (e) {
    //       console.error('userApi Authorization error', e);
    //     }
    //   },
    // }),
  }),
});
