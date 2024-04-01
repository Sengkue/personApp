export const state = () => ({
  slideData: [],
  totalMoney: 0,
  updateData:[]
});

export const mutations = {
  setslide(state, data) {
    state.slideData = data;
  },
  setSlideData(state, data){
    console.log("showdata", data);
    state.updateData = data;
  }
};
export const actions = {
  // ______________________________selectall date slide_______________________________
  async selectAll({ commit }) {
    await this.$axios.get("/slide.json").then((res) => {
      const fetchedData = res.data;
      const dataArr = [];

      for (let key in fetchedData) {
        const item = { id: key, ...fetchedData[key] };
        dataArr.push(item);
      }

      commit("setslide", dataArr);
    });
  },

  // _________________________________upload and add slide____________________________
  async addslide({ commit, dispatch }, data) {
    await this.$axios.post("/slide.json", data).then((res) => {
      dispatch("selectAll");
    });
  },
  // ________________________________delete slide____________________________
  async deleteItem({ commit, dispatch }, id) {
    await this.$axios.delete(`/slide/${id}.json`).then((res) => {
      dispatch("selectAll");
    });
  },
  // _________________________________update or edit slide ______________________
  async updateslide({ commit, dispatch }, data) {
    await this.$axios.put(`/slide/${data.id}.json`, data).then((res) => {
      dispatch("selectAll");
    });
  },
};
