// src/coaching/components/ClassCard.tsx


interface ClassCardProps {
  subject: string;
  batch: string;
  timings: string;
  roomNo?: string;
  color?: string;
}

const ClassCard = ({
  subject,
  batch,
  timings,
  roomNo,
  color = "#22c55e",
}: ClassCardProps) => {
  return (
    <div className="relative flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      {/* Left Accent */}
      <div
        className="absolute left-0 top-3 bottom-3 w-1 rounded-full"
        style={{ backgroundColor: color }}
      />

      {/* Time */}
      <div className="min-w-[90px] pl-2">
        <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
          {/* <Clock3 size={14} /> */}
          <span>{timings.split("-")[0].trim()}</span>
        </div>

        <p className="mt-1 text-xs text-gray-500">
          — {timings.split("-")[1]?.trim()}
        </p>
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-900">
          {subject}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Batch:{" "}
          <span className="font-medium text-gray-700">
            {batch}
          </span>
        </p>
      </div>

      {/* Room */}
      {roomNo && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          {/* <MapPin size={14} /> */}
          <span>{roomNo}</span>
        </div>
      )}
    </div>
  );
};

export default ClassCard;