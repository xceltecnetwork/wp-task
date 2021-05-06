export default class Navbar {
  constructor() {
    this.selector = '.c-navbar';
    this.positionScrolledClass = 'c-navbar--position-scrolled';
    this.positionTopClass = 'c-navbar--position-top';
    this.offset = 20;
  }

  bootstrap() {
    window.onscroll = () => this.toggleScrolledClass();
  }

  toggleScrolledClass() {
    if (window.pageYOffset > this.offset) {
      $(this.selector).addClass(this.positionScrolledClass);
      $(this.selector).removeClass(this.positionTopClass);
    } else {
      $(this.selector).addClass(this.positionTopClass);
      $(this.selector).removeClass(this.positionScrolledClass);
    }
  }
}
