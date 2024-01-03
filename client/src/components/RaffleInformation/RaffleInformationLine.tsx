const LINE_CHARS = 40;

export const RaffleInformationLine = ({
  label,
  value,
}: {
  label: string;
  value: any;
}) => {
  const labelChars = label.length;
  const valueChars = value.toString().length;
  const dots = LINE_CHARS - labelChars - valueChars;
  const dotsArray = new Array(dots < 0 ? 0 : dots).fill(".");

  return (
    <div className="information">
      <p>{label}</p>
      <p>
        {dotsArray.map((dot, index) => (
          <span key={index}>{dot}</span>
        ))}
      </p>
      <p>{value}</p>
    </div>
  );
};
