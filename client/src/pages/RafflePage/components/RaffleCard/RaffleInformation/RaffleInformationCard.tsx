export const RaffleInformationCard = ({
  label,
  value,
}: {
  label: string;
  value: any;
}) => {
  return (
    <div className="raffle-information-card">
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
};
