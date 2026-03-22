import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about FlexiBerry — Pakistan\'s leading installment marketplace connecting buyers and verified sellers.',
}

const team = [
  { name: 'Rubab Bhatti',  role: 'Founder & CEO',    avatar: '👩‍💼', bio: 'Passionate about making premium products accessible to everyone.' },
  { name: 'Ali Ahmed',     role: 'CTO',               avatar: '👨‍💻', bio: 'Building the tech infrastructure for Pakistan\'s next-gen commerce.' },
  { name: 'Sara Khan',     role: 'Head of Operations', avatar: '👩‍🔧', bio: 'Ensuring every seller and buyer has an exceptional experience.'   },
  { name: 'Hassan Raza',   role: 'Head of Growth',    avatar: '👨‍📈', bio: 'Scaling FlexiBerry to reach every corner of Pakistan.'            },
]

const milestones = [
  { year: '2022', event: 'FlexiBerry founded in Lahore, Pakistan' },
  { year: '2023', event: 'Reached 10,000 registered users' },
  { year: '2023', event: '50+ verified sellers onboarded' },
  { year: '2024', event: '50,000+ happy customers and growing' },
]

const values = [
  { icon: '🤝', title: 'Trust',         desc: 'Every seller is verified and every transaction is protected.' },
  { icon: '💡', title: 'Innovation',    desc: 'Constantly improving the platform to serve you better.'       },
  { icon: '🌍', title: 'Accessibility', desc: 'Making premium products reachable for every Pakistani.'       },
  { icon: '❤️', title: 'Community',     desc: 'Building lasting relationships between buyers and sellers.'   },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🫐</span>
            <span className="text-xl font-serif font-bold">FlexiBerry</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">Products</Link>
            <Link href="/contact"  className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            <Link href="/auth/login" className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl mb-6 animate-float inline-block">🫐</div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 animate-fade-in-up">
            Our Story
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in-up delay-200">
            FlexiBerry was born from a simple belief: everyone deserves access to premium products without
            financial strain. We bridge the gap between aspiration and affordability through flexible
            installment payment plans.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 card-hover">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To democratize access to premium products across Pakistan by providing a trusted,
              transparent, and flexible installment marketplace that empowers both buyers and sellers.
            </p>
          </Card>
          <Card className="p-8 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 card-hover">
            <div className="text-4xl mb-4">🔭</div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Pakistan where financial constraints no longer limit people&apos;s ability to access
              the products they need and deserve — one installment at a time.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Happy Customers' },
              { value: '85+',  label: 'Verified Sellers' },
              { value: '6',    label: 'Product Categories' },
              { value: '12Mo', label: 'Max Installments'  },
            ].map(s => (
              <div key={s.label}>
                <div className="text-4xl font-serif font-bold mb-2">{s.value}</div>
                <div className="opacity-70 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Card key={v.title} className="p-6 text-center card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-serif font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-6 items-start animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-sm flex-shrink-0 z-10">
                    {m.year}
                  </div>
                  <Card className="flex-1 p-4 mt-3">
                    <p className="text-foreground font-medium">{m.event}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <Card key={member.name} className="p-6 text-center card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-4xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="font-serif font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Join the FlexiBerry Family</h2>
          <p className="opacity-80 mb-8">Whether you&apos;re a buyer or a seller, there&apos;s a place for you here.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 px-8 rounded-full">
                Start Shopping
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8 rounded-full">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4 border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <p>© 2024 FlexiBerry. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/products" className="hover:opacity-100">Products</Link>
            <Link href="/contact"  className="hover:opacity-100">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}