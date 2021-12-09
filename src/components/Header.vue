<template>
  <div class="header">
    <b-tabs content-class="mt-3" align="center">
      <b-tab title="Список валют" active>
        <List />
      </b-tab>
      <b-tab title="Конвертёр">
        <Converter />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import List from "./List.vue";
import Converter from "./Converter.vue";

export default {
  name: "Header",
  components: {
    List,
    Converter,
  },
};
</script>
