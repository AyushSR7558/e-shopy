import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button, Container, Hr, } from '@react-email/components';
export default function VerificationEmail({ username, otp }) {
    return (_jsxs(Html, { lang: "en", dir: "ltr", children: [_jsxs(Head, { children: [_jsx("title", { children: "Verify Your Account" }), _jsx(Font, { fontFamily: "Inter", fallbackFontFamily: "Arial", webFont: {
                            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
                            format: 'woff2',
                        }, fontWeight: 400, fontStyle: "normal" }), _jsx("style", { children: `
            @media only screen and (max-width: 600px) {
              .container {
                width: 100% !important;
                padding: 20px !important;
              }
              .otp-code {
                font-size: 32px !important;
                padding: 20px !important;
              }
            }
          ` })] }), _jsxs(Preview, { children: ["Your verification code: ", otp] }), _jsxs(Container, { style: styles.container, children: [_jsxs(Section, { style: styles.header, children: [_jsx(Heading, { as: "h1", style: styles.logo, children: "\uD83D\uDD10 Eshopy" }), _jsx(Text, { style: styles.tagline, children: "Account Verification" })] }), _jsx(Hr, { style: styles.divider }), _jsxs(Section, { style: styles.content, children: [_jsx(Row, { children: _jsxs(Heading, { as: "h2", style: styles.greeting, children: ["Hello ", username, ","] }) }), _jsx(Row, { children: _jsx(Text, { style: styles.paragraph, children: "Welcome to E-shopy! To complete your registration and start using your account, please verify your email address using the code below:" }) }), _jsxs(Section, { style: styles.otpContainer, children: [_jsx(Text, { style: styles.otpLabel, children: "Verification Code" }), _jsx(Text, { style: styles.otpCode, children: otp }), _jsx(Text, { style: styles.otpExpiry, children: "This code expires in 1 minutes" })] }), _jsx(Row, { children: _jsx(Text, { style: styles.paragraph, children: "Enter this code on the verification page to complete your registration. Do not share this code with anyone" }) }), _jsx(Row, { style: styles.buttonContainer, children: _jsx(Button, { href: `http://localhost:3000/verify`, style: styles.button, children: "Go to Verification Page" }) }), _jsx(Row, { children: _jsx(Text, { style: styles.note, children: "If you didn't request this code, please ignore this email or contact our support team if you have concerns about your account security." }) })] }), _jsx(Hr, { style: styles.divider }), _jsxs(Section, { style: styles.footer, children: [_jsxs(Text, { style: styles.footerText, children: ["\u00A9 ", new Date().getFullYear(), " SecureApp. All rights reserved."] }), _jsx(Text, { style: styles.footerText, children: "This is an automated message, please do not reply to this email." }), _jsxs(Text, { style: styles.footerLinks, children: [_jsx("a", { href: "http://localhost:3000/help", style: styles.link, children: "Help Center" }), ' • ', _jsx("a", { href: "http://localhost:3000/privacy", style: styles.link, children: "Privacy Policy" }), ' • ', _jsx("a", { href: "http://localhost:3000/terms", style: styles.link, children: "Terms of Service" })] })] })] })] }));
}
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
    },
    header: {
        padding: '40px 40px 20px',
        textAlign: 'center',
        backgroundColor: '#f8fafc',
    },
    logo: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#2563eb',
        margin: '0 0 8px',
    },
    tagline: {
        fontSize: '14px',
        color: '#64748b',
        margin: '0',
    },
    divider: {
        border: 'none',
        borderTop: '1px solid #e2e8f0',
        margin: '0',
    },
    content: {
        padding: '40px',
    },
    greeting: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#1e293b',
        margin: '0 0 24px',
    },
    paragraph: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#475569',
        margin: '0 0 24px',
    },
    otpContainer: {
        textAlign: 'center',
        margin: '40px 0',
        padding: '32px',
        backgroundColor: '#f1f5f9',
        borderRadius: '12px',
        border: '1px dashed #cbd5e1',
    },
    otpLabel: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        margin: '0 0 12px',
    },
    otpCode: {
        fontSize: '48px',
        fontWeight: '700',
        color: '#2563eb',
        letterSpacing: '8px',
        margin: '16px 0',
        fontFamily: "'Courier New', Courier, monospace",
        backgroundColor: 'white',
        padding: '16px 32px',
        borderRadius: '8px',
        display: 'inline-block',
        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.1)',
    },
    otpExpiry: {
        fontSize: '14px',
        color: '#ef4444',
        fontWeight: '500',
        margin: '12px 0 0',
    },
    buttonContainer: {
        textAlign: 'center',
        margin: '32px 0',
    },
    button: {
        backgroundColor: '#2563eb',
        color: '#ffffff',
        padding: '16px 32px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '600',
        display: 'inline-block',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    note: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#94a3b8',
        fontStyle: 'italic',
        margin: '24px 0 0',
        padding: '16px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        borderLeft: '4px solid #cbd5e1',
    },
    footer: {
        padding: '32px 40px',
        textAlign: 'center',
        backgroundColor: '#f8fafc',
    },
    footerText: {
        fontSize: '12px',
        color: '#64748b',
        margin: '8px 0',
    },
    footerLinks: {
        fontSize: '12px',
        color: '#64748b',
        margin: '16px 0 0',
    },
    link: {
        color: '#2563eb',
        textDecoration: 'none',
    },
};
//# sourceMappingURL=Verification.js.map