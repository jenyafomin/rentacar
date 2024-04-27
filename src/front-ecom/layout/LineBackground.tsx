interface IProps {
  className?: string;
  classNameWrapper?: string;
}
export default function LineBackground({ className, classNameWrapper }: IProps) {
  return (
    <div className={`line-container ${className}`}>
      <div className={`line-wrapper ${classNameWrapper}`}>
        <div className="vertical-line" />
        <div className="vertical-line" />
        <div className="vertical-line" />
      </div>
    </div>
  );
}
