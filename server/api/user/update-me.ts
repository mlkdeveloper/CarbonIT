import {serverSupabaseServiceRole} from '#supabase/server';

export default defineEventHandler(async (event) => {

    if (event.context.auth.user.status === 1 ||  event.context.auth.user.status === 0) {
    const supabase = serverSupabaseServiceRole(event);
    const body = await readBody(event);



    const { data: { user } } = await supabase.auth.getUser(event.context._token)
    
  

    const {data: newDataUser, error: newErrorUser} = await supabase
        .from('user')
        .update({
            lastname: body.name,
            firstname: body.firstname,
            email: body.email,
            city: body.city,
            zipcode: body.zip,
            address: body.address,
            phone: body.phone,
            rib: body.rib
        })
        .eq('auth_id', user.id);

        

    if(newErrorUser) {
        return 'Error';
    }

    return 'Success';

}
return 'Error';
});