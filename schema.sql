-- Create the rsvps table
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
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_rsvps_email ON rsvps(email);

-- Create an index on attendance for filtering
CREATE INDEX IF NOT EXISTS idx_rsvps_attendance ON rsvps(attendance);
