import Home from './pages/Home';

const baseName = '/';

const routes = () => [
  {
    iconClass: 'fa fa-star',
    title: 'Home',
    to: '/',
    component: Home
  }
];

export { baseName, routes };
