import {
  addTranslation,
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
    const language = await request.nextUrl.searchParams.get("language");
    if (language) {
      const data = await getTranslations(language);
      return NextResponse.json(data, {
        status: 200,
      });
    }
    else{
      return NextResponse.json(
        {
          message: "Invalid language",
        },
        {
          status: 400,
        }
      );
    }
    // const newTranslation = await addTranslation(
    //   language,
    //   translationKey,
    //   value
    // );
    // Return success response
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      {
        message: "Failed to add translation",
      },
      {
        status: 500,
      }
    );
  }
}
