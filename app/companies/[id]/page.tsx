import type { Metadata } from "next"
import { fetchCompanyById } from "@/lib/api/companies"
import CompanyProfileClient from "./CompanyProfileClient"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const company = await fetchCompanyById(params.id)
    return {
      title: `${company.name} | JobConnect Pro`,
      description: company.description,
    }
  } catch (error) {
    return {
      title: "Company Not Found | JobConnect Pro",
    }
  }
}

export default async function CompanyProfilePage({ params }: { params: { id: string } }) {
  return <CompanyProfileClient id={params.id} />
}
