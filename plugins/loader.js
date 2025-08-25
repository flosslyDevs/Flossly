export default defineNuxtPlugin(() => {
  if (process.client) {
    import("@lottiefiles/lottie-player");
  }
});
