// File: api/[...slug].js

export default async function handler(req, res) {
  const serverUrl = process.env.SERVER_URL || 'https://jobjet-backend-f0q5.onrender.com';

  if (!serverUrl) {
    return res.status(500).json({ error: 'SERVER_URL is not configured.' });
  }

  // Log the request URL and server URL for debugging
  console.log('Request URL:', req.url);
  console.log('Server URL:', serverUrl);
  
  // Fix the URL path by ensuring it doesn't duplicate /api
  // The req.url might include /api/jobs/6, but we need to remove /api since the backend URL already has it
  // First, extract the slug parts from the URL
  const urlParts = req.url.split('?');
  const path = urlParts[0];
  const query = urlParts.length > 1 ? `?${urlParts[1]}` : '';
  
  // Remove /api prefix if it exists
  const apiPath = path.replace(/^\/api/, '');
  const backendUrl = `${serverUrl}/api${apiPath}${query}`;
  
  console.log('Constructed backend URL:', backendUrl);

  // Log the constructed backend URL for debugging
  console.log('Backend URL:', backendUrl);

  try {
    console.log('Fetching from backend URL:', backendUrl);
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': req.headers.cookie || '',
      },
      body: (req.method !== 'GET' && req.method !== 'HEAD') ? JSON.stringify(req.body) : undefined,
    });
    
    console.log('Response status:', response.status);

    // If the response is not OK, log more details
    if (!response.ok) {
      const responseText = await response.text();
      console.error('Backend error response:', responseText);
      
      // Forward the error response to the client
      res.status(response.status);
      response.headers.forEach((value, name) => {
        if (name.toLowerCase() !== 'content-encoding') {
          res.setHeader(name, value);
        }
      });
      res.send(responseText);
      return;
    }

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
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Backend URL that failed:', backendUrl);
    
    // Return a more detailed error response
    res.status(502).json({ 
      error: 'Bad Gateway', 
      message: 'The proxy could not connect to the backend.', 
      details: error.message,
      backendUrl: backendUrl
    });
  }
}