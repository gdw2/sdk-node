/**
 * Base class for all workflow errors
 */
export class WorkflowError extends Error {
  public readonly name: string = 'WorkflowError';
}

/**
 * Thrown in workflow when it is requested to be cancelled either externally or internally
 */
export class CancelledError extends WorkflowError {
  public readonly name: string = 'CancelledError';
}

/**
 * Thrown in workflow when it receives a client cancellation request
 */
export class WorkflowCancelledError extends CancelledError {
  public readonly name: string = 'WorkflowCancelledError';
}

/**
 * Thrown in workflow when it trys to do something that non-deterministic such as construct a WeakMap()
 */
export class DeterminismViolationError extends WorkflowError {
  public readonly name: string = 'DeterminismViolationError';
}

/**
 * This exception is thrown in the following cases:
 *  - Workflow with the same WorkflowId is currently running
 *  - There is a closed workflow with the same ID and the {@link WorkflowOptions.workflowIdReusePolicy}
 *    is `WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE`
 *  - There is successfully closed workflow with the same ID and the {@link WorkflowOptions.workflowIdReusePolicy}
 *    is `WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY`
 *  - {@link Workflow.main} is called *more than once* on a stub created through {@link Context.child} and the
 *    {@link WorkflowOptions.workflowIdReusePolicy} is `WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE`
 */
export class WorkflowExecutionAlreadyStartedError extends WorkflowError {
  public readonly name: string = 'ChildWorkflowExecutionAlreadyStartedError';

  constructor(message: string, public readonly workflowId: string, public readonly workflowType: string) {
    super(message);
  }
}
