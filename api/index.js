import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

export default function handler(req, res) {
  // Forward to the server's API routes
  const serverUrl = process.env.NODE_ENV === 'production' 
    ? process.env.SERVER_URL || 'http://localhost:5000'
    : 'http://localhost:5000';
  
  // Proxy the request to the backend
  fetch(`${serverUrl}${req.url}`, {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
  })
    .then(response => {
      // Forward the status and headers
      res.status(response.status);
      
      // Forward the response body
      return response.json();
    })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error('API proxy error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
}