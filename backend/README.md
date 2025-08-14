# INLD Backend API

This is the Node.js and MongoDB backend for the INLD political party website.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in `.env` file if needed

3. **Start the server:**
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Join Registration
- **POST** `/api/join` - Submit new registration
- **GET** `/api/join` - Get all registrations (admin)
- **GET** `/api/join/:id` - Get single registration
- **PUT** `/api/join/:id/status` - Update registration status
- **DELETE** `/api/join/:id` - Delete registration

### Example Registration Data
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+91 9876543210",
  "age": 25,
  "address": "123 Main Street, City, State",
  "constituency": "Rohtak",
  "profession": "Software Engineer",
  "skills": "Web development, social media",
  "category": "Ground Operations",
  "agreeTerms": true,
  "receiveUpdates": true
}
```

## Testing the API

You can test the API using curl or Postman:

### Test Registration
```bash
curl -X POST http://localhost:5000/api/join \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "address": "Test Address",
    "constituency": "Rohtak",
    "category": "Ground Operations",
    "agreeTerms": true
  }'
```

### Get All Registrations
```bash
curl http://localhost:5000/api/join
