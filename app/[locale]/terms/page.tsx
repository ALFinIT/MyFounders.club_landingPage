'use client'

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'
import Link from 'next/link'
import SocialHomeButtons from '@/components/social-home-buttons'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function TermsPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <main className="min-h-screen relative bg-black overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/MFC theme.png')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      {/* Top Banner with Theme Image */}
      <motion.div
        className="relative z-20 w-full py-12 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-8"
        style={{ backgroundImage: "url('/MFC theme.png')" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Dim overlay for readability */}
        <div className="absolute inset-0 bg-black/50 rounded-3xl" aria-hidden />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          {/* Circular Rotating Logo */}
          <motion.div
            className="mb-6 w-28 h-28 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gradient-to-r from-orange-600 to-orange-500 p-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <HighQualityImage
                src="/App Icon Orange.svg"
                alt="MyFoundersClub"
                width={120}
                height={120}
                className="w-24 h-24 object-contain scale-150"
                quality={100}
              />
            </div>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">MyFoundersClub</h1>
          <p className="text-sm text-white/90 mt-2">A Brand of KH Group 7 FZE</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="glass rounded-xl p-8 sm:p-12 border border-orange-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Document Header */}
          <div className="text-center mb-10 pb-8 border-b border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Terms and Conditions</h2>
            <p className="text-sm text-orange-400 font-semibold">Data Processing Agreement and GDPR / UAE PDPL Privacy Notice</p>
            <p className="text-xs text-muted-foreground mt-3">Effective Date: 14 February 2026 | Version 1.0</p>
            <p className="text-xs text-muted-foreground mt-1">Data opt-out: <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a></p>
          </div>

          {/* Scrollable Content */}
          <article className="space-y-8 text-sm sm:text-base leading-relaxed text-white/85">
            
            {/* Section 1 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">1. Company Information and Registered Details</h3>
              <p className="mb-3">These Terms and Conditions govern your use of MyFoundersClub, a brand operated by:</p>
              <div className="space-y-2 text-sm bg-white/5 p-4 rounded-lg border border-white/10">
                <p><span className="font-semibold">Legal Entity:</span> KH Group 7 FZE</p>
                <p><span className="font-semibold">Trading Brand:</span> MyFoundersClub (myfounders.club)</p>
                <p><span className="font-semibold">Registered Address:</span> Business Centre, Sharjah Publishing City Free Zone, Sharjah, United Arab Emirates</p>
                <p><span className="font-semibold">Licence Number:</span> 4426124</p>
                <p><span className="font-semibold">Licensed Activities:</span> Publishing; Consultancy; Event Organising; Own Account Investment Activities (including Venture Capital and Investment Club activities); Management Consultancy Activities</p>
                <p><span className="font-semibold">Regulatory Authority:</span> Sharjah Publishing City Free Zone Authority (SPCFZA)</p>
                <p><span className="font-semibold">Data Contact and Opt-Out Email:</span> <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a></p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">2. Acceptance of Terms</h3>
              <p className="mb-3">By accessing MyFoundersClub's (MFC) website, platforms, events, programmes, or any services provided by KH Group 7 FZE (collectively, the "Services"), and/or by completing a membership application, event registration, or investment syndicate participation form, you ("Member", "User", or "You") agree to be legally bound by these Terms and Conditions ("Agreement").</p>
              <p className="mb-3">If you are accessing the Services on behalf of a corporate entity, you represent and warrant that you have full authority to bind that entity to this Agreement.</p>
              <p className="font-semibold text-orange-300 mb-2">By accepting these Terms, you expressly consent to:</p>
              <ul className="space-y-2 ml-4 text-sm">
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> The collection, processing, and use of your personal data as described in Sections 9 and 10 of this Agreement</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> The creation of anonymised, aggregated trends reports, white papers, and statistical analyses derived from your data</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Being contacted by MyFoundersClub's vetted Partners for relevant commercial, investment, and partnership opportunities</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Receipt of marketing communications from MyFoundersClub and its affiliates</li>
              </ul>
              <p className="mt-3 text-sm">If you do not agree to these Terms, you must not access or use the Services.</p>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">3. Definitions</h3>
              <p className="text-sm mb-3">In this Agreement, the following terms have the meanings set out below:</p>
              <div className="space-y-2 text-sm bg-white/5 p-4 rounded-lg border border-white/10">
                <p><span className="font-semibold text-orange-300">Company / MFC:</span> KH Group 7 FZE trading as MyFoundersClub (MFC)</p>
                <p><span className="font-semibold text-orange-300">Member:</span> Any individual or entity registered for, or participating in, any tier of the MyFoundersClub membership programme</p>
                <p><span className="font-semibold text-orange-300">Services:</span> All products, programmes, events, digital platforms, publications, investment syndicate access, masterclasses, and advisory services offered by MFC</p>
                <p><span className="font-semibold text-orange-300">Personal Data:</span> Any information relating to an identified or identifiable natural person, as defined under UAE PDPL and the GDPR where applicable</p>
                <p><span className="font-semibold text-orange-300">Data Controller:</span> KH Group 7 FZE, which determines the purposes and means of processing Personal Data</p>
                <p><span className="font-semibold text-orange-300">Processing:</span> Any operation performed on Personal Data, including collection, storage, use, disclosure, sharing, or erasure</p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">4. Membership, Eligibility and Services</h3>
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold">4.1 Membership Tiers:</span> MyFoundersClub offers a tiered membership structure (Builder, Accelerator, Catalyst, Legacy) as detailed in the current Membership Prospectus available at www.myfounders.club. Each tier carries specific eligibility criteria, annual fees, benefits, and obligations.</p>
                <p><span className="font-semibold">4.2 Application and Approval:</span> Membership is subject to application and approval by MFC in its sole discretion. Submission of an application does not constitute acceptance. MFC reserves the right to refuse or revoke membership at any time if a Member is found to have misrepresented information, breached these Terms, or acted contrary to the community's values.</p>
                <p><span className="font-semibold">4.3 Membership Fees:</span> Annual membership fees are payable in advance and are non-refundable except where required by applicable UAE law. MFC reserves the right to revise fees upon 30 days' written notice. Continued use of the Services after such notice constitutes acceptance of revised fees.</p>
                <p><span className="font-semibold">4.4 Syndicate and Investment Participation:</span> Participation in the 51% Capital, Scaler Capital Middle East or FemNation.io investment syndicate is subject to separate Syndicate Participation Agreements and applicable UAE Securities and Commodities Authority (SCA) regulations. Nothing in these Terms constitutes investment advice or a solicitation to invest.</p>
                <p><span className="font-semibold">4.5 Grant Programme:</span> The Grant Programme is competitive and merit-based. Award of a grant creates a binding obligation to return 2% equity to the MFC evergreen fund upon an exit event (acquisition, IPO, or equivalent liquidity event), subject to a separate Grant Agreement executed at the time of award.</p>
                <p><span className="font-semibold">4.6 Events and Experiences:</span> Attendance at MFC events (Demo Days, Majlis, The Gathering, Study Tours) is subject to event-specific terms. MFC reserves the right to record, photograph, and publish event content. By attending, you consent to your likeness being used in promotional materials unless you notify MFC in writing prior to the event.</p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">5. Member Obligations and Code of Conduct</h3>
              <p className="mb-3 text-sm">As a Member, you agree to:</p>
              <ul className="space-y-2 ml-4 text-sm">
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Provide accurate, current, and complete information at all times and promptly update any information that becomes inaccurate</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Maintain the confidentiality of your login credentials and notify MFC immediately of any unauthorised access</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Engage respectfully and professionally with fellow Members, MFC staff, investors, and Partners</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Not use the Services to solicit, spam, or engage in unauthorised commercial activities within MFC channels</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Not reproduce, distribute, or exploit MFC content, databases, or intellectual property without prior written consent</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Comply with all applicable UAE laws, including commercial, anti-money laundering, and financial regulations</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Disclose any material conflicts of interest that may affect investment or partnership activities within the community</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Honour all commitments made under Syndicate Participation Agreements and Grant Agreements</li>
              </ul>
              <p className="mt-3 text-xs text-red-400">Breach of this code may result in immediate suspension or termination of membership without refund.</p>
            </section>

            {/* Section 6 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">6. Intellectual Property</h3>
              <div className="space-y-3 text-sm">
                <p>All content, branding, methodologies (including the STAC Framework), curricula, databases, reports, white papers, and platform code created by or for MFC are the exclusive property of KH Group 7 FZE. No licence to use such intellectual property is granted except as expressly set out herein.</p>
                <p>Members retain ownership of their own business plans, pitch decks, and proprietary information shared within MFC programmes. By sharing such material, Members grant MFC a limited, royalty-free licence to use, reproduce, and reference such material for internal programme delivery, anonymised case studies, and promotional purposes.</p>
                <p>MFC shall not disclose a Member's confidential business information to third parties without consent, except where required by law or in aggregated, anonymised form.</p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">7. Confidentiality</h3>
              <p className="text-sm mb-3">Both parties agree to keep confidential all non-public information received from the other in connection with the Services. Neither party shall disclose such information to any third party without prior written consent, except: (a) to employees or advisers on a strict need-to-know basis under equivalent confidentiality obligations; (b) as required by applicable law or a regulatory body; or (c) where the information enters the public domain through no fault of the receiving party.</p>
              <p className="text-sm">This confidentiality obligation survives termination of membership for a period of three (3) years.</p>
            </section>

            {/* Section 8 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">8. Limitation of Liability and Disclaimers</h3>
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold">8.1 No Investment Advice:</span> Nothing provided by MFC, including masterclasses, mentoring sessions, investor introductions, or community discussions, constitutes regulated financial, investment, legal, or tax advice. Members should seek independent professional advice before making any investment decision.</p>
                <p><span className="font-semibold">8.2 No Guarantee of Outcomes:</span> MFC makes no representation or warranty that membership will result in fundraising success, business growth, grant award, or any other specific outcome. All forward-looking metrics in MFC materials are targets, not guarantees.</p>
                <p><span className="font-semibold">8.3 Liability Cap:</span> To the fullest extent permitted by UAE law, MFC's total aggregate liability to any Member for any claim arising out of or related to the Services shall not exceed the total membership fees paid by that Member in the twelve (12) months preceding the claim.</p>
                <p><span className="font-semibold">8.4 Exclusion of Consequential Loss:</span> MFC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of data, or loss of business opportunity, however caused.</p>
                <p><span className="font-semibold">8.5 Third-Party Services:</span> MFC is not responsible for third-party platforms, service providers, or Partners introduced through the Services. Any contractual relationship entered into with third parties is solely between the Member and that third party.</p>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">9. Data Protection in UAE Personal Data Protection Law (PDPL)</h3>
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold">9.1 Applicable Law:</span> KH Group 7 FZE is subject to UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data ("UAE PDPL") and its implementing regulations. Where Members or their data subjects are located in the European Economic Area, EU GDPR also applies concurrently.</p>
                <p><span className="font-semibold">9.2 Data Controller Identity:</span> The Data Controller for all Personal Data processed in connection with the Services is KH Group 7 FZE (MyFoundersClub), Business Centre, Sharjah Publishing City Free Zone, Sharjah, UAE, Licence No. 4426124. Contact: <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a></p>
                <p><span className="font-semibold">9.3 Categories of Personal Data Collected:</span> Identity data (full name, gender, nationality, date of birth, passport/Emirates ID); Contact data (email, telephone, business address, LinkedIn and social media handles); Professional data (company name, job title, sector, stage, annual recurring revenue, team size, funding history); Financial data (bank account details for grant/loan disbursement, investment capacity declarations); Communications data (messages via MFC platforms, event attendance, feedback); Technical data (IP address, browser type, device identifiers, cookies, usage data); Marketing preferences and consent records.</p>
                <p><span className="font-semibold">9.4 Legal Bases for Processing:</span> MFC processes Personal Data on the following legal bases under UAE PDPL Article 4 and, where applicable, GDPR Article 6: Contractual necessity (to deliver Services, process fees, administer Grant Programme); Legitimate interests (to improve Services, prevent fraud, maintain community security); Consent (to send marketing, share with Partners, create reports); Legal obligation (UAE AML regulations, SCA requirements).</p>
                <p><span className="font-semibold">9.5 Purposes of Processing:</span> Administering membership accounts and delivering benefits; Processing membership fees and financial transactions; Curating investor introductions and co-investment opportunities; Running events, masterclasses, and demo days; Assessing and administering grant and loan applications; Conducting AML/KYC due diligence; Creating anonymised trend reports and market intelligence; Facilitating Partner introductions; Sending marketing communications; Improving digital platforms and community experience.</p>
                <p><span className="font-semibold">9.6 Data Sharing:</span> MFC may share your Personal Data with vetted Partner organisations, third-party service providers as Data Processors, regulatory authorities where required by law, professional advisers under confidentiality obligations, and other MFC Members limited to public member profile information for community matching. MFC will never sell your Personal Data to any third party.</p>
                <p><span className="font-semibold">9.7 International Data Transfers:</span> Where Personal Data is transferred outside the UAE, MFC will ensure appropriate safeguards are in place in accordance with UAE PDPL Article 22, including standard contractual clauses, adequacy decisions, or binding corporate rules. For transfers to EEA recipients, GDPR Chapter V transfer mechanisms apply.</p>
                <p><span className="font-semibold">9.8 Data Retention:</span> MFC retains Personal Data for as long as necessary to fulfil stated purposes and comply with legal obligations. Member account data is retained for the duration of membership plus 7 years; Financial records for 10 years (UAE commercial law requirement); Grant/loan documentation for 10 years from repayment or exit event; AML/KYC documentation for 5 years from end of business relationship; Marketing consent records for duration of consent plus 3 years; Event attendance for 5 years; Technical data for 2 years; Anonymised reports indefinitely.</p>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">10. GDPR Compliance for EU and EEA Data Subjects</h3>
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold">10.1 Legal Basis Summary under GDPR Article 6:</span> Art. 6(1)(b) for Contract (Membership administration and service delivery); Art. 6(1)(f) for Legitimate interests (Community security, fraud prevention, Aggregated Reports); Art. 6(1)(a) for Consent (Marketing communications, Partner introductions, white papers); Art. 6(1)(c) for Legal obligation (AML, regulatory compliance).</p>
                <p><span className="font-semibold">10.2 Data Subject Rights under GDPR:</span> EU/EEA data subjects have the following rights, exercisable by writing to <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a>: Right of Access (Art. 15) to obtain a copy of Personal Data; Right to Rectification (Art. 16) to correct inaccurate data; Right to Erasure / "Right to be Forgotten" (Art. 17) subject to legal retention obligations; Right to Restriction of Processing (Art. 18); Right to Data Portability (Art. 20) in structured, machine-readable format; Right to Object (Art. 21) to processing based on legitimate interests; Right to Withdraw Consent (Art. 7(3)) at any time; and Right to Lodge a Complaint with your local EU supervisory authority.</p>
                <p><span className="font-semibold">10.3 Data Protection Officer:</span> MFC does not currently meet the thresholds requiring mandatory appointment of a DPO under GDPR Article 37. All privacy queries should be directed to <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a>.</p>
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">11. Data Subject Rights under UAE PDPL</h3>
              <p className="text-sm mb-3">In accordance with UAE Federal Decree-Law No. 45 of 2021, UAE-based data subjects have the following rights:</p>
              <ul className="space-y-2 ml-4 text-sm">
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Right to be informed about the processing of their Personal Data</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Right of access to their Personal Data held by MFC</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Right to rectify inaccurate or incomplete data</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Right to erasure, subject to legal retention obligations</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Right to restrict or object to certain processing activities</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Right to withdraw consent at any time</li>
                <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span> Right to file a complaint with the UAE Data Office (dataoffice.ae)</li>
              </ul>
              <p className="text-sm mt-4">To exercise any of these rights, submit a written request to: <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a> with subject "Data Subject Rights Request - MyFoundersClub". MFC will respond within thirty (30) calendar days of a valid, verified request. Identity verification may be required before processing.</p>
            </section>

            {/* Section 12 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">12. Consent to Data Processing, Reports and Partner Contact</h3>
              <p className="text-sm mb-3">By accepting these Terms, you provide the following express consents, which are freely given, specific, informed, and unambiguous:</p>
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold">12.1 Anonymised Reports and White Papers:</span> You consent to MFC aggregating and anonymising your professional and business data to produce Aggregated Reports, white papers, market intelligence publications, and statistical analyses. These documents will be used for MFC's own research, public publications, media distribution, and partner communications. Individual data subjects will not be identifiable in any such publication.</p>
                <p><span className="font-semibold">12.2 Partner Communications:</span> You consent to MFC sharing your contact information (name, email, company name, stage, sector) with vetted Partners including investors, family offices, corporate innovation teams, and government bodies for facilitating relevant introductions and partnership opportunities. Partners are contractually prohibited from selling or misusing your data.</p>
                <p><span className="font-semibold">12.3 Marketing Communications:</span> You consent to receiving marketing communications from MyFoundersClub and its affiliated brands (including 51% Capital and FemNation), delivered by email, SMS, WhatsApp, and social media channels.</p>
                <p><span className="font-semibold">12.4 How to Withdraw Consent or Opt Out:</span> You have the right to withdraw any or all consents at any time, without detriment to your membership. Withdrawal does not affect the lawfulness of processing carried out prior to withdrawal, nor processing on other legal bases such as contract or legal obligation.</p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 mt-3">
                  <p className="font-semibold mb-2">Data Opt-Out and Consent Withdrawal:</p>
                  <p>Email: <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a></p>
                  <p>Subject: "Opt-Out Request - [Your Name / Company]"</p>
                  <p className="text-xs mt-2">Opt-out requests will be processed within ten (10) business days of receipt.</p>
                </div>
              </div>
            </section>

            {/* Section 13 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">13. Cookies and Website Analytics</h3>
              <p className="text-sm">The myfounders.club website uses cookies and similar tracking technologies to enhance user experience, analyse traffic, and personalise content. A separate Cookie Policy is published at myfounders.club/cookies. By continuing to use the website after the cookie consent banner is presented, you consent to non-essential cookies. You may withdraw consent by adjusting browser settings or emailing <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a>.</p>
            </section>

            {/* Section 14 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">14. Termination and Suspension</h3>
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold">14.1 By Member:</span> Members may terminate their membership at any time by providing 30 days' written notice to <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a>. No refund of pre-paid membership fees will be issued unless required by applicable law. Outstanding obligations under Syndicate Participation Agreements or Grant Agreements survive termination.</p>
                <p><span className="font-semibold">14.2 By MFC:</span> MFC reserves the right to suspend or terminate membership immediately and without notice if a Member: (a) breaches these Terms; (b) engages in conduct harmful to the community; (c) provides materially false information; (d) becomes subject to insolvency proceedings; or (e) is found to be in violation of applicable UAE law.</p>
                <p><span className="font-semibold">14.3 Effect of Termination:</span> Upon termination, access to the member platform, events, and benefits will cease; Grant Agreement obligations and Syndicate Participation obligations survive termination; and MFC will retain data as required by this Agreement and applicable law.</p>
              </div>
            </section>

            {/* Section 15 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">15. Anti-Money Laundering and Regulatory Compliance</h3>
              <p className="text-sm">KH Group 7 FZE is committed to full compliance with UAE Federal Decree-Law No. 20 of 2018 on Anti-Money Laundering and Combating the Financing of Terrorism, and all associated Cabinet Resolutions and Central Bank guidelines. Members participating in investment syndicate activities or the Grant Programme may be required to provide KYC documentation, source of funds declarations, and Ultimate Beneficial Owner (UBO) disclosures. MFC reserves the right to terminate any membership or transaction where AML compliance cannot be confirmed.</p>
            </section>

            {/* Section 16 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">16. Governing Law and Dispute Resolution</h3>
              <p className="text-sm mb-3">This Agreement is governed by and construed in accordance with the laws of the United Arab Emirates, including the laws of the Emirate of Sharjah and the regulations of the Sharjah Publishing City Free Zone Authority.</p>
              <p className="text-sm mb-3">Any dispute arising out of or in connection with this Agreement shall first be subject to good-faith negotiation for a period of thirty (30) days. If unresolved, the dispute shall be referred to and finally resolved by arbitration under the Rules of the Sharjah International Commercial Arbitration Centre (SHICAC), with the seat of arbitration in Sharjah, UAE, conducted in the English language.</p>
              <p className="text-sm">For EU data subjects, mandatory consumer protection rights under EU law are not affected by this governing law clause.</p>
            </section>

            {/* Section 17 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">17. Amendments to These Terms</h3>
              <p className="text-sm">MFC reserves the right to amend these Terms at any time. Where amendments materially affect Members' rights or data processing consents, MFC will provide at least thirty (30) days' advance notice by email and publication on myfounders.club. Continued use of the Services after the effective date of amendments constitutes acceptance. Members who do not accept revised Terms must notify MFC before the effective date and may terminate membership.</p>
            </section>

            {/* Section 18 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">18. Severability, Entire Agreement and Waiver</h3>
              <p className="text-sm mb-3">If any provision of this Agreement is found to be invalid, unlawful, or unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, and all remaining provisions shall continue in full force.</p>
              <p className="text-sm mb-3">This Agreement, together with the Membership Prospectus, any Syndicate Participation Agreement, any Grant Agreement, and the Privacy Policy at myfounders.club/privacy, constitutes the entire agreement between the parties and supersedes all prior representations and agreements relating to its subject matter.</p>
              <p className="text-sm">No failure or delay by MFC to exercise any right or remedy under this Agreement shall operate as a waiver of that right or remedy.</p>
            </section>

            {/* Section 19 */}
            <section>
              <h3 className="text-lg font-bold text-white mb-3">19. Notices</h3>
              <p className="text-sm">All formal notices to MFC under this Agreement must be sent in writing to <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a> with the subject line "Legal Notice - MyFoundersClub". Email notices will be deemed received on the next business day following transmission. MFC will send notices to Members at the email address provided at registration.</p>
            </section>

            {/* Section 20 */}
            <section className="pt-6 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">20. Contact and Privacy Enquiries</h3>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-sm space-y-2">
                <p><span className="font-semibold">KH Group 7 FZE | MyFoundersClub</span></p>
                <p><span className="font-semibold">Business Centre,</span> Sharjah Publishing City Free Zone, Sharjah, UAE</p>
                <p><span className="font-semibold">Licence No:</span> 4426124</p>
                <p><span className="font-semibold">Data and Privacy:</span> <a href="mailto:katerina@khgroup7.com" className="text-orange-400 hover:underline">katerina@khgroup7.com</a></p>
                <p><span className="font-semibold">Website:</span> <a href="https://myfounders.club" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">myfounders.club</a></p>
                <p className="text-xs text-muted-foreground mt-4">Copyright 2026 KH Group 7 FZE. All rights reserved. MyFoundersClub is a registered trading name of KH Group 7 FZE.</p>
                <p className="text-xs text-muted-foreground">Version 1.0 | Effective: 14 February 2026 | Sharjah, United Arab Emirates</p>
              </div>
            </section>
          </article>
        </motion.div>
      </div>

      {/* Bottom CTA Section */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="glass rounded-xl p-8 sm:p-12 border border-orange-500/20 text-center">
          <p className="text-white font-semibold mb-6 text-lg">Ready to Join MyFoundersClub?</p>
          <Link href="/auth" className="inline-block px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all duration-300">
            Secure Your Spot
          </Link>
          <p className="text-white/70 text-xs mt-6">Copyright 2026 KH Group 7 FZE. All rights reserved. MyFoundersClub is a registered trading name.</p>
        </div>
      </motion.div>

      <SocialHomeButtons />
    </main>
  )
}
