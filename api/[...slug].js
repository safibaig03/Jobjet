// File: api/[...slug].js

export default async function handler(req, res) {
  const serverUrl = process.env.SERVER_URL;

  if (!serverUrl) {
    return res.status(500).json({ error: 'SERVER_URL is not configured.' });
  }

  // ✅ NEW ROBUST WAY TO GET THE PATH
  // req.url will be something like '/api/jobs?param=1'
  // We remove the '/api' prefix to get the real path.
  const path = req.url.replace('/api', '');

  // ✅ BUILDS THE CORRECT URL (e.g., https://your-backend.com/jobs?param=1)
  const backendUrl = `${serverUrl}${path}`;

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.cookie || '',
      },
      body: (req.method !== 'GET' && req.method !== 'HEAD') ? JSON.stringify(req.body) : undefined,
    });

    res.status(response.status);
    response.headers.forEach((value, name) => {
      if (name.toLowerCase() !== 'content-encoding') {
        res.setHeader(name, value);
      }
    });

    const body = await response.text();
    res.send(body);

  } catch (error) {
    console.error('API proxy error:', error);
    res.status(502).json({ error: 'Bad Gateway', message: 'The proxy could not connect to the backend.' });
  }
}