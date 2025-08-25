<template>
    <div
      class="upload-box"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <v-icon size="40" color="#266DF0">mdi-cloud-upload-outline</v-icon>
  
      <p class="upload-text">
        Drag & drop your file here or
        <span class="browse-text" @click.stop="triggerFileInput">Browse</span>
      </p>
  
      <input
        ref="fileInput"
        type="file"
        class="hidden-input"
        @change="handleFileChange"
      />
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['upload'])
  
  const fileInput = ref(null)
  
  const triggerFileInput = () => fileInput.value?.click()
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) emit('upload', file)
  }
  
  const handleDrop = (e) => {
    const file = e.dataTransfer.files[0]
    if (file) emit('upload', file)
  }
  </script>
  
  <style scoped>
  .upload-box {
    border: 2px dashed #ccc;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.3s;
    background-color: #FFFFFF;
  }
  
  .upload-box:hover {
    border-color: #266DF0;
  }
  
  .upload-text {
    margin-top: 12px;
    color: #666;
    font-size: 14px;
  }
  
  .browse-text {
    color: #266DF0;
    font-weight: 500;
    cursor: pointer;
    margin-left: 4px;
  }
  
  .hidden-input {
    display: none;
  }
  </style>
  