import { NextRequest, NextResponse } from "next/server";
import { CoupangService } from "@/services/CoupangService";
import dayjs from "dayjs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

/**
 * @swagger
 * /discord/coupang/ordersheets:
 *   get:
 *     summary: 디스코드 테스트
 *     tags: [디스코드]
 *     responses:
 *       200:
 *         description: OK
 */
export async function GET(request: NextRequest) {
  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_TOKEN || "",
  );

  try {
    const coupangService = new CoupangService();

    const threeDaysAgo = dayjs().subtract(3, "day").format("YYYY-MM-DD");
    const today = dayjs().format("YYYY-MM-DD");

    const response = await coupangService.getOrderSheets(
      threeDaysAgo,
      today,
      coupangService.OrderStatus.결제완료,
    );
    const ordersheets = await response.json();
    if (ordersheets.data && ordersheets.data.length > 0) {
      await rest.post(Routes.channelMessages("1290352667302035488"), {
        body: {
          content: `쿠팡 새로운 주문 *${ordersheets.data.length}* 건 있음\n한 시간 뒤 다시 알림예정`,
        },
      });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "message send fail" }, { status: 400 });
  }
}
