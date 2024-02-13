import { Student } from "../src/Student";

test("Student class test", () => {
  const obj = new Student(1, "sample");
  expect(obj.greeting()).toBe("id: 1. name: sample.");
});
