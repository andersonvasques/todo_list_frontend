export default function useHelpers() {
  function mountUrl(url: string, form: object): string {
    const params = Object.entries(form)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return `${url}?${params}`;
  }

  return {
    mountUrl,
  };
}
