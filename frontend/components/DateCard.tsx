interface DateCardProps {
  bsDate: string;
  adDate: string;
  tithi?: string;
  festival?: string;
}

export default function DateCard({ bsDate, adDate, tithi, festival }: DateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-nepali-red">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-2xl font-bold font-devanagari">{bsDate}</p>
          <p className="text-gray-500 text-sm">{adDate}</p>
        </div>
        <div className="text-right">
          {tithi && <p className="text-sm text-nepali-blue font-medium">{tithi}</p>}
          {festival && (
            <p className="text-xs bg-nepali-gold text-white px-2 py-1 rounded mt-1">{festival}</p>
          )}
        </div>
      </div>
    </div>
  );
}
