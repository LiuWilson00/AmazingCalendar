<template>
  <div class="home">
    <Calendars @getNewDate="getRemoteDate" :timeInfomation="remoteDate" width="1024" />
  </div>
</template>
<style lang="scss" >
.home {
  .Calendars {
    margin: 0 auto;
  }
}
</style>
<script>
/**
 * This page is simulation call "Calendar Component"
 * TestAvailableTimes is a Json simulation remote database
 */
import Calendars from "@/components/Calendars/Calendars.vue";
import TestAvailableTimes from "../TestAvailableTimes.json";
import DateTimeTool from "../components/Calendars/DateTimeTool";
export default {
  name: "Home",
  data() {
    return {
      remoteDate: { available: [], booked: [] }
    };
  },
  methods: {
    getRemoteDate(val) {
      this.remoteDate =
        TestAvailableTimes[val] == undefined
          ? { available: [], booked: [] }
          : TestAvailableTimes[val];
    },
    init() {
      /**
       *  simulation get remoteData
       */
      this.getRemoteDate(this.getInitDateRange());
    },
    getInitDateRange() {
      let today = new Date();
      let weekFirstDay = this.addDate(today, -1 * today.getDay());
      let endDate = this.addDate(weekFirstDay, 6);

      return `${this.fomateDateToString(
        weekFirstDay
      )} - ${this.fomateDateToString(endDate)}`;
    }
  },
  mixins: [DateTimeTool],
  mounted() {
    console.log(this.getInitDateRange());
    this.init();
  },
  components: {
    Calendars
  }
};
</script>
