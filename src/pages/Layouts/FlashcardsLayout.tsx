import { Outlet } from "react-router";

import MainNavigation from "@/components/navigations/MainNavigation";

const FlashcardsLayout = () => {
  return (
    <>
      <MainNavigation />
      <main className="w-full dark:bg-zinc-800">
        <Outlet />
      </main>
    </>
  );
};
export default FlashcardsLayout;
