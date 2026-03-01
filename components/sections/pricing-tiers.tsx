import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PricingTier {
  id: string;
  tierName: string;
  displayName: string;
  description: string;
  monthlyAED: number;
  monthlyUSD: number;
  annualAED: number;
  annualUSD: number;
  features: string[];
  highlighted?: boolean;
}

interface PricingTiersProps {
  onSelectTier: (tier: PricingTier, billingCycle: 'monthly' | 'annual') => void;
  loading?: boolean;
}

// Default pricing tiers (should match Supabase data)
const DEFAULT_TIERS: PricingTier[] = [
  {
    id: 'founder-pass',
    tierName: 'founder-pass',
    displayName: 'Founder Pass',
    description: 'Perfect for individual founders starting their journey',
    monthlyAED: 2500,
    monthlyUSD: 680,
    annualAED: 25000,
    annualUSD: 6800,
    features: [
      'Access to founder network and events',
      'Monthly mentorship sessions',
      'Business profile on platform',
      'Pitch deck feedback',
      'Investor introductions (2/month)',
      'Email support'
    ]
  },
  {
    id: 'scale-plan',
    tierName: 'scale-plan',
    displayName: 'Scale Plan',
    description: 'For founders actively seeking investment',
    monthlyAED: 5000,
    monthlyUSD: 1360,
    annualAED: 50000,
    annualUSD: 13600,
    features: [
      'Everything in Founder Pass',
      'Weekly mentorship sessions',
      'Priority investor introductions (5/month)',
      'Funding strategy consultation',
      'Legal template library',
      'Marketing toolkit',
      'Priority support',
      'Monthly group coaching'
    ],
    highlighted: true
  },
  {
    id: 'enterprise',
    tierName: 'enterprise',
    displayName: 'Enterprise',
    description: 'Full concierge service for serious founders',
    monthlyAED: 15000,
    monthlyUSD: 4080,
    annualAED: 150000,
    annualUSD: 40800,
    features: [
      'Everything in Scale Plan',
      'Dedicated account manager',
      'Custom funding roadmap',
      'Direct access to investor network',
      'Due diligence support',
      'Board advisory services',
      'White-glove onboarding',
      'Unlimited 1-on-1 consultations',
      'Custom integrations'
    ]
  }
];

export function PricingTiers({ onSelectTier, loading = false }: PricingTiersProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier.id);
    onSelectTier(tier, billingCycle);
  };

  const getPrice = (tier: PricingTier) => {
    if (billingCycle === 'monthly') {
      return {
        aed: tier.monthlyAED,
        usd: tier.monthlyUSD
      };
    } else {
      return {
        aed: tier.annualAED,
        usd: tier.annualUSD
      };
    }
  };

  const getSavings = (tier: PricingTier) => {
    if (billingCycle === 'annual') {
      const monthlyCost = tier.monthlyAED * 12;
      const annualCost = tier.annualAED;
      const savings = monthlyCost - annualCost;
      const percentage = Math.round((savings / monthlyCost) * 100);
      return { savings, percentage };
    }
    return { savings: 0, percentage: 0 };
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Choose the plan that best fits your founder journey
        </p>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              billingCycle === 'annual'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Annual
            {billingCycle === 'annual' && (
              <span className="ml-2 text-xs bg-green-500 px-2 py-1 rounded text-white">
                Save 17%
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {DEFAULT_TIERS.map((tier) => {
          const price = getPrice(tier);
          const savings = getSavings(tier);

          return (
            <Card
              key={tier.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                tier.highlighted
                  ? 'border-2 border-orange-500 bg-gradient-to-b from-orange-500/10 to-transparent md:scale-105'
                  : 'border border-gray-700 bg-gray-900/50'
              } ${selectedTier === tier.id ? 'ring-2 ring-orange-400' : ''}`}
            >
              {/* Badge */}
              {tier.highlighted && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  Most Popular
                </div>
              )}

              {/* Tier Info */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {tier.displayName}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {tier.description}
                </p>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-white">
                      AED {price.aed.toLocaleString()}
                    </span>
                    <span className="text-gray-400">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    ${price.usd.toLocaleString()} USD equivalent
                  </div>

                  {/* Savings Badge */}
                  {savings.percentage > 0 && (
                    <div className="mt-2 text-green-400 text-sm font-semibold">
                      Save AED {savings.savings.toLocaleString()} ({savings.percentage}% off)
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleSelectTier(tier)}
                  disabled={loading || selectedTier === tier.id}
                  className={`w-full mb-8 font-bold py-2 rounded-lg transition-all ${
                    tier.highlighted
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  } ${selectedTier === tier.id ? 'opacity-75 cursor-wait' : ''}`}
                >
                  {selectedTier === tier.id ? 'Processing...' : 'Get Started'}
                </Button>

                {/* Features */}
                <div className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-4">
          Questions? We're here to help
        </h3>
        <p className="text-gray-400 mb-6">
          Our team is available to discuss your specific needs and help you choose the right plan
        </p>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          Schedule a Demo
        </Button>
      </div>

      {/* Terms */}
      <div className="text-center text-gray-500 text-xs mt-8">
        <p>
          By subscribing, you agree to our terms of service. You can cancel your subscription anytime.
        </p>
      </div>
    </div>
  );
}
