/* src/util/AsyncDebounce.ts */
const AsyncDebounce = <A extends unknown[], R>(fn: (...args: A) => Promise<R>, wait: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let resolvers: Array<(v: R) => void> = [];
  let rejecters: Array<(reason: unknown) => void> = [];
  return (...args: A): Promise<R> =>
    new Promise<R>((resolve, reject) => {
      resolvers.push(resolve);
      rejecters.push(reject);
      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        const pendingResolvers = resolvers;
        const pendingRejecters = rejecters;
        resolvers = [];
        rejecters = [];
        try {
          const result = await fn(...args);
          pendingResolvers.forEach((r) => r(result));
        } catch (error) {
          pendingRejecters.forEach((r) => r(error));
        }
      }, wait);
    });
};

export default AsyncDebounce;
