"use client";

import { useMemo, useState } from "react";
import { companyMock, companyScheduleMock } from "@/mocks";
import type { MockCompany, MockCompanySchedule } from "@/mocks";
import { CompanyCompletionCard } from "./_components/CompanyCompletionCard";
import { CompanyContactForm } from "./_components/CompanyContactForm";
import { CompanyGeneralForm } from "./_components/CompanyGeneralForm";
import { CompanyHeader } from "./_components/CompanyHeader";
import { CompanyLegalForm } from "./_components/CompanyLegalForm";
import { CompanyPreviewModal } from "./_components/CompanyPreviewModal";
import { CompanyProfileCard } from "./_components/CompanyProfileCard";
import { CompanyScheduleForm } from "./_components/CompanyScheduleForm";
import { CompanySocialLinksForm } from "./_components/CompanySocialLinksForm";

type SaveState = "idle" | "saved";

function calculateCompletion(company: MockCompany, schedule: MockCompanySchedule[]) {
  const checks = [
    Boolean(company.name),
    Boolean(company.commercialName),
    Boolean(company.ruc),
    Boolean(company.category),
    company.description.length > 30,
    Boolean(company.phone),
    Boolean(company.email),
    Boolean(company.website),
    Boolean(company.address),
    company.districtsCoverage.length > 0,
    schedule.some((item) => item.isOpen),
    Boolean(company.socialLinks.facebook || company.socialLinks.instagram),
    Boolean(company.legalRepresentative),
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export default function EmpresaPage() {
  const [company, setCompany] = useState<MockCompany>(companyMock);
  const [schedule, setSchedule] = useState<MockCompanySchedule[]>(companyScheduleMock);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const profileCompletion = useMemo(
    () => calculateCompletion(company, schedule),
    [company, schedule]
  );

  const handleCompanyChange = (patch: Partial<MockCompany>) => {
    setCompany((current) => ({ ...current, ...patch }));
    setSaveState("idle");
  };

  const handleSocialLinksChange = (patch: Partial<MockCompany["socialLinks"]>) => {
    setCompany((current) => ({
      ...current,
      socialLinks: {
        ...current.socialLinks,
        ...patch,
      },
    }));
    setSaveState("idle");
  };

  const handleScheduleChange = (nextSchedule: MockCompanySchedule[]) => {
    setSchedule(nextSchedule);
    setSaveState("idle");
  };

  const handleSave = () => {
    setCompany((current) => ({
      ...current,
      profileCompletion,
    }));
    setSaveState("saved");
  };

  return (
    <div className="space-y-6">
      <CompanyHeader
        saveState={saveState}
        onSave={handleSave}
        onPreview={() => setIsPreviewOpen(true)}
      />

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <div className="space-y-6">
          <CompanyProfileCard company={company} completion={profileCompletion} />
          <CompanyCompletionCard company={company} completion={profileCompletion} />
        </div>

        <div className="space-y-6">
          <CompanyGeneralForm company={company} onChange={handleCompanyChange} />
          <CompanyContactForm company={company} onChange={handleCompanyChange} />
          <CompanyScheduleForm schedule={schedule} onChange={handleScheduleChange} />
          <CompanySocialLinksForm
            socialLinks={company.socialLinks}
            onChange={handleSocialLinksChange}
          />
          <CompanyLegalForm company={company} onChange={handleCompanyChange} />
        </div>
      </div>

      <CompanyPreviewModal
        open={isPreviewOpen}
        company={{ ...company, profileCompletion }}
        schedule={schedule}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
