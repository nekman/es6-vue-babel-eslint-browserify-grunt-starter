var Config = {
  dev:  './src/js/config/config-dev.json',
  prod: './src/js/config/config-prod.json'
};

module.exports = function aliasify(environment) {
  var configFile = Config[environment];

  return require('aliasify').configure({
    aliases: {
      config: configFile
    },
    verbose: true
  });

}
