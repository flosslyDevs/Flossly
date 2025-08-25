<template>
  <div class="px-7 py-3">
    <v-card
      v-for="(item, index) in checklist"
      :key="index"
      class="pa-4 rounded-lg border-card mb-4" 
      elevation="0"
      style="border: 1px solid #DBDBDB;"
    >
    
      <TasksTaskDetailsDialogTaskChecklist
        :item="item" 
        :index="index"
        @deleteItem="deleteItem"
      />
    </v-card>
    <v-btn
  @click="addNewChecklist"
  class="w-100 justify-center add-qs-btn"
  variant="outlined"
  
  flat
>
  <v-icon
    start
    class="me-2"
    color="primary"
    style="border: 1px solid currentColor; border-radius: 50%; padding: 4px;"
  >
    mdi-plus
  </v-icon>
  Add More Questions
</v-btn>

  </div>
</template>

<script setup>
const { checklist, userTaskId } = defineProps({
  checklist: Array,
  userTaskId: Number
});
const taskStore = useTaskStore();
const mainStore = useMainStore();
const deleteItem = (itemToDelete) => {
  taskStore.deleteChecklist({ id: itemToDelete.id }).then((res) => {
    if (res.code === 0) {
      mainStore.setSnackbar({
        title: "Checklist deleted successfully",
        type: "success",
      });
      const index = checklist.findIndex((item) => item.id === itemToDelete.id);
      if (index !== -1) {
        checklist.splice(index, 1);
      }
    }
  });
};
const addNewChecklist = () => {
  checklist.push({
    question: "",
    category: "",
    userTaskId,
    fieldOneTitle: "",
    fieldTwoTitle: "",
    showDate: false,
    showTime: false,
    showRadio: false,
    radioValue: "N/A",
    timeValue: null,
    dateValue: null,
  });
};
</script>
<style scoped>
.add-qs-btn{
  border: 1px solid #DFDFDF;
  height: 52px;
}
</style>