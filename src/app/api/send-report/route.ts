import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SolutionData {
  title: string;
  description: string;
  impact: string;
  timeToImplement: string;
  estimatedROI: string;
}

interface QuickWinData {
  title: string;
  description: string;
  timeToImplement: string;
  estimatedROI: string;
}

interface ReportData {
  email: string;
  userName: string;
  businessName: string;
  sectorName: string;
  overallScore: number;
  aiReadinessLevel: string;
  estimatedMonthlySavings: string;
  topSolutions: SolutionData[];
  quickWins: QuickWinData[];
  priorityActions: string[];
}

function getScoreColor(score: number): string {
  if (score >= 86) return "#10b981";
  if (score >= 71) return "#2563eb";
  if (score >= 51) return "#00d4ff";
  if (score >= 31) return "#f59e0b";
  return "#ef4444";
}

function getImpactBadge(impact: string): string {
  const colors: Record<string, { bg: string; text: string; dot: string }> = {
    high: { bg: "#ecfdf5", text: "#047857", dot: "#10b981" },
    medium: { bg: "#fffbeb", text: "#b45309", dot: "#f59e0b" },
    low: { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" },
  };
  const c = colors[impact] || colors.low;
  return `<span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;background:${c.bg};color:${c.text};text-transform:uppercase;letter-spacing:0.5px;">● ${impact} impact</span>`;
}

function buildEmailHTML(data: ReportData): string {
  const scoreColor = getScoreColor(data.overallScore);

  const solutionsHTML = data.topSolutions
    .map(
      (s, i) => `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid #f1f5f9;">
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="44" valign="top">
              <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,rgba(37,99,235,0.1),rgba(0,212,255,0.1));text-align:center;line-height:40px;font-weight:800;color:#2563eb;font-size:14px;">#${i + 1}</div>
            </td>
            <td style="padding-left:12px;">
              <div style="font-weight:700;color:#0a0f2c;font-size:15px;line-height:1.3;margin-bottom:6px;">${s.title}</div>
              <div style="font-size:12px;color:#64748b;line-height:1.5;margin-bottom:8px;">${s.description}</div>
              <div style="margin-bottom:8px;">
                ${getImpactBadge(s.impact)}
                <span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:600;background:#eff6ff;color:#2563eb;margin-left:6px;">⏱ ${s.timeToImplement}</span>
              </div>
              <div style="background:linear-gradient(135deg,rgba(37,99,235,0.06),rgba(0,212,255,0.06));border-radius:8px;padding:8px 14px;border:1px solid rgba(37,99,235,0.1);">
                <span style="font-size:12px;font-weight:700;color:#2563eb;">📈 ${s.estimatedROI}</span>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
    )
    .join("");

  const quickWinsHTML = data.quickWins
    .map(
      (qw) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="40" valign="top">
              <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#2563eb,#00d4ff);text-align:center;line-height:36px;font-size:16px;">⚡</div>
            </td>
            <td style="padding-left:12px;">
              <div style="font-weight:700;color:#0a0f2c;font-size:14px;margin-bottom:4px;">${qw.title}</div>
              <div style="font-size:12px;color:#64748b;line-height:1.4;margin-bottom:6px;">${qw.description}</div>
              <span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:600;background:#eff6ff;color:#2563eb;margin-right:6px;">⏱ ${qw.timeToImplement}</span>
              <span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:600;background:#ecfdf5;color:#047857;">📈 ${qw.estimatedROI}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
    )
    .join("");

  const actionsHTML = data.priorityActions
    .map(
      (action, i) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="32" valign="top">
              <div style="width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#0a0f2c,#2563eb);text-align:center;line-height:28px;font-size:12px;font-weight:700;color:white;">${i + 1}</div>
            </td>
            <td style="padding-left:10px;font-size:14px;color:#374151;font-weight:500;line-height:1.5;">${action}</td>
          </tr>
        </table>
      </td>
    </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Opportunity Audit Report - Sol8um</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table cellpadding="0" cellspacing="0" width="100%" style="background:#f1f5f9;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a0f2c 0%,#1e3a5f 40%,#2563eb 70%,#00d4ff 100%);border-radius:20px 20px 0 0;padding:32px 28px;text-align:center;">
              <div style="font-size:11px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">✨ Your AI Audit Report ✨</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:4px;">${data.userName}'s Report</div>
              <div style="font-size:28px;font-weight:800;color:white;margin-bottom:4px;letter-spacing:-0.5px;">${data.businessName}</div>
              <div style="font-size:13px;color:rgba(0,212,255,0.8);font-weight:500;">${data.sectorName}</div>
            </td>
          </tr>

          <!-- Score Card -->
          <tr>
            <td style="background:white;padding:28px;text-align:center;">
              <div style="margin-bottom:8px;">
                <span style="font-size:64px;font-weight:900;color:${scoreColor};letter-spacing:-2px;line-height:1;">${data.overallScore}</span>
                <span style="font-size:22px;color:#94a3b8;font-weight:600;">/100</span>
              </div>
              <div style="display:inline-block;padding:6px 18px;border-radius:20px;background:${scoreColor}15;border:1px solid ${scoreColor}30;">
                <span style="font-size:13px;font-weight:700;color:${scoreColor};text-transform:uppercase;letter-spacing:1px;">${data.aiReadinessLevel}</span>
              </div>

              <!-- Metrics -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:20px;">
                <tr>
                  <td width="50%" style="padding:6px;">
                    <div style="background:linear-gradient(135deg,rgba(37,99,235,0.06),rgba(0,212,255,0.06));border-radius:14px;padding:16px;border:1px solid rgba(37,99,235,0.1);">
                      <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:6px;">💰 Est. Monthly Savings</div>
                      <div style="font-size:18px;font-weight:800;color:#0a0f2c;">${data.estimatedMonthlySavings}</div>
                    </div>
                  </td>
                  <td width="50%" style="padding:6px;">
                    <div style="background:linear-gradient(135deg,rgba(0,212,255,0.06),rgba(37,99,235,0.06));border-radius:14px;padding:16px;border:1px solid rgba(0,212,255,0.1);">
                      <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:6px;">🚀 AI Solutions Found</div>
                      <div style="font-size:18px;font-weight:800;color:#0a0f2c;">${data.topSolutions.length + data.quickWins.length}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="background:white;padding:0 28px;"><div style="height:1px;background:linear-gradient(to right,transparent,#e2e8f0,transparent);"></div></td></tr>

          <!-- Top Solutions -->
          <tr>
            <td style="background:white;padding:24px 28px;">
              <div style="font-size:18px;font-weight:800;color:#0a0f2c;margin-bottom:16px;">🎯 Top AI Solutions For You</div>
              <table cellpadding="0" cellspacing="0" width="100%">
                ${solutionsHTML}
              </table>
            </td>
          </tr>

          <!-- Quick Wins -->
          ${data.quickWins.length > 0 ? `
          <tr><td style="background:white;padding:0 28px;"><div style="height:1px;background:linear-gradient(to right,transparent,#e2e8f0,transparent);"></div></td></tr>
          <tr>
            <td style="background:white;padding:24px 28px;">
              <div style="font-size:18px;font-weight:800;color:#0a0f2c;margin-bottom:16px;">⚡ Quick Wins — Start This Week</div>
              <table cellpadding="0" cellspacing="0" width="100%">
                ${quickWinsHTML}
              </table>
            </td>
          </tr>
          ` : ""}

          <!-- Priority Actions -->
          <tr><td style="background:white;padding:0 28px;"><div style="height:1px;background:linear-gradient(to right,transparent,#e2e8f0,transparent);"></div></td></tr>
          <tr>
            <td style="background:white;padding:24px 28px;">
              <div style="font-size:18px;font-weight:800;color:#0a0f2c;margin-bottom:16px;">📋 Your Priority Actions</div>
              <table cellpadding="0" cellspacing="0" width="100%">
                ${actionsHTML}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:white;padding:24px 28px;">
              <table cellpadding="0" cellspacing="0" width="100%" style="background:linear-gradient(135deg,#0a0f2c 0%,#1e3a5f 40%,#2563eb 70%,#00d4ff 100%);border-radius:16px;">
                <tr>
                  <td style="padding:28px;text-align:center;">
                    <div style="font-size:20px;font-weight:800;color:white;margin-bottom:8px;">🚀 Ready to Implement?</div>
                    <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:20px;line-height:1.5;">Let's turn these insights into action.<br>We build AI solutions that pay for themselves.</div>
                    <a href="https://wa.me/919468688354?text=${encodeURIComponent(`Hi, I just received my AI Opportunity Audit report for ${data.businessName}. My score is ${data.overallScore}/100. I'd like to discuss implementing the recommended solutions.`)}" style="display:inline-block;background:white;color:#0a0f2c;font-weight:700;font-size:15px;padding:14px 32px;border-radius:14px;text-decoration:none;">💬 Let's Talk on WhatsApp →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:white;border-radius:0 0 20px 20px;padding:20px 28px;text-align:center;">
              <div style="font-size:11px;color:#94a3b8;margin-bottom:4px;">Powered by</div>
              <div style="font-size:16px;font-weight:800;color:#0a0f2c;letter-spacing:-0.5px;margin-bottom:4px;">SOL<span style="background:linear-gradient(135deg,#2563eb,#00d4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">8</span>UM</div>
              <div style="font-size:10px;color:#94a3b8;">✨ AI Automation That Pays For Itself ✨</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body: ReportData = await req.json();

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const html = buildEmailHTML(body);

    const { data, error } = await resend.emails.send({
      from: "Sol8um AI Audit <onboarding@resend.dev>",
      to: body.email,
      subject: `🎯 ${body.businessName} — Your AI Opportunity Audit Report (Score: ${body.overallScore}/100)`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: unknown) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
