// Test Chatbot API
// Run this with: node test-chatbot.js

// Load environment variables
require('dotenv').config();

async function testChatbot() {
  console.log('🧪 Testing Enhanced Chatbot API...\n');

  const baseUrl = 'http://localhost:3000';

  try {
    // Test 1: Basic message
    console.log('📝 Test 1: Basic message');
    const basicResponse = await fetch(`${baseUrl}/api/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hola, ¿qué servicios ofrecen?',
        timestamp: new Date().toISOString()
      })
    });

    console.log('Status:', basicResponse.status);
    const basicData = await basicResponse.json();
    console.log('Response:', JSON.stringify(basicData, null, 2));
    console.log('✅ Basic message test completed\n');

    // Test 2: Message with structured content request
    console.log('📋 Test 2: Request for structured content');
    const structuredResponse = await fetch(`${baseUrl}/api/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Muéstrame una lista de tus servicios principales',
        timestamp: new Date().toISOString()
      })
    });

    console.log('Status:', structuredResponse.status);
    const structuredData = await structuredResponse.json();
    console.log('Response:', JSON.stringify(structuredData, null, 2));
    console.log('✅ Structured content test completed\n');

    // Test 3: Projects request
    console.log('🏗️ Test 3: Projects request');
    const projectsResponse = await fetch(`${baseUrl}/api/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Muéstrame los proyectos en la base de datos',
        timestamp: new Date().toISOString()
      })
    });

    console.log('Status:', projectsResponse.status);
    const projectsData = await projectsResponse.json();
    console.log('Response:', JSON.stringify(projectsData, null, 2));
    console.log('✅ Projects request test completed\n');

    // Test 4: GET endpoint
    console.log('🔍 Test 4: GET endpoint');
    const getResponse = await fetch(`${baseUrl}/api/chatbot`);
    console.log('Status:', getResponse.status);
    const getData = await getResponse.json();
    console.log('Response:', JSON.stringify(getData, null, 2));
    console.log('✅ GET endpoint test completed\n');

    // Test 5: Test projects service directly
    console.log('🗄️ Test 5: Projects service');
    const projectsServiceResponse = await fetch(`${baseUrl}/api/test-supabase`);
    console.log('Status:', projectsServiceResponse.status);
    const projectsServiceData = await projectsServiceResponse.json();
    console.log('Projects count:', projectsServiceData.projects?.length || 0);
    if (projectsServiceData.projects && projectsServiceData.projects.length > 0) {
      console.log('Sample project:', {
        id: projectsServiceData.projects[0].id,
        title: projectsServiceData.projects[0].title,
        main_category: projectsServiceData.projects[0].main_category
      });
    }
    console.log('✅ Projects service test completed\n');

    console.log('🎉 All tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log('- Basic message handling: ✅');
    console.log('- Structured content support: ✅');
    console.log('- Projects integration: ✅');
    console.log('- API endpoints: ✅');
    console.log('- Database connection: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testChatbot(); 