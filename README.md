# LiveKit 空间音频

[![示例 GIF](https://user-images.githubusercontent.com/8453967/221318613-861215da-1d71-492e-979f-dc7f18cb5c7f.gif)](https://spatial-audio-demo.livekit.io/)

这是一个使用 LiveKit 实现空间音频的演示。用户加入一个 2D 小世界，根据彼此的位置和距离以立体声听到对方的音频。

## 在线演示

你可以在这里体验在线演示：<https://spatial-audio-demo.livekit.io/>

## 本地运行

克隆仓库并安装依赖：

```bash
git clone git@github.com:livekit-examples/spatial-audio.git
cd spatial-audio
npm install
```

在 <http://cloud.livekit.io> 创建一个新的 LiveKit 项目，然后在[项目设置](https://cloud.livekit.io/projects/p_/settings/keys)中创建一个新的密钥。

在 `spatial-audio/.env.development` 创建新文件，添加你的 API 密钥、Secret 以及项目的 WebSocket URL（在 <http://cloud.livekit.io> 页面顶部可以找到）：

```
LIVEKIT_API_KEY=<你的 API 密钥>
LIVEKIT_API_SECRET=<你的 API Secret>
LIVEKIT_WS_URL=wss://<你的项目>.livekit.cloud
```

（注意：此文件已在 `.gitignore` 中，请勿将 API Secret 提交到 git。）

然后启动开发服务器：

```bash
npm run dev
```

在浏览器中打开 <http://localhost:3000> 即可测试。

## 生产部署

这是一个 Next.js 应用，你可以一键部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flivekit-examples%2Fspatial-audio&env=LIVEKIT_API_KEY,LIVEKIT_API_SECRET,LIVEKIT_WS_URL&envDescription=Get%20these%20from%20your%20cloud%20livekit%20project.&envLink=https%3A%2F%2Fcloud.livekit.io&project-name=my-spatial-audio-app)

更多生产环境部署信息请参考 [Next.js 部署文档](https://nextjs.org/docs/deployment)。

## 素材致谢

本演示使用了以下素材：

- [Field of Green](https://guttykreum.itch.io/field-of-green) 和音箱精灵图由 [GuttyKreum](https://twitter.com/GuttyKreum) 制作
- [Dino Characters](https://arks.itch.io/dino-characters) 由 [Arks](https://arks.digital/) 制作

他们都是很棒的艺术家，欢迎去看看他们的作品！
