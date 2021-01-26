<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateUser">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="userInfo.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="userInfo.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="userInfo.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="userInfo.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="userInfo.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { update } from "@/api/user";
import { mapState } from "vuex";
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: ["authenticated"],
  name: "SettingsIndex",
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      userInfo: {
        email: "",
        username: "",
        password: "",
        image: "",
        bio: "",
      },
    };
  },
  mounted() {
    this.userDetail();
  },
  methods: {
    userDetail() {
      const { userInfo, user } = this;
      userInfo.email = user.email;
      userInfo.username = user.username;
      userInfo.password = user.password;
      userInfo.image = user.image;
      userInfo.bio = user.bio;
    },
    async updateUser() {
      const { data } = await update({ user: this.userInfo });
      this.$store.commit("setUser", data.user);
      this.$router.push(`/profile/${this.user.username}`);
    },
    logout() {
      this.$store.commit('setUser', null)
      Cookie.remove('user')
      this.$router.push('/')
    }
  },
};
</script>

<style>
</style>
