export const state = () => ({
  videotypeData: [],
  resetType: false,
});

export const mutations = {
  setResetType(state, data) {
    state.resetType = data;
  },
  setvideotype(state, data) {
    state.videotypeData = data;
  },
};
export const actions = {
  // ______________________________selectall date videotype_______________________________
  async selectAll({ commit }) {
    await this.$axios.get("/videotype.json").then((res) => {
      const fetchedData = res?.data || {};

      const dataArr = Object.keys(fetchedData).map((key) => {
        const item = { id: key, ...fetchedData[key] };
        return item;
      });
      commit("setvideotype", dataArr);
    });
  },

  // _________________________________upload and add videotype____________________________
  async addvideotype({ commit, dispatch }, data) {
    await this.$axios.post("/videotype.json", data).then((res) => {
      dispatch("selectAll");
    });
  },
  // ________________________________delete videotype____________________________
  async deleteItem({ commit, dispatch }, id) {
    await this.$axios.delete(`/videotype/${id}.json`).then((res) => {
      dispatch("selectAll");
    });
  },
  // _________________________________update or edit videotype ______________________
  async updatevideotype({ commit, dispatch }, data) {
    await this.$axios.put(`/videotype/${data.id}.json`, data).then((res) => {
      dispatch("selectAll");
    });
  },
};
