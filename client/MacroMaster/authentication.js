export function getJwtFromCookie(cookieName = "token") {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}
