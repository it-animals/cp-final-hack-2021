export const rightToLeftAnimation = (
  duration: number = 5,
  delay: number = 0.2,
  by: number = 50,
  to: number = 0
) => ({
  initial: { opacity: 0, x: by },
  animate: { opacity: 1, x: to },
  transition: {
    ease: ["linear"],
    duration,
    delay,
  },
});
