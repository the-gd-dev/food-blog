"use client";

import { useStore } from "@/store";
import { useEffect, useState } from "react";

export const useHyderation = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const checkHydration = async () => {
      if (useStore.persist?.hasHydrated?.()) {
        setHydrated(true);
      } else {
        const unsubscribe = useStore.persist?.onFinishHydration?.(() => {
          setHydrated(true);
          unsubscribe?.();
        });
      }
    };

    checkHydration();
  }, []);

  return {
    hydrated,
  };
};
