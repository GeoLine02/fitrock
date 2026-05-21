import Button from "@/components/Button";
import { Send } from "lucide-react";
import React from "react";

export default function SendMessage() {
  return (
    <div className="h-full w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-xl font-semibold text-neutral-900">
        Send us a message
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        We typically reply within 24 hours.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Full name
          </label>
          <input
            type="text"
            placeholder="Jane Doe"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-gray-400 transition-all focus:border-customOrange focus:outline-none focus:ring-2 focus:ring-customOrange/30"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Email address
          </label>
          <input
            type="email"
            placeholder="jane@example.com"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-gray-400 transition-all focus:border-customOrange focus:outline-none focus:ring-2 focus:ring-customOrange/30"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Your message
          </label>
          <textarea
            placeholder="How can we help?"
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-neutral-800 placeholder-gray-400 transition-all focus:border-customOrange focus:outline-none focus:ring-2 focus:ring-customOrange/30"
          />
        </div>

        <Button classname="w-full justify-center" bgColor="orange">
          Send message
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
