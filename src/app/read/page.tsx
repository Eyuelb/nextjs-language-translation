"use client";

import { useTranslation } from "../translation/utils/provider";

export default function Page() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("greeting")}</h1>
      <p>{t("goodbye")}</p>
      {/* <button onClick={() => setLanguage("en")}>Set Language</button> */}
    </div>
  );
}
