import axios from 'axios';

export const fetchRandomUsers = async (results = 5) => {
  const { data } = await axios.get(`https://randomuser.me/api/?results=${results}`);
  return data.results;
};
