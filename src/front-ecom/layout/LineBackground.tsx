interface IProps {
  className?: string;
  classNameWrapper?: string;
}
export default function LineBackground({ className, classNameWrapper }: IProps) {
  return (
    <div className={`line-container ${className}`}>
      <div className={`line-wrapper ${classNameWrapper}`}>
        <div className="vertical-line start-60" />
        <div className="vertical-line start-60" />
        <div className="vertical-line start-60" />
      </div>
    </div>
  );
}
