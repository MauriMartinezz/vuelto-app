import { BALANCE_STORAGE_KEY } from "@/features/account/balance-privacy";
import { THEME_STORAGE_KEY } from "@/features/profile/theme";
import { VIEW_STORAGE_KEY } from "@/features/profile/view";

/**
 * The per-device choices were stored under `grana-*` keys before the rebrand
 * to Vuelto. Each pair is [old key, current key].
 */
export const LEGACY_STORAGE_KEYS = [
  ["grana-theme", THEME_STORAGE_KEY],
  ["grana-balance", BALANCE_STORAGE_KEY],
  ["grana-view", VIEW_STORAGE_KEY],
] as const;

/**
 * Runs in <head> before the other init scripts, so a device keeps its theme,
 * hidden balance and view after the rebrand. An old value moves to its current
 * key only when that key is empty; the old key is always removed.
 */
export const legacyStorageInitScript = `(function(){try{var p=${JSON.stringify(
  LEGACY_STORAGE_KEYS,
)};for(var i=0;i<p.length;i++){var o=localStorage.getItem(p[i][0]);if(o===null)continue;if(localStorage.getItem(p[i][1])===null)localStorage.setItem(p[i][1],o);localStorage.removeItem(p[i][0])}}catch(e){}})()`;
