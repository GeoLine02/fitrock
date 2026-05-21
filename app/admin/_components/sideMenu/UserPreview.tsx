export default function UserPreview() {
  return (
    <div>
      <div className="bg-gray-300 rounded-full flex items-center justify-center w-12 h-12">
        <span className="text-white font-bold">JD</span>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium">John Doe</p>
        <p className="text-xs text-gray-500">jondoe@example.com</p>
      </div>
    </div>
  );
}
