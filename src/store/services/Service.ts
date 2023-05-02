

import { Authorization, CardProps, Catalogue, JobSearchParams, ResponseVacancies, VerificationToken } from '../../models';
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
          console.error('token error', e);
        }
      },
    }),

    vacanciesSearch: build.query< ResponseVacancies, JobSearchParams>({
      query: ({published=1,  count = 100,  keyword = '', no_agreement=1,  payment_from = null, payment_to = null, catalogues = [] }) => ({
        url: Url.PATH_VACANCIES,
        params: {
          count,
          no_agreement,
          published,
          keyword,
          catalogues,
          payment_from,
          payment_to,
          // ...(payment_from !== null? { payment_from } : {}),
          // ...(payment_to !== null  ? { payment_to } : {}),
        },
       }),
    
    }),
    getVacanciesById: build.query<CardProps, string>({
      query: (id) => ({ url: `${Url.BASE_URL}${Url.PATH_VACANCIES}${id}` }),

    }),
    getCatalogues: build.query<Catalogue[], void>({
      query: () => ({ url: Url.PATH_CATALOGUES  }),

    }),

  }),
});
