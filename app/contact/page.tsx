'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import FlexiLayout from '@/components/layout/FlexiLayout/FlexiLayout'

const contactInfo = [
  { icon: '📧', title: 'Email',    value: 'support@flexiberry.pk',  link: 'mailto:support@flexiberry.pk' },
  { icon: '📞', title: 'Phone',    value: '+92 300 FLEXI (35394)',   link: 'tel:+923003539400'            },
  { icon: '📍', title: 'Address',  value: 'Lahore, Punjab, Pakistan', link: null                         },
  { icon: '🕐', title: 'Hours',    value: 'Mon-Sat 9AM – 7PM PKT',   link: null                         },
]

const faqItems = [
  { q: 'How does the installment plan work?',          a: 'Pay 20% down payment today, then split the rest over 6 or 12 equal monthly installments with zero hidden charges. No credit card needed!' },
  { q: 'What documents do I need to register?',        a: 'Just your CNIC (front & back), a clear selfie, and a salary slip or bank statement. Verification usually takes 3–5 business days.' },
  { q: 'Are all sellers verified?',                    a: 'Yes! Every seller undergoes strict KYC verification including business documents before they can list products on our platform.' },
  { q: 'What happens if I miss a payment?',            a: 'We send reminders before due dates. If you need to reschedule, contact our support team and we\'ll work out a solution that works for you.' },
  { q: 'Is my payment information secure?',            a: 'Absolutely. We use bank-grade SSL encryption and never store your full card details. All transactions are processed through verified payment gateways.' },
  { q: 'How can I become a vendor?',                   a: 'Click "Sell as Vendor" in the navbar, fill out the registration form, submit your business documents, and our team will review within 48 hours.' },
]

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <FlexiLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-center border-b border-indigo-100">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl md:text-6xl mb-6 inline-block animate-bounce">📬</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Have a question or need help? Our dedicated team is here for you 24/7.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12">

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map(info => (
                    <Card key={info.title} className="p-5 hover:shadow-lg hover:scale-105 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl flex-shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-gray-500 mb-1 font-semibold uppercase tracking-wide">{info.title}</p>
                          {info.link ? (
                            <a href={info.link} className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors break-all">
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-semibold text-gray-900">{info.value}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <p className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Follow Us</p>
                <div className="flex gap-3 flex-wrap">
                  {[
                    { icon: '📘', name: 'Facebook', url: '#' },
                    { icon: '🐦', name: 'Twitter', url: '#' },
                    { icon: '📸', name: 'Instagram', url: '#' },
                    { icon: '💼', name: 'LinkedIn', url: '#' }
                  ].map(social => (
                    <a
                      key={social.name}
                      href={social.url}
                      title={social.name}
                      className="w-11 h-11 rounded-full border-2 border-indigo-200 hover:border-indigo-600 hover:bg-indigo-600 flex items-center justify-center transition-all text-lg hover:text-white"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                <h3 className="font-bold text-gray-900 mb-3">Response Time</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business hours. For urgent matters, please call us directly.
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Send a Message</h2>

                {sent ? (
                  <div className="text-center py-12 md:py-16">
                    <div className="text-6xl md:text-7xl mb-4 animate-bounce">✅</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6 text-lg">We&apos;ll get back to you within 24 hours.</p>
                    <Button 
                      onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }} 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-2 font-semibold transition-all hover:scale-105"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                        <Input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Ahmed Hassan"
                          required
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Email Address *</label>
                        <Input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="ahmed@example.com"
                          required
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Subject *</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Support</option>
                        <option value="installment">Installment Help</option>
                        <option value="seller">Vendor Partnership</option>
                        <option value="technical">Technical Issue</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        placeholder="How can we help you today?"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 rounded-full text-base font-bold transition-all hover:scale-[1.02] disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : 'Send Message →'}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 md:mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Find answers to common questions about FlexiBerry, our installment plans, and how we work.
            </p>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((faq, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-5 md:p-6 text-left hover:bg-indigo-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4 text-sm md:text-base">{faq.q}</span>
                    <span className={`text-indigo-600 flex-shrink-0 transition-transform duration-300 text-lg ${openFaq === i ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-64' : 'max-h-0'}`}>
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Support */}
          <div className="mt-16 md:mt-20 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-indigo-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Still Need Help?</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Our support team is available 24/7 to assist you. Reach out via email, phone, or chat, and we&apos;ll be happy to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:support@flexiberry.pk" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all hover:scale-105">
                  📧 Email Us
                </a>
                <a href="tel:+923003539400" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full border-2 border-indigo-600 hover:bg-indigo-50 transition-all hover:scale-105">
                  📞 Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FlexiLayout>
  )
}
