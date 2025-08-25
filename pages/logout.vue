<script setup>
definePageMeta({
  layout: "default",
});
const token = useCookie("accessToken");
token.value = null;
if (window) {
  window.location.replace("/login");
} else {
  const router = useRouter()
  router.push('/login')
}
</script>
