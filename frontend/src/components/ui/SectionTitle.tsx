interface SectionTitleProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionTitle({ label, title, description, centered = true }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {label && (
        <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-wider mb-2">
          {label}
        </span>
      )}
      <h2 className="heading-2">{title}</h2>
      {description && (
        <p className="mt-4 text-body max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
