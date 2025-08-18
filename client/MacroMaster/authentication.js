export function getJwtFromCookie() {
  const match = document.cookie.match(/jwt=([^;]+)/);
  return match ? match[1] : null;
}
