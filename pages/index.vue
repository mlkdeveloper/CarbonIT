<script setup>
definePageMeta({
  middleware: ["auth"],
});

useHead({
  bodyAttrs: {
    class: 'bg-custom-black'
  }
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const email = ref(null);
const emailReset = ref(null);
const password = ref(null);
const errorLogin = ref(false);
const loginCard = ref(true);
const reset = ref(false);

onMounted(async () => {
  watchEffect(async () => {
    if (user.value) {

   const data = await $fetch('/api/task/getOneStatus', {
    method: 'get',
    });

    if (data !== 'Error') {
      if (data[0].status === false) {
         const userDataTask = await $fetch('/api/task/updateStatus', {
            method: 'put',
        });
      }

        const userData = await $fetch('/api/middleware/get?id=' + user.value.id, {
            method: 'get',
        });

      if (userData[0].status === 0){
          await navigateTo('/dashboard');
      }else{
          await navigateTo('/admin/dashboard');
      }
    }
    }
  });
});

async function login() {
  const {user, error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorLogin.value = true;
  } 
}

async function resetPassword() {
  const {user, error} = await supabase.auth.resetPasswordForEmail(emailReset.value, {
    redirectTo: 'https://hackathon-carbon.netlify.app/reset-password',
  });

  reset.value = true;
  emailReset.value = null;
}
</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
          class="w-full max-w-sm shadow bg-custom-grey rounded-lg p-4 sm:p-6 md:p-8">
        <form v-if="loginCard" class="space-y-6" v-on:submit.prevent="login">
          <img src="@/assets/logo.svg" alt="">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-custom-white">Email</label>
            <input type="email" name="email" id="email"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-transparent focus:ring-0 block w-full p-2.5"
                   placeholder="name@company.com" v-model="email" required>
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-custom-white">Mot de passe</label>
            <input type="password" name="password" id="password" placeholder="••••••••"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-transparent focus:ring-0 block w-full p-2.5"
                   v-model="password" required>
          </div>
          <p v-if="errorLogin" class="text-center mt-4 text-custom-red">Identifiants incorrects</p>
          <button type="submit"
                  class="w-full text-white bg-custom-red font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-custom-green hover:text-black">
            Se connecter
          </button>
          <div class="text-sm font-medium text-gray-400">
            Mot de passe oublié ? <span class="text-custom-white hover:underline hover:cursor-pointer"
                                        @click="loginCard=false; reset=false">Réinitialiser</span>
          </div>
        </form>

        <div v-else>
          <form v-if="!reset" class="space-y-6" v-on:submit.prevent="resetPassword">
            <img src="@/assets/logo.svg" alt="">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-custom-white">Email</label>
              <input type="email" name="email" id="email"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-transparent focus:ring-0 block w-full p-2.5"
                     placeholder="name@company.com" v-model="emailReset" required>
            </div>

            <button type="submit"
                    class="w-full text-white bg-custom-red font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-custom-green hover:text-black">
              Réinitialiser
            </button>
            <div class="text-sm font-medium text-gray-400">
              <span class="text-custom-white hover:underline hover:cursor-pointer"
                    @click="errorLogin=false; loginCard=true">Se connecter</span>
            </div>
          </form>

          <div v-else>
            <img src="@/assets/logo.svg" alt="">
            <h5 class="text-xl font-medium text-custom-white text-center">Un email vous a été envoyé</h5>
            <button @click="loginCard=true"
                    class="mt-10 w-full text-white bg-custom-red font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-custom-green hover:text-black">
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>