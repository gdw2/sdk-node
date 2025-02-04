import { TLSConfig } from '@temporalio/common';

export { TLSConfig };

export interface ServerOptions {
  /**
   * The URL of the Temporal server to connect to
   */
  url: string;
  /**
   * What namespace will we operate under
   */
  namespace: string;

  /**
   * A human-readable string that can identify your worker
   */
  identity: string;
  /**
   * A string that should be unique to the exact worker code/binary being executed
   */
  workerBinaryId: string;
  /**
   * Timeout for long polls (polling of task queues)
   */
  longPollTimeoutMs: number;

  /**
   * TLS configuration options.
   *
   * Pass undefined to use a non-encrypted connection or an empty object to
   * connect with TLS without any customization.
   */
  tls?: TLSConfig;
}

/**
 * Configure a Core instance
 */
export interface CoreOptions {
  /**
   * Options for communicating with the Temporal server
   */
  serverOptions: ServerOptions;
  /**
   * Maximum number of Workflow instances to cache before automatic eviction
   */
  maxCachedWorkflows: number;
}

export interface WorkerOptions {
  /**
   * The task queue the worker will pull from
   */
  taskQueue: string;

  maxConcurrentActivityTaskExecutions: number;
  maxConcurrentWorkflowTaskExecutions: number;
  maxConcurrentWorkflowTaskPolls: number;
  maxConcurrentActivityTaskPolls: number;
  /**
   * `maxConcurrentWorkflowTaskPolls` * this number = the number of max pollers that will
   * be allowed for the nonsticky queue when sticky tasks are enabled. If both defaults are used,
   * the sticky queue will allow 4 max pollers while the nonsticky queue will allow one. The
   * minimum for either poller is 1, so if `max_concurrent_wft_polls` is 1 and sticky queues are
   * enabled, there will be 2 concurrent polls.
   */
  nonStickyToStickyPollRatio: number;
  /**
   * How long a workflow task is allowed to sit on the sticky queue before it is timed out
   * and moved to the non-sticky queue where it may be picked up by any worker.
   */
  stickyQueueScheduleToStartTimeoutMs: number;
}

export interface Worker {}
export interface Core {}

export declare type PollCallback = (err: Error, result: ArrayBuffer) => void;
export declare type WorkerCallback = (err: Error, result: Worker) => void;
export declare type CoreCallback = (err: Error, result: Core) => void;
export declare type VoidCallback = (err: Error, result: void) => void;

// TODO: improve type, for some reason Error is not accepted here
export declare function registerErrors(errors: Record<string, any>): void;
export declare function newCore(coreOptions: CoreOptions, callback: CoreCallback): void;
export declare function newWorker(core: Core, workerOptions: WorkerOptions, callback: WorkerCallback): void;
export declare function workerShutdown(worker: Worker, callback: VoidCallback): void;
export declare function coreShutdown(core: Core, callback: VoidCallback): void;
export declare function workerPollWorkflowActivation(worker: Worker, callback: PollCallback): void;
export declare function workerCompleteWorkflowActivation(
  worker: Worker,
  result: ArrayBuffer,
  callback: VoidCallback
): void;
export declare function workerPollActivityTask(worker: Worker, callback: PollCallback): void;
export declare function workerCompleteActivityTask(worker: Worker, result: ArrayBuffer, callback: VoidCallback): void;
export declare function workerRecordActivityHeartbeat(worker: Worker, heartbeat: ArrayBuffer): void;
