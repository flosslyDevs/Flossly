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
};
