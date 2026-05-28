"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { clsx } from "clsx";

interface Notification {
  id: string;
  type: "quote" | "contract" | "tracking" | "payment" | "review";
  title: string;
  body: string;
  link: string;
  read: boolean;
  time: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1", type: "tracking", title: "Shipment Update",
    body: "Your cargo departed Busan Port. Vessel: COSCO SHIPPING UNIVERSE",
    link: "/shipments/demo-shipment-id", read: false, time: "2 hrs ago",
  },
  {
    id: "n2", type: "quote", title: "2 New Quotes Received",
    body: "Vendors have submitted quotes for your Seoul → Sydney move.",
    link: "/quote/demo-quote-id", read: false, time: "5 hrs ago",
  },
  {
    id: "n3", type: "payment", title: "Payment Processed",
    body: "₩3,200,000 charged for Seoul → Sydney. Receipt issued.",
    link: "/shipments/demo-shipment-id", read: true, time: "2 days ago",
  },
  {
    id: "n4", type: "contract", title: "Contract Ready to Sign",
    body: "GlobalMove Korea has been selected. Your contract is ready.",
    link: "/contract/demo-contract-id", read: true, time: "3 days ago",
  },
];

const TYPE_ICON: Record<Notification["type"], string> = {
  quote: "📋", contract: "✍️", tracking: "🚢", payment: "💳", review: "⭐",
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        aria-label="Notifications"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
            {unread > 0 && (
              <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                Mark all as read
              </button>
            )}
          </div>

          {/* List */}
          <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
            {notifications.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-400">
                No notifications yet
              </div>
            )}
            {notifications.map((n) => (
              <Link
                key={n.id}
                href={n.link}
                onClick={() => { markRead(n.id); setOpen(false); }}
                className={clsx(
                  "flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors",
                  !n.read && "bg-primary-50"
                )}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{TYPE_ICON[n.type]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={clsx("text-sm leading-tight", !n.read ? "font-semibold text-gray-900" : "font-medium text-gray-700")}>
                      {n.title}
                    </p>
                    {!n.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{n.body}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 text-center">
            <Link href="/my/moves" className="text-xs text-primary hover:underline font-medium" onClick={() => setOpen(false)}>
              View all activity →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
