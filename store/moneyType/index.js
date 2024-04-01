export const state = () => ({
    moneyTypeData: [],
    totalMoney: 0,
    resetType: false,
  });

  export const mutations = {
    setResetType(state, data) {
      state.resetType = data;
    },
    setmoneyType(state, data) {
      state.moneyTypeData = data;
    },
    setTotalMoney(state, totalMoney) {
      state.totalMoney = totalMoney;
    }
  };
  export const actions = {
    // ______________________________selectall date moneyType_______________________________
    async selectAll({ commit }) {
      await this.$axios
        .get(
          "/moneyType.json"
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
    
          commit("setmoneyType", dataArr);
          commit("setTotalMoney", totalMoney);
        });
    },
    
    // _________________________________upload and add moneyType____________________________
    async addmoneyType({ commit, dispatch }, data) {
      await this.$axios
        .post(
          "/moneyType.json",
          data
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // ________________________________delete moneyType____________________________
    async deleteItem({ commit, dispatch }, id) {
      await this.$axios
        .delete(
          `/moneyType/${id}.json`
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // _________________________________update or edit moneyType ______________________
    async updatemoneyType({ commit, dispatch }, data) {
      await this.$axios
      .put(
          `/moneyType/${data.id}.json`,
          data
        )
      .then((res) => {
          dispatch("selectAll");
        });
    },
  };
  