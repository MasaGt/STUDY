import { greet } from "@src/app";

test("greet test", () => {
  expect(greet()).toBe("hello from const");
});
