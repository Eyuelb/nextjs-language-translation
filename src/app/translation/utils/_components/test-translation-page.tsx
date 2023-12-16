"use client"
import { useTranslation } from "../provider";

export default function TestTranslationPage() {
  const { t } = useTranslation();

  return (
    <main className="">
      <h1>{t("Translation")}</h1>
      <p>{t("greeting")}</p>
      <p>{t("good_morning")}</p>
      <p>{t("thank_you")}</p>
      <p>{t("goodbye")}</p>
      <p>{t("yes")}</p>
      <p>{t("no")}</p>
      <p>{t("please")}</p>
      <p>{t("sorry")}</p>
      <p>{t("excuse_me")}</p>
      <p>{t("how_are_you")}</p>
      <p>{t("welcome")}</p>
      <p>{t("nice_to_meet_you")}</p>
      <p>{t("congratulations")}</p>
      <p>{t("I_love_you")}</p>
      <p>{t("help")}</p>
      <p>{t("where_is")}</p>
      <p>{t("what_is_this")}</p>
      <p>{t("good_night")}</p>
      <p>{t("see_you_soon")}</p>
    </main>
  );
}
