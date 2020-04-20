<template>
  <div class="Calendars" :style="componentWidthStyle">
    <h3 class="title">{{$t('__available')}}</h3>

    <div class="infomation">
      <div class="button-group">
        <button
          @click="changeCalenderPage(false) "
          :disabled="isPastDay(addDate(calendarsStartDate,-1))"
          :class="{'is-disabled':isPastDay(addDate(calendarsStartDate,-1))}"
        >
          <i class="material-icons">keyboard_arrow_left</i>
        </button>
        <button @click=" changeCalenderPage(true)">
          <i class="material-icons">keyboard_arrow_right</i>
        </button>
      </div>
      <div class="date-range-group">{{dateRange}}</div>
      <div
        class="time-zone"
      >{{ $t('__timeZone' ,{ zone:$t(`__${Intl.DateTimeFormat().resolvedOptions().timeZone}`) }) }}</div>
    </div>

    <div class="schedule">
      <div
        v-for="(date,index) in weekLabels"
        :key="date"
        :class="{'past-date':isPastDay(calendarsDateLabelList[index]) }"
        class="date-col"
      >
        <div class="date-col-content">
          <div class="week-label">{{ $t(date)}}</div>
          <div class="date-label">{{calendarsDateLabelList[index].getDate()}}</div>
          <div
            v-for="(time,index) in scheduleTimeLabelList[index]"
            :key="index"
            :class="time.timeType"
            class="time-label"
          >{{isPastDay(time.time)?"":time.timeLabel}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./style.scss" scoped>
</style>
<script>
import calenderPropoty from "./calenderPropoty.json";
import DateTimeTool from "./DateTimeTool";
/**
 * Calendars Component:
 *
 * change "calendarsStartDate" to control view.
 *
 *
 *  import DateTimeTool to process datetime formate
 *  calenderPropoty is common  string for calendars
 *
 *
 *
 * step1. get prop data(timeInfomation) then computed to => "availableDateTimesList " "bookedDateTimesList"
 * schema{}
 * P.S:this step is for make the data better processed
 *
 * step2.use compute merge "availableDateTimesList " "bookedDateTimesList" and transform to optput foramte
 * => "allScheduleTime"
 *
 * step3.format "allScheduleTime" => "scheduleTimeLabelList"
 * set "calendarsDateLabelList" can one-one correspond , then output to view
 *
 * Exp: if calendarsDateLabelList[1]="2020/4/20" then
 * scheduleTimeLabelList[1]=all user schedule on 2020/4/20
 *
 */
export default {
  name: "Calender",

  data() {
    return {
      weekLabels: calenderPropoty.weekName,

      today: new Date(),
      calendarsStartDate: new Date()
    };
  },

  props: ["width", "timeInfomation"],
  mixins: [DateTimeTool],
  computed: {
    componentWidthStyle() {
      return `max-width:${this.width}px`;
    },
    calendarsDateLabelList() {
      let dateList = new Array();
      let tempDate = this.calendarsStartDate;

      for (let index = 0; index < 7; index++) {
        dateList.push(tempDate);
        tempDate = this.addDate(tempDate, 1);
      }

      return dateList;
    },
    scheduleTimeLabelList() {
      return this.calendarsDateLabelList.map(date => {
        return this.getScheduleListFormDate(date);
      });
    },
    allScheduleTime() {
      const vm = this;
      let TimeList = new Array();

      vm.pushTimeObjectToList(this.availableDateTimesList, TimeList);

      vm.pushTimeObjectToList(this.bookedDateTimesList, TimeList);

      TimeList.sort((a, b) => {
        return vm.compareDate(a.time, b.time);
      });

      return TimeList;
    },
    availableDateTimesList() {
      const vm = this;
      return this.timeInfomation.available.map(availableDate => {
        return vm.generateDateTimeObject(availableDate, "available");
      });
    },

    bookedDateTimesList() {
      const vm = this;
      return this.timeInfomation.booked.map(bookedleDate => {
        return vm.generateDateTimeObject(bookedleDate, "booked");
      });
    },

    dateRange() {
      return `${this.fomateDateToString(
        this.calendarsDateLabelList[0]
      )} - ${this.fomateDateToString(this.calendarsDateLabelList[6])}`;
    }
  },

  methods: {
    changeCalenderPage(option) {
      let dateNumber = option ? 7 : -7;
      this.calendarsStartDate = this.addDate(
        this.calendarsStartDate,
        dateNumber
      );
      this.$emit("getNewDate", this.dateRange);
    },
    getScheduleListFormDate(targetDate) {
      return this.allScheduleTime.filter(time => {
        return this.isSameDate(time.time, targetDate);
      });
    },
    setCalendarsStartDate() {
      this.calendarsStartDate = this.addDate(
        this.today,
        -1 * this.today.getDay()
      );
    },
    generateDateTimeObject(orignalDateTime, type) {
      try {
        let startDateTime = new Date(orignalDateTime.start);
        let endDateTime = new Date(orignalDateTime.end);
        return {
          start: startDateTime,
          timeType: type,
          timeDifference: this.dateDifferenceMinute(endDateTime, startDateTime)
        };
      } catch (error) {
        console.log(error);
      }
    },
    dateTimeObjectToTimeList(dateTimeObject) {
      let time = dateTimeObject.start;
      let timeList = new Array();

      for (let index = 0; index < dateTimeObject.timeDifference / 30; index++) {
        timeList.push({
          timeLabel: `${this.stringZeropadding(
            time.getHours().toString(),
            2
          )}:${this.stringZeropadding(time.getMinutes().toString(), 2)}`,
          time: time,
          timeType: dateTimeObject.timeType
        });
        time = this.addMinute(time, 30);
      }
      return timeList;
    }
  },

  mounted() {
    this.setCalendarsStartDate();
    console.log(this.getScheduleListFormDate(this.today));
  }
};
</script>