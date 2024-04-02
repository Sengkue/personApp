// plugins/global.js
import Vue from "vue";
import dayjs from "dayjs";
import "dayjs/locale/lo"; // Import the Thai locale

export const myMixin = {
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },
  computed: {},
  methods: {
    setCurrentMonthDates() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      
      this.startDate = `${year}-${month.toString().padStart(2, "0")}-01`;
      const lastDay = new Date(year, month, 0).getDate();
      this.endDate = `${year}-${month.toString().padStart(2, "0")}-${lastDay}`;
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    currency(data) {
      return this.$test(data, { precision: 0, symbol: "₭" }).format();
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    formatDateTime(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
    
      // Ensure single-digit day/month/hours/minutes are formatted with leading zero
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
      return `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}`;
    },    
    formatDatetotext(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
    formatDateLo(date) {
      return dayjs(date).locale("lo").format("D MMMM YYYY, HH:mm:ss");
    },
    formatDateNoSpace(dateString) {
      const year = dateString.substr(0, 4);
      const month = dateString.substr(4, 2);
      const day = dateString.substr(6, 2);
      return `${day}-${month}-${year}`;
    },
    // ... other methods ...
  },
  created() {
    this.setCurrentMonthDates(); // Set the startDate and endDate when the mixin is created
  },
};

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true;
  Vue.mixin(myMixin);

  // Add event listener to disable right-clicking
  // document.addEventListener('contextmenu', function(event) {
  //   event.preventDefault();
  // });
}
