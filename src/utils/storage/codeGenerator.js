export const generateSaveCode = (data) => {
    try {
        const jsonString = JSON.stringify(data);
        // Encode to Base64
        const base64 = btoa(unescape(encodeURIComponent(jsonString)));
        // Add a prefix to make it look cool
        return `MATH-${base64}`;
    } catch (error) {
        console.error("Failed to generate code", error);
        return null;
    }
};

export const parseSaveCode = (code) => {
    try {
        if (!code.startsWith('MATH-')) {
            throw new Error("Invalid code format");
        }
        const base64 = code.replace('MATH-', '');
        const jsonString = decodeURIComponent(escape(atob(base64)));
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Failed to parse code", error);
        return null;
    }
};

export const generateCouponCode = (couponName) => {
    // Simple deterministic code generation based on name and timestamp
    const dateStr = new Date().getDate().toString();
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const namePart = btoa(encodeURIComponent(couponName)).substring(0, 4).toUpperCase();

    return `C-${namePart}-${dateStr}${randomPart}`;
};
