export const state = () => ({
  peopleData: [],
  resetType: false,

});

export const mutations = {
  setResetType(state, data) {
    state.resetType = data;
  },
  setPeople(state, data) {
    state.peopleData = data;
  },
};
export const actions = {
  // ______________________________selectall date people_______________________________
  async selectAll({ commit }) {
    await this.$axios
      .get(
        "/people.json"
      )
      .then((res) => {
        // const Items = res.data ? Object.values(res.data) : []; 
        // commit("setPeople", Items);

        const fetchedData = res.data;
        const dataArr = [];
        for (let key in fetchedData) {
          dataArr.push({ id: key, ...fetchedData[key] });
        }
        commit("setPeople", dataArr.sort((a, b) => this.$moment(b.createDate) - this.$moment(a.createDate)));

      });
  },
  // _________________________________upload and add people____________________________
  async addPeople({ commit, dispatch }, data) {
    await this.$axios
      .post(
        "/people.json",
        data
      )
      .then((res) => {
        dispatch("selectAll");
      });
  },
  // ________________________________delete people____________________________
  async deleteItem({ commit, dispatch }, id) {
    
    await this.$axios
      .delete(
        `/people/${id}.json`
      )
      .then((res) => {
        dispatch("selectAll");
      });
  },
  // _________________________________update or edit people ______________________
  async updatePeople({ commit, dispatch }, data) {
    await this.$axios
    .put(
        `/people/${data.id}.json`,
        data
      )
    .then((res) => {
        dispatch("selectAll");
      });
  },
};
