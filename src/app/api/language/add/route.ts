import {
  addLanguage,
  addTranslation,
} from "@/app/translation/utils/useTranslation";
import { NextRequest, NextResponse } from "next/server";
type RequestBody = {
  language: string;
};
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // TODO: Generate and send a JWT token for authenticated users if needed
    const { language }: RequestBody = await request.json();
    const updatedLanguage = await addLanguage(language);
    // Return success response
    return NextResponse.json(
      {
        messages: "Added successful",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        message: "Failed to add Language",
      },
      {
        status: 500,
      }
    );
  }
}
