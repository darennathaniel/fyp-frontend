import { useEffect, RefObject } from "react";

export function useOnClickOutside(
  handler: Function,
  ...refs: RefObject<HTMLElement>[] /* target this ref to your modal or sidebar */
) {
  useEffect(() => {
    const listener = (event: any) => {
      for (const ref of refs) {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, refs]);
}
