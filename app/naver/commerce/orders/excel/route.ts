import { NextRequest, NextResponse } from "next/server";
import { NaverCommerceService } from "@/services/NaverCommerceService";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import * as XLSX from "xlsx";
import { REST } from "@discordjs/rest";
import { AttachmentBuilder } from "discord.js";
import { Routes } from "discord-api-types/v10";
import { Readable } from "node:stream";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * @swagger
 * /naver/commerce/orders/excel:
 *   get:
 *     summary: 주문 목록 엑셀 전송
 *     tags: [네이버]
 *     responses:
 *       200:
 *         description: OK
 */
export async function GET(request: NextRequest) {
  const naverService = new NaverCommerceService();
  const from = dayjs()
    .tz("Asia/Seoul")
    .startOf("day")
    .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  const to = dayjs()
    .tz("Asia/Seoul")
    .endOf("day")
    .format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  try {
    const response = await naverService.getOrdersByConditions(
      from,
      naverService.orderRangeType.주문일시,
      naverService.productOrderStatuses.결제완료,
      naverService.placeOrderStatusType.발주확인,
      to,
    );
    const orders = await response.json();

    if (orders.data?.contents.length === 0) {
      return NextResponse.json(
        { error: "주문 내역이 존재하지 않습니다." },
        { status: 404 },
      );
    }

    const flattenedOrderData = orders.data.contents.map((order: any) => {
      const { productOrderId, content } = order;
      const { order: orderDetails, productOrder } = content;
      return {
        productOrderId,
        orderId: orderDetails.orderId,
        orderDate: orderDetails.orderDate,
        ordererName: orderDetails.ordererName,
        paymentDate: orderDetails.paymentDate,
        paymentMeans: orderDetails.paymentMeans,
        totalPaymentAmount: productOrder.totalPaymentAmount,
        productName: productOrder.productName,
        quantity: productOrder.quantity,
        productOption: productOrder.productOption,
        shippingAddress: `${productOrder.shippingAddress.baseAddress} ${productOrder.shippingAddress.detailedAddress}`,
        recipientName: productOrder.shippingAddress.name,
        recipientTel: productOrder.shippingAddress.tel1,
        // Add more fields as needed
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(flattenedOrderData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    try {
      const discordRest = new REST({ version: "10" }).setToken(
        process.env.DISCORD_TOKEN || "",
      );

      const form = new FormData();
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      form.append("file", blob, `naver-order-${dayjs().format("YYMMDD")}.xlsx`);
      form.append(
        "payload_json",
        JSON.stringify({
          content: `${dayjs().format("MM월 DD일")} 네이버 주문 목록 엑셀 파일 전송`,
        }),
      );

      await discordRest.post(
        Routes.channelMessages(process.env.DISCORD_NAVER_CHANNEL_ID || ""),
        {
          files: [
            {
              name: `naver-order-${dayjs().format("YYMMDD")}.xlsx`,
              data: excelBuffer,
            },
          ],
        },
      );
      return NextResponse.json(orders.data?.contents, { status: 200 });
    } catch (e: any) {
      return NextResponse.json({ error: e.message || "fail" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "fail" },
      { status: 400 },
    );
  }
}
