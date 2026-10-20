import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowUpRight, CreditCard, RefreshCw, Wallet } from "lucide-react";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { getPaymentHistory, getPaymentStatus } from "@/lib/api";

export const Route = createFileRoute("/student/payments")({
  component: Payments,
});

type Payment = {
  id?: string;
  reference?: string;
  status?: string;
  provider?: string;
  method?: string;
  amount?: number | string;
  currency?: string;
  course_title?: string;
  course_slug?: string;
  created_at?: string;
  date?: string;
};

function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadPayments() {
    setError(null);
    try {
      const history = await getPaymentHistory();
      setPayments(Array.isArray(history) ? history : []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load payment history.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPayments();
  }, []);

  async function refreshStatus(payment: Payment) {
    if (!payment.reference) return;
    setRefreshing(payment.reference);
    setError(null);
    try {
      const result = await getPaymentStatus(payment.reference);
      const updated = result?.payment ?? result;
      setPayments((current) => current.map((item) => item.reference === payment.reference
        ? { ...item, ...updated }
        : item));
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Could not refresh payment status.");
    } finally {
      setRefreshing(null);
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-5xl p-4 sm:p-6"><PageSkeleton rows={4} /></div>;
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary"><Wallet className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
            <p className="mt-1 text-sm text-muted-foreground">Review course purchases and check pending payment status.</p>
          </div>
        </div>
        <button type="button" onClick={() => void loadPayments()} className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
          <RefreshCw className="h-4 w-4" />Refresh history
        </button>
      </header>

      {error && <div role="alert" className="flex gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}

      {payments.length === 0 ? (
        <section className="rounded-2xl border border-border bg-card p-10 text-center">
          <CreditCard className="mx-auto h-9 w-9 text-muted-foreground" />
          <h2 className="mt-3 text-lg font-semibold">No payments yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Your course purchases will appear here.</p>
          <Link to="/student/explore" className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Browse courses</Link>
        </section>
      ) : (
        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {payments.map((payment, index) => {
              const status = String(payment.status ?? "unknown");
              const pending = ["pending", "processing", "initiated"].includes(status.toLowerCase());
              const date = payment.created_at ?? payment.date;
              return (
                <li key={payment.id ?? payment.reference ?? index} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div className="min-w-0">
                    <p className="font-semibold">{payment.course_title || "Course payment"}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{payment.provider || payment.method || "Payment"}{date ? ` · ${new Date(date).toLocaleDateString()}` : ""}</p>
                    {payment.reference && <p className="mt-1 break-all text-xs text-muted-foreground">Reference: {payment.reference}</p>}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    {payment.course_slug && <Link to="/student/course/$slug" params={{ slug: payment.course_slug }} className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">Course <ArrowUpRight className="h-3 w-3" /></Link>}
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize">{status.replaceAll("_", " ")}</span>
                    <span className="font-semibold">{payment.currency ? `${payment.currency} ` : ""}{payment.amount ?? "—"}</span>
                    {pending && payment.reference && (
                      <button type="button" onClick={() => void refreshStatus(payment)} disabled={refreshing === payment.reference} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-muted disabled:opacity-50">
                        <RefreshCw className={`h-3.5 w-3.5 ${refreshing === payment.reference ? "animate-spin" : ""}`} />
                        Check status
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
