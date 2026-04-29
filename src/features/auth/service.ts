type LoginInput = {
  email: string;
  password: string;
};

export async function loginService(input: LoginInput) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message ?? "No se pudo iniciar sesión.");
  }

  return data;
}

export async function logoutService() {
  await fetch("/api/auth/logout", {
    method: "POST",
  });
}