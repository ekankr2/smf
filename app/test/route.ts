import { NextRequest, NextResponse } from "next/server";
import { NaverCommerceService } from "@/services/NaverCommerceService";

/**
 * @swagger
 * /test:
 *   post:
 *     summary: TEST API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *             required:
 *               - name
 *     tags: [test]
 *     responses:
 *       201:
 *         description: Created
 */
export async function POST(request: NextRequest) {
  return NextResponse.json({ hello: "world" }, { status: 200 });
}
