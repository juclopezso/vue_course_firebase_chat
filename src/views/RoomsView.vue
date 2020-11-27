<template>
  <div class="home">
    <div class="section">
      <div class="container has-text-center">
        <template v-if="!user"></template>
        <button v-if="!user" @click="doLogin" class="button">Login with Google</button>
        <template v-else>
          <h1 class="title has-text-centered">Hi {{ user.displayName }}</h1>
        <button @click="doLogout" class="button">Logout</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { fb, auth } from "@/firebase.js"
import { mapGetters } from 'vuex';

export default {
  name: 'RoomsView',
  data() {
    return {
    }
  },
  methods: {
    async doLogin() {
      try {
        const provider = new fb.auth.GoogleAuthProvider();
        const user = await auth.signInWithPopup(provider);
        this.user = user.user;
      } catch (error) {
        console.error(error.message)
      }
    },
    async doLogout() {
      try {
        await auth.signOut();
        this.user = null;
      } catch (error) {
        console.error(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
}
</script>
