import bcrypt from "bcrypt";

export class NaverCommerceService {
  private APPICATION_ID: string;
  private APPLICATION_SECRET: string;
  private BASE_URL: string;

  constructor() {
    this.APPICATION_ID = process.env.NAVER_COMMERCE_APPLICATION_ID as string;
    this.APPLICATION_SECRET = process.env
      .NAVER_COMMERCE_APPLICATION_SECRET as string;
    this.BASE_URL = "https://proxy.smf.co.kr/naver-commerce";
  }

  generateSignature(timestamp: number) {
    const password = `${this.APPICATION_ID}_${timestamp}`;
    const clientSecret = this.APPLICATION_SECRET;
    const hashed = bcrypt.hashSync(password, clientSecret);
    return Buffer.from(hashed, "utf-8").toString("base64");
  }

  async getToken(): Promise<string | null> {
    const timestamp = Date.now();
    const signature = this.generateSignature(timestamp);
    const params = new URLSearchParams({
      client_id: this.APPICATION_ID,
      timestamp: timestamp.toString(),
      grant_type: "client_credentials",
      client_secret_sign: signature,
      type: "SELF",
    });

    const res = await fetch(`${this.BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (res.ok) {
      const result = await res.json();
      return result.access_token;
    }

    return null;
  }

  orderRangeType = {
    결제일시: "PAYED_DATETIME",
    주문일시: "ORDERED_DATETIME",
    발송처리일시: "DISPATCHED_DATETIME",
    구매확정일시: "PURCHASE_DECIDED_DATETIME",
    클레임요청일시: "CLAIM_REQUESTED_DATETIME",
    클레임완료일시: "CLAIM_COMPLETED_DATETIME",
    수거완료일시: "COLLECT_COMPLETED_DATETIME",
    선물수락일시: "GIFT_RECEIVED_DATETIME",
    배송희망일변경일시: "HOPE_DELIVERY_INFO_CHANGED_DATETIME",
  };

  productOrderStatuses = {
    결제대기: "PAYMENT_WAITING",
    결제완료: "PAYED",
    상품준비중: "PREPARING_PRODUCT",
    배송중: "DELIVERING",
    배송완료: "DELIVERED",
    구매확정: "PURCHASE_DECIDED",
    클레임요청: "CLAIM_REQUESTED",
    클레임완료: "CLAIM_COMPLETED",
    수거완료: "COLLECT_COMPLETED",
    선물수락: "GIFT_RECEIVED",
    배송희망일변경: "HOPE_DELIVERY_INFO_CHANGED",
  };

  placeOrderStatusType = {
    발주미확인: "NOT_YET",
    발주확인: "OK",
    발주확인해제: "CANCEL",
  };

  async getOrdersByConditions(
    from: string,
    rangeType: string,
    productOrderStatus: string,
    placeOrderStatus: string,
    to: string,
  ) {
    const params = new URLSearchParams({
      from,
      rangeType: rangeType,
      productOrderStatuses: productOrderStatus,
      placeOrderStatusType: placeOrderStatus,
      to: to,
    });

    return await fetch(
      `${this.BASE_URL}/v1/pay-order/seller/product-orders?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await this.getToken()}`,
        },
      },
    );
  }

  async confirmOrders(productOrderIds: string[]) {
    return await fetch(
      `${this.BASE_URL}/v1/pay-order/seller/product-orders/confirm`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await this.getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productOrderIds,
        }),
      },
    );
  }

  async getDailyPaySettle(startDate: string, endDate: string) {
    const params = new URLSearchParams({
      startDate,
      endDate,
      pageNumber: "1",
      pageSize: "100",
    });

    return await fetch(
      `${this.BASE_URL}/v1/pay-settle/settle/daily?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await this.getToken()}`,
        },
      },
    );
  }
}
