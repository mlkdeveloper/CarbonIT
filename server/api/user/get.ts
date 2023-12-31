import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
    if(event.context.auth.user.status === 1) {
        const supabase = serverSupabaseServiceRole(event);

        const {data, error} = await supabase
            .from('user')
            .select();

        if (error) {
            return 'Error';
        }

        return data;
    }
    return 'Error';
});