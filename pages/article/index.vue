<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleComponents v-if="user" :article="article" />
          <p show-authed="false" style="display: inherit" v-else>
            <nuxt-link ui-sref="app.login" to="/login">Sign in</nuxt-link> or
            <nuxt-link ui-sref="app.register" to="/register">sign up</nuxt-link> to add
            comments on this article.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta";
import ArticleComponents from "./components/article-components";
import { mapState } from "vuex";

export default {
  name: "ArticleIndex",
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug);
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  components: {
    ArticleMeta,
    ArticleComponents,
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style>
</style>
