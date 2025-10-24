import { NextRequest, NextResponse } from "next/server";
import { createRSVP, getAllRSVPs } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
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

    const rsvp = await createRSVP({
      name,
      email,
      attendance,
      guest_count: guest_count || 1,
      dietary_restrictions,
      message,
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch (error) {
    console.error("Error creating RSVP:", error);
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
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVPs" },
      { status: 500 }
    );
  }
}
