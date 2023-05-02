import { SerializedError } from '@reduxjs/toolkit';

export interface IError extends SerializedError {
  data?: {
    message: string;
    stack: string;
  };
  error?: {
    message: string;
    code: number;
  };
  status?: number;
}


export type VerificationToken = {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
};

export type JobSearchParams = {
  page?:number;
  count?:number;
  total?:number;
  id_vacancy?: number;
  ids?: number[];
  id_client?: number;
  id_user?: number;
  id_resume?: number;
  id_subs?: number;
  date_published_from?: number;
  date_published_to?: number;
  sort_new?: number;
  published?: number;
  published_all?: boolean | number;
  archive?: boolean | number;
  not_archive?: boolean | number;
  keyword?: string;
  keywords?: {
    srws: number;
    skwc: string;
    keys?: string;
  }[];
  order_field?: "date" | "payment";
  order_direction?: "asc" | "desc";
  period?: 1 | 3 | 7 | 30;
  payment_from?: number;
  payment_to?: number;
  no_agreement?: number;
  town?: string | number;
  m?: number[];
  t?: number[];
  o?: number[];
  c?: number[];
  catalogues?: number | string[] | number[];
  place_of_work?: number;
  moveable?: number;
  agency?: number;
  type_of_work?: number;
  age?: number;
  gender?: number;
  education?: number;
  experience?: number;
  driving_licence?: string[];
  driving_particular?: number;
  language?: number;
  lang_level?: number;
  languages_particular?: number;
  nolang?: number;
}


export  type Authorization = {
  login:string;
  password:string;
  client_id: number;
  client_secret:string;
  hr?: number;
 }

type IdTitle = {
  id: number;
  title: string;
};

export type CardProps = {
  id: number;
  profession: string;
  id_client?: number;
  id_user?: number;
  code?: string;
  external_url?: string;
  refresh_vac?: boolean;
  extend_vac?: boolean;
  resumesubscription_status?: boolean;
  resumesubscription_keywords?: string;
  resumesubscription_kwc?: string;
  resumesubscription_rws?: number;
  date_pub_to: number | Date;
  date_archived : number| Date;
  date_published: number| Date;
  work?: string;
  compensation?: string;
  address?: string;
  candidat?: string;
  town:{
    id: number;
    title: string;
    declension?: string;
    genitive?: string;
  };
  type_of_work?:IdTitle;
  place_of_work?:IdTitle;
  education?:IdTitle;
  agency?:IdTitle;
  experience?:IdTitle;
  maritalstatus?:IdTitle;
  children?:IdTitle;
  languages?:IdTitle[];
  catalogues:IdTitle[];
  is_archive: boolean;
  is_storage: boolean;
  contact?: string;
  email?: string;
  url?: string;
  phone?: string;
  fax?: string;
  already_sent_on_vacancy?: boolean;
  favorite?: boolean;
  driving_licence?: string[];
  metro?:{
    id: number;
    title: string;
    id_metro_line?: number;
  }[];
  agreement?: boolean;
  payment_from?: number;
  payment_to?: number;
  currency: string;
  moveable?: boolean;
  gender?:IdTitle;
  age_from?: number;
  age_to?: number;
  firm_name: string;
  firm_activity: string;
  client_logo?: string;
  link: string;
  views_count?: number;
  resumes_all?: number;
  resumes_new?: number;
  moderation_order: string;
  canEdit: boolean;
  extended_search_parameters: {
    o: number;
    c: number;
  }[];
};


export type ResponseVacancies = {
  objects: CardProps[];
  
};


export type Position = {
  title_rus: string;
  url_rus: string;
  title: string;
  id_parent: number;
  key: number;
}

export type Catalogue = {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: Position[];
}