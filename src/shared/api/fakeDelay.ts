export function fakeDelay(duration = 500): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}
