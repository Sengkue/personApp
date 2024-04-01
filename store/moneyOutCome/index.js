export const state = () => ({
  moneyOutComeData: [],
  totalMoney: 0,
});

export const mutations = {
  setmoneyOutCome(state, data) {
    state.moneyOutComeData = data;
  },
  setTotalMoney(state, totalMoney) {
    state.totalMoney = totalMoney;
  },
};
export const actions = {
  // ______________________________selectall date moneyOutCome_______________________________
  async selectAll({ commit }) {
    await this.$axios.get("/moneyOutCome.json").then((res) => {
      const fetchedData = res.data;
      const dataArr = [];
      let totalMoney = 0; // Initialize the total

      for (let key in fetchedData) {
        const item = { id: key, ...fetchedData[key] };
        dataArr.push(item);

        // Assuming there is a property named 'amount'
        if (item.money) {
          totalMoney += parseFloat(item.money); // Convert to float and add to total
        }
      }

      commit(
        "setmoneyOutCome",
        dataArr.sort(
          (a, b) => this.$moment(b.timestamp) - this.$moment(a.timestamp)
        )
      );
      commit("setTotalMoney", totalMoney);
    });
  },

  // _________________________________upload and add moneyOutCome____________________________
  async addmoneyOutCome({ commit, dispatch }, data) {
    await this.$axios.post("/moneyOutCome.json", data).then((res) => {
      dispatch("selectAll");
    });
  },
  // ________________________________delete moneyOutCome____________________________
  async deleteItem({ commit, dispatch }, id) {
    await this.$axios.delete(`/moneyOutCome/${id}.json`).then((res) => {
      dispatch("selectAll");
    });
  },
  // _________________________________update or edit moneyOutCome ______________________
  async updatemoneyOutCome({ commit, dispatch }, data) {
    await this.$axios.put(`/moneyOutCome/${data.id}.json`, data).then((res) => {
      dispatch("selectAll");
    });
  },
};
