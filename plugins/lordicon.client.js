// plugins/lordicon.client.js
import { defineElement } from '@lordicon/element';
import lottie from 'lottie-web';

export default defineNuxtPlugin(() => {
  // Register the <lord-icon> custom element globally
  defineElement(lottie.loadAnimation);
});
