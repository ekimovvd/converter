<template>
  <div class="list">
    <div class="container">
      <div class="list__search">
        <b-form-input
          v-model="value"
          size="sm"
          placeholder="Введите название валюты или её код"
        ></b-form-input>
      </div>
      <ul class="list__grid">
        <li class="list__item" v-for="item in valuteSort" :key="item.ID">
          <b-card class="list__card" bg-variant="light" :title="item.Name">
            <div class="list__info">
              <b-card-text class="list__convert">
                {{ item.Nominal }} {{ item.CharCode }}
                <i class="bx bx-move-horizontal"></i> {{ item.convert }}
                {{ item.baseRate }}
              </b-card-text>
              <div
                class="list__indicator"
                :class="{
                  list__indicator_danger: !handleCurrencyGrowth(
                    item.Previous,
                    item.Value
                  ).check,
                }"
              >
                <i
                  class="list__icon bx bxs-chevron-up"
                  :class="{
                    list__icon_danger: !handleCurrencyGrowth(
                      item.Previous,
                      item.Value
                    ).check,
                  }"
                ></i>
                <b-card-text>
                  {{ handleCurrencyGrowth(item.Previous, item.Value).value }}
                </b-card-text>
              </div>
            </div>
          </b-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "List",
  data() {
    return {
      value: "",
    };
  },
  computed: {
    ...mapState("valute", ["valute"]),

    valuteSort() {
      return this.valute.filter((item) => {
        return (
          item.Name.toLowerCase().includes(this.value) ||
          item.CharCode.toLowerCase().includes(this.value)
        );
      });
    },
  },
  methods: {
    handleCurrencyGrowth(previous, value) {
      return { value: previous - value, check: previous - value > 0 };
    },
  },
};
</script>

<style lang="scss">
.list {
  &__search {
    width: 400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  &__grid {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 400px);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }

  &__card {
    height: 180px;
  }

  &__convert {
    font-weight: bold;
    display: flex;
    align-items: center;

    i {
      margin: 0 10px;
      font-size: 22px;
    }
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__icon {
    font-size: 22px;

    &_danger {
      transform: rotate(-180deg);
    }
  }

  &__indicator {
    display: flex;
    align-items: center;
    color: #198754;
    font-weight: bold;
    font-size: 16px;

    &_danger {
      color: #dc3545;
    }
  }
}
</style>
