// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiEndpoint: 'http://localhost:3030',
    okta: {
        clientId: '0oajcymqn9CrPFLSd0h7',
        issuer: 'https://dev-298781.oktapreview.com/oauth2/default',
        redirectUri: `http://${window.location.host}/implicit/callback`,
        scope: 'openid profile email'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
