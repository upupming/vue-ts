import axios from 'axios';
import {
  UserSubmit,
  User,
  UserResponse,
  ArticleResponse,
  ProfileResponse
} from './modules/modules';

export const conduitApi = axios.create({
  baseURL: 'https://conduit.productionready.io/api'
});

export function setJWT(jwt: string) {
  conduitApi.defaults.headers.common['Authorization'] = `Token ${jwt}`;
}

export function clearJWT() {
  delete conduitApi.defaults.headers.common['Authorization'];
}

export async function loginUser(user: UserSubmit): Promise<User> {
  const response = await conduitApi.post('/users/login', {
    user
  });
  return (response.data as UserResponse).user;
}

export async function getGlobalFeed() {
  const response = await conduitApi.get('/articles');
  return response.data as ArticleResponse;
}

export async function getProfile(username: string) {
  const response = await conduitApi.get(`/profiles/${username}`);
  return (response.data as ProfileResponse).profile;
}
