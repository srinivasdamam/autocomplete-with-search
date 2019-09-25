import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://www.mocky.io/v2/',
});

export function fetchUsers() {
  const usersResourceId = '/5ba8efb23100007200c2750c';
  return Api.get(usersResourceId);
}
