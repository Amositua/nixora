import hasValue from "../../utils/hasValue";

export default function LoanDetailItem({ label, value }) {
  if (!hasValue(value)) return null;

  return (
    <div>
      <p className="text-sm text-gray-500 uppercase">{label}</p>

      {Array.isArray(value) ? (
        <ul className="text-sm font-medium text-gray-900 list-disc ml-4">
          {value.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        // For booleans, numbers, strings, objects
        <p className="text-sm font-medium text-gray-900">{`${value}`}</p>
      )}
    </div>
  );
}
