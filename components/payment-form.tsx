'use client';

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AlertCircle, CheckCircle2, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaymentFormProps {
  tier: {
    tierName: string;
    displayName: string;
    monthlyAED: number;
    monthlyUSD: number;
    annualAED: number;
    annualUSD: number;
  };
  billingCycle: 'monthly' | 'annual';
  onSuccess?: (subscriptionId: string) => void;
  onError?: (error: string) => void;
}

export function PaymentForm({
  tier,
  billingCycle,
  onSuccess,
  onError
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    agreeTerms: false
  });

  const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'telr'>('stripe');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  const price = billingCycle === 'monthly'
    ? { aed: tier.monthlyAED, usd: tier.monthlyUSD }
    : { aed: tier.annualAED, usd: tier.annualUSD };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.fullName) {
      setError('Full name is required');
      return false;
    }
    if (!formData.agreeTerms) {
      setError('You must accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create payment intent
      const intentResponse = await fetch('/api/payments/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: tier.tierName,
          billingCycle,
          email: formData.email,
          fullName: formData.fullName
        })
      });

      if (!intentResponse.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret, subscriptionId: subId } = await intentResponse.json();
      setSubscriptionId(subId);

      // Step 2: Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: formData.fullName,
            email: formData.email
          }
        }
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      if (paymentResult.paymentIntent?.status === 'succeeded') {
        // Step 3: Confirm with backend
        const confirmResponse = await fetch('/api/payments/stripe/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId: paymentResult.paymentIntent.id,
            subscriptionId: subId
          })
        });

        if (!confirmResponse.ok) {
          throw new Error('Failed to confirm payment');
        }

        setSuccess(true);
        onSuccess?.(subId);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTelrPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create Telr transaction
      const telrResponse = await fetch('/api/payments/telr/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: tier.tierName,
          billingCycle,
          email: formData.email,
          fullName: formData.fullName
        })
      });

      if (!telrResponse.ok) {
        throw new Error('Failed to create Telr transaction');
      }

      const { telrPaymentUrl, paymentData, subscriptionId: subId } = await telrResponse.json();
      setSubscriptionId(subId);

      // Redirect to Telr payment page
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = telrPaymentUrl;

      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      onError?.(errorMessage);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="p-8 bg-green-500/10 border border-green-500/50">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Payment Successful</h3>
          <p className="text-gray-300 mb-6">
            Your subscription to {tier.displayName} has been activated.
            Check your email for confirmation and next steps.
          </p>
          {subscriptionId && (
            <p className="text-gray-400 text-sm mb-6">
              Subscription ID: {subscriptionId}
            </p>
          )}
          <Button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Go to Dashboard
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gray-900/50 border border-gray-700">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          Subscribe to {tier.displayName}
        </h3>
        <p className="text-gray-400">
          {billingCycle === 'monthly' ? 'Monthly' : 'Annual'} billing
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="mb-6 bg-red-500/10 border-red-500/50">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-500">{error}</AlertDescription>
        </Alert>
      )}

      {/* Payment Amount */}
      <div className="bg-gradient-to-r from-orange-500/20 to-orange-400/20 border border-orange-500/30 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Subscription Amount</span>
          <span className="text-3xl font-bold text-orange-400">
            AED {price.aed.toLocaleString()}
          </span>
        </div>
        <div className="text-gray-400 text-sm">
          ${price.usd.toLocaleString()} USD equivalent
        </div>
      </div>

      {/* Gateway Selection */}
      <div className="mb-8">
        <label className="block text-white font-semibold mb-4">Payment Method</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedGateway('stripe')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedGateway === 'stripe'
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
            }`}
            disabled={loading}
          >
            <div className="font-semibold text-white mb-1">Stripe</div>
            <div className="text-xs text-gray-400">Credit/Debit Card</div>
          </button>
          <button
            onClick={() => setSelectedGateway('telr')}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedGateway === 'telr'
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
            }`}
            disabled={loading}
          >
            <div className="font-semibold text-white mb-1">Telr</div>
            <div className="text-xs text-gray-400">UAE Payment</div>
          </button>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={selectedGateway === 'stripe' ? handleStripePayment : handleTelrPayment}
        className="space-y-4"
      >
        {/* Email */}
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
            required
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 disabled:opacity-50"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 disabled:opacity-50"
          />
        </div>

        {/* Card Element (Stripe only) */}
        {selectedGateway === 'stripe' && (
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Card Details
            </label>
            <div className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#fff',
                      '::placeholder': {
                        color: '#aab7c4'
                      }
                    },
                    invalid: {
                      color: '#fa755a'
                    }
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="agreeTerms"
            id="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            disabled={loading}
            className="mt-1 w-4 h-4 accent-orange-500 rounded cursor-pointer disabled:opacity-50"
          />
          <label
            htmlFor="agreeTerms"
            className="text-gray-300 text-sm cursor-pointer"
          >
            I agree to the{' '}
            <a href="/terms" className="text-orange-400 hover:text-orange-300 no-underline">
              Terms and Conditions
            </a>
            {' '}and{' '}
            <a href="/privacy/privacy-policy" className="text-orange-400 hover:text-orange-300 no-underline">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !stripe || !formData.agreeTerms}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader className="w-4 h-4 animate-spin" />}
          {loading
            ? 'Processing...'
            : `Pay AED ${price.aed.toLocaleString()}`}
        </Button>
      </form>

      {/* Security Info */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        <p>Your payment information is secure and encrypted</p>
        {selectedGateway === 'stripe' && <p>Secure by Stripe</p>}
        {selectedGateway === 'telr' && <p>Secure by Telr</p>}
      </div>
    </Card>
  );
}
