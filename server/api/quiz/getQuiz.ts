import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
    if (event.context.auth.user.status === 1) {

        const supabase = serverSupabaseServiceRole(event);
        const query = await getQuery(event);

        const { data, error } = await supabase
            .from('quizzes')
            .select()
            .eq('id', query.quiz_id)

        //Check si data est bien rempli
        if (data[0] === undefined) {
            console.log('Erreur: Impossible de récupérer les données du quiz');
        } else {
            // Requête pour récupérer les questions
            const { data: dataQuestions, error: errorQuestions } = await supabase
                .from('questions')
                .select()
                .eq('quiz_id', query.quiz_id)

            // On met les questions et les réponses qui vont avec la question dans la variable questionsData
            if (dataQuestions) {
                // Requête pour récupérer les réponses en fonction des questions
                const { data: dataAnswers, error: errorAnswers } = await supabase
                    .from('answers')
                    .select()
                    .in('question_id', dataQuestions.map((question: { id: number; }) => question.id))

            } else {
                console.log('Erreur: Impossible de récupérer les questions et/ou les réponses');
            }


            if (error) {
                console.log(error);
            } else {
                return data;
            }
        }

    }
    return 'Error';
});