import { NavLink } from "react-router-dom";

const items = [
  { to: "/", icon: "🏠", label: "ホーム" },
  { to: "/explore", icon: "🔍", label: "さがす" },
  { to: "/post", icon: "➕", label: "投稿", primary: true },
  { to: "/badges", icon: "🎯", label: "図鑑" },
  { to: "/me", icon: "👤", label: "マイ" },
];

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-30 w-full border-t border-ink/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2 pb-[max(env(safe-area-inset-bottom),8px)]">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === "/"}
            className={({ isActive }) =>
              `flex w-1/5 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-bold transition ${
                it.primary
                  ? "text-white"
                  : isActive
                    ? "text-primary"
                    : "text-ink/50"
              }`
            }
          >
            {it.primary ? (
              <span className="-mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-card">
                {it.icon}
              </span>
            ) : (
              <span className="text-2xl">{it.icon}</span>
            )}
            <span className={it.primary ? "mt-1 text-ink/70" : ""}>{it.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
