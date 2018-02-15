
const baseUrl = 'https://classporchbackend.herokuapp.com/api/v1';

const apiEndpoints = {
    base: baseUrl,
    auth:{
        signIn: baseUrl + '/auth/sign_in',
        signUp: baseUrl + '/auth'
    },
    
};

export {apiEndpoints};