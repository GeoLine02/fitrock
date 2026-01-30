import Button from "@/components/Button";

export default function ContactForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-95 bg-neutral-800 p-6 rounded-sm shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">Sign in</h1>
        <input
          type="text"
          placeholder="Name"
          className="w-full bg-transparent border-b border-neutral-500 py-2 mb-4 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent border-b border-neutral-500 py-2 mb-4 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />

        <input
          type="text"
          placeholder="Phone"
          className="w-full bg-transparent border-b border-neutral-500 py-2 mb-4 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />
        <input
          type="password"
          placeholder="password"
          className="w-full bg-transparent border-b border-neutral-500 py-2 mb-4 text-white placeholder-gray-400 outline-none focus:border-orange-500"
        />

        <Button
          classname="w-full font-medium text-white rounded-md"
          label="Sign in"
        />
      </div>
    </div>
  );
}
