import userService from "../services/userService";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    isLoading: false,
  }),

  getters: {},

  actions: {
    updatePreferences(data) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        userService
          .updatePreferences(data)
          .then((res) => {
            this.isLoading = false;
            resolve(res);
          })
          .catch((err) => {
            this.isLoading = false;
            reject(err);
          });
      });
    },
    getUserList(data) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        userService
          .getUserList(data)
          .then((res) => {
            this.isLoading = false;
            resolve(res);
          })
          .catch((err) => {
            this.isLoading = false;
            reject(err);
          });
      });
    },
    getUserOrgWise() {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        userService
          .getUserOrgWise()
          .then((res) => {
            this.isLoading = false;
            resolve(res);
          })
          .catch((err) => {
            this.isLoading = false;
            reject(err);
          });
      });
    },
  },
});
