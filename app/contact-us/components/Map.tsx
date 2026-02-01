import React from "react";

export default function Map() {
  return (
    <div className="aspect-square  h-[410px] rounded-xl overflow-hidden border">
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
