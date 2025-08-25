<template>
    <div style="background-color: white" class="pa-5 rounded-lg">
      <!-- Tabs -->
      <v-tabs
        v-model="currentTab"
        class="custom-tabs"
        slider-color="primary"
      >
      <v-tab class="tab-text" value="profile">
    <img src="@/assets/icons/teamfloss/userDetails/profile.svg" alt="Profile" class="tab-icon" />
    Profile
  </v-tab>

  <v-tab class="tab-text" value="recruitment">
    <img src="@/assets/icons/teamfloss/userDetails/recruitment.svg" alt="Recruitment" class="tab-icon" />
    Recruitment
  </v-tab>

  <v-tab class="tab-text" value="training">
    <img src="@/assets/icons/teamfloss/userDetails/training.svg" alt="Training" class="tab-icon" />
    Training
  </v-tab>

  <v-tab class="tab-text" value="leave">
    <img src="@/assets/icons/teamfloss/userDetails/leave.svg" alt="Leave Status" class="tab-icon" />
    Leave Status
  </v-tab>

  <v-tab class="tab-text" value="workflow">
    <img src="@/assets/icons/teamfloss/userDetails/workflow.svg" alt="Workflow" class="tab-icon" />
    Workflow
  </v-tab>
      </v-tabs>
  
      <!-- Tab Content -->
      <v-tabs-window v-model="currentTab">
        <v-tabs-window-item value="profile">
          <div class="pa-4">
            <TeamFlossUserDetailsVueProfile/>
          </div>
        </v-tabs-window-item>
        
        <v-tabs-window-item value="recruitment">
            <div class="pa-4">
            <TeamFlossUserDetailsVueRecruitment/>
            </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="training">
            <div class="pa-4">
            <TeamFlossUserDetailsVueTraining/>
        </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="leave">
            <div class="pa-4">
            <TeamFlossUserDetailsVueLeaveStatus/>
            </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="workflow">
            <div class="pa-4">
            <TeamFlossUserDetailsVueWorkFlow/>
        </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </template>
  
  <script setup>


  const currentTab = ref("profile");
  </script>
  
  <style scoped>
  .custom-tabs {
    border-bottom: 1px solid #dbdbdb;
  }
  .tab-icon {
  width: 16px;
  height: 16px;
  margin-right: 6px;
}

.custom-tabs .v-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 400;
  text-transform: none;
  color: #1e1e1e !important;
  min-height: 40px;
  min-width: max-content;
}

.custom-tabs .v-tab.v-tab--selected {
  font-weight: 500;
  color: #1e1e1e !important;
}

.custom-tabs .v-tabs-slider {
  height: 2px;
}

  </style>
  