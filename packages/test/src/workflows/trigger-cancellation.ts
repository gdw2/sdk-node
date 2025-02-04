// @@@SNIPSTART nodejs-blocked-workflow
import { Trigger, CancelledError } from '@temporalio/workflow';
import { Blocked } from '../interfaces';

const unblocked = new Trigger<void>();

const signals = {
  unblock(): void {
    unblocked.resolve();
  },
};

async function main(): Promise<void> {
  try {
    console.log('Blocked');
    await unblocked;
    console.log('Unblocked');
  } catch (err) {
    if (!(err instanceof CancelledError)) {
      throw err;
    }
    console.log('Cancelled');
  }
}

export const workflow: Blocked = { main, signals };
// @@@SNIPEND
