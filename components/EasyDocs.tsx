// components/EasyDocs.tsx
"use client";

import { useState } from "react";
import BrowseTab from "./BrowseTab";
import ChatTab from "./ChatTab";
import SearchTab from "./SearchTab";

export default function EasyDocs({ initialTechnology = "" }) {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden m-4"
        >
          Open menu
        </label>
        <div className="p-4 w-full max-w-4xl">
          {activeTab === "search" && (
            <SearchTab initialQuery={initialTechnology} />
          )}
          {activeTab === "browse" && <BrowseTab />}
          {activeTab === "chat" && <ChatTab />}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <a
              onClick={() => setActiveTab("search")}
              className={`${
                activeTab === "search" ? "bg-primary text-white" : ""
              } mb-2`}
            >
              Search
            </a>
          </li>
          <li>
            <a
              onClick={() => setActiveTab("browse")}
              className={`${
                activeTab === "browse" ? "bg-primary text-white" : ""
              } mb-2`}
            >
              Browse Topics
            </a>
          </li>
          <li>
            <a
              onClick={() => setActiveTab("chat")}
              className={`${
                activeTab === "chat" ? "bg-primary text-white" : ""
              } mb-2`}
            >
              AI Chat
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
