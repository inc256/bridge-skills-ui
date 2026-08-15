// apps/student/src/routes/student.certificates.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Award, Download, Share2, ExternalLink, Check, Search, Shield, RefreshCw, Sparkles, Users, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getMyCertificates, verifyCertificate, getMe } from "@/lib/api";
import type { Certificate } from "@/lib/api";

export const Route = createFileRoute("/student/certificates")({
  component: Certificates,
});

// Certificate with additional fields
interface ExtendedCertificate extends Certificate {
  number?: string;
  credentialId?: string;
  course_title?: string;
  user_name?: string;
  student_name?: string;
  recipient_name?: string;
  issued_at?: string;
  issued?: string;
  is_valid?: boolean;
  verify_count?: number;
  last_verified_at?: string;
  pdf_url?: string;
}

const BGCSS = [
  'from-amber-50 to-amber-100/50',
  'from-blue-50 to-blue-100/50',
  'from-emerald-50 to-emerald-100/50',
  'from-purple-50 to-purple-100/50',
  'from-rose-50 to-rose-100/50',
  'from-cyan-50 to-cyan-100/50',
];

function Certificates() {
  const [certificates, setCertificates] = useState<ExtendedCertificate[]>([]);
  const [user, setUser] = useState<any>(null);
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyStatus, setVerifyStatus] = useState<{ valid: boolean; message: string; data?: any } | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [certificateList, userData] = await Promise.all([
          getMyCertificates(),
          getMe().catch(() => null)
        ]);
        setCertificates(Array.isArray(certificateList) ? certificateList : []);
        setUser(userData);
      } catch (err) {
        console.error('Failed to load certificates:', err);
        setError('Could not load certificates. Please try again.');
        setCertificates([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleVerify = async () => {
    if (!verifyInput.trim()) return;
    setVerifying(true);
    setVerifyStatus(null);
    try {
      const response = await verifyCertificate(verifyInput.trim());
      if (response?.valid) {
        setVerifyStatus({
          valid: true,
          message: `Certificate "${response.certificate?.course_title || response.certificate?.title}" is valid.`,
          data: response.certificate
        });
      } else {
        setVerifyStatus({
          valid: false,
          message: response?.detail || "Certificate not found. Please check the ID and try again."
        });
      }
    } catch (err) {
      setVerifyStatus({
        valid: false,
        message: "Verification failed. Please try again later."
      });
    } finally {
      setVerifying(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recent';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const handleDownload = (cert: ExtendedCertificate) => {
    if (cert.pdf_url) {
      window.open(cert.pdf_url, '_blank');
      return;
    }
    // Fallback print view
    const w = window.open('', '_blank');
    if (w) {
      const name = cert.user_name || cert.student_name || cert.recipient_name || user?.full_name || 'Learner';
      const title = cert.title || cert.course_title || 'Certificate';
      const issued = formatDate(cert.issued_at || cert.issued || new Date().toISOString());
      const id = cert.credentialId || cert.number || 'TBS-2024';
      
      w.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Certificate</title>
            <style>
              body{font-family:Georgia,serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f5f5f0}
              .c{border:3px solid #2563EB;padding:60px;max-width:700px;text-align:center;background:#fff;border-radius:20px}
              .gold{color:#D4A24E}
              .blue{color:#2563EB}
            </style>
          </head>
          <body>
            <div class="c">
              <p style="font-size:11px;color:#9CA3AF;letter-spacing:.15em;text-transform:uppercase;margin-bottom:30px">Certificate of Completion</p>
              <p style="color:#6B7280;margin:0">This certifies that</p>
              <p style="font-size:36px;font-weight:700;margin:10px 0">${name}</p>
              <p style="color:#6B7280;margin:0">has successfully completed</p>
              <p style="font-size:22px;font-weight:700;color:#2563EB;margin:10px 0">${title}</p>
              <p style="color:#6B7280;font-size:12px;margin-top:30px;border-top:1px solid #e5e7eb;padding-top:20px">
                Issued ${issued} | ID: ${id}
              </p>
            </div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      w.document.close();
    }
  };

  const handleShare = async (cert: ExtendedCertificate) => {
    const title = cert.title || cert.course_title || 'Certificate';
    const id = cert.credentialId || cert.number || 'TBS-2024';
    const text = `I earned a TechBridge certificate in "${title}"! ID: ${id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: 'My Certificate', 
          text: text,
          url: window.location.origin + '/verify/' + id
        });
      } catch (e) {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard?.writeText(text);
        // Show success feedback
      } catch {
        // Fallback
      }
    }
  };

  const getUserName = () => {
    if (user?.full_name) return user.full_name;
    if (user?.first_name && user?.last_name) return `${user.first_name} ${user.last_name}`;
    if (user?.first_name) return user.first_name;
    if (user?.username) return user.username;
    return 'Learner';
  };

  const userName = getUserName();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs sm:text-sm text-gray-500">Loading certificates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-md p-6 bg-red-50 rounded-xl">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-700 mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Certificates</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Verifiable credentials from courses you've completed
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {certificates.length} certificates
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      {certificates.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{certificates.length}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{certificates.filter(c => c.is_valid !== false).length}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Verified</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{certificates.reduce((sum, c) => sum + (c.verify_count || 0), 0)}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Verifications</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {certificates.filter(c => {
                    const date = new Date(c.issued_at || c.issued || Date.now());
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return date >= thirtyDaysAgo;
                  }).length}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">Last 30 days</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verify Panel */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">Verify a Certificate</h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mb-3">Enter a certificate ID to confirm its authenticity</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={verifyInput}
              onChange={(e) => { 
                setVerifyInput(e.target.value); 
                setVerifyStatus(null); 
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              placeholder="Enter certificate ID e.g. TBS-2024-001"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 sm:py-3 pl-9 sm:pl-10 pr-3 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            onClick={handleVerify}
            disabled={verifying || !verifyInput.trim()}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 touch-manipulation min-w-[100px]"
          >
            {verifying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Verify
              </>
            )}
          </button>
        </div>

        {verifyStatus && (
          <div className={`mt-3 rounded-xl p-3 sm:p-4 text-xs sm:text-sm flex items-start gap-2 ${
            verifyStatus.valid 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {verifyStatus.valid ? (
              <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
            ) : (
              <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
            )}
            <span>{verifyStatus.message}</span>
          </div>
        )}
      </div>

      {/* Certificate List */}
      {certificates.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-8 sm:p-12 md:p-16 text-center shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4">
              🏅
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">No certificates yet</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Complete a course to earn your first certificate
            </p>
            <a 
              href="/student/explore" 
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Explore courses
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {certificates.map((cert, index) => {
            const bgClass = BGCSS[index % BGCSS.length];
            const title = cert.title || cert.course_title || 'Certificate';
            const issued = formatDate(cert.issued_at || cert.issued || new Date().toISOString());
            const id = cert.credentialId || cert.number || 'TBS-2024';
            const name = cert.user_name || cert.student_name || cert.recipient_name || userName;
            const instructor = cert.instructor || 'TechBridge Instructor';
            
            return (
              <div 
                key={cert.id || index} 
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation"
              >
                {/* Certificate Card */}
                <div className={`p-4 sm:p-6 bg-gradient-to-br ${bgClass}`}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Certificate of Completion
                        </p>
                      </div>
                      <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
                    </div>
                    
                    <p className="text-[10px] sm:text-xs text-gray-500">This certifies that</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-0.5">{name}</p>
                    
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-2">has successfully completed</p>
                    <p className="text-base sm:text-lg md:text-xl font-semibold text-blue-600 mt-0.5">{title}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mt-4 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-400">Issued {issued}</p>
                        <p className="text-[10px] sm:text-xs text-gray-400">ID: {id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-medium text-gray-700">{instructor}</p>
                        <p className="text-[10px] sm:text-xs text-gray-400">TechBridge Skills Hub</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 bg-gray-50/50">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-emerald-600">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>Verified credential</span>
                    {cert.verify_count !== undefined && cert.verify_count > 0 && (
                      <span className="text-gray-400 text-[10px]">
                        · {cert.verify_count} verifications
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <button 
                      onClick={() => handleDownload(cert)}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium hover:bg-gray-50 transition-colors active:scale-95 touch-manipulation"
                    >
                      <Download className="h-3 w-3" />
                      <span className="hidden xs:inline">Download</span>
                    </button>
                    <button 
                      onClick={() => handleShare(cert)}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium hover:bg-gray-50 transition-colors active:scale-95 touch-manipulation"
                    >
                      <Share2 className="h-3 w-3" />
                      <span className="hidden xs:inline">Share</span>
                    </button>
                    <button 
                      onClick={() => {
                        const url = `https://verify.techbridge.com/${id}`;
                        window.open(url, '_blank');
                      }}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-white hover:bg-blue-700 transition-colors active:scale-95 touch-manipulation"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span className="hidden xs:inline">Verify</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Certificates;