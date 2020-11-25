<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img class="navbar__logo" src="../assets/img/logo.jpg" alt="">
      </a>

      <a
        @click="toggleNavBar"
        v-bind:class="{'is-active': isOpen}"
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

    <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
      <div class="navbar-start">
        <a class="navbar-item"> Home </a>

        <a class="navbar-item"> Documentation </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>

          <div class="navbar-dropdown">
            <a class="navbar-item"> About </a>
            <a class="navbar-item"> Jobs </a>
            <a class="navbar-item"> Contact </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Report an issue </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a @click="doLogout" class="button is-light"> Log out </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    name: "NavBarComponent",
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        // afunction for toggling the navbar
        // bulma doesn't brings any javascript
        toggleNavBar() {
            this.isOpen = !this.isOpen
        },
        doLogout() {

        }
    }
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