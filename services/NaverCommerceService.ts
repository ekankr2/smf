import bcrypt from "bcrypt";

export class NaverCommerceService {
  private APPICATION_ID: string;
  private APPLICATION_SECRET: string;
  private BASE_URL: string;

  constructor() {
    this.APPICATION_ID = process.env.NAVER_COMMERCE_APPLICATION_ID as string;
    this.APPLICATION_SECRET = process.env
      .NAVER_COMMERCE_APPLICATION_SECRET as string;
    this.BASE_URL = "https://api.commerce.naver.com/external";
  }

  async getToken() {
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

    return res.json();
  }

  generateSignature(timestamp: number) {
    const password = `${this.APPICATION_ID}_${timestamp}`;
    const clientSecret = this.APPLICATION_SECRET;
    const hashed = bcrypt.hashSync(password, clientSecret);
    return Buffer.from(hashed, "utf-8").toString("base64");
  }
}
