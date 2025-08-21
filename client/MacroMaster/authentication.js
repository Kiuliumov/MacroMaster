export function getJwtFromCookie(cookieName = "token") {
  const match = document.cookie.match(new RegExp(`(?:^|; )${cookieName}=([^;]+)`));
  return match ? match[1] : null;
}
