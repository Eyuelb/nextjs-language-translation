import {
  addTranslation,
  getLanguage,
  getTranslations,
} from "@/app/translation/utils/useTranslation";
import { NextRequest, NextResponse } from "next/server";
type RequestBody = {
  language: string;
  translationKey: string;
  value: string;
};
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // TODO: Generate and send a JWT token for authenticated users if needed
    const data = await getLanguage();
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      {
        message: "Failed to get languages",
      },
      {
        status: 500,
      }
    );
  }
}
