export default function SlantedSection({
  children,
  backgroundColor,
  className,
}: any) {
  return (
    <section className="relative overflow-hidden">
      {/* clipped white background */}
      <div
        className={`
          absolute inset-0
          [clip-path:polygon(100%_78.93%,_0%_100%,_0%_21.11%,_100%_0.0465%)]
         ${className}
        `}
      />

      <div className="relative z-10 max-w-6xl mx-auto py-16 px-4">
        {children}
      </div>
    </section>
  );
}
