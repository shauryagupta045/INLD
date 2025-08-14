const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testRegistration = {
  firstName: 'Test',
  lastName: 'User',
  email: `test${Date.now()}@example.com`,
  phone: '+91 9876543210',
  age: 25,
  address: '123 Test Street, Test City',
  constituency: 'Rohtak',
  profession: 'Software Engineer',
  skills: 'Web development, social media',
  category: 'Ground Operations',
  agreeTerms: true,
  receiveUpdates: true
};

async function testAPI() {
  try {
    console.log('🧪 Testing INLD Backend API...\n');

    // Test POST /api/join
    console.log('1. Testing POST /api/join...');
    const postResponse = await axios.post(`${API_BASE_URL}/join`, testRegistration);
    console.log('✅ Registration submitted:', postResponse.data.message);
    const registrationId = postResponse.data.data._id;

    // Test GET /api/join
    console.log('\n2. Testing GET /api/join...');
    const getAllResponse = await axios.get(`${API_BASE_URL}/join`);
    console.log(`✅ Found ${getAllResponse.data.count} registrations`);

    // Test GET /api/join/:id
    console.log('\n3. Testing GET /api/join/:id...');
    const getSingleResponse = await axios.get(`${API_BASE_URL}/join/${registrationId}`);
    console.log('✅ Single registration retrieved:', getSingleResponse.data.data.firstName);

    // Test PUT /api/join/:id/status
    console.log('\n4. Testing PUT /api/join/:id/status...');
    const updateResponse = await axios.put(`${API_BASE_URL}/join/${registrationId}/status`, {
      status: 'approved'
    });
    console.log('✅ Status updated:', updateResponse.data.message);

    console.log('\n🎉 All API tests passed successfully!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
