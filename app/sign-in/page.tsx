export default function ContactForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="w-[380px] bg-neutral-800 p-6 rounded-sm shadow-lg">
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

        <textarea
          placeholder="Message"
          rows={4}
          className="w-full bg-transparent border border-neutral-500 p-2 mb-6 text-white placeholder-gray-400 outline-none focus:border-orange-500 resize-none"
        />

        <button className="w-full bg-orange-700 hover:bg-orange-800 transition-all duration-200 py-2 text-white font-semibold tracking-wide">
          SEND MESSAGE
        </button>
      </div>
    </div>
  );
}
