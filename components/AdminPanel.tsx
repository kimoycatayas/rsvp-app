"use client";

import { useState, useEffect } from "react";
import { Users, Heart, X, Edit, Trash2, Eye } from "lucide-react";

interface RSVP {
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

interface Stats {
  attendance: string;
  count: number;
  total_guests: number;
}

export default function AdminPanel() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [stats, setStats] = useState<Stats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRsvp, setSelectedRsvp] = useState<RSVP | null>(null);
  const [filter, setFilter] = useState<"all" | "yes" | "no" | "maybe">("all");

  useEffect(() => {
    fetchRSVPs();
    fetchStats();
  }, []);

  const fetchRSVPs = async () => {
    try {
      const response = await fetch("/api/rsvp");
      if (response.ok) {
        const data = await response.json();
        setRsvps(data);
      }
    } catch (error) {
      console.error("Error fetching RSVPs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const deleteRSVP = async (id: number) => {
    if (!confirm("Are you sure you want to delete this RSVP?")) return;

    try {
      const response = await fetch(`/api/rsvp/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRsvps(rsvps.filter((rsvp) => rsvp.id !== id));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error("Error deleting RSVP:", error);
    }
  };

  const filteredRsvps = rsvps.filter(
    (rsvp) => filter === "all" || rsvp.attendance === filter
  );

  const getAttendanceColor = (attendance: string) => {
    switch (attendance) {
      case "yes":
        return "bg-green-100 text-green-800";
      case "no":
        return "bg-red-100 text-red-800";
      case "maybe":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading RSVPs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Wedding RSVP Admin
          </h1>
          <p className="text-gray-600">Manage your wedding RSVPs</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.attendance}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    stat.attendance === "yes"
                      ? "bg-green-100"
                      : stat.attendance === "no"
                      ? "bg-red-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      stat.attendance === "yes"
                        ? "text-green-600"
                        : stat.attendance === "no"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 capitalize">
                    {stat.attendance}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.count}
                  </p>
                  <p className="text-sm text-gray-500">
                    {stat.total_guests} guests
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { value: "all", label: "All", count: rsvps.length },
            {
              value: "yes",
              label: "Yes",
              count: rsvps.filter((r) => r.attendance === "yes").length,
            },
            {
              value: "no",
              label: "No",
              count: rsvps.filter((r) => r.attendance === "no").length,
            },
            {
              value: "maybe",
              label: "Maybe",
              count: rsvps.filter((r) => r.attendance === "maybe").length,
            },
          ].map((filterOption) => (
            <button
              key={filterOption.value}
              onClick={() => setFilter(filterOption.value as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === filterOption.value
                  ? "bg-rose-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>

        {/* RSVP List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRsvps.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {rsvp.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{rsvp.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAttendanceColor(
                          rsvp.attendance
                        )}`}
                      >
                        {rsvp.attendance}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rsvp.guest_count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(rsvp.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedRsvp(rsvp)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteRSVP(rsvp.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RSVP Detail Modal */}
        {selectedRsvp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    RSVP Details
                  </h3>
                  <button
                    onClick={() => setSelectedRsvp(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="text-sm text-gray-900">{selectedRsvp.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedRsvp.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Attendance
                    </label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAttendanceColor(
                        selectedRsvp.attendance
                      )}`}
                    >
                      {selectedRsvp.attendance}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Number of Guests
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedRsvp.guest_count}
                    </p>
                  </div>

                  {selectedRsvp.dietary_restrictions && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Dietary Restrictions
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedRsvp.dietary_restrictions}
                      </p>
                    </div>
                  )}

                  {selectedRsvp.message && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedRsvp.message}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Submitted
                    </label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedRsvp.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
