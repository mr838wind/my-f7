import Home from './assets/vue/pages/home.vue';
import AboutPage from './assets/vue/pages/about.vue';
import FormPage from './assets/vue/pages/form.vue';
import DynamicRoutePage from './assets/vue/pages/dynamic-route.vue';

import PanelLeftPage from './assets/vue/pages/panel-left.vue';
import ColorThemes from './assets/vue/pages/color-themes.vue';
import Chat from './assets/vue/pages/chat.vue';
import Vuex from './assets/vue/pages/vuex.vue';

import DataTable from './assets/vue/pg/data-table.vue';
import DataList from './assets/vue/pg/data-list.vue';
import DataDetail from './assets/vue/pg/data-detail.vue';
import DataEdit from './assets/vue/pg/data-edit.vue';

export default [
  {
    path: '/data-detail/:seq',
    component: DataDetail
  },
  {
    path: '/data-edit/:seq',
    component: DataEdit
  },
  {
    path: '/data-list/',
    component: DataList
  },
  {
    path: '/data-table/',
    component: DataTable
  },
  //-- sample
  {
    path: '/',
    component: Home
  },
  {
    path: '/about/',
    component: AboutPage
  },
  {
    path: '/form/',
    component: FormPage
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage
  },
  {
    path: '/color-themes/',
    component: ColorThemes
  },
  {
    path: '/chat/',
    component: Chat
  },
  {
    path: '/vuex/',
    component: Vuex
  },
];
