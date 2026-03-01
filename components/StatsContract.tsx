import React from 'react'

export default function StatsContract() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-orange-400">500+</p>
            <p className="text-xs text-white/75">Founders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-orange-400">50+</p>
            <p className="text-xs text-white/75">Investors</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-orange-400">$100M+</p>
            <p className="text-xs text-white/75">Funding</p>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-right">
          <p className="text-sm text-gray-300">Join 500+ Founders in the Gulf Ecosystem</p>
        </div>
      </div>
    </div>
  )
}
