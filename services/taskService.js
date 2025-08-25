import { Post, Get, PostFormData } from "./apiWrapper";
export default {
  getMyTasks(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/myTasks", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getTaskDetails(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/getDetails", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addNewTask(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/addNewTask", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getMyTeamTasks() {
    return new Promise((resolve, reject) => {
      Get("/tasks/teamTasks")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getMyTeamTasksDetails() {
    return new Promise((resolve, reject) => {
      Get("/tasks/teamTasksDetails")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getMyTeamTaskStats() {
    return new Promise((resolve, reject) => {
      Get("/tasks/teamTaskCounts")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  listCategories() {
    return new Promise((resolve, reject) => {
      Get("/tasks/listCategories")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  listCategoriesForPool() {
    return new Promise((resolve, reject) => {
      Get("/tasks/listCategoriesForPool")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getMyTaskStatsByCategory() {
    return new Promise((resolve, reject) => {
      Get("/tasks/myTasksCountByCategory")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getTeamTaskStatsByCategory() {
    return new Promise((resolve, reject) => {
      Get("/tasks/teamTasksCountByCategory")
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  tasksGroupedByStatus(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/filteredByStatus", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  teamTasksGroupedByStatus(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/groupedByTask", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateChecklist(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/updateChecklist", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addChecklist(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/createChecklist", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deleteChecklist(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/deleteChecklist", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  generalTasks(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/generalTaskByCategory", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  updateUserTask(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/updateUserTask", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addAttachments(data) {
    return new Promise((resolve, reject) => {
      PostFormData("/tasks/addAttachments", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  assignTask(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/assign", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  unAssignTask(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/unassign", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  addCategory(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/addCategory", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  unAssignBulkTask(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/unassignBulk", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  completeBulkTasks(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/completeBulk", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  archieveBulkTasks(data) {
    return new Promise((resolve, reject) => {
      Post("/tasks/archieveBulk", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
