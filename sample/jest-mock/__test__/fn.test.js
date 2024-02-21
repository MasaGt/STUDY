test("jest.fn()の使用例", () => {
  //モック関数の設定
  const mockFunc = jest.fn((n) => {
    return n;
  });

  // モック関数の呼び出し
  mockFunc(1);
  mockFunc(2);

  // モック関数の呼び出しについてのテスト
  // mockFuncの呼び出し回数
  expect(mockFunc).toHaveBeenCalledTimes(2);

  // 直近でmockFuncを呼び出した際の引数
  expect(mockFunc).toHaveBeenCalledWith(2);
});

test("jest.fn().mockについて", () => {
  const mockFunc = jest.fn();
  mockFunc("test");

  // mockFunc.mock.calls: モック関数が呼び出されたか
  expect(mockFunc.mock.calls).toHaveLength(1);

  // mockFunc.mock.calls[n][x]: モック関数がn番目に呼び出された際のx番目の引数
  expect(mockFunc.mock.calls[0][0]).toBe("test");

  // mock.results[n].value: モック関数がn番目に呼ばれた時の戻り値
  expect(mockFunc.mock.results[0].value).toBeUndefined();
});

test("mockReturnValue test", () => {
  const mockFunc = jest.fn();
  mockFunc
    .mockReturnValueOnce(10)
    .mockReturnValueOnce("hi")
    .mockReturnValue(false);

  mockFunc();
  mockFunc();
  mockFunc();

  expect(mockFunc).nthReturnedWith(1, 10);
  expect(mockFunc).nthReturnedWith(2, "hi");
  expect(mockFunc).nthReturnedWith(3, false);
});

test("ちょっとした疑問", () => {
  const mockFunc = jest.fn(() => {
    return "this is a mock";
  });

  mockFunc.mockReturnValueOnce(10);
  mockFunc();
  mockFunc();

  expect(mockFunc).nthReturnedWith(1, 10);
  expect(mockFunc).nthReturnedWith(2, "this is a mock");
});

test("custom matcher", () => {
  // toHaveBeenNthCalledWith のサンプル
  const mockFunc = jest.fn();

  mockFunc(10, 11);
  mockFunc(true);

  expect(mockFunc).toHaveBeenNthCalledWith(1, 10, 11);
  expect(mockFunc).toHaveBeenNthCalledWith(2, true);

  // nthRetuenedWith のサンプル
  const mockFunc2 = jest.fn();
  mockFunc2.mockReturnValueOnce(10);

  mockFunc2();
  mockFunc2();

  expect(mockFunc2).nthReturnedWith(1, 10);
  expect(mockFunc2).nthReturnedWith(2, undefined);

  // toHaveBeenCalledのサンプル
  expect(mockFunc).toHaveBeenCalled();
  expect(mockFunc).toHaveBeenCalledTimes(2);
});
