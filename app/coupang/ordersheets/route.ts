import { NextRequest, NextResponse } from "next/server";
import { NaverCommerceService } from "@/services/NaverCommerceService";
import { CoupangService } from "@/services/CoupangService";

/**
 * @swagger
 * /coupang/ordersheets:
 *   get:
 *     summary: 발주서 목록조회
 *     tags: [쿠팡]
 *     responses:
 *       201:
 *         description: Created
 */
export async function GET(request: NextRequest) {
  const coupangService = new CoupangService();

  const response = await coupangService.getOrdersheets();
  const ordersheets = await response.json();
  console.log(ordersheets);

  return NextResponse.json(ordersheets, { status: 200 });
}
