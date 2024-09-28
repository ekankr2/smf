import { NextRequest, NextResponse } from "next/server";
import { NaverCommerceService } from "@/services/NaverCommerceService";

/**
 * @swagger
 * /naver/commerce/token:
 *   post:
 *     summary: 토큰 발급
 *     tags: [naver]
 *     responses:
 *       201:
 *         description: Created
 */
export async function POST(request: NextRequest) {
  const naverCommerceService = new NaverCommerceService();
  const token = await naverCommerceService.getToken();

  if (token) {
    return NextResponse.json(token, { status: 201 });
  }

  return NextResponse.json({ message: "Failed to get token" }, { status: 400 });
}

// {
//   "access_token": "2v2wUzt2ZBbxTvUIemjewr",
//     "expires_in": 10800,
//     "token_type": "Bearer"
// }
