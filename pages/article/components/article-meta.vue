<template>
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
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <template v-if="!isEditor">
      <button
        :class="{
          active: article.author.following,
        }"
        class="btn btn-sm btn-outline-secondary"
        @click="onFollowUser(article.author.following)"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ article.author.following ? "Unfollow" : "Follow" }}
        {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button
        :class="{
          active: article.favorited,
        }"
        class="btn btn-sm btn-outline-primary"
        @click="onFavorite(article.favorited)"
      >
        <i class="ion-heart"></i>
        &nbsp; {{ article.favorited ? "unFavorite Post" : "Favorite Post" }}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary" @click="editorArticle">
        <i class="ion-edit"></i>
        &nbsp; Edit Article
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a"></i>
        &nbsp; Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import {
  deleteArticles,
  followUser,
  deleteFollowUser,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isEditor() {
      return this.$store.state.user.username === this.article.author.username;
    },
  },
  methods: {
    editorArticle() {
      this.$router.push({
        name: "editorArticle",
        params: {
          slug: this.article.slug,
        },
      });
    },
    async deleteArticle() {
      const { data } = await deleteArticles(this.article.slug);
      this.$router.push({
        name: "profile",
        params: {
          username: this.$store.state.user.username,
        },
      });
    },
    async onFollowUser(type) {
      const { data } = type
        ? await deleteFollowUser(this.article.author.username)
        : await followUser(this.article.author.username);
      this.article.author.following = data.profile.following;
    },
    async onFavorite(type) {
      const { data } = type
        ? await deleteFavorite(this.article.slug)
        : await addFavorite(this.article.slug);
      this.article = data.article;
    },
  },
};
</script>

<style>
</style>
