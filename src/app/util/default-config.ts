import {onAuthRequired} from '../app-routing.module';

export default {
    oidc: {
        clientId: '0oajcymqn9CrPFLSd0h7',
        issuer: 'https://dev-298781.oktapreview.com/oauth2/default',
        redirectUri: 'http://localhost:4200/implicit/callback',
        scope: 'openid profile email',
        onAuthRequired: onAuthRequired
    },
    resourceServer: {
        messagesUrl: 'http://localhost:8000/api/messages',
    },
};
