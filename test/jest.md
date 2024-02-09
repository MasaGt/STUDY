### jestとは
- JavaScriptのユニットテストのためのツール

---

### はじめかた
- jestをインストール

```bash
npm init

# jest インストール
npm install --save-dev jest
```
<br>

- package.jsonにnpm script追加
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

<br>

- コマンドでテスト実施
```bash
npm test
``` 