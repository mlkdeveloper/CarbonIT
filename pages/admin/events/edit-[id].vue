<script setup>
definePageMeta({
  middleware: ["auth-admin"],
  layout: "user"
});

useHead({
  bodyAttrs: {
    class: 'bg-[#F1F8FF]'
  }
});


const title = ref("");
const description = ref("");
const dateEvent = ref(null);
const timeEvent = ref(null);
const route = useRoute();
const id = route.params.id;

const supabase = useSupabaseClient();

onMounted( async () => {


  const data = await $fetch('/api/event/getOne?id=' + id, {
    method: 'get',
  });

  if (data !== 'Error') {
        title.value = data[0].title;
        description.value = data[0].description;
        dateEvent.value = data[0].date
        timeEvent.value = data[0].time
  }

})

async function editEvent() {
  await $fetch(`/api/event/edit`, {
    method: 'put',
    body: {
        id: id,
        title: title.value,
        description: description.value,
        dateEvent : dateEvent.value,
        timeEvent : timeEvent.value,
    }
  });
}
</script>

<template>
  <section>
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Modifier</h2>
      <form v-on:submit.prevent="editEvent">
        <div class="grid gap-4 sm:grid-cols-1 sm:gap-6">
          <div class="w-full">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
            <input v-model="title" type="text" name="title" id="title"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                   placeholder="Nom" required="">
          </div>
          <div class="w-full">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea v-model="description" type="text" name="description" id="description"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                   placeholder="description" required=""></textarea>
          </div>

          <div class="w-full">
            <label for="dateEvent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input v-model="dateEvent" type="date" name="dateEvent" id="dateEvent"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required="">
          </div>

           <div class="w-full">
            <label for="dateEvent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input v-model="timeEvent" type="time" name="" id=""
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required="">
          </div>
        
        </div>
        <button type="submit"
                class="mt-7 text-white bg-custom-red hover:bg-red-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Annuler
        </button>
        <button type="submit"
                class="mt-7 text-white bg-custom-green hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Sauvegarder
        </button>
      </form>
    </div>
  </section>
</template>
