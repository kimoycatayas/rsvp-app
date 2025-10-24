"use client";

import { useState } from "react";
import { Database, CheckCircle, XCircle } from "lucide-react";

export default function SetupPage() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const initializeDatabase = async () => {
    setIsInitializing(true);
    setResult(null);

    try {
      const response = await fetch("/api/init-db", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || "Database initialized successfully!",
        });
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to initialize database",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Network error occurred",
      });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Database className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Database Setup
          </h1>

          <p className="text-gray-600 mb-6">
            Initialize the database tables for your wedding RSVP app.
          </p>

          {result && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center ${
                result.success
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {result.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mr-3" />
              )}
              <span
                className={`text-sm ${
                  result.success ? "text-green-700" : "text-red-700"
                }`}
              >
                {result.message}
              </span>
            </div>
          )}

          <button
            onClick={initializeDatabase}
            disabled={isInitializing}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isInitializing ? "Initializing..." : "Initialize Database"}
          </button>

          {result?.success && (
            <div className="mt-6">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ← Go to RSVP Form
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <a
                href="/admin"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Go to Admin Panel →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
