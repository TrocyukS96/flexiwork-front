export const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-16 h-16 animate-spin rounded-full border-[4px] border-muted border-t-primary"></div>
    </div>
  );
};
