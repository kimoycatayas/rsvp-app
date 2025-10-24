import { NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/init-db";

export async function POST() {
  try {
    const result = await initializeDatabase();

    if (result.success) {
      return NextResponse.json(
        { message: "Database initialized successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to initialize database", details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in init-db API:", error);
    return NextResponse.json(
      { error: "Failed to initialize database" },
      { status: 500 }
    );
  }
}
