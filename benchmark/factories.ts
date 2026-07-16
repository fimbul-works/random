import * as factories from '../src/index.js'

export const randomFactories = Object.entries(factories).reduce((acc, [name, factory]) => {
  if (typeof factory === 'function' && name.startsWith('createRandom')) {
    const algoName = name.replace(/^createRandom/, '').replaceAll('Plus', '+');
    acc[algoName] = factory;
  }
  return acc;
}, {} as Record<string, Function>);

export default randomFactories;
