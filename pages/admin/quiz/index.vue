<template>
    <Header />
    <Browse />
</template>

<script>
import Header from '~/components/admin/quiz/index/Header.vue';
import Browse from '~/components/admin/quiz/index/Browse.vue';

useHead({
  bodyAttrs: {
    class: 'bg-[#F1F8FF]'
  }
});

definePageMeta({
  middleware: ["auth-admin"],
  layout: "user"
});

export default {
    components: {
        Header,
        Browse
    },
}
</script>