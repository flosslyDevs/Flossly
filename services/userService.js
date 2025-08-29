import { Get,Post } from "./apiWrapper";
export default {
  updatePreferences(data) {
    return new Promise((resolve, reject) => {
      Post("/users/updatePreferences", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getUserList(data) {
    return new Promise((resolve, reject) => {
      Post("/users/list", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getUserOrgWise() {
    return new Promise((resolve, reject) => {
      Get("/users/listOrgWise")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getUserDetails(data) {
    return new Promise((resolve, reject) => {
      Post("/users/getDetails", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateContract(data) {
    return new Promise((resolve, reject) => {
      Post("/users/updateContract", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateUserBank(data) {
    return new Promise((resolve, reject) => {
      Post("/users/updateAccount", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getUserLeaveHistory(data) {
    return new Promise((resolve, reject) => {
      Post("/users/updateAccount", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
