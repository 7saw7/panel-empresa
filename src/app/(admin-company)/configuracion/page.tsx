"use client";

import { useMemo, useState } from "react";
import { activityLogsMock, rolesMock, usersMock } from "@/mocks";
import type { MockRole, MockUser } from "@/mocks";
import { ActivityLogsPanel } from "./_components/ActivityLogsPanel";
import { AppearanceSettingsPanel } from "./_components/AppearanceSettingsPanel";
import { NotificationsSettingsPanel } from "./_components/NotificationsSettingsPanel";
import { RoleDetailDrawer } from "./_components/RoleDetailDrawer";
import { RolesSettingsPanel } from "./_components/RolesSettingsPanel";
import { SettingsHeader } from "./_components/SettingsHeader";
import { SettingsTabs, type SettingsTabKey } from "./_components/SettingsTabs";
import { SystemStatesSettingsPanel } from "./_components/SystemStatesSettingsPanel";
import { TemplatesSettingsPanel } from "./_components/TemplatesSettingsPanel";
import { UserFormModal } from "./_components/UserFormModal";
import { UsersSettingsPanel } from "./_components/UsersSettingsPanel";

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabKey>("users");
  const [users, setUsers] = useState<MockUser[]>(usersMock);
  const [roles] = useState<MockRole[]>(rolesMock);
  const [selectedRole, setSelectedRole] = useState<MockRole | null>(null);
  const [editingUser, setEditingUser] = useState<MockUser | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const counters = useMemo(() => {
    return {
      activeUsers: users.filter((user) => user.status === "active").length,
      invitedUsers: users.filter((user) => user.status === "invited").length,
      inactiveUsers: users.filter((user) => user.status === "inactive").length,
      roles: roles.length,
    };
  }, [roles.length, users]);

  const notifySaved = (message: string) => {
    setSavedMessage(message);
    window.setTimeout(() => setSavedMessage(null), 1800);
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: MockUser) => {
    setEditingUser(user);
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (payload: Omit<MockUser, "id" | "lastLogin"> & Partial<Pick<MockUser, "id" | "lastLogin">>) => {
    if (payload.id) {
      setUsers((current) =>
        current.map((user) =>
          user.id === payload.id
            ? {
                ...user,
                name: payload.name,
                email: payload.email,
                role: payload.role,
                status: payload.status,
              }
            : user
        )
      );
      notifySaved("Usuario actualizado correctamente.");
    } else {
      const nextId = Math.max(...users.map((user) => user.id), 0) + 1;
      setUsers((current) => [
        {
          id: nextId,
          name: payload.name,
          email: payload.email,
          role: payload.role,
          status: payload.status,
          lastLogin: null,
        },
        ...current,
      ]);
      notifySaved("Usuario creado correctamente.");
    }

    setIsUserModalOpen(false);
    setEditingUser(null);
  };

  const handleToggleUserStatus = (user: MockUser) => {
    setUsers((current) =>
      current.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item
      )
    );
    notifySaved("Estado del usuario actualizado.");
  };

  return (
    <div className="space-y-6">
      <SettingsHeader counters={counters} savedMessage={savedMessage} />

      <SettingsTabs value={activeTab} onChange={setActiveTab} />

      {activeTab === "users" ? (
        <UsersSettingsPanel
          users={users}
          roles={roles}
          onCreate={handleCreateUser}
          onEdit={handleEditUser}
          onToggleStatus={handleToggleUserStatus}
        />
      ) : null}

      {activeTab === "roles" ? (
        <RolesSettingsPanel roles={roles} onViewRole={setSelectedRole} />
      ) : null}

      {activeTab === "notifications" ? (
        <NotificationsSettingsPanel onSave={() => notifySaved("Preferencias de notificación guardadas.")} />
      ) : null}

      {activeTab === "templates" ? (
        <TemplatesSettingsPanel onSave={() => notifySaved("Plantillas actualizadas.")} />
      ) : null}

      {activeTab === "states" ? (
        <SystemStatesSettingsPanel onSave={() => notifySaved("Estados del sistema actualizados.")} />
      ) : null}

      {activeTab === "appearance" ? (
        <AppearanceSettingsPanel onSave={() => notifySaved("Apariencia actualizada.")} />
      ) : null}

      {activeTab === "activity" ? (
        <ActivityLogsPanel logs={activityLogsMock} />
      ) : null}

      <UserFormModal
        open={isUserModalOpen}
        user={editingUser}
        roles={roles}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
      />

      <RoleDetailDrawer role={selectedRole} onClose={() => setSelectedRole(null)} />
    </div>
  );
}
