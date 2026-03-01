import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { LocalStorageDataDisplay } from '@/components/LocalStorageDataDisplay'

export const revalidate = 0

export default async function ApplicationsPage() {
  const cookieStore = await cookies()
  const supabase = await createClient(cookieStore)

  const { data: applications, error } = await supabase
    .from('applications')
    .select('*')
    .order('id', { ascending: false })
    .limit(500)

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Applications</h1>
        <p className="text-red-500">Failed to load applications: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Form Submissions</h1>
      
      {/* Supabase Server-Side Data */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-orange-500">Server-Side Submissions (Supabase)</h2>
        {applications && applications.length > 0 ? (
          <div className="overflow-x-auto bg-transparent rounded-lg border border-white/10">
            <table className="min-w-full text-left">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Pitch</th>
                  <th className="px-4 py-3">Proof</th>
                  <th className="px-4 py-3">Committed</th>
                  <th className="px-4 py-3">When</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app: any, i: number) => (
                  <tr key={app.id} className="border-t border-white/5">
                    <td className="px-4 py-3 align-top">{app.id ?? i + 1}</td>
                    <td className="px-4 py-3 align-top">{app.full_name}</td>
                    <td className="px-4 py-3 align-top">{app.company_name}</td>
                    <td className="px-4 py-3 align-top">{app.email}</td>
                    <td className="px-4 py-3 align-top">{app.phone}</td>
                    <td className="px-4 py-3 align-top max-w-xl break-words">{app.one_pitch_sentence}</td>
                    <td className="px-4 py-3 align-top">
                      {app.proof_of_work ? (
                        <a href={app.proof_of_work} target="_blank" rel="noreferrer" className="text-orange-400 underline">Link</a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top">{app.agree_commitment ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3 align-top">{new Date(app.created_at || app.submitted_at || Date.now()).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white/60">No Supabase submissions yet.</p>
        )}
      </div>

      {/* Client-Side LocalStorage Data */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-orange-500">Local Storage Submissions (Browser)</h2>
        <LocalStorageDataDisplay />
      </div>
    </div>
  )
}
