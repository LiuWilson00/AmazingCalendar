<script>
/**
 *  process Date() funtion library ,Custom for calendars. mimx to use
 */
export default {
  name: "DateTimeTool",
  methods: {
    stringZeropadding(string, len) {
      return `${"0".repeat(len)}${string}`.substring(string.length);
    },
    fomateDateToString(date) {
      return `${date.getFullYear()}/${this.stringZeropadding(
        (date.getMonth() + 1).toString(),
        2
      )}/${this.stringZeropadding(date.getDate().toString(), 2)}`;
    },
    addDate(date, addNumber) {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + addNumber
      );
    },
    addMinute(date, addNumber) {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes() + addNumber
      );
    },
    dateDifferenceMinute(minusDate, minuendDate) {
      let minusTime = minusDate.getTime();
      let minuendTime = minuendDate.getTime();

      if (minusTime > minuendTime) {
        let differencemillisecond = minusTime - minuendTime;
        return Math.floor(differencemillisecond / (60 * 1000));
      } else {
        throw console.error("Muinus date need more than minuend date");
      }
    },
    compareDate(mainDate, targetDate) {
      return mainDate.getTime() - targetDate.getTime();
    },
    isSameDate(date1, date2) {
      let isSameYear = date1.getFullYear() == date2.getFullYear();
      let isSameMonth = date1.getMonth() == date2.getMonth();
      let isSameDay = date1.getDate() == date2.getDate();
      return isSameYear && isSameMonth && isSameDay;
    },
    pushTimeObjectToList(original, target) {
      original.forEach(dateTimeObject => {
        this.dateTimeObjectToTimeList(dateTimeObject).forEach(el => {
          target.push(el);
        });
      });
    },
    isPastDay(date) {
      return (
        this.compareDate(this.today, date) > 0 &&
        !this.isSameDate(this.today, date)
      );
    }
  }
};
</script>