export const upToDownFn = (
  duration: number = 0.4,
  delay: number = 0.2,
  by: number = -50,
  to: number = 0
) => ({
  initial: { opacity: 0, y: by },
  animate: { opacity: 1, y: to },
  transition: {
    ease: ["linear"],
    duration,
    delay,
  },
});
