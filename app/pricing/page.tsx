import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const pricingPlans = [
  {
    name: "Free",
    description: "Basic features for job seekers and recruiters",
    price: 0,
    features: [
      "Create a basic profile",
      "Browse job listings",
      "Apply to jobs",
      "5 messages per day",
      "Basic search filters",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    description: "Advanced features for serious job seekers",
    price: 19.99,
    features: [
      "Enhanced profile visibility",
      "Unlimited messages",
      "See who viewed your profile",
      "Advanced search filters",
      "Priority application status",
      "Resume review",
    ],
    cta: "Upgrade Now",
    popular: true,
  },
  {
    name: "Pro",
    description: "Complete solution for recruiters and companies",
    price: 49.99,
    features: [
      "All Premium features",
      "Advanced analytics",
      "Candidate recommendations",
      "Bulk messaging",
      "Team collaboration",
      "API access",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">Choose the plan that's right for you or your organization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${plan.popular ? "border-[#0077B5] shadow-lg relative" : "border-gray-200"}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-[#0077B5] text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.price > 0 && <span className="text-gray-500 ml-2">/month</span>}
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className={`w-full ${plan.popular ? "bg-[#0077B5] hover:bg-[#005885]" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link href="/login">{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Can I change plans later?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing
              cycle.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
            <p className="text-gray-600">
              We offer a 14-day free trial for our Premium and Pro plans. No credit card required.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">
              We accept all major credit cards, PayPal, and bank transfers for annual plans.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Can I get a refund?</h3>
            <p className="text-gray-600">
              We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support
              team.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Need a custom solution?</h3>
          <p className="text-gray-600 mb-6">Contact our sales team for enterprise pricing and custom solutions.</p>
          <Button size="lg" variant="outline" asChild>
            <Link href="#">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
