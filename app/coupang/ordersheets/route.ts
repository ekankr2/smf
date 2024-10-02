import { NextRequest, NextResponse } from "next/server";
import { CoupangService } from "@/services/CoupangService";
import dayjs from "dayjs";

export const revalidate = 0;

/**
 * @swagger
 * /coupang/ordersheetsAcknowledgement:
 *   get:
 *     summary: 발주서 목록조회
 *     tags: [쿠팡]
 *     responses:
 *       201:
 *         description: Created
 */
export async function GET(request: NextRequest) {
  const coupangService = new CoupangService();
  console.log("ok");

  const threeDaysAgo = dayjs().subtract(3, "day").format("YYYY-MM-DD");
  const today = dayjs().format("YYYY-MM-DD");

  const response = await coupangService.getOrderSheets(
    threeDaysAgo,
    today,
    coupangService.OrderStatus.결제완료,
  );
  const ordersheets = await response.json();

  return NextResponse.json(ordersheets, { status: 200 });
}
