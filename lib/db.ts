import { sql } from "@vercel/postgres";

export interface RSVP {
  id: number;
  name: string;
  email: string;
  attendance: "yes" | "no" | "maybe";
  guest_count: number;
  dietary_restrictions?: string;
  message?: string;
  created_at: string;
  updated_at: string;
}

export async function createRSVP(data: {
  name: string;
  email: string;
  attendance: "yes" | "no" | "maybe";
  guest_count: number;
  dietary_restrictions?: string;
  message?: string;
}) {
  const {
    name,
    email,
    attendance,
    guest_count,
    dietary_restrictions,
    message,
  } = data;

  const result = await sql`
    INSERT INTO rsvps (name, email, attendance, guest_count, dietary_restrictions, message)
    VALUES (${name}, ${email}, ${attendance}, ${guest_count}, ${
    dietary_restrictions || null
  }, ${message || null})
    RETURNING *
  `;

  return result.rows[0];
}

export async function getAllRSVPs(): Promise<RSVP[]> {
  const result = await sql`
    SELECT * FROM rsvps 
    ORDER BY created_at DESC
  `;

  return result.rows as RSVP[];
}

export async function getRSVPById(id: number): Promise<RSVP | null> {
  const result = await sql`
    SELECT * FROM rsvps WHERE id = ${id}
  `;

  return (result.rows[0] as RSVP) || null;
}

export async function updateRSVP(
  id: number,
  data: Partial<Omit<RSVP, "id" | "created_at" | "updated_at">>
) {
  const {
    name,
    email,
    attendance,
    guest_count,
    dietary_restrictions,
    message,
  } = data;

  const result = await sql`
    UPDATE rsvps 
    SET name = COALESCE(${name}, name),
        email = COALESCE(${email}, email),
        attendance = COALESCE(${attendance}, attendance),
        guest_count = COALESCE(${guest_count}, guest_count),
        dietary_restrictions = COALESCE(${dietary_restrictions}, dietary_restrictions),
        message = COALESCE(${message}, message),
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return result.rows[0];
}

export async function deleteRSVP(id: number) {
  const result = await sql`
    DELETE FROM rsvps WHERE id = ${id}
    RETURNING *
  `;

  return result.rows[0];
}

export async function getRSVPStats() {
  const result = await sql`
    SELECT 
      attendance,
      COUNT(*) as count,
      SUM(guest_count) as total_guests
    FROM rsvps 
    GROUP BY attendance
  `;

  return result.rows;
}
