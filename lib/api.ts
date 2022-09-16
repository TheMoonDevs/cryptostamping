import useSWR from "swr";
import axios, {AxiosRequestConfig} from "axios";
import "whatwg-fetch";
import {
  IN_DEV_ENV,
  FRONTEND_BASE_URL,
  API_BASE_URL
} from "lib/data";

export const addAuth = () =>
  /* if (localStorage.getItem('jinglefm_token')) {
    return {'Authorization': localStorage.getItem('jinglefm_token') }
  } */
  ({});

export const updateOptions = (options) => {
  const update = { ...options };
  /* if (localStorage.getItem('jinglefm_token')) {
    update.headers = {
      ...update.headers,
      Authorization;: localStorage.getItem("jinglefm_token");,
      'Content-Type': 'application/json'
    };
  }
  else {
    update.headers = {
      ...update.headers,
      Authorization: '',
      'Content-Type': 'application/json'
    };
  } */
  return update;
};
export const plain_fetcher = (url, options) =>
  fetch(url, options).then((res) => res.json());
export const fetcher = (url, options) =>
  fetch(url, updateOptions(options)).then((res) => res.json());

export const useSimple = (TokenExists, url) => {
  const { data, error, isValidating, mutate } = useSWR(
    TokenExists ? API_BASE_URL + url : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    loading: !error && !data,
    updating: isValidating,
    data: data && !error ? data : null,
    error,
    refresh: mutate,
  };
};

export async function getSimple(url) {
  const options: AxiosRequestConfig<any>= {
    url: url,
    method: "GET"
  };
  return axios(options);
}

export async function getPlainFormPromise(url, file) {
  const form_options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  formData.append("media", file);
  // console.log(file);
  console.log(url);
  return axios.post(url, formData, form_options);
}

export async function getAuthFormPromise(url, auth, formData) {
  const form_options = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: auth,
    },
  };
  return axios.post(url, formData, form_options);
}

export async function getSimpleRequestPromise(url, cancelToken) {
  const options: AxiosRequestConfig<any> = {
    url: API_BASE_URL + url,
    method: "GET",
    headers: addAuth(),
  };
  if (cancelToken) options.cancelToken = cancelToken;
  return axios(options);
}

export async function getSimplePostPromise(url, data) {
  const options: AxiosRequestConfig<any> = {
    url: API_BASE_URL + url,
    method: "POST",
    data,
    headers: addAuth(),
  };
  return axios(options);
}

export async function getSimpleUpdatePromise(url, data) {
  const options: AxiosRequestConfig<any> = {
    url: API_BASE_URL + url,
    method: "PUT",
    data,
    headers: addAuth(),
  };
  return axios(options);
}

export async function getSimpleDeletePromise(url) {
  const options: AxiosRequestConfig<any> = {
    url: API_BASE_URL + url,
    method: "DELETE",
    headers: addAuth(),
  };
  return axios(options);
}
