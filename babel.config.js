module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',      // The module name to import environment variables
        path: '.env',            // Path to your .env file
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      }]
    ],
  };
};
