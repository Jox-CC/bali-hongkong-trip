# 旅行网站部署方案

## 方案1：GitHub Pages（推荐）

```bash
cd /home/admin/Desktop/app

# 1. 初始化 Git
git init
git add .
git commit -m "Update travel website"

# 2. 在 GitHub 创建仓库，然后添加远程
git remote add origin https://github.com/你的用户名/仓库名.git

# 3. 推送到 GitHub
git push -u origin main

# 4. 启用 GitHub Pages
# 访问 https://github.com/你的用户名/仓库名 → Settings → Pages → 选择 "main" 分支 → Save

# 网站地址: https://你的用户名.github.io/仓库名
```

## 方案2：Vercel（需要登录）

```bash
cd /home/admin/Desktop/app
npx vercel --prod
```

## 方案3：Netlify（需要登录）

```bash
cd /home/admin/Desktop/app/dist
# 直接把 dist 文件夹拖拽到 https://app.netlify.com/drop
```

---

## 当前状态
✅ 已构建成功
📁 构建文件位置: /home/admin/Desktop/app/dist/
📦 文件大小: ~370KB

可以直接把 dist 文件夹上传到任何静态托管平台！
