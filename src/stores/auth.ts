import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { type Login } from 'src/pages/auth/Util/Interface';
import { ref } from 'vue';

export const authStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null);

    function setUserData(data: string): void {
      token.value = data;
    }

    function resetUserData(): void {
      token.value = '';
    }

    async function fetchUser(): Promise<void> {
      try {
        const { data } = await api.get('api/me');
        setUserData(data?.data);
      } catch {
        resetUserData();
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function handleLogin(this: any, form: Login): Promise<void> {
      await csrfCookie();

      const { data } = await api.post('api/login', form);

      setUserData(data.access);

      this.router.push({ name: 'test-tasks-page' });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function handleLogout(this: any): Promise<void> {
      try {
        await api.post('/api/logout');
      } finally {
        resetUserData();
        window.location.href = '/login';
      }
    }

    async function csrfCookie(): Promise<void> {
      await api.get('sanctum/csrf-cookie');
    }

    return {
      token,
      fetchUser,
      setUserData,
      handleLogin,
      resetUserData,
      handleLogout,
    };
  },
  {
    persist: {
      pick: ['token'],
    },
  },
);
