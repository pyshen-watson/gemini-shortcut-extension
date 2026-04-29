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
  }
];