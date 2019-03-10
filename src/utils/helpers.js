import settings from '../settings';

export function getBasename(): string {
  const basename: {
    [key: string]: string
  } = settings.basename || {};
  return (basename[window.location.hostname])
    ? `/${basename[window.location.hostname]}/`
    : '/';
}

export function addBasenameToUrl(url: string): string {
  const basename: string = getBasename();
  return (url.indexOf(basename) === -1)
    ? basename + url.replace(/^\/+/g, '')
    : url;
}
