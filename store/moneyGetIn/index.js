export const state = () => ({
    moneyGetInData: [],
  });

  export const mutations = {
    setmoneyGetIn(state, data) {
      state.moneyGetInData = data;
    },
  };
  export const actions = {
    // ______________________________selectall date moneyGetIn_______________________________
    async selectAll({ commit }) {
      await this.$axios
        .get(
          "/moneyGetIn.json"
        )
        .then((res) => {
          const fetchedData = res.data;
          const dataArr = [];
          for (let key in fetchedData) {
            dataArr.push({ id: key, ...fetchedData[key] });
          }
          commit("setmoneyGetIn", dataArr.sort((a, b) => this.$moment(b.timestamp) - this.$moment(a.timestamp)));
  
        });
    },
    // _________________________________upload and add moneyGetIn____________________________
    async addmoneyGetIn({ commit, dispatch }, data) {
      await this.$axios
        .post(
          "/moneyGetIn.json",
          data
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // ________________________________delete moneyGetIn____________________________
    async deleteItem({ commit, dispatch }, id) {
      await this.$axios
        .delete(
          `/moneyGetIn/${id}.json`
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // _________________________________update or edit moneyGetIn ______________________
    async updatemoneyGetIn({ commit, dispatch }, data) {
      await this.$axios
      .put(
          `/moneyGetIn/${data.id}.json`,
          data
        )
      .then((res) => {
          dispatch("selectAll");
        });
    },
  };
  