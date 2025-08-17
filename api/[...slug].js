// File: api/[...slug].js

export default async function handler(req, res) {
  const serverUrl = process.env.SERVER_URL;

  if (!serverUrl) {
    return res.status(500).json({ error: 'SERVER_URL is not configured.' });
  }

  // ✅ CORRECT WAY TO GET THE PATH
  // For a request to /api/jobs/1, req.query.slug will be ['jobs', '1']
  const path = req.query.slug.join('/');

  // ✅ BUILDS THE CORRECT URL (e.g., https://your-backend.com/jobs/1)
  const backendUrl = `${serverUrl}/${path}`;

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.cookie || '', // Forward cookies for sessions
      },
      body: (req.method !== 'GET' && req.method !== 'HEAD') ? JSON.stringify(req.body) : undefined,
    });

    // --- The rest of the code is for forwarding the response and is fine ---

    res.status(response.status);
    response.headers.forEach((value, name) => {
      // Don't forward the 'content-encoding' header, as Vercel handles compression.
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