interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  return (
    <div className="px-5 pt-4 pb-3">
      <h1 className="text-[22px] font-bold tracking-tight">{title}</h1>
    </div>
  );
}
