import { useInView } from "react-intersection-observer";
export const useInViews = () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.9,
    trackVisibility: true,
    delay: 1000,
  });
  return {
    ref,
    inView,
  };
};
