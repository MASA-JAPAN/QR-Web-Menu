require("dotenv").config();

const path = require("path");

const Dotenv = require("dotenv-webpack");

module.exports = {
  publicRuntimeConfig: {
    localStorageUserId: process.env.PROJECT_LOCAL_STORAGE_AUTHENTICATED_USER_ID,
    localStorageDataId: process.env.PROJECT_LOCAL_STORAGE_AUTHENTICATED_DATA_ID,
  },

  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, "env"),
        systemvars: true,
      }),
    ];

    return config;
  },
};
