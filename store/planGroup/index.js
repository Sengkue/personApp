export const state = () => ({
    planData: [],
    totalMoney: 0
  });

  export const mutations = {
    setplan(state, data) {
      state.planData = data;
    },
    setTotalMoney(state, totalMoney) {
      state.totalMoney = totalMoney;
    }
  };
  export const actions = {
    // ______________________________selectall date plan_______________________________
    async selectAll({ commit }) {
      await this.$axios
        .get(
          "/plan.json"
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
    
          commit("setplan", dataArr);
          commit("setTotalMoney", totalMoney);
        });
    },
    
    // _________________________________upload and add plan____________________________
    async addplan({ commit, dispatch }, data) {
      await this.$axios
        .post(
          "/plan.json",
          data
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // ________________________________delete plan____________________________
    async deleteItem({ commit, dispatch }, id) {
      await this.$axios
        .delete(
          `/plan/${id}.json`
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // _________________________________update or edit plan ______________________
    async updateplan({ commit, dispatch }, data) {
      await this.$axios
      .put(
          `/plan/${data.id}.json`,
          data
        )
      .then((res) => {
          dispatch("selectAll");
        });
    },
  };
  