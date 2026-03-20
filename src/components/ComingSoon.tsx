export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-24 text-center space-y-4">
      <h1 className="text-4xl font-bold text-white">{title}</h1>
      <p className="text-slate-400">Coming soon! This feature is currently under development.</p>
    </div>
  );
}
