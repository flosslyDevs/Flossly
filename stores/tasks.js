import taskService from "../services/taskService";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    myTasks: [],
    myTaskStats: null,
    myTeamTasks: [],
    myTeamTaskStats: [],
    isLoading: false,
  }),

  getters: {},

  actions: {
    getMyTasks(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .getMyTasks(data)
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
    getTaskDetails(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .getTaskDetails(data)
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
    addNewTask(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .addNewTask(data)
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
    getMyTeamTasks() {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .getMyTeamTasks()
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
    getMyTeamTaskStats() {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .getMyTeamTaskStats()
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
    getMyTeamTasksDetails() {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .getMyTeamTasksDetails()
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
    listCategories() { 
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .listCategories()
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
    listCategoriesForPool() { 
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .listCategoriesForPool()
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
    getMyTaskStatsByCategory() {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .getMyTaskStatsByCategory()
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
    tasksGroupedByStatus(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .tasksGroupedByStatus(data)
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
    teamTasksGroupedByStatus(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .teamTasksGroupedByStatus(data)
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
    getTeamTaskStatsByCategory() {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .getTeamTaskStatsByCategory()
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
    updateChecklist(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .updateChecklist(data)
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
    updateUserTask(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .updateUserTask(data)
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
    addChecklist(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .addChecklist(data)
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
    deleteChecklist(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .deleteChecklist(data)
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
    generalTasks(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .generalTasks(data)
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
    addAttachments(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .addAttachments(data)
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
    assignTask(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .assignTask(data)
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
    unAssignBulkTasks(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .unAssignBulkTask(data)
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
    completeBulkTasks(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .completeBulkTasks(data)
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

    archieveBulkTasks(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .archieveBulkTasks(data)
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
    unAssignTask(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .unAssignTask(data)
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
    addCategory(data) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        taskService
          .addCategory(data)
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
