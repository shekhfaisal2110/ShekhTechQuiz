// components/ContactForm/OptionalFields.jsx
export default function OptionalFields({ courseName, issueDescription, onChange }) {
  return (
    <>
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Course Name (Optional)
        </label>
        <input
          type="text"
          name="courseName"
          value={courseName}
          onChange={onChange}
          className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg"
          placeholder="Enter the course name (e.g., React Fundamentals, JavaScript Advanced, etc.)"
        />
        <p className="text-xs text-gray-500 mt-1">
          If you're having issues with a specific course, please enter the course name here
        </p>
      </div>
      
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Describe your issue in detail (Optional)
        </label>
        <textarea
          name="issueDescription"
          value={issueDescription}
          onChange={onChange}
          rows={4}
          className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg"
          placeholder="Please provide as much detail as possible about your issue..."
        />
      </div>
    </>
  );
}