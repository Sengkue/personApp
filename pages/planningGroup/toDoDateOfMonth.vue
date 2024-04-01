<template>
  <v-app>
    <v-app-bar v-if="$vuetify.breakpoint.xs" fixed app>
      <v-btn class="pa-0 ma-0" icon @click="$router.go(-1)">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="ml-n10">ລາຍການຂອງເດືອນ</v-toolbar-title>
      <v-spacer />
      <div></div>
    </v-app-bar>
    <!-- __________________app bar for desktop________________ -->
    <LayoutsNavbar v-else />
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>
              <v-row align="center">
                <v-btn icon @click="prevMonth">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-col>{{ formattedMonth }}</v-col>
                <v-btn icon @click="nextMonth">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
            </v-card-title>

            <v-card-text>
              <v-row class="days-header">
                <v-col
                  v-for="day in daysOfWeek"
                  :key="day"
                  class="day-cell pa-0 ma-0"
                >
                  {{ day }}
                </v-col>
              </v-row>
              <v-row v-for="week in weeks" :key="week[0]" justify="center">
                <v-col
                  v-for="date in week"
                  :key="date"
                  class="date-cell"
                  :class="{
                    'highlighted-date': isHighlighted(date),
                    'inactive-date': !isCurrentMonth(date),
                    'active-date': isActiveDate(date),
                  }"
                  @click="selectDate(date)"
                >
                  {{ $moment(date).format("D") }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import moment from "moment";
import "moment/locale/lo";
export default {
  name: "CustomDatePicker",
  layout: "report",
  data() {
    return {
      selectedDate: null,
      currentDate: moment(),
      daysOfWeek: ["ອາທິດ", "ຈັນ", "ອັງຄານ", "ພຸດ", "ພະຫັດ", "ສຸກ", "ເສົາ"],
    };
  },

  computed: {
    highlightedDates() {
      const dateStrings = this.$store.state.planningTodo.planningTodoData?.map(
        (item) => item.planId
      );

      // Use a Set to keep only unique date strings
      const uniqueDateStringsSet = new Set(dateStrings);

      // Convert the Set back to an array
      const uniqueDateStringsArray = Array.from(uniqueDateStringsSet);

      return uniqueDateStringsArray;
    },

    formattedMonth() {
      moment.locale("lo");
      return this.currentDate.format("MMMM YYYY");
    },
    weeks() {
      const firstDayOfMonth = moment(this.currentDate)
        .startOf("month")
        .startOf("week");
      const lastDayOfMonth = moment(this.currentDate)
        .endOf("month")
        .endOf("week");

      let currentDay = firstDayOfMonth;
      const weeks = [];

      while (currentDay.isBefore(lastDayOfMonth)) {
        if (
          currentDay.isSameOrAfter(firstDayOfMonth) &&
          currentDay.isSameOrBefore(lastDayOfMonth)
        ) {
          weeks.push(currentDay.format("YYYY-MM-DD"));
        }
        currentDay.add(1, "day");
      }

      return this.chunkArray(weeks, 7);
    },
  },
  mounted() {
    this.$store.dispatch("planningTodo/selectAll");
  },
  methods: {
    isHighlighted(date) {
      return this.highlightedDates.includes(date);
    },

    isCurrentMonth(date) {
      return moment(date).isSame(this.currentDate, "month");
    },

    isActiveDate(date) {
      return moment(date).isSame(moment(), "day");
    },

    selectDate(date) {
      this.selectedDate = date;
      this.$router.push(`/planningGroup/toDo/${date}`);
    },

    prevMonth() {
      this.$set(
        this,
        "currentDate",
        moment(this.currentDate).subtract(1, "month")
      );
      this.selectedDate = null; // Reset selectedDate when changing the month
    },

    nextMonth() {
      this.$set(this, "currentDate", moment(this.currentDate).add(1, "month"));
      this.selectedDate = null; // Reset selectedDate when changing the month
    },

    chunkArray(array, size) {
      const chunkedArray = [];
      for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
      }
      return chunkedArray;
    },
  },
};
</script>

<style scoped>
.days-header {
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.day-cell {
  padding: 10px;
}

.date-cell {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc; /* Add a square border to all date cells */
}

.inactive-date {
  color: #ccc; /* Customize the color for inactive (non-current month) dates */
}

.active-date {
  color: red; /* Customize the color for the active date in the current month */
}

.highlighted-date {
  background: radial-gradient(
      ellipse farthest-corner at right bottom,
      #fedb37 0%,
      #9f7928 30%,
      transparent 80%
    ),
    radial-gradient(
      ellipse farthest-corner at left top,
      #ffffac 8%,
      #d1b464 25%,
      #5d4a1f 100%
    );
}
.days-header {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}

.day-cell {
  transform: rotate(-60deg);
  padding: 5px; /* Optional: Adjust padding for better spacing */
}
</style>
