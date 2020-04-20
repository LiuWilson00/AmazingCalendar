<template>
  <div class="Simulation">
    <Calendars @getNewDate="getRemoteDate" :timeInfomation="remoteDate" width="640" />
    <div class="json-editor">
      <VJsoneditor class v-model="remoteDate" height="400px"></VJsoneditor>
    </div>
  </div>
</template>
<style lang="scss" >
.Simulation {
  display: flex;
  * {
    flex-grow: 1;
  }
  .json-editor {
    width: 500px;
    height: 768px;
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
import VJsoneditor from "v-jsoneditor/src/index";

export default {
  name: "Simulation",
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
    Calendars,
    VJsoneditor
  }
};
</script>
