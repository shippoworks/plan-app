import { Route, Routes, useLocation } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { Run } from "./pages/Run";
import { Done } from "./pages/Done";
import { Post } from "./pages/Post";
import { MyPage } from "./pages/MyPage";
import { Explore } from "./pages/Explore";
import { Badges } from "./pages/Badges";

export default function App() {
  const { pathname } = useLocation();
  const hideNav =
    pathname.startsWith("/quest/") || pathname === "/post";

  return (
    <div className="app-shell">
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/quest/:id" element={<Detail />} />
          <Route path="/quest/:id/run" element={<Run />} />
          <Route path="/quest/:id/done" element={<Done />} />
          <Route path="/post" element={<Post />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/me" element={<MyPage />} />
        </Routes>
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
