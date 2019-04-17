import {
  VuexModule,
  Module,
  getModule,
  MutationAction,
  Mutation,
  Action
} from 'vuex-module-decorators';
import store from '@/store';
import { User, Profile, UserSubmit } from './modules';
import { loginUser, getProfile } from '../api';

@Module({
  namespaced: true,
  name: 'users',
  store,
  dynamic: true
})
class UsersModule extends VuexModule {
  public user: User | null = null;
  public profile: Profile | null = null;

  get username() {
    return (this.user && this.user.username) || null;
  }

  @Mutation public setUser(user: User) {
    this.user = user;
  }
  @Action({ commit: 'setUser' })
  public async login(userSubmit: UserSubmit) {
    try {
      const user = await loginUser(userSubmit);
      console.log(`Got response user = ${JSON.stringify(user)}`);
      return user;
    } catch (e) {
      console.error(e);
      throw new Error('Invalid username or password');
    }
  }

  @Mutation public setProfile(profile: Profile) {
    this.profile = profile;
  }
  @Action({ commit: 'setProfile' })
  public async loadProfile(username: string) {
    const profile = await getProfile(username);
    return profile;
  }
}

export default getModule(UsersModule);
