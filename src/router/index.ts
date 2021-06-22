import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { BNetLocale } from '@/utils/types';
import Home from '../views/Home.vue';

let availableLocalesRegex = '';
for (const locale of Object.values(BNetLocale)) {
  availableLocalesRegex += `${locale}|`;
}
const baseUrl = `${process.env.BASE_URL}:locale(${availableLocalesRegex})?` || `/:locale(${availableLocalesRegex})?`;

const routes: Array<RouteRecordRaw> = [
  {
    path: baseUrl,
    name: 'Home',
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

const defaultLocale = BNetLocale.EnglishGreatBritain;
router.beforeEach((to, from, next) => {
  const { locale, toUpdate } = checkLocale(to, from);
  if (toUpdate) next({ params: { locale } });
  else next();
});

function checkLocale(to: RouteLocationNormalized, from: RouteLocationNormalized): { toUpdate: boolean; locale: string } {
  const toLocale = to.params.locale;
  const fromLocale = from.params.locale;
  if (toLocale === fromLocale && typeof toLocale === 'string' && toLocale.length)
    return { toUpdate: false, locale: formatLocale(toLocale) };
  if (typeof toLocale === 'string' && toLocale.length) return { toUpdate: false, locale: formatLocale(toLocale) };
  if (typeof fromLocale === 'string' && fromLocale.length) return { toUpdate: true, locale: formatLocale(fromLocale) };
  return { toUpdate: true, locale: defaultLocale };
}

function formatLocale(locale: string): string {
  if (locale.length) return `${locale.slice(0, 2).toLowerCase()}_${locale.slice(3).toUpperCase()}`;
  else return defaultLocale as string;
}

export default router;
