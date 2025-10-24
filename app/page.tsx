import RSVPForm from "@/components/RSVPForm";
import { Heart, Calendar, MapPin, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-rose-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Paul & Lovely
            </h1>
            <p className="text-xl text-gray-600 mb-2">are getting married!</p>
            <div className="flex items-center justify-center space-x-8 text-gray-600 mt-8">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>December 3, 2025</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>
                  Bamboo Pavillion Brgy. San Miguel, Manolo Fortich, Bukidnon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Please RSVP</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're so excited to celebrate our special day with you! Please let
            us know if you'll be joining us for our wedding celebration.
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>Please respond by November 15th, 2025</span>
          </div>
        </div>

        <RSVPForm />
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Can't wait to celebrate with you! 💕</p>
          <p className="text-sm text-gray-500 mt-2">
            Questions? Contact us at paul.lovely.wedding@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
