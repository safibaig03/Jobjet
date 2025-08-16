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
    body = req.body;
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
        res.setHeader('Set-Cookie', setCookieHeader);
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
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    });
}