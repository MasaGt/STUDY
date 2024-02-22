import { readFortune } from "../modules/forune-telling";

// mocking Math module
// jest.mock("../Math");

test("Mocking module sample", () => {
  // Math.random.mockImplementation(() => {
  //   return 1;
  // });
  jest.spyOn(Math, "random").mockReturnValue(0);

  expect(readFortune()).toBe("your lucky number is 1");
});
