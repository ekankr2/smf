import { NextRequest, NextResponse } from "next/server";
import { NaverCommerceService } from "@/services/NaverCommerceService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { EmbedBuilder } from "@discordjs/builders";
import { Routes } from "discord-api-types/v10";
import { REST } from "@discordjs/rest";

/**
 * @swagger
 * /naver/commerce/settle/daily:
 *   get:
 *     summary: 오늘 정산 목록
 *     tags: [네이버]
 *     responses:
 *       200:
 *         description: OK
 */
export async function GET(request: NextRequest) {
  // Check if we're in a build environment
  if (process.env.VERCEL_ENV === "production") {
    return NextResponse.json(
      { message: "Skipped during build" },
      { status: 200 },
    );
  }

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const naverService = new NaverCommerceService();
  const today = dayjs().format("YYYY-MM-DD");

  try {
    const response = await naverService.getDailyPaySettle(today, today);
    const settleData = await response.json();

    const todaysSettle = settleData.elements[0];

    const discordRest = new REST({ version: "10" }).setToken(
      process.env.DISCORD_TOKEN || "",
    );

    const messageEmbed = new EmbedBuilder()
      .setColor(0x00ff00) // Green color
      .setDescription(
        todaysSettle
          ? `오늘의 네이버 정산금액은 ${todaysSettle.settleAmount.toLocaleString()} 원 입니다.\n
        정산 예정일: ${todaysSettle.settleCompleteDate}\n
        총 금액: ${todaysSettle.paySettleAmount.toLocaleString()}\n
        수수료: ${todaysSettle.paySettleAmount.toLocaleString()}\n
        혜택정산: ${todaysSettle.benefitSettleAmount.toLocaleString()}\n`
          : "오늘은 정산 내역이 없습니다.",
      )
      .setThumbnail("https://api.smf.co.kr/images/money_logo.png");

    await discordRest.post(
      Routes.channelMessages(process.env.DISCORD_NAVER_CHANNEL_ID || ""),
      {
        body: { embeds: [messageEmbed.toJSON()] },
      },
    );

    return NextResponse.json(settleData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "fail" },
      { status: 400 },
    );
  }
}
