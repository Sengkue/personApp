export const state = () => ({
  codingTypeData: [],
  resetType: false,
});

export const mutations = {
  setResetType(state, data) {
    state.resetType = data;
  },
  setcodingType(state, data) {
    state.codingTypeData = data;
  },
};
export const actions = {
  // ______________________________selectall date codingType_______________________________
  async selectAll({ commit }) {
    await this.$axios.get("/codingType.json").then((res) => {
      const fetchedData = res?.data || {};

      const dataArr = Object.keys(fetchedData).map((key) => {
        const item = { id: key, ...fetchedData[key] };
        return item;
      });
      commit("setcodingType", dataArr);
    });
  },

  // _________________________________upload and add codingType____________________________
  async addcodingType({ commit, dispatch }, data) {
    await this.$axios.post("/codingType.json", data).then((res) => {
      dispatch("selectAll");
    });
  },
  // ________________________________delete codingType____________________________
  async deleteItem({ commit, dispatch }, id) {
    await this.$axios.delete(`/codingType/${id}.json`).then((res) => {
      dispatch("selectAll");
    });
  },
  // _________________________________update or edit codingType ______________________
  async updatecodingType({ commit, dispatch }, data) {
    await this.$axios.put(`/codingType/${data.id}.json`, data).then((res) => {
      dispatch("selectAll");
    });
  },
};
