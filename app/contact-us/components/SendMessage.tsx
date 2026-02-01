import Button from "@/components/Button";
import React from "react";

export default function SendMessage() {
  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-xl font-semibold mb-4">Send us a message</h1>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
      />

      <div>
        <label className="text-sm text-gray-500" htmlFor="">
          Email Address
        </label>
        <input
          type="email"
          className="w-full mb-4 px-3 py-2 border block border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
        />
      </div>

      <textarea
        placeholder="Your Message"
        rows={4}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-orange-400"
      ></textarea>

      <Button classname="w-full" bgColor="orange">
        Your Message
      </Button>
    </div>
  );
}
