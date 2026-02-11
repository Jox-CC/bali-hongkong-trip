# Bali & Hong Kong Travel Website

A beautiful travel planning website for a Bali and Hong Kong trip.

## Deploy to GitHub Pages

```bash
# 1. 在 GitHub 创建新仓库 (比如: bali-hongkong-trip)

# 2. 添加远程仓库并推送
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main

# 3. 启用 GitHub Pages:
#    - 访问 https://github.com/你的用户名/仓库名
#    - 点击 Settings → Pages
#    - Source 选择 "main" 分支
#    - 点击 Save

# 4. 你的网站将在 https://你的用户名.github.io/仓库名 上线！
```

## 本地开发

```bash
npm install
npm run dev
```

## 构建生产版本

```bash
npm run build
# 构建文件在 dist/ 目录
```

## 技术栈

- React + TypeScript
- Vite
- Tailwind CSS
- Leaflet Maps
