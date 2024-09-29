import crypto from "crypto";

export class CoupangService {
  private ACCESS_KEY: string;
  private SECRET_KEY: string;
  private BASE_URL: string;
  private VENDOR_ID: string;

  constructor() {
    this.ACCESS_KEY = process.env.COUPANG_ACCESS_KEY as string;
    this.SECRET_KEY = process.env.COUPANG_SECRET_KEY as string;
    this.VENDOR_ID = process.env.COUPANG_VENDOR_ID as string;
    this.BASE_URL = "https://api-gateway.coupang.com";
  }

  generateAuthorization = (method, path, query) => {
    const datetime =
      new Date().toISOString().slice(2, 19).replace(/[-:]/gi, "") + "Z";
    const message = `${datetime}${method}${path}${query}`;

    const signature = crypto
      .createHmac("sha256", this.SECRET_KEY)
      .update(message)
      .digest("hex");

    return `CEA algorithm=HmacSHA256, access-key=${this.ACCESS_KEY}, signed-date=${datetime}, signature=${signature}`;
  };

  orderStatus = {
    결제완료: "ACCEPT",
    상품준비중: "INSTRUCT",
    배송지시: "DEPARTURE",
    배송중: "DELIVERING",
    배송완료: "FINAL_DELIVERY",
  };

  async getOrdersheets() {
    const method = "GET";
    const path = `/v2/providers/openapi/apis/api/v4/vendors/${this.VENDOR_ID}/ordersheets`;
    const query =
      "createdAtFrom=2024-09-28&createdAtTo=2024-09-29&status=INSTRUCT";
    const authorization = this.generateAuthorization(method, path, query);

    return await fetch(`${this.BASE_URL}${path}?${query}`, {
      method: method,
      headers: {
        Authorization: authorization,
        "X-EXTENDED-TIMEOUT": "90000",
      },
    });
  }
}
