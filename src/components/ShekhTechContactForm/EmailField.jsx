// components/ContactForm/EmailField.jsx
export default function EmailField({ value, onChange, error }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
        Email Address *
      </label>
      <input
        type="email"
        name="email"
        value={value}
        onChange={onChange}
        className={`w-full p-3 sm:p-4 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
        placeholder="your.email@example.com"
      />
      {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
    </div>
  );
}