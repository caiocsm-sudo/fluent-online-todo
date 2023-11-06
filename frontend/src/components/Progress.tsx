export default function Progress({ progress }: { progress: number }) {
  return (
    <div className="outer-progress">
      <div className="inner-progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
