const Barometer = ({ percentage }) => {
  // Hold markøren inden for 0-100 %
  const position = Math.min(100, Math.max(0, percentage));

  return (
    <div className="relative h-8 w-full">
      <div className="absolute inset-0 rounded-full overflow-hidden bg-[linear-gradient(90deg,#F44336_0%,#F44336_28%,#FFC107_45%,#FFC107_65%,#4CAF50_82%,#4CAF50_100%)]" />

      <div
        className="absolute h-10 w-3 -translate-x-1/2"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-0 bottom-1 w-1 -translate-x-1/2 bg-sea-600" />
        <div className="absolute bottom-0 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-sea-100 bg-sea-600" />
      </div>
    </div>
  );
};

export default Barometer;
