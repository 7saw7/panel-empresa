import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import type { MockCompany } from "@/mocks";

type SocialLinks = MockCompany["socialLinks"];

type CompanySocialLinksFormProps = {
  socialLinks: SocialLinks;
  onChange: (patch: Partial<SocialLinks>) => void;
};

export function CompanySocialLinksForm({ socialLinks, onChange }: CompanySocialLinksFormProps) {
  return (
    <SectionCard title="Redes sociales" description="En demo, estos enlaces ayudan a mostrar presencia digital del negocio.">
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Facebook" value={socialLinks.facebook} onChange={(event) => onChange({ facebook: event.target.value })} />
        <Input label="Instagram" value={socialLinks.instagram} onChange={(event) => onChange({ instagram: event.target.value })} />
        <Input label="TikTok" value={socialLinks.tiktok} onChange={(event) => onChange({ tiktok: event.target.value })} />
        <Input label="LinkedIn" value={socialLinks.linkedin} onChange={(event) => onChange({ linkedin: event.target.value })} />
      </div>
    </SectionCard>
  );
}
