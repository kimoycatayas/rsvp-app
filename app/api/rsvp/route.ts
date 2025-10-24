import { NextRequest, NextResponse } from "next/server";
import { createRSVP, getAllRSVPs } from "@/lib/db";
import { initializeDatabase } from "@/lib/init-db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    name,
    email,
    attendance,
    guest_count,
    dietary_restrictions,
    message,
  } = body;

  // Basic validation
  if (!name || !email || !attendance) {
    return NextResponse.json(
      { error: "Name, email, and attendance are required" },
      { status: 400 }
    );
  }

  if (!["yes", "no", "maybe"].includes(attendance)) {
    return NextResponse.json(
      { error: "Attendance must be yes, no, or maybe" },
      { status: 400 }
    );
  }

  try {
    const rsvp = await createRSVP({
      name,
      email,
      attendance,
      guest_count: guest_count || 1,
      dietary_restrictions,
      message,
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error: any) {
    console.error("Error creating RSVP:", error);

    // If the error is about missing table, try to initialize the database
    if (
      error.code === "42P01" ||
      error.message?.includes('relation "rsvps" does not exist')
    ) {
      try {
        console.log("Attempting to initialize database...");
        await initializeDatabase();

        // Retry creating the RSVP
        const rsvp = await createRSVP({
          name,
          email,
          attendance,
          guest_count: guest_count || 1,
          dietary_restrictions,
          message,
        });

        return NextResponse.json(rsvp, { status: 201 });
      } catch (initError) {
        console.error("Error initializing database:", initError);
        return NextResponse.json(
          { error: "Database initialization failed. Please contact support." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create RSVP" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const rsvps = await getAllRSVPs();
    return NextResponse.json(rsvps);
  } catch (error: any) {
    console.error("Error fetching RSVPs:", error);

    // If the error is about missing table, try to initialize the database
    if (
      error.code === "42P01" ||
      error.message?.includes('relation "rsvps" does not exist')
    ) {
      try {
        console.log("Attempting to initialize database...");
        await initializeDatabase();

        // Retry fetching RSVPs (should return empty array)
        const rsvps = await getAllRSVPs();
        return NextResponse.json(rsvps);
      } catch (initError) {
        console.error("Error initializing database:", initError);
        return NextResponse.json(
          { error: "Database initialization failed. Please contact support." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch RSVPs" },
      { status: 500 }
    );
  }
}
