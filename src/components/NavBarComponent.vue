<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img class="navbar__logo" src="../assets/img/logo.jpg" alt="" />
      </router-link> 

      <a
        @click="toggleNavBar"
        v-bind:class="{ 'is-active': isOpen }"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      v-bind:class="{ 'is-active': isOpen }"
    >
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/">Create Room</router-link>

        <!-- <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>
          <div class="navbar-dropdown">
            <a class="navbar-item"> About </a>
            <a class="navbar-item"> Jobs </a>
            <a class="navbar-item"> Contact </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Report an issue </a>
          </div>
        </div> -->
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template>
              <router-link class="button is-primary" to="/">
                <strong>Profile</strong>
              </router-link>
              <a @click="doLogout" class="button is-light">Log out</a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavBarComponent",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    // afunction for toggling the navbar
    // bulma doesn't brings any javascript
    toggleNavBar() {
      this.isOpen = !this.isOpen;
    },
    async doLogout() {
      try {
        await this.$store.dispatch("user/doLogout")
        this.$router.push({ name: "auth" })
        this.$toast.success("Logged out");
      } catch (error) {
        this.$toast.error(error.message);
        console.error(error.message) 
      }
    },
  },
  computed: {
    // module:user, property:[user]
    ...mapState("user", ["user"]),
  },
};
</script>

<style lang="scss" scoped>
.navbar-item img {
  max-height: none;
}
.navbar__logo {
  width: 150px;
  height: auto;
}
</style>
