const routePackages = ['todoRoutes']

module.exports = (app) => {
  for (const route of routePackages) {
    require(`./${route}`)(app)
  }
}
