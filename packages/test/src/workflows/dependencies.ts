import { Context } from '@temporalio/workflow';
import { TestDependencies } from '../interfaces/dependencies';

const { syncVoid, asyncIgnored, sync, async, error } = Context.dependencies<TestDependencies>();

function convertErrorToIntResult(fn: (x: number) => any, x: number): number {
  try {
    return fn(x);
  } catch (err) {
    return parseInt(err.message);
  }
}
export async function main(): Promise<number> {
  let i = 0;
  syncVoid.promise(i++);
  syncVoid.ignoredAsyncImpl(i++);
  syncVoid.sync(i++);
  syncVoid.ignoredSyncImpl(i++);

  asyncIgnored.syncImpl(i++);
  asyncIgnored.asyncImpl(i++);

  i = sync.syncImpl(i);
  i = sync.asyncImpl(i);
  i = await async.syncImpl(i);
  i = await async.asyncImpl(i);
  i = await error.throwAsync(i).catch((err) => parseInt(err.message));
  i = convertErrorToIntResult(error.throwSync, i);
  i = convertErrorToIntResult(error.throwSyncPromise, i);
  return i;
}
