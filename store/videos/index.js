export const state = () => ({
    videosData: [],
    resetType: false,
  });

  export const mutations = {
    setResetType(state, data) {
      state.resetType = data;
    },
    setvideos(state, data) {
      state.videosData = data;
    },
  };
  export const actions = {
    // ______________________________selectall date videos_______________________________
    async selectAll({ commit }) {
      await this.$axios
        .get("/videos.json")
        .then((res) => {
          const fetchedData = res?.data || {};
    
          const dataArr = Object.keys(fetchedData).map((key, index) => {
            const item = { id: key, ...fetchedData[key], index: index + 1 };
            return item;
          });
    
          // Sort dataArr by completion timestamp in descending order
          dataArr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
          commit("setvideos", dataArr);
        });
    },
          
    
    // _________________________________upload and add videos____________________________
    async addvideos({ commit, dispatch }, data) {
      await this.$axios
        .post(
          "/videos.json",
          data
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // ________________________________delete videos____________________________
    async deleteItem({ commit, dispatch }, id) {
      await this.$axios
        .delete(
          `/videos/${id}.json`
        )
        .then((res) => {
          dispatch("selectAll");
        });
    },
    // _________________________________update or edit videos ______________________
    async updatevideos({ commit, dispatch }, data) {
      await this.$axios
      .put(
          `/videos/${data.id}.json`,
          data
        )
      .then((res) => {
          dispatch("selectAll");
        });
    },
  };
  