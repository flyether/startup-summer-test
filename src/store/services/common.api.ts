import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { Url } from '../../models/constants';
import { RootState } from '../store';
import { IError } from '../../models/interfaces';

export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: Url.BASE_URL,

    prepareHeaders: (headers, { getState }) => {
      // const token = localStorage.getItem('token');
      const token = (getState() as RootState).commonSlice.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      headers.set('x-secret-key', 'GEU4nvd3rej*jeh.eqp');
      headers.set('X-Api-App-Id', `v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948`)
      return headers;
    },
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    IError,
    Record<string, unknown>,
    FetchBaseQueryMeta
  >,

  tagTypes: ['vac'],
  endpoints: (_) => ({}),
});
