# Quick Setup Guide for MongoDB Migration

## Issues Fixed:
1. ✅ Fixed `nodemailer.createTransporter` → `nodemailer.createTransport`
2. ✅ Fixed syntax error in `db.js` file

## Next Steps:

### 1. Create/Update your `.env` file:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017
# or for MongoDB Atlas (cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net

# Server Configuration
PORT=8080

# Email Configuration (for password reset)
user=your_email@gmail.com
pass=your_app_password
```

### 2. Install MongoDB (if not already installed):
```bash
# macOS
brew install mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

### 3. Start MongoDB:
```bash
# macOS/Linux
mongod

# Windows
mongod.exe
```

### 4. Install dependencies:
```bash
cd server
npm install
```

### 5. Start your application:
```bash
npm start
```

## Common Issues and Solutions:

### Issue 1: MongoDB Connection Error
**Error**: `MongoServerError: Authentication failed`
**Solution**: Make sure MongoDB is running and connection string is correct

### Issue 2: Environment Variables Not Found
**Error**: `MONGODB_URI is not defined`
**Solution**: Create `.env` file in server directory with proper variables

### Issue 3: Port Already in Use
**Error**: `EADDRINUSE: address already in use :::8080`
**Solution**: Change PORT in `.env` file or kill existing process

### Issue 4: Mongoose Connection Issues
**Error**: `MongooseError: Operation `users.findOne()` buffering timed out`
**Solution**: Ensure MongoDB is running and connection string is correct

## Testing the Setup:

### Test 1: Check MongoDB Connection
```bash
# In MongoDB shell
mongo
show dbs
```

### Test 2: Test API Endpoints
```bash
# Test user registration
curl -X POST http://localhost:8080/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Test 3: Check Database
```bash
# In MongoDB shell
use OSP
show collections
```

## If You're Still Getting Errors:

1. **Check MongoDB Status**: Make sure MongoDB is running
2. **Check Environment Variables**: Verify `.env` file exists and has correct values
3. **Check Port Availability**: Ensure port 8080 is not in use
4. **Check Dependencies**: Run `npm install` to ensure all packages are installed
5. **Check Logs**: Look at the console output for specific error messages

## MongoDB Atlas Setup (Cloud Alternative):

If you prefer to use MongoDB Atlas (cloud):

1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env` file with Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
   ```

The application should now start without errors! 🎉
