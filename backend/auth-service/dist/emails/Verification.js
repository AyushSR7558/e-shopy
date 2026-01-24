import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button, } from '@react-email/components';
export default function VerificationEmail({ username, otp }) {
    return (_jsxs(Html, { lang: "en", dir: "ltr", children: [_jsxs(Head, { children: [_jsx("title", { children: "Verification Code" }), _jsx(Font, { fontFamily: "Roboto", fallbackFontFamily: "Verdana", webFont: {
                            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                            format: 'woff2',
                        }, fontWeight: 400, fontStyle: "normal" })] }), _jsxs(Preview, { children: ["Here's your verification code: ", otp] }), _jsxs(Section, { children: [_jsx(Row, { children: _jsxs(Heading, { as: "h2", children: ["Hello ", username, ","] }) }), _jsx(Row, { children: _jsx(Text, { children: "Thank you for registering. Please use the following verification code to complete your registration:" }) }), _jsx(Row, { children: _jsx(Text, { children: otp }) }), _jsx(Row, { children: _jsx(Text, { children: "If you did not request this code, please ignore this email." }) })] })] }));
}
//# sourceMappingURL=Verification.js.map