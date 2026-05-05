import { toNepaliDigits } from "../utils/dateFormatter";

interface Festival {
  id?: number; name: string; bs_date: string; ad_date: string;
  description?: string; category?: string; is_public_holiday?: boolean; tithi?: string;
}

interface CalendarGridProps {
  year: number; month: number; monthDays: number; startWeekday: number;
  today: { year: number; month: number; day: number };
  festivals: Festival[]; onDayClick: (day: number) => void; selectedDay: number;
}

// Nepali weekday names
const WEEKDAYS = ["आइत","सोम","मंगल","बुध","बिही","शुक्र","शनि"];

export default function CalendarGrid({
  year, month, monthDays, startWeekday, today, festivals, onDayClick, selectedDay,
}: CalendarGridProps) {
  const festivalMap: Record<number, { name: string; is_public_holiday?: boolean }> = {};
  festivals.forEach((f) => {
    const parts = f.bs_date.split("-");
    const fy = parseInt(parts[0]);
    const fm = parseInt(parts[1]);
    const fd = parseInt(parts[2]);
    if (fy === year && fm === month) {
      festivalMap[fd] = { name: f.name, is_public_holiday: f.is_public_holiday };
    }
  });

  const cells: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: monthDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="rounded-3xl overflow-hidden" style={{
      background: "linear-gradient(135deg, rgba(255,107,0,0.05), rgba(0,0,0,0.6))",
      border: "1px solid rgba(255,107,0,0.2)",
      boxShadow: "0 0 30px rgba(255,107,0,0.05)"
    }}>
      {/* Weekday headers */}
      <div className="grid grid-cols-7" style={{ borderBottom: "1px solid rgba(255,107,0,0.15)" }}>
        {WEEKDAYS.map((d, i) => (
          <div key={d} className="text-center text-xs font-bold py-3 tracking-widest font-devanagari"
            style={{ color: i === 0 ? "#FF6B00" : "rgba(255,165,0,0.4)" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (!day) {
            return (
              <div key={`e-${idx}`} className="h-[72px]"
                style={{ borderBottom: "1px solid rgba(255,107,0,0.06)", borderRight: "1px solid rgba(255,107,0,0.06)" }} />
            );
          }

          const isToday = today.year === year && today.month === month && today.day === day;
          const isSelected = selectedDay === day && !isToday;
          const isSunday = idx % 7 === 0;
          const festival = festivalMap[day];

          return (
            <div key={day} onClick={() => onDayClick(day)}
              className="h-[72px] flex flex-col items-center justify-center cursor-pointer relative group transition-all duration-300 overflow-hidden"
              style={{
                borderBottom: "1px solid rgba(255,107,0,0.06)",
                borderRight: "1px solid rgba(255,107,0,0.06)",
                background: isToday
                  ? "linear-gradient(135deg, #FF6B00, #E85D00)"
                  : isSelected
                  ? "rgba(255,107,0,0.12)"
                  : undefined,
                boxShadow: isToday ? "inset 0 0 20px rgba(255,165,0,0.3)" : undefined,
              }}>

              {/* Hover glow */}
              {!isToday && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.1), rgba(244,196,48,0.05))" }} />
              )}

              {/* Today pulse ring */}
              {isToday && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full animate-pulse_ring"
                    style={{ border: "2px solid rgba(255,165,0,0.5)" }} />
                </div>
              )}

              {/* Festival dot */}
              {festival && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full animate-diyadance"
                  style={{
                    background: festival.is_public_holiday ? "#FF6B00" : "#F4C430",
                    boxShadow: festival.is_public_holiday
                      ? "0 0 6px rgba(255,107,0,0.8)"
                      : "0 0 6px rgba(244,196,48,0.8)"
                  }} />
              )}

              {/* Day number — Nepali */}
              <span className="text-lg font-bold font-devanagari leading-none z-10"
                style={{
                  color: isToday ? "white" : isSunday ? "#FF6B00" : "rgba(255,255,255,0.85)"
                }}>
                {toNepaliDigits(day)}
              </span>

              {/* Day number — English small */}
              <span className="text-[10px] mt-0.5 z-10"
                style={{ color: isToday ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }}>
                {day}
              </span>

              {/* Festival tooltip */}
              {festival && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
                  text-white text-[10px] rounded-xl px-3 py-1.5 whitespace-nowrap
                  opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
                  transition-all duration-200 pointer-events-none shadow-2xl font-devanagari"
                  style={{
                    background: "rgba(26,8,0,0.95)",
                    border: "1px solid rgba(255,107,0,0.4)"
                  }}>
                  {festival.is_public_holiday ? "🪔 " : "🪷 "}{festival.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                    style={{ borderTopColor: "rgba(255,107,0,0.4)" }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
