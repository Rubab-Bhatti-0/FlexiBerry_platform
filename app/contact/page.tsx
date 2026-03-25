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
  { q: 'How does the installment plan work?',          a: 'Pay 20% down payment today, then split the rest over 6 or 12 equal monthly installments with zero hidden charges.' },
  { q: 'What documents do I need to register?',        a: 'Just your CNIC and a selfie for basic verification. Additional documents may be required for larger purchases.' },
  { q: 'Are all sellers verified?',                    a: 'Yes! Every seller undergoes strict KYC verification including business documents before they can list products.' },
  { q: 'What happens if I miss a payment?',            a: 'We send reminders before due dates. If you need to reschedule, contact support and we\'ll work out a solution.' },
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
  }

  return (
    <FlexiLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5 text-center border-b border-border">
          <div className="max-w-2xl mx-auto">
            <div className="text-5xl mb-4">📬</div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-3">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have a question or need help? Our team is here for you.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-foreground">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map(info => (
                  <Card key={info.title} className="p-5 card-hover">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-xl flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-0.5">{info.title}</p>
                        {info.link ? (
                          <a href={info.link} className="font-medium text-foreground hover:text-accent transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium text-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Social */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[['📘', 'Facebook'], ['🐦', 'Twitter'], ['📸', 'Instagram'], ['💼', 'LinkedIn']].map(([icon, name]) => (
                    <button
                      key={name as string}
                      title={name as string}
                      className="w-10 h-10 rounded-full border border-border hover:border-accent hover:bg-accent/10 flex items-center justify-center transition-all text-lg"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <Card className="p-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Send a Message</h2>

                {sent ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">We&apos;ll get back to you within 24 hours.</p>
                    <Button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }} variant="outline" className="rounded-full">
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                        <Input name="name" value={form.name} onChange={handleChange} placeholder="Ahmed Hassan" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ahmed@example.com" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Support</option>
                        <option value="installment">Installment Help</option>
                        <option value="seller">Vendor Partnership</option>
                        <option value="technical">Technical Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        placeholder="How can we help you today?"
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-medium transition-all hover:scale-[1.02]"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : 'Send Message →'}
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h2 className="text-3xl font-serif font-bold text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((faq, i) => (
                <Card key={i} className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-secondary/20 transition-colors"
                  >
                    <span className="font-medium text-foreground pr-4">{faq.q}</span>
                    <span className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                    <p className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FlexiLayout>
  )
}