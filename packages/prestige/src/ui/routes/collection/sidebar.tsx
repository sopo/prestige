import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  SidebarGroupType,
  SidebarLinkType,
  SidebarType,
} from "../../../vite/core/content/content.types";

export interface SidebarProps {
  sidebar: SidebarType;
  onLinkClick?: (() => void) | undefined;
}

function SidebarGroup({
  group,
  onLinkClick,
}: {
  group: SidebarGroupType;
  onLinkClick?: (() => void) | undefined;
}) {
  const [open, setIsOpen] = useState(true);
  return (
    <div className="mt-4 bg-amber-300">
      <button
        className="flex items-center justify-between w-full cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-medium mb-1">{group.label}</span>
        <ChevronDown
          size={20}
          className={clsx("transform transition", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="pl-2  mb-2">
          {group.items.map((item) => {
            if (typeof item === "string" || "slug" in item) {
              const key = typeof item === "string" ? item : item.slug;
              return (
                <SidebarLink key={key} link={item} onLinkClick={onLinkClick} />
              );
            }
            return <SidebarGroup key={item.label} group={item} />;
          })}
        </div>
      )}
    </div>
  );
}

function SidebarLink({
  link,
  onLinkClick,
}: {
  link: SidebarLinkType;
  onLinkClick?: (() => void) | undefined;
}) {
  const slug = `/${link.slug}`;
  return (
    <div>
      <Link
        onClick={onLinkClick}
        activeProps={{ className: "text-zinc-800 font-medium" }}
        className="w-full inline-flex rounded py-1 px-2 gap-2 hover:bg-zinc-100 "
        to={slug}
      >
        <BookOpen className="w-4"/>
        {link.label}
      </Link>
    </div>
  );
}

export default function Sidebar({ sidebar, onLinkClick }: SidebarProps) {
  return (
    <div className=" w-full lg:w-sidebar border-r border-gray-300 p-4 h-full overflow-auto lg:h-main lg:sticky top-header text-[15px]">
      {sidebar.items.map((item) => {
        if (typeof item === "string" || "slug" in item) {
          const key = typeof item === "string" ? item : item.slug;
          return (
            <SidebarLink onLinkClick={onLinkClick} key={key} link={item} />
          );
        }
        return <SidebarGroup key={item.label} group={item} />;
      })}
    </div>
  );
}
