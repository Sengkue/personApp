export const state = () => ({
    codingData: [],
    resetType: false,
  });

  export const mutations = {
    setResetType(state, data) {
      state.resetType = data;
    },
    setcoding(state, data) {
      state.codingData = data;
    },
  };
  export const actions = {
    // ______________________________selectall date coding_______________________________
    async selectAll({ commit }) {
      await this.$axios
        .get("/coding.json")
        .then((res) => {
          const fetchedData = res?.data || {};
    
          const dataArr = Object.keys(fetchedData).map((key, index) => {
            const item = { id: key, ...fetchedData[key], index: index + 1 };
            return item;
          });
    
          // Sort dataArr by completion timestamp in descending order
          dataArr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
          commit("setcoding", dataArr);
        });
    },
          
    
    // _________________________________upload and add coding____________________________
    async addcoding({ commit, dispatch }, data) {
      await this.$axios
        .post(
          "/coding.json",
          data
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // ________________________________delete coding____________________________
    async deleteItem({ commit, dispatch }, id) {
      await this.$axios
        .delete(
          `/coding/${id}.json`
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // _________________________________update or edit coding ______________________
    async updatecoding({ commit, dispatch }, data) {
      await this.$axios
      .put(
          `/coding/${data.id}.json`,
          data
        )
      .then((res) => {
          dispatch("selectAll");
        });
    },
  };
  