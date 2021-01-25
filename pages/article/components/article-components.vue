<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="$store.state.user.image" class="comment-author-img" />
        <button @click="addComment" class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
        <span class="mod-options" v-if="isEditor(comment.author.username)" @click="deleteComment(comment.id)">
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments, deleteComments } from "@/api/article";
export default {
  name: "ArticleComponents",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isEditor() {
      return (name) => this.$store.state.user.username === name;
    },
  },
  data() {
    return {
      comments: [],
      body: "",
    };
  },
  async mounted() {
    this.commentsList()
  },
  methods: {
    async commentsList() {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
    async addComment() {
      const { data } = await addComments({
        slug: this.article.slug,
        comment: { body: this.body },
      });
    },
    async deleteComment(id) {
      const {data} = await deleteComments({
        id,
        slug: this.article.slug
      })
      this.commentsList()
    }
  },
};
</script>

<style>
</style>
