'use client'

import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PaymentFailedPageProps {
  searchParams: { error?: string; subscriptionId?: string };
}

export default function PaymentFailedPage({
  searchParams
}: PaymentFailedPageProps) {
  const { error, subscriptionId } = searchParams;

  const getErrorMessage = (errorCode?: string) => {
    const errorMessages: Record<string, { title: string; description: string }> = {
      'card_declined': {
        title: 'Card Declined',
        description: 'Your card was declined by your bank. Please try another payment method or contact your bank.'
      },
      'insufficient_funds': {
        title: 'Insufficient Funds',
        description: 'Your card does not have sufficient funds. Please add funds and try again.'
      },
      'expired_card': {
        title: 'Expired Card',
        description: 'Your card has expired. Please use a different card.'
      },
      'incorrect_cvc': {
        title: 'Incorrect CVC',
        description: 'The security code (CVC) you entered is incorrect. Please try again.'
      },
      'processing_error': {
        title: 'Processing Error',
        description: 'We encountered a temporary error. Please try again in a few moments.'
      },
      'network_error': {
        title: 'Network Error',
        description: 'We are having trouble connecting to the payment service. Please check your connection and try again.'
      }
    };

    return errorMessages[errorCode || 'processing_error'] || {
      title: 'Payment Failed',
      description: error || 'Unfortunately, your payment could not be processed.'
    };
  };

  const errorInfo = getErrorMessage(error);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Error Card */}
        <Card className="bg-gradient-to-b from-red-500/10 to-transparent border-2 border-red-500/50 p-12 text-center mb-8">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />

          <h1 className="text-4xl font-bold text-white mb-2">
            {errorInfo.title}
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            {errorInfo.description}
          </p>

          {/* Subscription ID */}
          {subscriptionId && (
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-8">
              <p className="text-gray-400 text-sm mb-2">Subscription ID</p>
              <p className="text-gray-300 font-mono">{subscriptionId}</p>
            </div>
          )}

          {/* Troubleshooting */}
          <div className="text-left mb-8">
            <h3 className="text-white font-semibold mb-4">Troubleshooting Steps</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">1.</span>
                <span>Check your card details are correct (number, expiry, CVC)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">2.</span>
                <span>Ensure your card has sufficient funds available</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">3.</span>
                <span>Try using a different card or payment method</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">4.</span>
                <span>Contact your bank to ensure the transaction is not blocked</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">5.</span>
                <span>If using international card, ensure international payments are enabled</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/pricing" className="block">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </Link>

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

        {/* Alternative Payment Methods */}
        <Card className="mt-8 bg-gray-900/50 border border-gray-700 p-6">
          <h3 className="text-white font-semibold mb-4">Alternative Payment Methods</h3>
          <p className="text-gray-400 mb-4">
            If you continue experiencing issues with one payment method, try another
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-white font-semibold mb-2">Bank Transfer</p>
              <p className="text-gray-400 text-sm">Direct AED/USD transfer</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-white font-semibold mb-2">Digital Wallet</p>
              <p className="text-gray-400 text-sm">Apple Pay / Google Pay</p>
            </div>
          </div>
        </Card>

        {/* Support */}
        <Card className="mt-8 bg-gray-900/50 border border-gray-700 p-6 text-center">
          <h3 className="text-white font-semibold mb-2">Still Need Help?</h3>
          <p className="text-gray-400 mb-4">
            Our support team is available to assist with payment issues
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <a
              href="mailto:support@myfounders.club"
              className="text-orange-400 hover:text-orange-300 font-semibold"
            >
              support@myfounders.club
            </a>
            <span className="text-gray-500">or</span>
            <a
              href="https://wa.me/971XXXXXXXXX"
              className="text-orange-400 hover:text-orange-300 font-semibold"
            >
              WhatsApp Us
            </a>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mt-8 bg-gray-900/50 border border-gray-700 p-6">
          <h3 className="text-white font-semibold mb-4">Common Payment Issues</h3>
          <div className="space-y-4 text-gray-400 text-sm">
            <div>
              <p className="text-white font-semibold mb-2">Why is my card being declined?</p>
              <p>Common reasons include: insufficient funds, international transactions disabled, or fraud detection. Contact your bank to verify.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Is it safe to enter my card details?</p>
              <p>Yes, all payments are processed securely via Stripe or Telr using industry-standard encryption.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">Will I be charged if payment fails?</p>
              <p>No, your card will not be charged if the payment fails. You can safely retry.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">What if the same error keeps happening?</p>
              <p>Try a different payment method (another card or bank transfer) or contact support for assistance.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
