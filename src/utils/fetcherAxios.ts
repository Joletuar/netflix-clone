import axios from 'axios';

export const fetcherAxios = (url: string) =>
  axios.get(url).then((res) => res.data);
