"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import type { MockRole, MockUser, MockUserStatus } from "@/mocks";

type UserFormModalProps = {
  open: boolean;
  user: MockUser | null;
  roles: MockRole[];
  onClose: () => void;
  onSave: (payload: Omit<MockUser, "id" | "lastLogin"> & Partial<Pick<MockUser, "id" | "lastLogin">>) => void;
};

export function UserFormModal({ open, user, roles, onClose, onSave }: UserFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0]?.name ?? "Administrador");
  const [status, setStatus] = useState<MockUserStatus>("active");

  useEffect(() => {
    if (!open) return;
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setRole(user?.role ?? roles[0]?.name ?? "Administrador");
    setStatus(user?.status ?? "active");
  }, [open, roles, user]);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) return;

    onSave({
      id: user?.id,
      lastLogin: user?.lastLogin ?? null,
      name: name.trim(),
      email: email.trim(),
      role,
      status,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={user ? "Editar usuario" : "Nuevo usuario"}
      description="Formulario mock para simular la gestión de usuarios del panel."
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Nombre" value={name} onChange={(event) => setName(event.target.value)} />
        <Input label="Correo" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Select label="Rol" value={role} onChange={(event) => setRole(event.target.value)}>
          {roles.map((item) => (
            <option key={item.id} value={item.name}>{item.name}</option>
          ))}
        </Select>
        <Select label="Estado" value={status} onChange={(event) => setStatus(event.target.value as MockUserStatus)}>
          <option value="active">Activo</option>
          <option value="invited">Invitado</option>
          <option value="inactive">Inactivo</option>
        </Select>
      </div>
    </Modal>
  );
}
