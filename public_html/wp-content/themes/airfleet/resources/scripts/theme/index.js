/* eslint-disable sort-imports */
import '@config';
import './vendor/*.js';
import '@styles/theme';
import './images';
import 'airbnb-browser-shims';
import Example from './components/example';
import Navbar from './components/navbar';
import FormHubSpot from './components/formHubSpot';
import Router from './components/router';

$(document).ready(() => {
  const router = new Router([
    new Example(),
    new Navbar(),
    new FormHubSpot(),
  ]);

  router.bootstrap();
});
