<template>
  <div class="signup-page">
    <v-container>
      <v-row style="height: 100%">
        <v-col cols="12" md="5" class="d-none d-md-flex">
          <div class="background-image rounded-xl pa-10 relative">
            <img src="@/assets/logos/loginLogos/white-logo.svg" alt="My Logo" />
            <h1 class="mt-5 text-white">
              Get started with Flossly to streamline your clinic in minutes.
            </h1>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="7"
          class="d-flex align-center justify-center px-12"
          v-if="!isSignedUp"
        >
          <div style="width: 100%; max-width: 500px">
            <h2 class="text-center from-heading">Sign Up</h2>
            <h2
              class="mb-6 text-center form-sub-heading"
              style="color: #8b8b8b"
            >
              Get started with Flossly to streamline your clinic in minutes.
            </h2>
            <v-form ref="form" @submit.prevent="signUp">
              <v-label>Full Name</v-label>
              <v-text-field
                v-model="signUpDetails.fullName"
                label="Full Name"
                single-line
                density="comfortable"
                :rules="[(v) => !!v || 'Full name is required']"
                variant="outlined"
                required
              />
              <v-label>Email</v-label>
              <v-text-field
                v-model="signUpDetails.email"
                label="Email"
                type="email"
                single-line
                density="comfortable"
                :rules="emailRules"
                variant="outlined"
                required
                class="mt-1"
              />
              <v-label>Password</v-label>
              <v-text-field
                v-model="signUpDetails.password"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules"
                required
                variant="outlined"
                single-line
                density="comfortable"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="togglePasswordVisibility"
                class="mt-1"
              />
              <v-label>Clinic Name</v-label>
              <v-text-field
                v-model="signUpDetails.organisationName"
                label="Clinic Name"
                :rules="[(v) => !!v || 'Clinic name is required']"
                variant="outlined"
                required
                single-line
                density="comfortable"
                class="mt-1"
              />
              <v-label>Clinic Role</v-label>
              <v-select
                v-model="signUpDetails.roleId"
                :items="rolesList"
                label="Clinic Role"
                variant="outlined"
                required
                title="Select Role"
                single-line
                item-title="title"
                item-value="id"
                density="comfortable"
                :rules="[(v) => !!v || 'Role is required']"
                class="mt-1"
              />
              <v-checkbox
                v-model="agreeTerms"
                :rules="[(v) => !!v || 'You must agree to continue']"
                label="I agree to the Terms and Conditions"
                required
                hide-details
              />

              <v-btn
                type="submit"
                color="primary"
                block
                variant="flat"
                :elevation="0"
                class="mt-5 text-none"
              >
                Create My Flossly Account
              </v-btn>
              <div class="mt-4 text-body-2 text-center">
                Have an account?
                <v-btn variant="plain" color="primary" @click="goToLogin">
                  Sign in.
                </v-btn>
              </div>
            </v-form>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="7"
          class="d-flex align-center justify-center px-12"
          style="flex-direction: column;"
          v-else
        >
          <h1>Congratulations!</h1>
          <br />
          <p style="width: 600px">
            You are successfully onbaorded on Flossly! We have sent you a verification link. Please check your inbox
            and verify your email to get started.
          </p>
          <br />
          <v-btn text flat color="primary" @clik="goToLogin">Sign In</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
const signUpDetails = ref({
  email: "",
  password: "",
  fullName: "",
  organisationName: "",
  roleId: null,
});
const isSignedUp = ref(false);

const agreeTerms = ref(false);
const showPassword = ref(false);
const form = ref(null);
const router = useRouter();
const rolesList = ref([]);
const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 6 || "Password must be at least 6 characters",
];

const authStore = useAuthStore();
const mainStore = useMainStore();
onMounted(() => {
  mainStore
    .getRoles()
    .then((res) => {
      if (res.code === 0 && res.data) {
        rolesList.value = res.data.filter(
          (x) =>
            x.title === "Principal Dentist / Practice Owner" || 
            x.title === "Practice Manager"
        );
      }
    })
    .catch((err) => {
      return err;
    });
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const signUp = async () => {
  const formValidation = await form.value.validate();
  if (formValidation.valid) {
    authStore
      .requestSignUp(signUpDetails.value)
      .then((res) => {
        if (res.code === 0) {
          isSignedUp.value = true;
          mainStore.setSnackbar({
            title: "Verification Email Sent",
            type: "success",
          });
        } else {
          mainStore.setSnackbar({
            title: res.data.message || res.message,
            type: "error",
          });
        }
      })
      .catch((err) => {
        mainStore.setSnackbar({
          title: err.message,
          type: "error",
        });
      });
  }
};
const goToLogin = () => {
  router.push("login");
};
</script>

<style scooped>
.signup-page {
  height: 100vh;
  width: 100%;
}
.logoimg {
  width: 250px;
}

.background-image {
  background-image: url("/assets/images/signupBanner.svg");
  background-size: cover;
  width: 90%;
  height: 95vh;
}
.from-heading {
  font-weight: 600;
  font-size: 50px;
}
.form-sub-heading {
  font-weight: 400;
  font-size: 16px;
}
</style>
