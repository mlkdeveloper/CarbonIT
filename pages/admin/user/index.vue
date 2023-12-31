<script setup>
definePageMeta({
  middleware: ["auth-admin"],
  layout: "user",
});

useHead({
  bodyAttrs: {
    class: 'bg-[#F1F8FF]'
  }
});

const supabase = useSupabaseClient();
const currentUser = useSupabaseUser();
const users = ref([]);
const showModal = ref(false);
const idUser = ref(null);

onMounted(async () => {
  getData();
});

async function getData() {
  const data = await $fetch('/api/user/get', {
    method: 'get',
  });

  if (data !== 'Error') {
    users.value = data;
  }
}

async function deleteUser(id) {
  const data = await $fetch('/api/user/delete', {
    method: 'delete',
    body: JSON.stringify({
      id: idUser.value
    })
  });

  if (data !== 'Error') {
    getData();
  }
}
</script>

<template>
  <section>
    <div class="container mx-auto">
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Liste des utilisateurs</h2>
      <NuxtLink href="/admin/user/new" type="button"
                class="text-white bg-custom-green hover:bg-green-900 focus:ring-4 focus:ring-blue-300 mt-8 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-6 focus:outline-none">
        Ajouter un utilisateur
      </NuxtLink>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Prénom
            </th>
            <th scope="col" class="px-6 py-3">
              Nom
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Statut
            </th>
            <th scope="col" class="px-6 py-3">
              Actions
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in users" :key="index" :class="{'mt-5': true, 'bg-gray-50': index % 2 !== 0}">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ user.firstname }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ user.lastname }}
            </th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ user.email }}
            </th>
            <th v-if="user.status === 0" scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <span
                  class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Collaborateur</span>
            </th>
            <th v-else scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <span
                  class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Administrateur</span>
            </th>
            <th scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex">
              <NuxtLink :href="`/admin/user/${user.id}`" class="hover:cursor-pointer hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </NuxtLink>
              <NuxtLink :href="`/admin/cv/${user.id}`" class="ml-5 hover:cursor-pointer hover:text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
                </svg>
              </NuxtLink>
              <button v-if="user.auth_id !== currentUser.id" @click="showModal = true; idUser = user.auth_id" class="ml-5 hover:cursor-pointer hover:text-red-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                </svg>
              </button>
            </th>
          </tr>
          </tbody>
        </table>
      </div>
      <div tabindex="-1" aria-hidden="true" v-show="showModal"
           class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="fixed top-0 left-0 right-0 z-40 h-full max-h-full bg-gray-400 opacity-50"></div>
        <div class="relative w-full max-h-full z-50">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 mx-auto max-w-xl mt-32">
            <button @click="showModal=false" type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
              <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Voulez-vous vraiment supprimer cet utilisateur ?</h3>
              <button @click="deleteUser(); showModal = false" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Oui, je suis sûr
              </button>
              <button @click="showModal = false" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Non, annuler</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>