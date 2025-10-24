// Simple script to test database initialization
// Run with: node scripts/test-db.js

const { initializeDatabase } = require("../lib/init-db.ts");

async function testDatabase() {
  console.log("Testing database initialization...");

  try {
    const result = await initializeDatabase();

    if (result.success) {
      console.log("✅ Database initialized successfully!");
    } else {
      console.log("❌ Database initialization failed:", result.error);
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

testDatabase();
