interface Props { title: string; }

export default function PageHeader({ title }: Props) {
  return (
    <div style={{ padding: '24px 20px 22px', background: '#fff', borderRadius: '0 0 20px 20px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#000' }}>{title}</h1>
    </div>
  );
}
