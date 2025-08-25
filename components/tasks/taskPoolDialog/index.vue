<template>
  <v-dialog :model-value="props.modelValue" max-width="1500px" persistent>
    <v-card class="d-flex flex-column rounded-xl" style="min-height: 75vh">
      <!-- Header -->
      <div class="pa-4 d-flex justify-space-between align-center bg-white">
        <h3 class="title m-0">Task pool</h3>
        <div class="d-flex align-center">
          <v-btn flat icon size="32" class="ml-2" @click="$emit('close')">
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </div>
      </div>

      <!-- Content -->
      <div
        class="flex-grow-1 px-4 py-2"
        style="overflow-y: auto; background-color: #f9f9f9"
      >
        <v-tabs v-model="tab" class="custom-tabs px-4" slider-color="primary">
          <v-tab
            v-for="category in categoryList.filter((x) => !x.parentId)"
            :key="category.id"
            :value="category.id"
            class="tab-text"
          >
            {{ category.name }}
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="tab">
            <v-row v-if="subCategoryView" class="ma-5" align="stretch">
              <v-col
                v-for="(card, index) in subCategories"
                :key="index"
                cols="12"
                sm="6"
                md="3"
              >
                <TasksTaskPoolDialogTaskCards
                  :title="card.name"
                  :description="card.description"
                  :count="card.taskCount"
                  @click="fetchGeneralTasks(card.id)"
                />
              </v-col>
            </v-row>
            <v-card
              v-else
              class="rounded-xl ma-5"
              border
              style="border-color: #dbdbdb"
              :elevation="0"
            >
              <v-icon
                v-if="subCategories.length"
                @click="subCategoryView = true"
                size="36"
                color="gray"
                >mdi-arrow-left</v-icon
              >
              <v-list v-if="tasks.length" class="pa-0">
                <TasksTaskPoolDialogTaskRow
                  v-for="item in tasks"
                  :key="item.id"
                  :id="item.id"
                  :title="item.title"
                  @checked="handleCheck"
                />
              </v-list>
              <h3 v-else>No Tasks Found.</h3>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>

      <!-- Footer -->
      <div
        class="d-flex justify-end pa-6 bg-white"
        style="border-top: 1px solid #eee"
        v-if="selectedTasks.length"
      >
        <v-btn
          color="primary"
          flat
          rounded="lg"
          class="px-7"
          style="height: 44px"
          @click="addTaskToBoard"
        >
          <v-icon start>mdi-plus-circle-outline</v-icon>
          Add to board
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
const taskStore = useTaskStore();
const mainStore = useMainStore();
const tab = ref(0);
const tasks = ref([]);
const categoryList = ref([]);
const subCategories = ref();
const subCategoryView = ref(true);
const selectedTasks = ref([]);
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["onUpdate"]);
const fetchGeneralTasks = (id) => {
  taskStore
    .generalTasks({ categoryId: id })
    .then((res) => {
      if (res.code === 0) {
        subCategoryView.value = false;
        tasks.value = res.data;
      } else {
        mainStore.setSnackbar({
          title: res.data.message || res.message,
          type: "Error",
        });
      }
    })
    .catch((err) => {
      mainStore.setSnackbar({
        title: err.message,
        type: "Error",
      });
    });
};
const fetchListCategories = () => {
  taskStore
    .listCategoriesForPool()
    .then((res) => {
      if (res.code === 0) {
        categoryList.value = res.data;
        const firstCat = categoryList.value[0];
        const firstCatSubCat = categoryList.value.filter(
          (x) => x.parentId === firstCat.id
        );
        if (firstCatSubCat.length) {
          subCategories.value = firstCatSubCat;
          subCategoryView.value = true;
        } else {
          fetchGeneralTasks(categoryList.value[0].id);
        }
      } else {
        mainStore.setSnackbar({
          title: res.data.message || res.message,
          type: "Error",
        });
      }
    })
    .catch((err) => {
      mainStore.setSnackbar({
        title: err.message,
        type: "Error",
      });
    });
};
watch(
  () => props.modelValue,
  async (newVal) => {
    if (newVal) {
      fetchListCategories();
    }
  }
);
watch(tab, async (newId) => {
  if (newId) {
    subCategories.value = categoryList.value.filter(
      (x) => x.parentId === newId
    );
    if (subCategories.value.length) {
      subCategoryView.value = true;
    } else {
      subCategories.value = [];
      subCategoryView.value = true;
      fetchGeneralTasks(newId);
    }
  }
});
const addTaskToBoard = async () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  const user = JSON.parse(userStr);
  try {
    const res = await taskStore.assignTask({
      userId: user.id,
      tasks: selectedTasks.value,
    });

    if (res.code === 0) {
      emit("onUpdate");
      mainStore.setSnackbar({
        title: "Task assigned successfully",
        type: "success",
      });
    } else {
      mainStore.setSnackbar({
        title: res.data?.message || res.message || "Task assigned failed",
        type: "error",
      });
    }
  } catch (err) {
    mainStore.setSnackbar({
      title: err.message || "An unexpected error occurred",
      type: "error",
    });
  }
};

function handleCheck({ id, checked }) {
  const task = tasks.value.find((task) => task.id === id);
  if (!task) return;

  if (checked) {
    // Add if not already in selectedTasks
    if (!selectedTasks.value.some((t) => t.id === id)) {
      selectedTasks.value.push(task);
    }
  } else {
    // Remove if unchecked
    selectedTasks.value = selectedTasks.value.filter((t) => t.id !== id);
  }

  console.log("Selected tasks:", selectedTasks.value);
}

function goBack() {
  // Handle back navigation
}
</script>

<style scoped>
.title {
  font-family: "Poppins";
  font-weight: 600;
  font-size: 16px;
}
.custom-tabs {
  border-bottom: 1px solid #dbdbdb;
}
.custom-tabs .v-tab {
  color: inherit !important;
}
.custom-tabs .v-tab.v-tab--selected {
  font-weight: 500;
}
.bonus-chip {
  border: 1px solid #fea200;
  background-color: #fff0d5;
  color: #1e1e1e;
  font-weight: 500;
  font-size: 13px;
  border-radius: 16px;
}
::v-deep(.bonus-chip .v-icon) {
  color: #fea200;
}
</style>
