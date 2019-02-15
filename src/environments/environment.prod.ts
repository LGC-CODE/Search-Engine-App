import {onAuthRequired} from '../app/app-routing.module';

export const environment = {
    production: true,
    apiEndpoint: '',
    okta: {
        clientId: '0oajcymqn9CrPFLSd0h7',
        issuer: 'https://dev-298781.oktapreview.com/oauth2/default',
        redirectUri: 'https://incyte.herokuapp.com/implicit/callback',
        scope: 'openid profile email',
        onAuthRequired: onAuthRequired
    }
};
