
const baseUrl = 'https://classporch-staging-backend.herokuapp.com/api/v1';

// const baseUrl = "/api/v1/faq?category=student&q=How || /api/v1/faq?category=tutor&q=How || /api/v1/faq?category=tech_support&q=How";
// const baseUrl = 'https://classporchbackend.herokuapp.com/api/v1/faq?category=student&q=How || /api/v1/faq?category=tutor&q=How || /api/v1/faq?category=tech_support&q=How'
// const baseUrl = 'https://classporch-staging-backend.herokuapp.com/api/v1/faq?category=student&q=How';
// const baseUrl = new URL("https://classporch-staging-backend.herokuapp.com/api/v1"),
//     params = {category:'student', q:'How'}
//     Object.keys(params).forEach(key => baseUrl.searchParams.append(key, params[key]))

const apiEndpoints = {
    base: baseUrl,
    auth:{
        signIn: baseUrl + '/auth/sign_in',
        signUp: baseUrl + '/auth'
    },
    
};

export {apiEndpoints};
