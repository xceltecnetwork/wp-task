export default class Router {
  constructor(routes) {
    this.routes = routes;
  }

  bootstrap() {
    if (!this.routes || this.routes.length <= 0) {
      return;
    }

    this.routes.forEach(route => {
      const routeExists = route.selector && $(route.selector).length > 0;

      if (routeExists) {
        route.bootstrap();
      }
    });
  }
}
