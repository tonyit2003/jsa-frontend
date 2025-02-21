export const formatPhoneNumber = (value) => {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 6) {
        return numericValue.slice(0, 3) + "." + numericValue.slice(3);
    }

    return (
        numericValue.slice(0, 3) +
        "." +
        numericValue.slice(3, 6) +
        "." +
        numericValue.slice(6, 10)
    );
};

export const removeDots = (phone) => {
    return phone.replace(/\./g, "");
};

export const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length > 6) strength += 20;
    if (pass.match(/[A-Z]/)) strength += 20;
    if (pass.match(/[0-9]/)) strength += 20;
    if (pass.match(/[^A-Za-z0-9]/)) strength += 20;
    if (pass.length > 10) strength += 20;
    return strength;
};

export const formatNumber = (value) => {
    const number = Number(value);
    if (isNaN(number)) {
        return value;
    }
    return number.toLocaleString("vi-VN");
};

export const formatISODate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
