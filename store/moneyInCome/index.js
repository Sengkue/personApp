export const state = () => ({
    moneyInComeData: [],
    totalMoney: 0
  });

  export const mutations = {
    setmoneyInCome(state, data) {
      state.moneyInComeData = data;
    },
    setTotalMoney(state, data) {
      state.totalMoney = data;
    }
  };
  export const actions = {
    // ______________________________selectall date moneyInCome_______________________________
    async selectAll({ commit }) {
      await this.$axios
        .get(
          "/moneyInCome.json"
        )
        .then((res) => {
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
          commit("setmoneyInCome", dataArr.sort((a, b) => this.$moment(b.timestamp) - this.$moment(a.timestamp)));
          commit("setTotalMoney", totalMoney);


  
        });
    },
    // _________________________________upload and add moneyInCome____________________________
    async addmoneyInCome({ commit, dispatch }, data) {
      await this.$axios
        .post(
          "/moneyInCome.json",
          data
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // ________________________________delete moneyInCome____________________________
    async deleteItem({ commit, dispatch }, id) {
      await this.$axios
        .delete(
          `/moneyInCome/${id}.json`
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // _________________________________update or edit moneyInCome ______________________
    async updatemoneyInCome({ commit, dispatch }, data) {
      await this.$axios
      .put(
          `/moneyInCome/${data.id}.json`,
          data
        )
      .then((res) => {
          dispatch("selectAll");
        });
    },
  };
  