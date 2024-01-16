export const RaffleInformationCard = ({
  gridAreaClassName,
  label,
  value,
}: {
  gridAreaClassName: string;
  label: string;
  value: any;
}) => {
  return (
    <div className={`raffle-information-card ${gridAreaClassName}`}>
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
};
