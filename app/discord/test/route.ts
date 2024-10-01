import { NextRequest, NextResponse } from "next/server";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

/**
 * @swagger
 * /discord/test:
 *   get:
 *     summary: 디스코드 테스트
 *     tags: [test]
 *     responses:
 *       200:
 *         description: OK
 */
export async function GET(request: NextRequest) {
  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_TOKEN || "",
  );

  try {
    await rest.post(Routes.channelMessages("1290352667302035488"), {
      body: {
        content: "A message via REST!",
      },
    });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
