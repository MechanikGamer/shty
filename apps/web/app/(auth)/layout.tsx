import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-0 md:mt-10 lg:mt-16  flex justify-center items-center flex-1">
      {children}
    </div>
  );
}
