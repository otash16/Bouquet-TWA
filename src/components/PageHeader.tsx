interface Props { title: string; }

export default function PageHeader({ title }: Props) {
  return (
    <div style={{ padding: '16px 20px 14px', background: '#fff' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#000' }}>{title}</h1>
    </div>
  );
}
