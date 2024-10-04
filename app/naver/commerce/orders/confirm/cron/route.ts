import { NextRequest, NextResponse } from "next/server";
import { NaverCommerceService } from "@/services/NaverCommerceService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { EmbedBuilder } from "@discordjs/builders";
import { Routes } from "discord-api-types/v10";
import { REST } from "@discordjs/rest";

export const revalidate = 0;

/**
 * @swagger
 * /naver/commerce/orders/confirm/cron:
 *   get:
 *     summary: 네이버 자동 발주 확인 & 디코 전송
 *     tags: [네이버]
 *     responses:
 *       200:
 *         description: OK
 */
export async function GET(request: NextRequest) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const naverService = new NaverCommerceService();
  const from = dayjs()
    .tz("Asia/Seoul")
    .startOf("day")
    .format("YYYY-MM-DDTHH:mm:ss.SSS+09:00");

  const to = dayjs()
    .tz("Asia/Seoul")
    .endOf("day")
    .format("YYYY-MM-DDTHH:mm:ss.SSS+09:00");

  try {
    const orderRes = await naverService.getOrdersByConditions(
      from,
      naverService.orderRangeType.주문일시,
      naverService.productOrderStatuses.결제완료,
      naverService.placeOrderStatusType.발주미확인,
      to,
    );
    const newOrders = await orderRes.json();

    if (!newOrders.data || newOrders.data.contents.length === 0) {
      return NextResponse.json(
        { success: true, result: "신규 주문 없음" },
        { status: 200 },
      );
    }

    const newOrderIdList = newOrders.data.contents.map(
      (order: any) => order.productOrderId,
    );

    const confirmRes = await naverService.confirmOrders(newOrderIdList);
    const confirmResult = await confirmRes.json();

    const discordRest = new REST({ version: "10" }).setToken(
      process.env.DISCORD_TOKEN || "",
    );

    if (
      confirmRes.ok &&
      confirmResult.data?.successProductOrderInfos &&
      confirmResult.data.successProductOrderInfos.length > 0
    ) {
      const successEmbed = new EmbedBuilder()
        .setColor(0x00ff00) // Green color
        .setDescription(
          `네이버 신규 주문 *${confirmResult.data.successProductOrderInfos.length || 0}* 건 \n발주확인 처리 완료`,
        )
        .setThumbnail("https://api.smf.co.kr/images/naver_logo.png");
      await discordRest.post(Routes.channelMessages("1291811608598675476"), {
        body: { embeds: [successEmbed.toJSON()] },
      });
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const failEmbed = new EmbedBuilder()
      .setColor(0x00ff00) // Green color
      .setDescription(`네이버 신규 주문 발주확인 처리 오류`)
      .setThumbnail("https://api.smf.co.kr/images/naver_logo.png");
    await discordRest.post(Routes.channelMessages("1291811608598675476"), {
      body: { embeds: [failEmbed.toJSON()] },
    });

    return NextResponse.json(
      { error: "발주확인 처리 실패 또는 디스코드 메시지 전송 실패" },
      { status: 400 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "발주 확인 실패" },
      { status: 400 },
    );
  }
}
