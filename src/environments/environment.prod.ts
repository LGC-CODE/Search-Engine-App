export const environment = {
    production: true,
    apiEndpoint: '',
    okta: {
        clientId: '0oajcymqn9CrPFLSd0h7',
        issuer: 'https://dev-298781.oktapreview.com/oauth2/default',
        redirectUri: `https://172.27.6.121:3030/implicit/callback`,
        // redirectUri: 'https://127.0.0.1:3030/implicit/callback',
        scope: 'openid profile email'
    }
};
