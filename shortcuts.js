// Gemini Shortcuts 設定檔
// 在此新增/修改快捷鍵設定
window.SHORTCUTS_CONFIG = [
  {
    id: 'toggle-hint',
    hint: 'Ctrl + Shift + H：開關此提示',
    condition: { ctrl: true, shift: true, key: 'h' },
    action: 'toggleTooltip'
  },
  {
    id: 'focus-input',
    hint: 'Ctrl + /：聚焦輸入框',
    condition: { ctrl: true, key: '/' },
    action: 'focusInput'
  },
  {
    id: 'new-chat',
    hint: 'Ctrl + N：開啟新對話',
    condition: { ctrl: true, key: 'n' },
    action: 'newChat'
  },
  {
    id: 'temp-chat',
    hint: 'Ctrl + I：開啟臨時對話',
    condition: { ctrl: true, key: 'i' },
    action: 'tempChat'
  }
];