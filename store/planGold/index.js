export const state = () => ({
    planGoldData: [],
    totalMoney: 0
  });

  export const mutations = {
    setplanGold(state, data) {
      state.planGoldData = data;
    },
    setTotalMoney(state, totalMoney) {
      state.totalMoney = totalMoney;
    }
  };
  export const actions = {
    // ______________________________selectall date planGold_______________________________
    async selectAll({ commit }) {
      await this.$axios
        .get(
          "/planGold.json"
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
    
          commit("setplanGold", dataArr);
          commit("setTotalMoney", totalMoney);
        });
    },
    
    // _________________________________upload and add planGold____________________________
    async addplanGold({ commit, dispatch }, data) {
      await this.$axios
        .post(
          "/planGold.json",
          data
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // ________________________________delete planGold____________________________
    async deleteItem({ commit, dispatch }, id) {
      await this.$axios
        .delete(
          `/planGold/${id}.json`
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // _________________________________update or edit planGold ______________________
    async updateplanGold({ commit, dispatch }, data) {
      await this.$axios
      .put(
          `/planGold/${data.id}.json`,
          data
        )
      .then((res) => {
          dispatch("selectAll");
        });
    },
  };
  