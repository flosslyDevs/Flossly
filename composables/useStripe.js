import { ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";

export const useStripe = () => {
  const prices = ref([]);
  const selectedPriceId = ref(null);
  const loading = ref(false);
  const error = ref("");
  const elementsRef = ref(null);
  const paymentElementMounted = ref(false);
  const subscription = ref(null);
  const currSubscription = ref(null)
  const isPaymentCompleted = ref(false)
  const config = useRuntimeConfig();
  const stripePromise = loadStripe(config.public.Stripe_PK);

  const fetchPrices = async () => {
    try {
      const res = await $fetch("/api/stripe/prices");
      if (res.code === 0) {
        prices.value = res.data;
      } else {
        console.error("Failed to fetch prices", res.error);
      }
    } catch (err) {
      console.error("fetchPrices error", err);
    }
  };
  const formatPrice = (amount, currency) => {
    if (!amount) return "";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency?.toUpperCase() || "GBP",
    }).format((amount || 0) / 100);
  };

  const mountPaymentElement = async (clientSecret) => {
    const stripe = await stripePromise;
    elementsRef.value = stripe.elements({ clientSecret });
    const paymentEl = elementsRef.value.create("payment");
    const mountNode = document.getElementById("payment-element");
    if (mountNode) {
      mountNode.innerHTML = "";
      paymentEl.mount(mountNode);
    }
    paymentElementMounted.value = true;
    loading.value = false
  };

  const handleSubscribe = async (priceId) => {
    selectedPriceId.value = priceId;
    if (paymentElementMounted.value) {
      const mountNode = document.getElementById("payment-element");
      if (mountNode) mountNode.innerHTML = "";
      paymentElementMounted.value = false;
    }
    loading.value = true;
    error.value = "";

    try {
      const res = await $fetch("/api/stripe/create-subscription", {
        method: "POST",
        body: { priceId: selectedPriceId.value },
      });

      if (res.code !== 0) {
        error.value = res.error || "Failed to create subscription";
        loading.value = false;
        return;
      }

      const clientSecret = res.data.clientSecret;
      subscription.value = res.data.subscription;

      if (!clientSecret) {
        loading.value = false;
        error.value =
          "No payment required — subscription created. Check your account.";
        return;
      }
      await mountPaymentElement(clientSecret);
    } catch (err) {
      console.error("subscribe err", err);
      error.value = err.message || "Something went wrong";
      loading.value = false;
    }
  };

  const confirmPayment = async () => {
    loading.value = true
    const stripe = await stripePromise;
    const result = await stripe.confirmPayment({
      elements: elementsRef.value,
      redirect: "if_required",
    });

    if (result.error) {
      error.value = result.error.message || "Payment confirmation failed";
      loading.value = false;
      return;
    } else {
      const res = await $fetch("/api/stripe/confirmPayment", {
        method: "POST",
        body: { subscriptionId: subscription.value.id },
      });
      loading.value = false
      if (res.code !== 0) {
       error.value = res.data.message
      } else {
        isPaymentCompleted.value = true
      }
    }
  };
  const getCurrentSubscription = async () => {
    console.log('herere')
    try {
      loading.value = true
      error.value = null
      currSubscription.value = null

      const { data, error: fetchError } = await useFetch('/api/stripe/subscription')

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Unable to fetch subscription')
      }

      currSubscription.value = data.value
      return currSubscription.value
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    prices,
    selectedPriceId,
    loading,
    error,
    fetchPrices,
    currSubscription,
    confirmPayment,
    isPaymentCompleted,
    getCurrentSubscription,
    formatPrice,
    handleSubscribe,
  };
};
