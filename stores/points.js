import pointService from "../services/pointService";

export const usePointStore = defineStore("pointStore", {
  state: () => ({
    isLoading: false,
  }),

  getters: {},

  actions: {
    getPointHistory() {
        this.isLoading = true;
        return new Promise((resolve, reject) => {
          pointService
            .getPointHistory()
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
    getLoyaltyPoints() {
        this.isLoading = true;
        return new Promise((resolve, reject) => {
          pointService
            .getLoyaltyPoints()
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
    getRewardPonits() {
        this.isLoading = true;
        return new Promise((resolve, reject) => {
          pointService
            .getRewardPonits()
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
    redeemLoyaltyPoints(data) {
        this.isLoading = true;
        return new Promise((resolve, reject) => {
          pointService
            .redeemLoyaltyPoints(data)
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
    referPractice(data) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        pointService
          .referPractice(data)
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
  feedback(data) {
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      pointService
        .feedback(data)
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
    getRedeemedPoints() {
        this.isLoading = true;
        return new Promise((resolve, reject) => {
          pointService
            .getRedeemedPoints()
            .then((res) => {
              this.isLoading = false;
              resolve(res);
            })
            .catch((err) => {
              this.isLoading = false;
              reject(err);
            });
        });
    }
  },
});
