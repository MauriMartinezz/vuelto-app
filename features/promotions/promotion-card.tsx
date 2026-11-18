import Link from "next/link";
import type { Promotion } from "@/generated/prisma/client";
import { CATEGORY_LABELS } from "./catalog";
import { cardText, daysText, discountText, minimumText, validityText } from "./filters";

/**
 * One promotion in a list: merchant, bank, discount with its cap and minimum,
 * days and cards. `linked={false}` renders it without the link to its detail
 * page (the admin list: the admin has no customer pages to open).
 */
export function PromotionCard({ promotion, linked = true }: { promotion: Promotion; linked?: boolean }) {
  const body = (
    <>
      <span className="flex items-start justify-between gap-3">
        <span className="min-w-0">
          <span className="block truncate font-medium">{promotion.merchant}</span>
          <span className="block text-xs text-muted">
            {promotion.bank ? `${promotion.bank} · ` : ""}
            {CATEGORY_LABELS[promotion.category]}
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-garnet-soft px-3 py-1 text-sm font-semibold text-garnet">
          {promotion.percent}%
        </span>
      </span>
      <span className="mt-2 block text-sm font-medium">
        {discountText(promotion.percent, promotion.capCents)}
        {promotion.minPurchaseCents !== null ? (
          <span className="font-normal text-muted"> · {minimumText(promotion.minPurchaseCents)}</span>
        ) : null}
      </span>
      <span className="mt-1 block text-xs text-muted">
        {daysText(promotion.weekdays)} · {cardText(promotion.cardBrand)} ·{" "}
        {validityText(promotion.validUntil)}
      </span>
    </>
  );
  if (!linked) return <div className="block rounded-2xl bg-surface p-4">{body}</div>;
  return (
    <Link
      href={`/promociones/${promotion.id}`}
      className="block rounded-2xl bg-surface p-4 transition-colors hover:bg-surface/70 active:bg-surface/60"
    >
      {body}
    </Link>
  );
}
