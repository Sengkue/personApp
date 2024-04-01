export const state = () => ({
    ideaData: [],
    totalMoney: 0
  });

  export const mutations = {
    setidea(state, data) {
      state.ideaData = data;
    },
    setTotalMoney(state, totalMoney) {
      state.totalMoney = totalMoney;
    }
  };
  export const actions = {
    // ______________________________selectall date idea_______________________________
    async selectAll({ commit }) {
      await this.$axios
        .get(
          "/idea.json"
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
    
          commit("setidea", dataArr);
          commit("setTotalMoney", totalMoney);
        });
    },
    
    // _________________________________upload and add idea____________________________
    async addidea({ commit, dispatch }, data) {
      await this.$axios
        .post(
          "/idea.json",
          data
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // ________________________________delete idea____________________________
    async deleteItem({ commit, dispatch }, id) {
      await this.$axios
        .delete(
          `/idea/${id}.json`
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // _________________________________update or edit idea ______________________
    async updateidea({ commit, dispatch }, data) {
      await this.$axios
      .put(
          `/idea/${data.id}.json`,
          data
        )
      .then((res) => {
          dispatch("selectAll");
        });
    },
  };
  