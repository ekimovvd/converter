<template>
  <div class="converter">
    <div class="container">
      <div class="converter__content">
        <b-card
          class="converter__card"
          bg-variant="light"
          :title="selectValuteNameFrom"
        >
          <div class="converter__group">
            <b-form-select
              v-model="from.selected"
              :options="options"
              class="mb-3"
            >
            </b-form-select>
            <b-form-input v-model="from.value" size="sm"></b-form-input>
          </div>
        </b-card>
        <b-button class="converter__btn" @click="handleSwitch" variant="primary"
          >Поменять местами</b-button
        >
        <b-card
          class="converter__card"
          bg-variant="light"
          :title="selectValuteNameTo"
        >
          <div class="converter__group">
            <b-form-select
              v-model="to.selected"
              :options="options"
              class="mb-3"
            >
            </b-form-select>
            <b-form-input
              v-model="calculatedValue"
              size="sm"
              disabled
            ></b-form-input>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Converter",
  data() {
    return {
      from: {
        selected: null,
        value: 0,
      },
      to: {
        selected: null,
      },
    };
  },
  computed: {
    ...mapState("valute", ["options", "fx"]),

    selectValuteNameFrom() {
      return this.from.selected
        ? this.options.find((item) => item.value === this.from.selected).name
        : "Выберите валюту";
    },

    selectValuteNameTo() {
      return this.to.selected
        ? this.options.find((item) => item.value === this.to.selected).name
        : "Выберите валюту";
    },

    checkFrom() {
      return this.from.selected && this.from.value > 0;
    },

    checkTo() {
      return this.to.selected;
    },

    calculatedValue() {
      if (this.checkFrom && this.checkTo) {
        return this.fx(this.from.value).convert({
          from: this.from.selected,
          to: this.to.selected,
        });
      }
      return 0;
    },
  },
  methods: {
    handleSwitch() {
      const temporaryValueFrom = this.from.selected;

      this.from.selected = this.to.selected;
      this.to.selected = temporaryValueFrom;
    },
  },
};
</script>

<style lang="scss">
.converter {
  &__content {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__card {
    width: 100%;
  }

  &__group {
    display: flex;
    align-items: center;
  }

  &__btn {
    margin: 0 30px;
  }

  .custom-select {
    margin-bottom: 0 !important;
    width: 100px;
    margin-right: 20px;
  }
}
</style>
