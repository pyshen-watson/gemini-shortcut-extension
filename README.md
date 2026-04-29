# Gemini Shortcuts

為 Google Gemini 網頁新增自訂快捷鍵的 Chrome 擴充功能。

## 檔案結構

```
gemini-shortcut/
├── manifest.json    # 擴充功能資訊清單
├── shortcuts.js     # 快捷鍵設定
├── content.js       # 主邏輯（監聽器與動作實作）
├── style.css        # 提示氣泡樣式
└── README.md        # 本檔案
```

## 新增快捷鍵

### 1. 在 `shortcuts.js` 中新增設定

```javascript
{
  id: 'your-action-id',        // 唯一識別碼
  hint: 'Ctrl + K：開啟選單',   // 提示文字
  condition: {                 # 觸發條件
    ctrl: true,
    key: 'k'
  },
  action: 'yourActionName'    # 對應的動作名稱
}
```

### 2. 在 `content.js` 中實作動作

在 `actions` 物件中加入新函式：

```javascript
const actions = {
  // ...現有動作

  yourActionName: () => {
    // 你的程式碼
  }
};
```

## condition 選項

| 參數 | 類型 | 說明 |
|------|------|------|
| `ctrl` | boolean | 需要 Ctrl 鍵 |
| `shift` | boolean | 需要 Shift 鍵 |
| `alt` | boolean | 需要 Alt 鍵 |
| `key` | string | 要按下的鍵（不區分大小寫） |

## 安裝方式

1. 打開 Chrome，進入 `chrome://extensions/`
2. 啟用「開發者模式」
3. 點擊「載入未封裝的擴充功能」
4. 選擇此資料夾

## 測試

修改後在 `chrome://extensions/` 點擊擴充功能上的「重新載入」按鈕。