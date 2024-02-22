/**
 * This is a module for partially mocking by jest.mock()
 */
import { foo, funcBar } from "./foo-bar";

export const greet = () => {
  return `Hello, ${foo} ${funcBar()}`;
};
