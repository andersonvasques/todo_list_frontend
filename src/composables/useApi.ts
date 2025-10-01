import useHelpers from './useHelpers';
import { api } from 'src/boot/axios';
interface Meta {
  current_page: number;
  per_page: number;
  total: number;
}

export default function useApi(url = '') {
  const { mountUrl } = useHelpers();

  async function index<T>(form = {}): Promise<{ data: Array<T>; meta: Meta }> {
    const { data } = await api.get(mountUrl(url, form));
    return { data: data?.data as Array<T>, meta: data?.meta as Meta };
  }

  async function show<T>(id: number): Promise<{ data: T }> {
    const { data } = await api.get(`${url}/${id}`);
    return { data: data?.data as T };
  }

  async function post<T>(form = {}): Promise<{ data: T }> {
    const { data } = await api.post(url, form);

    return { data: data?.data as T };
  }

  async function update(id: number, form = {}): Promise<void> {
    await api.put(`${url}/${id}`, form);
  }

  async function destroy(id: number): Promise<void> {
    try {
      await api.delete(`${url}/${id}`);
    } catch (error: unknown) {
      alert(error);
    }
  }

  return {
    index,
    show,
    post,
    update,
    destroy,
  };
}
