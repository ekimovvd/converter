import axios from "axios";
import fxMoney from "money";

export default {
  namespaced: true,
  state: {
    valute: [],
    options: [],
    fx: {},
  },
  mutations: {
    setValute(state, valute) {
      state.valute = valute;
    },

    setOptions(state, options) {
      state.options = options;
    },

    setFx(state, fx) {
      state.fx = fx;
    },
  },
  actions: {
    async get({ commit, dispatch }) {
      const rates = await axios.get("https://www.cbr-xml-daily.ru/latest.js");
      fxMoney.base = rates.data.base;
      fxMoney.rates = rates.data.rates;

      const { data } = await axios.get(
        "https://www.cbr-xml-daily.ru/daily_json.js"
      );

      const valute = Object.keys(data.Valute).map((key) => {
        return {
          ...data.Valute[key],
          baseRate: fxMoney.base,
          convert: fxMoney(data.Valute[key].Nominal)
            .from(data.Valute[key].CharCode)
            .to(fxMoney.base),
        };
      });
      dispatch("getOptions", valute);
      commit("setValute", valute);
      commit("setFx", fxMoney);
    },

    async getOptions({ commit }, valute) {
      const options = valute.map((item) => {
        return {
          value: item.CharCode,
          text: item.CharCode,
          name: item.Name,
        };
      });

      commit("setOptions", options);
    },
  },
};
