<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userInfo.image" class="user-img" />
            <h4>{{ userInfo.username }}</h4>
            <p>
              {{ userInfo.bio }}
            </p>
            <button
              v-if="!isEditor"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
            <button v-else class="btn btn-sm btn-outline-secondary action-btn" @click="editorUser">
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  :class="{
                    active: tab === 'my_article',
                  }"
                  class="nav-link"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_article',
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  :class="{
                    active: tab === 'fav_article',
                  }"
                  class="nav-link"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'fav_article',
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img
                  :src="
                    article.author.image
                      ? article.author.image
                      : 'https://static.productionready.io/images/smiley-cyrus.jpg'
                  "
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date("MMM DD,YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                :class="{
                  active: item === page,
                }"
                v-for="item in totalPage"
                :key="item"
                class="page-item"
              >
                <nuxt-link
                  :to="{
                    name: 'profile',
                    query: {
                      page: item,
                      tab: tab,
                    },
                  }"
                  class="page-link"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/profile";
import { getArticles, addFavorite, deleteFavorite } from "@/api/article";

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: ["authenticated"],
  name: "ProfileIndex",
  async asyncData({ params, query, store }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 5;
    const tab = query.tab || "my_article";
    const { username } = params;
    let paramsList = {};
    tab === "my_article"
      ? (paramsList.author = username)
      : (paramsList.favorited = username);
    paramsList.limit = limit;
    paramsList.offset = (page - 1) * 2;
    const { data: data } = await getArticles(paramsList);
    const { articles, articlesCount } = data;

    const { data:userData } = await getUserProfile(params.username);
    const {profile: userInfo} = userData;

    return {
      tab,
      articles,
      articlesCount,
      page,
      limit,
      userInfo
    };
  },
  watchQuery: ["tab", "page"],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    isEditor() {
      return this.$store.state.user.username === this.userInfo.username;
    },
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        // 增加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
    editorUser() {
      this.$router.push('/settings')
    }
  },
};
</script>

<style>
</style>
