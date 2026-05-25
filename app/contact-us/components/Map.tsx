import React from "react";

export default function Map() {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm xl:aspect-square xl:h-102.5">
      <iframe
        title="Tsona Location"
        src="https://www.google.com/maps?q=7a ბესარიონ ჟღენტის ქუჩა, თბილისი 0102&output=embed"
        className="h-64 w-full xl:h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
