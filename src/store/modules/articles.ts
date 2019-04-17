import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from 'vuex-module-decorators';
import store from '@/store';
import { Article } from './modules';
import * as api from '../api';

@Module({
  dynamic: true,
  namespaced: true,
  name: 'articles',
  store
})
class ArticlesModule extends VuexModule {
  public globalFeed: Article[] = [];
  public usersFeed: Article[] = [];

  @Mutation
  public setGlobalFeed(articles: Article[]) {
    this.globalFeed = articles;
  }
  @Action({ commit: 'setGlobalFeed' })
  public async refreshGlobalFeed() {
    const globalFeed = await api.getGlobalFeed();
    return globalFeed.articles;
  }
}

export default getModule(ArticlesModule);
