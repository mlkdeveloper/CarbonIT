<template>
    <section class="dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div class="flex flex-col justify-center">
                <h1
                    class="mb-4 text-3xl font-bold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    Evaluez le niveau de vos collaborateurs avec des quizz !</h1>
                <p class="mb-8 text-lg text-justify font-extralight text-gray-500 lg:text-base dark:text-gray-400">Découvrez une façon
                    ludique et captivante d'évaluer le niveau de vos collaborateurs grâce à notre solution innovante de quiz
                    ! Laissez-vous emporter par l'excitation des questions stimulantes et des défis intellectuels qui
                    permettront à chacun de révéler ses compétences cachées. En mettant en place des quiz personnalisés,
                    vous pourrez non seulement mesurer les connaissances et les aptitudes de vos collaborateurs, mais aussi
                    créer une atmosphère conviviale et collaborative au sein de votre équipe. Les résultats obtenus lors de
                    ces évaluations ludiques serviront de base solide pour développer des plans de formation adaptés et
                    encourager la croissance professionnelle de chacun.</p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <NuxtLink href="/admin/quiz/new"
                        class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-custom-green hover:bg-green-900 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900">
                        Créer un quiz
                        <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </NuxtLink>
                    <NuxtLink href="/admin/quiz/create-questions"
                            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Parcourir
                    </NuxtLink>
                </div>
            </div>

            <div>
                <video class="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl" autoplay loop muted style="object-fit: fill;">
                    <source src="~/assets/videos/video-quiz.mp4" type="video/mp4">
                    Votre navigateur ne supporte pas la lecture de cette vidéo.
                </video>
            </div>
        </div>
    </section>
</template>
<script setup>

useHead({
  bodyAttrs: {
    class: 'bg-[#F1F8FF]'
  }
});

definePageMeta({
  middleware: ["auth"],
  layout: "admin"
});
</script>

    