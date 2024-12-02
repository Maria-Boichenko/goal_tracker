export const CalendarNavigation = ({
                                month,
                                year,
                                onPrev,
                                onNext,
                            }: {
    month: string;
    year: number;
    onPrev: () => void;
    onNext: () => void;
}) => (
    <div className="flex justify-between items-center mb-4">
        <button onClick={onPrev} className="text-gray-600 hover:text-gray-900">
            ←
        </button>
        <h2 className="text-lg font-bold">
            {month} {year}
        </h2>
        <button onClick={onNext} className="text-gray-600 hover:text-gray-900">
            →
        </button>
    </div>
);

export const WeekHeaders = () => (
    <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
        ))}
    </div>
);