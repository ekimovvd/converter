import Vue from "vue";
import Vuex from "vuex";

import valute from "./valute.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    valute,
  },
});
