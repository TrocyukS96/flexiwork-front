// components/GlobalLoader.tsx
'use client';
import { useStore } from "@/shared/store/store";
import { Spinner } from "@/shared/ui/spinner";

export const GlobalLoader = () => {
  const isLoading = useStore((state) => state.isLoading);

  if (!isLoading) {
    return null; 
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <Spinner/>
    </div>
  );
};