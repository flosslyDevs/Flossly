import { Get,Post } from "./apiWrapper";
export default {
    getPointHistory() {
    return new Promise((resolve, reject) => {
      Get("/points/history")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getLoyaltyPoints() {
    return new Promise((resolve, reject) => {
      Get("/points/loyaltyPoints")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getRewardPonits() {
    return new Promise((resolve, reject) => {
      Get("/points/rewardPoints")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  redeemLoyaltyPoints(data) {
    return new Promise((resolve, reject) => {
      Post("/points/redeemLoyaltyPoint", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  referPractice(data) {
    return new Promise((resolve, reject) => {
      Post("/points/referPractice", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  feedback(data) {
    return new Promise((resolve, reject) => {
      Post("/points/feedback", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getRedeemedPoints() {
    return new Promise((resolve, reject) => {
      Get("/points/redeemedPoints")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

};
