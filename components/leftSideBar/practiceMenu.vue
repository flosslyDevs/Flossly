<template>
  <div class="header-container" :class="!rail ? 'pl-2' : ''">
    <!-- Left: Avatar + Title -->
    <div class="left-content">
      <CommonAvatar v-if="currentOrg.name" :user="currentOrg" />
      <span class="ml-2 title-text" v-if="!rail">{{ currentOrg.name }}</span>
    </div>

    <!-- Right: Menu Icon -->
    <v-menu v-model="menu" location="bottom end" offset-y>
      <template #activator="{ props }">
        <v-btn v-bind="props" icon flat>
          <div class="d-flex flex-column align-center justify-center">
            <v-icon size="16">mdi-chevron-up</v-icon>
            <v-icon size="16">mdi-chevron-down</v-icon>
          </div>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="handleAction('Edit')">
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleAction('Delete')">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
const { currentOrg, rail } = defineProps({
  currentOrg: Object,
  rail: Boolean,
});
const menu = ref(false);
onMounted(() => {
  currentOrg.fullName = currentOrg.name;
});
const handleAction = (action) => {
  console.log(`${action} clicked`);
  menu.value = false;
};
</script>

<style scoped>
.avatar-letter {
  color: #ffffff;
  font-size: 24px;
}
.custom-avatar {
  border-radius: 6px !important; /* makes avatar slightly rounded */
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 8px;
  border-bottom: 1px solid #dbdbdb;
}

.left-content {
  display: flex;
  align-items: center;
}

.title-text {
  font-family: "Poppins";
  font-weight: 500;
  font-style: Medium;
  font-size: 12px;
}
</style>
