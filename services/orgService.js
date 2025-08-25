import { PostFormData, Get, Post } from "./apiWrapper";
export default {
  updateOrganisation(data) {
    return new Promise((resolve, reject) => {
      PostFormData("/organisations/update", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getTaskPriorities() {
    return new Promise((resolve, reject) => {
      Get("/organisations/priorities")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, 
   getTaskStatuses() {
    return new Promise((resolve, reject) => {
      Get("/organisations/statuses")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getPracticeDetails() {
    return new Promise((resolve, reject) => {
      Get("/organisations/details")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err); 
        });
    });
  }, 
  addContacts(data) {
    return new Promise((resolve, reject) => {
      Post("/organisations/addContacts", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addEquipment(data) {
    return new Promise((resolve, reject) => {
      Post("/organisations/addEquipment", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addRoom(data) {
    return new Promise((resolve, reject) => {
      Post("/organisations/addSurgery", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addGroup(data) {
    return new Promise((resolve, reject) => {
      Post("/organisations/addGroup", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateAttributes(data) {
    return new Promise((resolve, reject) => {
      Post("/organisations/updateAttribute", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
