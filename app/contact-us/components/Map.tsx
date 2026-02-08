import React from "react";

export default function Map() {
  return (
    <div className="w-full xl:aspect-square xl:h-102.5 h-64 rounded-xl overflow-hidden border">
      <iframe
        title="Fitrock Location"
        src="https://www.google.com/maps?q=7a ბესარიონ ჟღენტის ქუჩა, თბილისი 0102&output=embed"
        className="w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
