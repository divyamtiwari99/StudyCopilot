import { useEffect } from "react";
import type { RefObject } from "react";

export function useClickOutside<
  T extends HTMLElement,
>(
  ref: RefObject<T | null>,
  handler: () => void,
) {
  useEffect(() => {
    function listener(
      event: MouseEvent,
    ) {
      const element = ref.current;

      if (!element) {
        return;
      }

      if (
        element.contains(
          event.target as Node,
        )
      ) {
        return;
      }

      handler();
    }

    document.addEventListener(
      "mousedown",
      listener,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        listener,
      );
    };
  }, [ref, handler]);
}