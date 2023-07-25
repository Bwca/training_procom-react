import { FunctionWithArguments } from './function-with-arguments.model';
import { ProblemMessageGenerator } from './problem-message-generator.model';

export interface RequestDecoratorPayload<Error, F extends FunctionWithArguments> {
  func: F;
  generateProblemMessage?: ProblemMessageGenerator<Error>;
  successMessage?: string;
}
