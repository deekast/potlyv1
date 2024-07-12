export default ({ config }) => {
    const appConfig = config;
    appConfig.ios.googleServicesFile = process.env.IOS_SERVICES_PLIST;
    appConfig.android.googleServicesFile = process.env.GOOGLE_SERVICES_JSON;
    return {
        ...appConfig,
    }
};