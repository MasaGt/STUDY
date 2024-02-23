import { readFortune } from "../modules/forune-telling";

test("Mocking module sample", () => {
  const spy = jest.spyOn(Math, "random").mockImplementation(() => {
    return 0;
  });

  // 以下のモック方法でも同じ
  // const spy = jest.spyOn(Math, "random").mockReturnValue(0);

  expect(readFortune()).toBe("your lucky number is 1");
  expect(spy).toHaveBeenCalledTimes(1);
});
