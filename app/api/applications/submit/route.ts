import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { appendLocalRecord } from '@/utils/localDb'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Save to local DB first
    await appendLocalRecord('applications.json', body)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const {
      fullName,
      email,
      whatsappNumber,
      linkedinProfile,
      currentLocation,
      nationality,
      gender,
      primaryCategory,
      otherCategory,
      // Founder/Startup fields
      companyName,
      companyWebsite,
      yearFounded,
      companyRegistrationCountry,
      gccEntity,
      gccCountries,
      primaryIndustry,
      otherIndustry,
      businessModel,
      currentStage,
      payingCustomers,
      teamSize,
      totalFunding,
      institutionalCapital,
      investorList,
      visionPrograms,
      otherVision,
      interestedMarkets,
      marketTimeline,
      // Investor fields
      investorType,
      otherInvestorType,
      fundName,
      fundWebsite,
      aum,
      preferredStages,
      typicalCheckSize,
      sectorFocus,
      geographicFocus,
      dealsPerYear,
      activelyDeploying,
      investorVisionPrograms,
      // Service Provider fields
      serviceFirmName,
      serviceFirmWebsite,
      yearsInBusiness,
      serviceCategories,
      otherService,
      gccPresence,
      startupExperience,
      clientsServed,
      newClientsPerQuarter,
      discountOffered,
      discountPercentage,
      equityServices,
      // Additional fields
      goals,
      urgentNeed,
      idealIntroduction,
      businessDescription,
      communityContribution,
      uniqueResources,
      discoverySource,
      otherDiscovery,
      referralCode,
      agreeMembership,
      agreeContribution,
      agreeGuidelines,
      agreeReview,
      agreeCommitment,
      agreeTerms,
    } = body

    // Determine user type
    let userType = 'other'
    if (primaryCategory === 'founder' || primaryCategory === 'startup') userType = 'founder'
    else if (primaryCategory === 'investor') userType = 'investor'
    else if (primaryCategory === 'service-provider') userType = 'service_provider'

    // Insert to appropriate table based on user type
    let result

    if (userType === 'founder') {
      result = await supabase.from('founders').insert({
        email,
        full_name: fullName,
        whatsapp_number: whatsappNumber,
        linkedin_profile: linkedinProfile,
        current_location: currentLocation,
        nationality,
        gender,
        company_name: companyName,
        company_website: companyWebsite,
        year_founded: yearFounded,
        company_registration_country: companyRegistrationCountry,
        gcc_entity: gccEntity,
        gcc_countries: gccCountries,
        primary_industry: primaryIndustry,
        other_industry: otherIndustry,
        business_model: businessModel,
        current_stage: currentStage,
        paying_customers: payingCustomers,
        team_size: teamSize,
        total_funding: totalFunding,
        institutional_capital: institutionalCapital,
        investor_list: investorList,
        vision_programs: visionPrograms,
        other_vision: otherVision,
        interested_markets: interestedMarkets,
        market_timeline: marketTimeline,
        goals,
        urgent_need: urgentNeed,
        ideal_introduction: idealIntroduction,
        business_description: businessDescription,
        community_contribution: communityContribution,
        unique_resources: uniqueResources,
        discovery_source: discoverySource,
        other_discovery: otherDiscovery,
        referral_code: referralCode,
        agree_membership: agreeMembership,
        agree_contribution: agreeContribution,
        agree_guidelines: agreeGuidelines,
        agree_review: agreeReview,
        agree_commitment: agreeCommitment,
        agree_terms: agreeTerms,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
    } else if (userType === 'investor') {
      result = await supabase.from('investors').insert({
        email,
        full_name: fullName,
        whatsapp_number: whatsappNumber,
        linkedin_profile: linkedinProfile,
        current_location: currentLocation,
        nationality,
        gender,
        investor_type: investorType,
        other_investor_type: otherInvestorType,
        fund_name: fundName,
        fund_website: fundWebsite,
        aum,
        preferred_stages: preferredStages,
        typical_check_size: typicalCheckSize,
        sector_focus: sectorFocus,
        geographic_focus: geographicFocus,
        deals_per_year: dealsPerYear,
        actively_deploying: activelyDeploying,
        investor_vision_programs: investorVisionPrograms,
        goals,
        urgent_need: urgentNeed,
        ideal_introduction: idealIntroduction,
        business_description: businessDescription,
        community_contribution: communityContribution,
        unique_resources: uniqueResources,
        discovery_source: discoverySource,
        other_discovery: otherDiscovery,
        referral_code: referralCode,
        agree_membership: agreeMembership,
        agree_contribution: agreeContribution,
        agree_guidelines: agreeGuidelines,
        agree_review: agreeReview,
        agree_commitment: agreeCommitment,
        agree_terms: agreeTerms,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
    } else if (userType === 'service_provider') {
      result = await supabase.from('service_providers').insert({
        email,
        full_name: fullName,
        whatsapp_number: whatsappNumber,
        linkedin_profile: linkedinProfile,
        current_location: currentLocation,
        nationality,
        gender,
        service_firm_name: serviceFirmName,
        service_firm_website: serviceFirmWebsite,
        years_in_business: yearsInBusiness,
        service_categories: serviceCategories,
        other_service: otherService,
        gcc_presence: gccPresence,
        startup_experience: startupExperience,
        clients_served: clientsServed,
        new_clients_per_quarter: newClientsPerQuarter,
        discount_offered: discountOffered,
        discount_percentage: discountPercentage,
        equity_services: equityServices,
        goals,
        urgent_need: urgentNeed,
        ideal_introduction: idealIntroduction,
        business_description: businessDescription,
        community_contribution: communityContribution,
        unique_resources: uniqueResources,
        discovery_source: discoverySource,
        other_discovery: otherDiscovery,
        referral_code: referralCode,
        agree_membership: agreeMembership,
        agree_contribution: agreeContribution,
        agree_guidelines: agreeGuidelines,
        agree_review: agreeReview,
        agree_commitment: agreeCommitment,
        agree_terms: agreeTerms,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
    }

    if (result?.error) {
      console.error('Supabase insertion error:', result.error)
      return NextResponse.json(
        { error: result.error.message || 'Failed to save application' },
        { status: 400 }
      )
    }

    // Send confirmation email (optional)
    // await sendConfirmationEmail(email, fullName)

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        data: result?.data,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Form submission failed' },
      { status: 500 }
    )
  }
}
