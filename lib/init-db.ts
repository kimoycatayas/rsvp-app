import { sql } from "@vercel/postgres";

export async function initializeDatabase() {
  try {
    // Create the rsvps table
    await sql`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        attendance VARCHAR(10) NOT NULL CHECK (attendance IN ('yes', 'no', 'maybe')),
        guest_count INTEGER NOT NULL DEFAULT 1,
        dietary_restrictions TEXT,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_rsvps_email ON rsvps(email)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_rsvps_attendance ON rsvps(attendance)
    `;

    console.log("Database initialized successfully");
    return { success: true };
  } catch (error) {
    console.error("Error initializing database:", error);
    return { success: false, error };
  }
}
