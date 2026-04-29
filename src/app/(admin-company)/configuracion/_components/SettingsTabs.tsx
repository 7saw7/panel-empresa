import { Tabs } from "@/components/ui/Tabs";

export type SettingsTabKey =
  | "users"
  | "roles"
  | "notifications"
  | "templates"
  | "states"
  | "appearance"
  | "activity";

const items: Array<{ key: SettingsTabKey; label: string }> = [
  { key: "users", label: "Usuarios" },
  { key: "roles", label: "Roles" },
  { key: "notifications", label: "Notificaciones" },
  { key: "templates", label: "Plantillas" },
  { key: "states", label: "Estados" },
  { key: "appearance", label: "Apariencia" },
  { key: "activity", label: "Actividad" },
];

type SettingsTabsProps = {
  value: SettingsTabKey;
  onChange: (value: SettingsTabKey) => void;
};

export function SettingsTabs({ value, onChange }: SettingsTabsProps) {
  return (
    <div className="overflow-x-auto pb-1">
      <Tabs
        items={items}
        value={value}
        onChange={(nextValue) => onChange(nextValue as SettingsTabKey)}
      />
    </div>
  );
}
