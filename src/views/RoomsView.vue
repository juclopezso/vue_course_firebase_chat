<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">
        Rooms
      </h1>
      <RoomsComponent :rooms="rooms" />
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import { db } from "@/firebase.js";
import { mapState } from "vuex";
import RoomsComponent from "@/components/RoomsComponent.vue";
export default {
  name: "RoomsView",
  components: {
    RoomsComponent,
  },
  computed: {
    ...mapState("rooms", ["rooms"]),
  },
  data() {
    return {};
  },
  async created() {
    // const userCollection = db.collection("users");
  },
};
</script>
