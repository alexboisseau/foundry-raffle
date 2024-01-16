type RaffleInformationCardProps = {
  gridAreaClassName: string;
  label: string;
  value: JSX.Element | string | number;
};

export const RaffleInformationCard = ({
  gridAreaClassName,
  label,
  value,
}: RaffleInformationCardProps) => (
  <div className={`raffle-information-card ${gridAreaClassName}`}>
    <p className="label">{label}</p>
    <div className="value">{value}</div>
  </div>
);
