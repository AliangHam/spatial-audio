// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import livekitServer, {
  AccessToken,
  RoomServiceClient,
} from "livekit-server-sdk";
import { CharacterName } from "@/components/CharacterSelector";

export type ConnectionDetailsBody = {
  room_name: string;
  username: string;
  character: CharacterName;
};

export type ConnectionDetails = {
  token: string;
  ws_url: string;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConnectionDetails | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "请求方法无效" });
  }

  const {
    username,
    room_name: room,
    character,
  } = req.body as ConnectionDetailsBody;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.LIVEKIT_WS_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return res.status(500).json({ error: "服务器配置错误" });
  }

  if (!username) return res.status(400).json({ error: "缺少用户名" });
  if (!character) return res.status(400).json({ error: "缺少角色" });
  if (!room) return res.status(400).json({ error: "缺少房间名" });

  const livekitHost = wsUrl?.replace("wss://", "https://");

  const at = new AccessToken(apiKey, apiSecret, { identity: username });
  const roomService = new RoomServiceClient(livekitHost, apiKey, apiSecret);

  try {
    await roomService.getParticipant(room, username);
    return res.status(401).json({ error: "用户名已存在于房间中" });
  } catch {
    // If participant doesn't exist, we can continue
  }

  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
  at.metadata = JSON.stringify({ character });
  res.status(200).json({ token: at.toJwt(), ws_url: wsUrl });
}
