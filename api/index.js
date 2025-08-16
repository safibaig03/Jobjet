// API handler for authentication and database communication

export default function handler(req, res) {
  // Forward to the server's API routes
  const serverUrl = process.env.NODE_ENV === 'production' 
    ? process.env.SERVER_URL || 'http://localhost:5000'
    : 'http://localhost:5000';
  
  // Get cookies from the request to maintain session
  const cookies = req.headers.cookie || '';
  
  // Create headers with cookies for authentication
  const headers = {
    ...req.headers,
    cookie: cookies
  };
  
  // Parse request body if it's a POST request
  let body;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = JSON.stringify(req.body);
    // Update content-type header for JSON requests
    headers['content-type'] = 'application/json';
  }
  
  console.log(`Proxying ${req.method} request to ${serverUrl}${req.url}`);
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    console.log('Request body:', JSON.stringify(req.body));
  }
  
  // Proxy the request to the backend
  fetch(`${serverUrl}${req.url}`, {
    method: req.method,
    headers: headers,
    body: body,
    credentials: 'include' // Important for cookies/session handling
  })
    .then(async response => {
      // Forward the status
      res.status(response.status);
      
      // Forward cookies from the response for session management
      const setCookieHeader = response.headers.get('set-cookie');
      if (setCookieHeader) {
        // Parse and modify cookies for Vercel environment
        const cookies = setCookieHeader.split(',').map(cookie => {
          // Ensure cookies work in production environment
          if (!cookie.includes('SameSite=None')) {
            cookie = cookie.replace(/SameSite=Lax/gi, 'SameSite=None');
          }
          if (!cookie.includes('Secure')) {
            cookie = cookie + '; Secure';
          }
          return cookie;
        });
        res.setHeader('Set-Cookie', cookies);
      }
      
      // Try to parse as JSON, but handle other content types
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return { data: await response.json(), contentType };
      } else {
        return { data: await response.text(), contentType };
      }
    })
    .then(({ data, contentType }) => {
      // Set the content type header
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }
      
      // Send the response
      if (typeof data === 'object') {
        res.json(data);
      } else {
        res.send(data);
      }
    })
    .catch(error => {
      console.error('API proxy error:', error);
      // Log more details about the request that failed
      console.error('Failed request details:', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body
      });
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: 'Could not create account. Please try again later.',
        details: error.message 
      });
    });
}