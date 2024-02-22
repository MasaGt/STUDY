import { greet } from "../modules/greet";

// foo-barの部分的なモック化
jest.mock("../modules/foo-bar", () => {
  // 実際のモジュールを読み込み
  const originalModule = jest.requireActual("../modules/foo-bar");

  return {
    ...originalModule,
    // funcBar: originalModule.funcBar,
    foo: "mocked foo",
  };
});

test("partially mock sample", () => {
  expect(greet()).toBe("Hello, mocked foo bar");
});
