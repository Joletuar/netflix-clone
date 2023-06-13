import axios from 'axios';

// fetcher para implementarlo con el swr

export const fetcherAxios = (url: string) =>
  axios.get(url).then((res) => res.data);
