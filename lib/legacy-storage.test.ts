import { describe, expect, it } from "vitest";
import { BALANCE_STORAGE_KEY } from "@/features/account/balance-privacy";
import { THEME_STORAGE_KEY } from "@/features/profile/theme";
import { VIEW_STORAGE_KEY } from "@/features/profile/view";
import { LEGACY_STORAGE_KEYS, legacyStorageInitScript } from "./legacy-storage";

function memoryStorage(initial: Record<string, string>, throws = false) {
  const data = new Map(Object.entries(initial));
  return {
    data,
    getItem(key: string) {
      if (throws) throw new Error("blocked");
      return data.has(key) ? data.get(key)! : null;
    },
    setItem(key: string, value: string) {
      data.set(key, value);
    },
    removeItem(key: string) {
      data.delete(key);
    },
  };
}

function run(storage: ReturnType<typeof memoryStorage>) {
  new Function("localStorage", legacyStorageInitScript)(storage);
  return Object.fromEntries(storage.data);
}

describe("LEGACY_STORAGE_KEYS", () => {
  it("maps each pre-rebrand key to its current key", () => {
    expect(LEGACY_STORAGE_KEYS).toEqual([
      ["grana-theme", THEME_STORAGE_KEY],
      ["grana-balance", BALANCE_STORAGE_KEY],
      ["grana-view", VIEW_STORAGE_KEY],
    ]);
  });
});

describe("legacyStorageInitScript", () => {
  it("moves the pre-rebrand choices to the current keys", () => {
    const result = run(
      memoryStorage({ "grana-theme": "dark", "grana-balance": "hidden", "grana-view": "mobile" }),
    );
    expect(result).toEqual({ "vuelto-theme": "dark", "vuelto-balance": "hidden", "vuelto-view": "mobile" });
  });

  it("keeps a current choice over an older one and drops the older one", () => {
    const result = run(memoryStorage({ "grana-balance": "hidden", "vuelto-balance": "shown" }));
    expect(result).toEqual({ "vuelto-balance": "shown" });
  });

  it("leaves storage unchanged when there is nothing to move", () => {
    expect(run(memoryStorage({ "vuelto-theme": "dark" }))).toEqual({ "vuelto-theme": "dark" });
  });

  it("does not throw when storage is unavailable", () => {
    expect(() => run(memoryStorage({ "grana-theme": "dark" }, true))).not.toThrow();
  });
});
