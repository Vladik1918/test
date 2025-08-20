export const TripHeader = ({ title, description }: { title: string; description?: string }) => (
  <>
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    {description && <p>{description}</p>}
  </>
);