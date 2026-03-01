import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export const revalidate = 0

export default async function NewsletterPage() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)

  const { data: signups, error } = await supabase
    .from('newsletter_signups')
    .select('*')
    .order('subscribed_at', { ascending: false })
    .limit(500)

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Newsletter Signups</h1>
        <p className="text-red-500">Failed to load signups: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Newsletter Signups</h1>
      <div className="text-sm text-white/60 mb-4">Total: {signups?.length || 0}</div>
      <div className="overflow-x-auto bg-transparent rounded-lg border border-white/10">
        <table className="min-w-full text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed</th>
              <th className="px-4 py-3">Beehiv Synced</th>
            </tr>
          </thead>
          <tbody>
            {signups && signups.map((signup: any, i: number) => (
              <tr key={signup.id} className="border-t border-white/5">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{signup.email}</td>
                <td className="px-4 py-3">{new Date(signup.subscribed_at).toLocaleString()}</td>
                <td className="px-4 py-3">{signup.beehiv_synced ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
