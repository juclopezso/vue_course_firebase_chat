<template>
  <article class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <h1 class="title has-text-centered">Profile</h1>
          <!-- user profile form -->
          <form v-if="user" @submit.prevent="updateProfile">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  v-model="userData.name"
                  :placeholder="user.displayName"
                  class="input"
                  type="text"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="userData.email"
                  :placeholder="user.email"
                  class="input"
                  type="email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="userData.password"
                  class="input"
                  type="password"
                />
              </div>
            </div>
            <div class="field has-text-right">
              <div class="control">
                <button
                  type="submit"
                  class="button is-link"
                  :disabled="!hasDataChanged"
                  :class="{ 'is-loading': isLoading }"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
          <!-- end user profile form -->
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isLoading: false,
      userData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async updateProfile() {
        this.isLoading = true;
        try {
            await this.$store.dispatch("user/updateProfile", {
                name: this.userData.name,
                email: this.userData.email,
                password: this.userData.password
            }) 
            this.$toast.success("Account data updated")
            this.userData.name = this.userData.email = this.userData.password = ""
        } catch (error) {
            this.$toast.error(error.message)
            console.error(error.message);
        } finally {
            this.isLoading = false;
        }
    },
  },
  computed: {
    ...mapState("user", ["user"]),
    hasDataChanged() {
        return (
            // name exists and is different
            (this.userData.name && this.userData.name !== this.user.displayName) ||
            // email exists and is different
            (this.userData.email && this.userData.email !== this.user.email) ||
            // password exists
            this.userData.password.length
        )
    },
  },
};
</script>
