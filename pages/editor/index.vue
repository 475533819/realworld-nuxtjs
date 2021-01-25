<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template v-for="(error, field) in errors">
              <li v-for="(message, index) in error" :key="field + index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="articleForm.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="articleForm.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="articleForm.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="articleForm.tagList"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticles, getArticle, updateArticles } from "@/api/article";
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: ["authenticated"],
  name: "EditorIndex",
  data() {
    return {
      articleForm: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      errors: {},
    };
  },
  computed: {
    isEditor() {
      return this.$route.params.slug;
    },
  },
  watch: {
    $route: "getPath",
  },
  mounted() {
    this.getPath();
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isEditor
          ? await updateArticles({
              article: this.articleForm,
              slug: this.$route.params.slug,
            })
          : await createArticles({
              article: this.articleForm,
            });
        this.$router.push(`/article/${data.article.slug}`);
      } catch (err) {
        this.errors = err.response.data.errors;
      }
    },
    async getArticleDetail() {
      try {
        const { data } = await getArticle(this.$route.params.slug);

        const { article } = data;
        this.articleForm.title = article.title;
        this.articleForm.description = article.description;
        this.articleForm.body = article.body;
        this.articleForm.tagList = article.tagList;
      } catch (err) {}
    },
    getPath() {
      if (this.isEditor) {
        this.getArticleDetail();
      } else {
        this.articleForm = {
          title: "",
          description: "",
          body: "",
          tagList: [],
        };
      }
    },
  },
};
</script>

<style>
</style>
