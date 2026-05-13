interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  return (
    <div className="px-4 pt-6 pb-4 text-center" style={{ backgroundColor: 'var(--bg-header)' }}>
      <h1 className="text-base font-medium" style={{ color: 'var(--accent)' }}>{title}</h1>
    </div>
  );
}
