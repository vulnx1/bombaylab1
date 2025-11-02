export type SendEmailPayload = {
  to: string;
  subject: string;
  message: string;
  from_email?: string;
  useEmailMessage?: boolean;
};

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8000";

export async function sendEmail(payload: SendEmailPayload) {
  const res = await fetch(`${API_BASE}/api/send-email/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
      if (data?.detail) msg = data.detail;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}
