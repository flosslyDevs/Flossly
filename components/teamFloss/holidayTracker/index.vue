<template>
    <div 
      class="holiday-page"
      :style="{
  backgroundImage: `url(${images[currentIndex]})`,
  backgroundSize: 'cover'
}"
    >
      <!-- Floating buttons -->
      <div class="nav-buttons">
        <button @click="prevImage" :disabled="currentIndex === 0">⬅️</button>
        <button @click="nextImage" :disabled="currentIndex === images.length - 1">➡️</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Import holiday assets
  import holiday1 from "@/assets/images/teamfloss/holidayTracker/holiday.svg";
  import holiday2 from "@/assets/images/teamfloss/holidayTracker/holiday1.svg";
  import holiday3 from "@/assets/images/teamfloss/holidayTracker/holiday2.svg";
  
  // Put them in an array
  const images = [holiday1, holiday2, holiday3];
  
  const currentIndex = ref(0);
  
  const nextImage = () => {
    if (currentIndex.value < images.length - 1) {
      currentIndex.value++;
    }
  };
  
  const prevImage = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  };
  </script>
  
  <style scoped>
  .holiday-page {
    width: 100%;
    height: 88vh;
    background-size: cover;
    position: relative;
  }
  
  /* floating button container */
  .nav-buttons {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
  }
  
  /* button style */
  .nav-buttons button {
    background: rgba(0, 0, 0, 0.6);
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
    transition: background 0.2s ease;
  }
  
  .nav-buttons button:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.8);
  }
  
  .nav-buttons button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  </style>
  