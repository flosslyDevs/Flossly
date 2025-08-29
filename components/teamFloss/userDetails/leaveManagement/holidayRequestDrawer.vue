<template>
    <v-navigation-drawer
      :model-value="modelValue"
      location="right"
      temporary
      :width="600"
    >
      <!-- Header -->
      <v-toolbar flat color="white">
        <v-toolbar-title class="title-text"> Add Holiday Request </v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          variant="outlined"
          color="#8B8B8B"
          @click="onClose"
          class="mr-4"
          style="width:20px;height:20px;min-width:20px;border-radius:50%;padding:0;"
        >
          <v-icon size="14">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
  
      <!-- Body -->
      <div
        class="pa-4"
        style="background-color:#f5f5f5;height:calc(100% - 64px - 64px);overflow-y:auto;"
      >
        <v-card class="pa-4" color="white" elevation="0">
          <v-form ref="formRef" @submit.prevent="onSubmit">
            <v-row>
              <!-- Select Employee -->
              <v-col cols="6">
                <label class="fld-lbl">Select Employee</label>
                <v-select
                  v-model="form.employeeId"
                  :items="employees"
                  item-title="name"
                  item-value="id"
                  variant="solo"
                  density="compact"
                  class="mb-1 input-bordered"
                  :rules="requiredRule"
                  required
                  flat
                />
              </v-col>
  
              <!-- Leave Type -->
              <v-col cols="6">
                <label class="fld-lbl">Leave Type</label>
                <v-select
                  v-model="form.leaveType"
                  :items="leaveTypes"
                  variant="solo"
                  density="compact"
                  class="mb-1 input-bordered"
                  :rules="requiredRule"
                  required
                  flat
                />
              </v-col>
  
              <!-- Start Date -->
              <v-col cols="6">
                <label class="fld-lbl">Start Date</label>
                <v-menu
                  v-model="startMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ props }">
                    <v-text-field
                      v-model="formattedStartDate"
                      v-bind="props"
                      variant="solo"
                      density="compact"
                      class="mb-1 input-bordered"
                      flat
                      readonly
                      :rules="requiredRule"
                      required
                    >
                      <template #append-inner>
                        <v-icon class="cursor-pointer" @click.stop="startMenu = true">mdi-calendar</v-icon>
                      </template>
                    </v-text-field>
                  </template>
  
                  <v-date-picker
                    v-model="form.startDate"
                    @update:modelValue="onStartDateSelected"
                  />
                </v-menu>
              </v-col>
  
              <!-- End Date -->
              <v-col cols="6">
                <label class="fld-lbl">End Date</label>
                <v-menu
                  v-model="endMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ props }">
                    <v-text-field
                      v-model="formattedEndDate"
                      v-bind="props"
                      variant="solo"
                      density="compact"
                      class="mb-1 input-bordered"
                      flat
                      readonly
                      :rules="requiredRule"
                      required
                    >
                      <template #append-inner>
                        <v-icon class="cursor-pointer" @click.stop="endMenu = true">mdi-calendar</v-icon>
                      </template>
                    </v-text-field>
                  </template>
  
                  <v-date-picker
                    v-model="form.endDate"
                    @update:modelValue="onEndDateSelected"
                  />
                </v-menu>
              </v-col>
  
              <!-- Leave Hours -->
              <v-col cols="6">
                <label class="fld-lbl">Leave Hours</label>
                <v-select
                  v-model="form.leaveHours"
                  :items="leaveHoursOptions"
                  variant="solo"
                  density="compact"
                  class="mb-1 input-bordered"
                  flat
                />
              </v-col>
  
              <!-- Pay -->
              <v-col cols="6">
                <label class="fld-lbl">Pay</label>
                <v-select
                  v-model="form.pay"
                  :items="payOptions"
                  variant="solo"
                  density="compact"
                  class="mb-1 input-bordered"
                  flat
                />
              </v-col>
  
              <!-- Comment -->
              <v-col cols="12">
                <label class="fld-lbl">Comment</label>
                <v-textarea
                  v-model="form.comment"
                  variant="solo"
                  density="compact"
                  class="mb-1 input-bordered"
                  flat
                />
              </v-col>
  
              <!-- Supporting Documents -->
              <v-col cols="12">
                <div class="mb-2">
                  <div>
                    <p class="text-body-2 text-grey-darken-1">Supporting Documents</p>
                    <h4 class="text-subtitle-1 font-weight-medium">
                      Upload any relevant supporting documents for your request.
                    </h4>
                  </div>
                  <v-btn  
                    color="secondary"
                    variant="flat"
                    prepend-icon="mdi-upload"
                    @click="$refs.fileInput.click()"
                    class="mt-2"
                  >
                    Upload Files 
                  </v-btn>
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    class="d-none"
                    @change="handleFileUpload"
                  />
                </div>
  
                <div v-if="uploadedFiles.length" class="pa-5">
                  <v-row>
                    <v-col
                      v-for="(file, index) in uploadedFiles"
                      :key="index"
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <DocsMyDocsRecentlyAccessed
                        class="mb-2"
                        :file="file"
                        :folder="selectedFolder"
                      />
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </div>
  
      <!-- Footer -->
      <div
        class="d-flex justify-space-between align-center px-4 py-2"
        style="background-color:white;height:64px"
      >
        <v-btn
          color="white"
          class="text-primary"
          style="width:48%;border-radius:8px;border:1px solid #dfdfdf"
          @click="onClose"
          flat
        >
          Back
        </v-btn>
  
        <v-btn
          color="primary"
          class="text-white"
          style="width:48%;border-radius:8px"
          @click="onSubmit"
          flat
        >
          Save
        </v-btn>
      </div>
    </v-navigation-drawer>
  </template>
  
  <script setup>
  import { format } from "date-fns";
  
  const props = defineProps({
    modelValue: Boolean,
  });
  const emit = defineEmits(["close", "success"]);
  
  const formRef = ref(null);
  
  // menus for date pickers
  const startMenu = ref(false);
  const endMenu = ref(false);
  
  // mock form data
  const form = ref({
    employeeId: null,
    leaveType: "",
    startDate: "",
    endDate: "",
    leaveHours: "",
    pay: "",
    comment: "",
  });
  
  // file uploads
  const uploadedFiles = ref([]);
  const selectedFolder = ref(null);
  
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    uploadedFiles.value.push(
      ...files.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
        uploadedAt: new Date(),
        raw: f,
      }))
    );
  };
  
  // mock dropdown data
  const employees = ref([
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
  ]);
  const leaveTypes = ref(["Sick Leave", "Casual Leave", "Annual Leave"]);
  const leaveHoursOptions = ref(["Half Day", "Full Day", "2 Hours", "4 Hours"]);
  const payOptions = ref(["Paid", "Unpaid"]);
  
  const requiredRule = [(v) => !!v || "This field is required"];
  
  // formatted date computed props
  const formattedStartDate = computed({
    get() {
      if (!form.value.startDate) return "";
      return form.value.startDate;
    },
    set(val) {
      form.value.startDate = val;
    },
  });
  const formattedEndDate = computed({
    get() {
      if (!form.value.endDate) return "";
      return form.value.endDate;
    },
    set(val) {
      form.value.endDate = val;
    },
  });
  
  const onStartDateSelected = (val) => {
    try {
      form.value.startDate = format(new Date(val), "yyyy-MM-dd");
    } catch (e) {
      form.value.startDate = val;
    }
    startMenu.value = false;
  };
  const onEndDateSelected = (val) => {
    try {
      form.value.endDate = format(new Date(val), "yyyy-MM-dd"); 
    } catch (e) {
      form.value.endDate = val;
    }
    endMenu.value = false;
  };
  
  const onSubmit = async () => {
    const isValid =
      typeof formRef.value?.validate === "function"
        ? await formRef.value.validate()
        : true;
  
    if (isValid) {
      console.log("Holiday Request Submitted:", form.value, uploadedFiles.value);
      emit("success", { ...form.value, uploadedFiles: uploadedFiles.value });
      emit("close");
      resetForm()    
    }
  };
  const resetForm = () => {
  form.value = {
    employeeId: null,
    leaveType: "",
    startDate: "",
    endDate: "",
    leaveHours: "",
    pay: "",
    comment: "",
  }
  uploadedFiles.value = []
}
const onClose=()=>{
    emit('close')
    resetForm()  
} 
  </script>
  
  <style scoped>
  .title-text {
    font-family: "Poppins";
    font-weight: 600;
    font-size: 16px;
  }
  .fld-lbl {
    font-family: "Poppins";
    font-weight: 400;
    font-size: 14px;
    color: #737373;
  }
  .input-bordered :deep(.v-field) {
    border: 1px solid #dfdfdf !important;
    border-radius: 8px !important;
    background-color: white !important;
    min-height: 40px;
    font-size: 14px;
  }
  </style>
  