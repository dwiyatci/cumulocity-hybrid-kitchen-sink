/**
 * Helper to tree-shake lodash while maintaining readability (when used alongside with rxjs, rambda, etc.).
 * @see https://stackoverflow.com/q/52765483/2013891
 * @see https://github.com/lodash/lodash/issues/3298#issuecomment-341685354
 */
import { cloneDeep, get, mapValues, take } from 'lodash-es';

const importedFunctions = {
  cloneDeep,
  get,
  mapValues,
  take
};

const chainableFunctions = { ...importedFunctions };

const chain = <T>(input: T) => {
  let value: any = input;

  const wrapper = {
    ...mapValues(chainableFunctions, (f: any) => (...args: any[]) => {
      // lodash always puts input as the first argument
      value = f(value, ...args);
      return wrapper;
    }),
    value: () => value
  };

  return wrapper;
};

export default {
  chain,
  ...importedFunctions
};
