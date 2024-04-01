export const state = () => ({
    moneyGetOutData: [],
  });

  export const mutations = {
    setmoneyGetOut(state, data) {
      state.moneyGetOutData = data;
    },
  };
  export const actions = {
    // ______________________________selectall date moneyGetOut_______________________________
    async selectAll({ commit }) {
      await this.$axios
        .get(
          "/moneyGetOut.json"
        )
        .then((res) => {
          const fetchedData = res.data;
          const dataArr = [];
          for (let key in fetchedData) {
            dataArr.push({ id: key, ...fetchedData[key] });
          }
          commit("setmoneyGetOut", dataArr.sort((a, b) => this.$moment(b.timestamp) - this.$moment(a.timestamp)));
  
        });
    },
    // _________________________________upload and add moneyGetOut____________________________
    async addmoneyGetOut({ commit, dispatch }, data) {
      await this.$axios
        .post(
          "/moneyGetOut.json",
          data
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // ________________________________delete moneyGetOut____________________________
    async deleteItem({ commit, dispatch }, id) {
      await this.$axios
        .delete(
          `/moneyGetOut/${id}.json`
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // _________________________________update or edit moneyGetOut ______________________
    async updatemoneyGetOut({ commit, dispatch }, data) {
      await this.$axios
      .put(
          `/moneyGetOut/${data.id}.json`,
          data
        )
      .then((res) => {
          dispatch("selectAll");
        });
    },
  };
  