<template>
  <div class="home">
    <Header />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Header from "@/components/Header";

export default {
  name: "Home",
  components: {
    Header,
  },
  async created() {
    await this.get();
  },
  methods: {
    ...mapActions("valute", ["get"]),
  },
};
</script>
