<template>
  <div id="app">
    <div id="nav">
      <div class="router-group">
        <router-link to="/">{{$t("__Home")}}</router-link>|
        <router-link to="/Simulation">{{$t("__Simulation")}}</router-link>
      </div>

      <div class="lang-group">
        <button @click="switchLang('tw')" :class="{active:locale=='tw'}">
          <div class="chang">tw</div>
        </button>|
        <button @click="switchLang('en')" :class="{active:locale=='en'}">
          <div class="chang">en</div>
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" src="./style/style.scss">
</style>
<script>
export default {
  name: "app",
  data() {
    return { locale: "" };
  },
  methods: {
    switchLang(newLang) {
      this.$t.locale = newLang;
      localStorage.setItem("locale", newLang);
      this.$router.go(0);
    },
    async setLocale() {
      await this.$store.dispatch("GET_LANG_FROM_LOCAL");
      this.locale = await this.$store.state.locale;
    }
  },
  mounted() {
    this.setLocale();
  }
};
</script>