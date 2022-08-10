module.exports = {
  //...
  devServer: {
    proxy: {
      "/api": "http://localhost:1292",
    },
  },
};
