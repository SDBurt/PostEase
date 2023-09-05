
export default async function sitemap() {
  const routes = [
    '',
    '/admin',
    '/admin/posts',
    '/admin/posts/draft',
    '/admin/posts/scheduled',
    '/admin/posts/published',
    '/editor/',
  ].map(
    (route) => ({
      url: `https://postease.ca${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes];
}