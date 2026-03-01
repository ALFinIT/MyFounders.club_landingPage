import React from "react"

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Locale is automatically handled by the root layout and middleware
  // This layout just wraps locale-specific content
  return children
}
