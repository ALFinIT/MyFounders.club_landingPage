'use client'

import { CheckCircle2, Download, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PaymentSuccessPageProps {
  searchParams: { subscriptionId?: string; amount?: string; tier?: string };
}

export default function PaymentSuccessPage({
  searchParams
}: PaymentSuccessPageProps) {
  const { subscriptionId, amount, tier } = searchParams;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <Card className="bg-gradient-to-b from-green-500/10 to-transparent border-2 border-green-500/50 p-12 text-center mb-8">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />

          <h1 className="text-4xl font-bold text-white mb-4">
            Payment Successful
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            Thank you for subscribing to MyFoundersClub!
            Your subscription is now active.
          </p>

          {/* Subscription Details */}
          {(subscriptionId || amount || tier) && (
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-white font-semibold mb-4">Subscription Details</h3>
              <div className="space-y-3">
                {tier && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan</span>
                    <span className="text-white font-semibold">{tier}</span>
                  </div>
                )}
                {amount && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span className="text-orange-400 font-semibold">{amount}</span>
                  </div>
                )}
                {subscriptionId && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subscription ID</span>
                    <span className="text-gray-300 font-mono text-sm">{subscriptionId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="text-left mb-8">
            <h3 className="text-white font-semibold mb-4">What's Next</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">1.</span>
                <span>Check your email for a confirmation message with your login credentials</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">2.</span>
                <span>Access your founder dashboard to complete your profile</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">3.</span>
                <span>Join the private founder community and start networking</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">4.</span>
                <span>Schedule your first mentorship session</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/dashboard" className="block">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3">
              Go to Dashboard
            </Button>
          </Link>

          <button
            onClick={() => window.print()}
            className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-inline transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Print Receipt
          </button>

          <Link href="/" className="block">
            <Button
              variant="outline"
              className="w-full border-gray-700 hover:bg-gray-900 text-white font-bold py-3"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Support */}
        <Card className="mt-8 bg-gray-900/50 border border-gray-700 p-6 text-center">
          <h3 className="text-white font-semibold mb-2">Need Help?</h3>
          <p className="text-gray-400 mb-4">
            Our support team is available to assist you
          </p>
          <a
            href="mailto:support@myfounders.club"
            className="text-orange-400 hover:text-orange-300 font-semibold"
          >
            support@myfounders.club
          </a>
        </Card>

        {/* FAQ */}
        <Card className="mt-8 bg-gray-900/50 border border-gray-700 p-6">
          <h3 className="text-white font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-gray-400 text-sm">
            <div>
              <p className="text-white font-semibold mb-2">Can I upgrade or change my plan?</p>
              <p>Yes, you can upgrade your plan anytime from your dashboard. The difference will be prorated.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">What's the refund policy?</p>
              <p>We offer a 7-day money-back guarantee if you're not satisfied with our service.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">How do I cancel my subscription?</p>
              <p>You can cancel anytime from your dashboard settings. No questions asked.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
