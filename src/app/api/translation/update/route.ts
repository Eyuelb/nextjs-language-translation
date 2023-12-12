import { addTranslation, updateTranslation } from "@/app/translation/utils/useTranslation";
import { NextRequest, NextResponse } from "next/server";
type RequestBody = {
  language: string;
  translationKey: string;
  value: string;
};
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // TODO: Generate and send a JWT token for authenticated users if needed
    const { language, translationKey, value }: RequestBody =
      await request.json();
    const newTranslation = await updateTranslation(
      language,
      translationKey,
      value
    );
    // Return success response
    return NextResponse.json(
      {
        messages: "updated successful",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log({ error });
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
