<template>
  <article class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="title has-text-center">Create Room</div>
          <form action="" @submit.prevent="createRoom">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  type="text"
                  v-model="roomData.name"
                  class="input"
                  placeholder="e.g. Black cat mania"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea
                  v-model="roomData.description"
                  class="textarea"
                  placeholder="e.g Let's talk about why my black cat's are fucking awesome, lol"
                  required
                ></textarea>
              </div>
            </div>
            <div class="field has-text-right">
              <div class="control">
                <button
                  type="submit"
                  class="button is-link"
                  :class="{ 'is-loading': isLoading }"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "CreateRoom",
  data() {
    return {
      isLoading: false,
      roomData: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    async createRoom() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("rooms/createRoom", {
          name: this.roomData.name,
          description: this.roomData.description,
        });
        this.$toast.success("Room created!");
        this.roomData.name = this.roomData.description = "";
        // waits 1 second, then goes to home page
        setTimeout(() => this.$router.push({ name: "home" }), 1000);
      } catch (error) {
        this.$toast.error(error.message);
        console.log(error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
