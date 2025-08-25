<template>
  <div
    class="upload-box"
    @dragover.prevent
    @drop.prevent="handleDrop"
    @click="triggerFileInput"
  >
    <img
      src="@/assets/images/flosslydocs/fileupload.svg"
      alt="Upload File"
      width="50"
      height="50"
    />

    <p class="upload-text">
      Drag & drop your file(s) here or
      <span class="browse-text" @click.stop="triggerFileInput">Browse</span>
    </p>

    <input
      ref="fileInput"
      type="file"
      multiple
      class="hidden-input"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";
const emit = defineEmits(["onFiles"])
const selectedFiles = ref([]); // store multiple files
const fileInput = ref(null);

const triggerFileInput = () => fileInput.value?.click();

const handleFileChange = (e) => {
  if (e.target.files.length) {
    selectedFiles.value = [...selectedFiles.value, ...Array.from(e.target.files)];
  }
  emit("onFiles", selectedFiles.value)
};

const handleDrop = (e) => {
  if (e.dataTransfer.files.length) {
    selectedFiles.value = [...selectedFiles.value, ...Array.from(e.dataTransfer.files)];
  }
  emit("onFiles", selectedFiles.value)
};

defineExpose({
  clearFiles: () => {
    selectedFiles.value = [];
    if (fileInput.value) fileInput.value.value = "";
  },
});
</script>

<style scoped>
.upload-box {
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
  background-color: #ffffff;
}
.upload-box:hover {
  border-color: #60e5a3;
}
.upload-text {
  margin-top: 12px;
  color: #666;
  font-size: 14px;
}
.browse-text {
  color: #60e5a3;
  font-weight: 500;
  cursor: pointer;
  margin-left: 4px;
}
.hidden-input {
  display: none;
}
</style>
