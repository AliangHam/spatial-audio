# AGENTS.md

独立 Next.js 13 演示应用 — 基于 LiveKit + PixiJS + Web Audio API 的 2D 多人空间音频。

## 命令

| 任务 | 命令 |
|---|---|
| 开发服务器 | `npm run dev` |
| 生产构建 | `npm run build` |
| 代码检查 | `npm run lint` |
| 类型检查 | `npx tsc --noEmit` |

没有 `typecheck` 脚本 — 直接使用 `npx tsc --noEmit`。

## 项目特点

- **无测试。** 没有测试框架、测试文件或 `test` 脚本。
- **无 CI。** 通过 Vercel 部署（从 git 自动部署）。无 GitHub Actions。
- **无 pre-commit hooks。** 没有 Husky、lint-staged 等。
- **无 Prettier。** 仅通过 ESLint 检查（`next/core-web-vitals` 预设）。
- **锁文件问题。** 同时存在 `yarn.lock` 和 `package-lock.json`。README 使用 `npm`，建议优先使用 npm。
- **路径别名。** `@/*` 映射到 `./src/*`。
- **SVG 导入。** `.svg` 文件通过 `@svgr/webpack` 作为 React 组件导入（自定义 webpack 规则在 `next.config.js` 中）。

## 环境变量

创建 `.env.development`（已 gitignore）：

```
LIVEKIT_API_KEY=<key>
LIVEKIT_API_SECRET=<secret>
LIVEKIT_WS_URL=wss://<project>.livekit.cloud
```

## 架构

**混合路由：** App Router (`src/app/`) 用于页面，Pages Router (`src/pages/api/`) 用于服务端 API 路由。

**关键文件：**

| 文件 | 作用 |
|---|---|
| `src/components/GameView.tsx` | 核心协调器 — 挂载所有控制器 + PixiJS 舞台 |
| `src/controller/SpatialAudioController.tsx` | Web Audio 空间音频（桌面端 PannerNode，移动端 GainNode） |
| `src/controller/NetcodeController.tsx` | LiveKit 数据通道位置/动画同步（10 Hz，有损 JSON） |
| `src/model/GameState.ts` | 通过 React hooks 集中管理游戏状态（无 Redux/Zustand） |
| `src/pages/api/connection_details.ts` | POST 端点 — 生成 LiveKit JWT 令牌 |

**空间音频注意事项：** iOS Safari 不支持 `PannerNode`。`SpatialAudioController` 在移动端回退到 `GainNode` 音量缩放（通过 `react-device-detect` 检测）。

**状态管理：** 纯 React hooks。所有游戏状态在 `GameState.ts` 的 `useGameState()` 中。

## LiveKit 文档

LiveKit 更新很快 — 始终查阅最新文档。MCP 服务器地址：`https://docs.livekit.io/mcp`，工具包括：`get_docs_overview`、`get_pages`、`docs_search`、`code_search`、`get_changelog`、`get_pricing_info`。优先使用浏览（`get_docs_overview`、`get_pages`）而非搜索，优先使用 `docs_search` 而非 `code_search` — 文档页面比原始代码提供更好的上下文。
