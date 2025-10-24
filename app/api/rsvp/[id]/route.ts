import { NextRequest, NextResponse } from "next/server";
import { getRSVPById, updateRSVP, deleteRSVP } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const rsvp = await getRSVPById(id);
    if (!rsvp) {
      return NextResponse.json({ error: "RSVP not found" }, { status: 404 });
    }

    return NextResponse.json(rsvp);
  } catch (error) {
    console.error("Error fetching RSVP:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVP" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      email,
      attendance,
      guest_count,
      dietary_restrictions,
      message,
    } = body;

    if (attendance && !["yes", "no", "maybe"].includes(attendance)) {
      return NextResponse.json(
        { error: "Attendance must be yes, no, or maybe" },
        { status: 400 }
      );
    }

    const rsvp = await updateRSVP(id, {
      name,
      email,
      attendance,
      guest_count,
      dietary_restrictions,
      message,
    });

    if (!rsvp) {
      return NextResponse.json({ error: "RSVP not found" }, { status: 404 });
    }

    return NextResponse.json(rsvp);
  } catch (error) {
    console.error("Error updating RSVP:", error);
    return NextResponse.json(
      { error: "Failed to update RSVP" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const rsvp = await deleteRSVP(id);
    if (!rsvp) {
      return NextResponse.json({ error: "RSVP not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "RSVP deleted successfully" });
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    return NextResponse.json(
      { error: "Failed to delete RSVP" },
      { status: 500 }
    );
  }
}
