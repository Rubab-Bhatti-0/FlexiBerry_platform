import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'
import { FlexiBerryLogo } from '@/components/ui/FlexiBerryLogo'

export const metadata: Metadata = {
  title: 'About Us - FlexiBerry',
  description: 'Learn about FlexiBerry — Pakistan\'s leading installment marketplace. Meet our founder Rana Muhammad Ajmal and developers Rubab Bashir & Hadia Akbar.',
}

const team = [
  {
    name: 'Rana Muhammad Ajmal',
    role: 'Founder & CEO',
    avatar: '👨‍💼',
    bio: 'Visionary leader passionate about democratizing access to premium products across Pakistan. Rana founded FlexiBerry with a mission to bridge the gap between aspiration and affordability.',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Rubab Bashir',
    role: 'Lead Developer',
    avatar: '👩‍💻',
    bio: 'Full-stack developer with expertise in building scalable e-commerce platforms. Rubab leads the technical development and ensures FlexiBerry runs seamlessly.',
    social: { linkedin: '#', github: '#' }
  },
  {
    name: 'Hadia Akbar',
    role: 'Lead Developer',
    avatar: '👩‍💻',
    bio: 'Passionate developer focused on creating intuitive user experiences. Hadia contributes to frontend and backend development, making FlexiBerry user-friendly.',
    social: { linkedin: '#', github: '#' }
  },
]

const milestones = [
  { year: '2022', event: 'FlexiBerry founded in Lahore, Pakistan with a vision to revolutionize installment commerce' },
  { year: '2023', event: 'Reached 10,000+ registered users and expanded product categories' },
  { year: '2023', event: '50+ verified sellers onboarded across Pakistan' },
  { year: '2024', event: '50,000+ happy customers and growing — FlexiBerry becomes Pakistan\'s trusted installment marketplace' },
]

const values = [
  { icon: '🤝', title: 'Trust',         desc: 'Every seller is verified and every transaction is protected with bank-grade security.' },
  { icon: '💡', title: 'Innovation',    desc: 'Constantly improving the platform with cutting-edge technology to serve you better.'       },
  { icon: '🌍', title: 'Accessibility', desc: 'Making premium products reachable for every Pakistani without financial strain.'       },
  { icon: '❤️', title: 'Community',     desc: 'Building lasting relationships between buyers and sellers across Pakistan.'   },
]

export default function AboutPage() {
  return (
    <FlexiLayout>
      <div className="min-h-screen bg-blue-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-center border-b border-blue-100">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 inline-block animate-bounce">
              <FlexiBerryLogo size={80} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              FlexiBerry was born from a simple belief: everyone deserves access to premium products without financial strain. We bridge the gap between aspiration and affordability through flexible installment payment plans.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To democratize access to premium products across Pakistan by providing a trusted, transparent, and flexible installment marketplace that empowers both buyers and sellers to achieve their dreams.
              </p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🔭</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                A Pakistan where financial constraints no longer limit people&apos;s ability to access the products they need and deserve — one installment at a time, building a more inclusive economy.
              </p>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '85+',  label: 'Verified Sellers' },
                { value: '10+',    label: 'Product Categories' },
                { value: '12Mo', label: 'Max Installments'  },
              ].map(s => (
                <div key={s.label} className="hover:scale-105 transition-transform">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{s.value}</div>
                  <div className="opacity-90 text-sm md:text-base">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <Card key={v.title} className="p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline / Journey */}
        <section className="py-16 md:py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Our Journey
            </h2>
            <div className="relative">
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-indigo-200" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 items-start">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 z-10 shadow-lg">
                      {m.year}
                    </div>
                    <Card className="flex-1 p-4 md:p-6 mt-2 hover:shadow-md transition-shadow">
                      <p className="text-gray-700 font-medium leading-relaxed">{m.event}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Meet the Team
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Talented individuals united by a shared vision to revolutionize installment commerce in Pakistan.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {team.map((member, i) => (
                <Card key={member.name} className="p-6 md:p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-5xl mx-auto mb-4 shadow-md">
                    {member.avatar}
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex gap-3 justify-center">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="w-8 h-8 rounded-full bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition-all text-sm">
                        in
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="w-8 h-8 rounded-full bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition-all text-xs">
                        𝕏
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="w-8 h-8 rounded-full bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center transition-all text-sm">
                        ⚙️
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose FlexiBerry */}
        <section className="py-16 md:py-20 px-4 bg-blue-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Why Choose FlexiBerry?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: '✅', title: 'Zero Hidden Charges', desc: 'All fees and charges are transparent and shown before checkout.' },
                { icon: '🔒', title: 'Bank-Grade Security', desc: 'Your data is protected with SSL encryption and verified payment gateways.' },
                { icon: '⚡', title: 'Instant Approval', desc: 'Get approved in minutes with our fast KYC verification process.' },
                { icon: '🌐', title: 'Nationwide Delivery', desc: 'Free delivery across Pakistan with tracking and support.' },
                { icon: '💳', title: 'No Credit Card Needed', desc: 'Start shopping with just your CNIC and a selfie.' },
                { icon: '📞', title: '24/7 Support', desc: 'Our dedicated team is always here to help you.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the FlexiBerry Family</h2>
            <p className="text-indigo-100 mb-8 text-lg">Whether you&apos;re a buyer or a seller, there&apos;s a place for you here.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 h-12 px-8 rounded-full font-semibold transition-all hover:scale-105">
                  Start Shopping
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-indigo-700 text-white hover:bg-indigo-800 border-2 border-white h-12 px-8 rounded-full font-semibold transition-all hover:scale-105">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </FlexiLayout>
  )
}
