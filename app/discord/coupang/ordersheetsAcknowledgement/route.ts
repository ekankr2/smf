import { NextRequest, NextResponse } from "next/server";
import { CoupangService } from "@/services/CoupangService";
import dayjs from "dayjs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { EmbedBuilder } from "@discordjs/builders";

export const revalidate = 0;

/**
 * @swagger
 * /discord/coupang/ordersheetsAcknowledgement:
 *   get:
 *     summary: 디스코드 쿠팡 주문 확인
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

    const orderSheetRes = await coupangService.getOrderSheets(
      threeDaysAgo,
      today,
      coupangService.OrderStatus.결제완료,
    );
    const ordersheets = await orderSheetRes.json();

    if (!ordersheets.data || ordersheets.data.length === 0) {
      return NextResponse.json(
        { success: true, result: "no orders found" },
        { status: 404 },
      );
    }
    const orderIds = ordersheets.data.map((order: any) => order.shipmentBoxId);
    const ackRes = await coupangService.orderAcknowledgement(orderIds);
    const acknowlegmentResult = await ackRes.json();

    if (acknowlegmentResult.code === 200) {
      const successEmbed = new EmbedBuilder()
        .setColor(0x00ff00) // Green color
        .setDescription(
          `쿠팡 신규 주문 *${ordersheets.data.length}* 건 \n상품준비중 처리 완료`,
        );

      await rest.post(Routes.channelMessages("1290352667302035488"), {
        body: { embeds: [successEmbed.toJSON()] },
      });

      return NextResponse.json({ success: true }, { status: 200 });
    }

    const failureEmbed = new EmbedBuilder()
      .setColor(0xff0000) // Red color
      .setDescription(
        `쿠팡 신규 주문 *${ordersheets.data.length}* 건 \n상품준비중 처리 실패`,
      );

    await rest.post(Routes.channelMessages("1290352667302035488"), {
      body: { embeds: [failureEmbed.toJSON()] },
    });
    return NextResponse.json(
      { error: "상품준비중 처리 실패" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json({ error: "message send fail" }, { status: 400 });
  }
}
