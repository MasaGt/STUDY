import axios from "axios";
import { fetchFirstData } from "../modules/fetchData";

jest.mock("axios");

test("mocking a whole module", async () => {
  //これはエラー -> fetchData.js のaxios.get 以降の処理でモックした戻り値に無いプロパティにアクセスしようとしているから
  // axios.get.mockResolvedValue({ msg: "mocked" });

  axios.get.mockResolvedValue({ data: [{ msg: "mocked" }] });

  // 上記は以下のシュガーシンタックス
  // axios.get.mockImplementation(() => {
  //   return new Promise((resolve) => {
  //     return resolve({ data: [{ msg: "mocked" }] });
  //   });
  // });

  const result = await fetchFirstData();
  expect(result).toEqual({ msg: "mocked" });
});
