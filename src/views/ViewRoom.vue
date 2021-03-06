<template>
  <div>
    <article class="section">
      <div class="container">
        <div class="columns">
          <div v-if="room" class="column is-half is-offset-one-quarter">
            <h1 class="title has-text-centered">{{ room.name }}</h1>
            <div class="messages content" ref="messages">
              <div
                v-for="message in messages"
                :key="message.id"
                class="message"
                :class="{
                  'message--own':
                    message.userId === $store.getters['user/getUserUid'],
                }"
              >
                <p>
                  {{ message.message }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
    <section class="send">
      <form @submit.prevent="createMessage" class="form">
        <div class="control">
          <textarea
            v-model="message"
            class="textarea form__textarea"
            placeholder="Write your message here..."
          ></textarea>
        </div>
        <div class="control">
          <button
            :disabled="!message"
            type="submit"
            class="button is-info"
            :class="{ 'is-loading': isLoading }"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ViewRoom",
  async created() {
    try {
      // get from local storage (vuex)
      let room = this.$store.getters["rooms/getRoom"](this.id);
      if (!room) {
        // get from cloud firestore
        room = await this.$store.dispatch("rooms/getRoom", this.id);
        if (!room.exists) throw new Error("Could not find room");
        room = room.data();
      }
      this.room = room;
      this.$store.dispatch("messages/getMessages", this.id);
    } catch (error) {
      console.error(error.message);
      this.$toast.error(error.message);
      this.$router.push({ name: "home" });
    }
  },
  destroyed() {
    // stop listening to that room messages
    this.$store.commit("messages/setMessagesListener", null);
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      message: "",
      room: null,
    };
  },
  methods: {
    scrollDown() {
      // scroll down when message is send
      // ref: messages
      const messagesRef = this.$refs.messages;
      this.$nextTick(() => {
        const height = messagesRef.scrollHeight;
        window.scrollTo({
          top: height,
          behavior: "smooth",
        });
      });
    },
    async createMessage() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("messages/createMessage", {
          roomId: this.id,
          message: this.message,
        });
        this.message = "";
        this.scrollDown();
      } catch (error) {
        console.error(error.message);
        this.$toast.error(error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    ...mapState("messages", ["messages"]),
  },
};
</script>

<style lang="scss" scoped>
.messages {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-bottom: 90px;
}
.message {
  padding: 1rem;
  width: 75%;
  &--own {
    background-color: #baffc5;
    width: 75%;
    align-self: flex-end;
  }
}
.send {
  background-color: gray;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > *:first-child {
    flex-grow: 1;
    margin-right: 1rem;
  }
}
.textarea.form__textarea {
  min-height: 4rem;
}
</style>
