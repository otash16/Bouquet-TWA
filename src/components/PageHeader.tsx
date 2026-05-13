interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  return (
    <div style={{ padding: '24px 16px 16px', textAlign: 'center', backgroundColor: '#1e3a3a' }}>
      <h1 style={{ fontSize: 16, fontWeight: 500, color: '#c9a84c' }}>{title}</h1>
    </div>
  );
}
