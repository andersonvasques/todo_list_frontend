import { api } from 'src/boot/axios';

import useApi from 'src/composables/useApi';

export default function useService(url = '') {
  const { index, show, post, update, destroy } = useApi(url);

  async function getUser<T>(): Promise<{ data: T }> {
    const { data } = await api.get(url);
    return { data: data?.data as T };
  }

  return {
    index,
    show,
    post,
    update,
    destroy,
    getUser
  };
}
