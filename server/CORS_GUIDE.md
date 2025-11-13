# CORS Configuration Options

## Current Configuration (Recommended)
The current CORS configuration allows requests from:
- `http://localhost:3000` (React dev server)
- `http://localhost:3001` (Alternative React port)
- `http://127.0.0.1:3000` (Alternative localhost)
- `http://127.0.0.1:3001` (Alternative localhost)
- `https://group7-osp.vercel.app` (Production)

## Alternative: Allow All Origins (Development Only)
If you're still getting CORS errors, you can temporarily use this configuration for development:

```javascript
app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'email']
  })
);
```

## Alternative: Simple Configuration
For a simpler setup:

```javascript
app.use(cors({
  origin: ["http://localhost:3000", "https://group7-osp.vercel.app"],
  credentials: true
}));
```

## Testing CORS
You can test if CORS is working by:

1. **Check browser console** for CORS errors
2. **Test with curl**:
   ```bash
   curl -X POST http://localhost:8080/api/user/register \
     -H "Content-Type: application/json" \
     -H "Origin: http://localhost:3000" \
     -d '{"username":"test","email":"test@example.com","password":"password123"}'
   ```

3. **Check network tab** in browser dev tools for preflight requests

## Common CORS Issues:
1. **Frontend running on different port** - Add the port to allowedOrigins
2. **Missing credentials** - Set `credentials: true`
3. **Custom headers** - Add headers to `allowedHeaders`
4. **Preflight requests** - Ensure OPTIONS method is allowed
