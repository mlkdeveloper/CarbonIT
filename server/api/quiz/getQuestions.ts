import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
    if (event.context.auth.user.status === 1) {

        const supabase = serverSupabaseServiceRole(event);
        const query = await getQuery(event);

        const { data, error } = await supabase
            .from('quizzes')
            .select()
            .eq('id', query.id)            

        //Check si data est bien rempli
        if (data[0] === undefined) {
            return 'Error';
        } else {
            // Requête pour récupérer les questions
            const { data: dataQuestions, error: errorQuestions } = await supabase
                .from('questions')
                .select('*, answers (*)')
                .eq('quiz_id', query.id)

            // On met les questions et les réponses qui vont avec la question dans la variable questionsData
            if (dataQuestions) {                
                return dataQuestions;
            } else {
                return 'Error';
            }

            if (error) {
                return 'Error';
            } else {
                return data;
            }
        }

    }
    return 'Error';
});