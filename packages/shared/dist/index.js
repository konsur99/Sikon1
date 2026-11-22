"use strict";
// ==============================================================================
// SIKONI — Shared Enums, Types, & Decimal-safe Arithmetic Utilities
// ==============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyMath = exports.PublicationStatus = exports.TaxType = exports.ApprovalDecision = exports.LpjStatus = exports.PaymentStatus = exports.PaymentMethod = exports.ExpenseStatus = exports.RabStatus = exports.RoleName = void 0;
var RoleName;
(function (RoleName) {
    RoleName["SUPERADMIN"] = "SUPERADMIN";
    RoleName["ADMIN_KONI"] = "ADMIN_KONI";
    RoleName["BENDAHARA"] = "BENDAHARA";
    RoleName["KETUA_UMUM"] = "KETUA_UMUM";
    RoleName["SEKRETARIS"] = "SEKRETARIS";
    RoleName["OPERATOR_CABOR"] = "OPERATOR_CABOR";
    RoleName["AUDITOR"] = "AUDITOR";
})(RoleName || (exports.RoleName = RoleName = {}));
var RabStatus;
(function (RabStatus) {
    RabStatus["DRAFT"] = "DRAFT";
    RabStatus["SUBMITTED"] = "SUBMITTED";
    RabStatus["VERIFYING"] = "VERIFYING";
    RabStatus["REVISION_REQUIRED"] = "REVISION_REQUIRED";
    RabStatus["APPROVED"] = "APPROVED";
    RabStatus["REJECTED"] = "REJECTED";
    RabStatus["CANCELLED"] = "CANCELLED";
})(RabStatus || (exports.RabStatus = RabStatus = {}));
var ExpenseStatus;
(function (ExpenseStatus) {
    ExpenseStatus["DRAFT"] = "DRAFT";
    ExpenseStatus["SUBMITTED"] = "SUBMITTED";
    ExpenseStatus["VERIFIED"] = "VERIFIED";
    ExpenseStatus["REJECTED"] = "REJECTED";
})(ExpenseStatus || (exports.ExpenseStatus = ExpenseStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["ADVANCE_PANJAR"] = "ADVANCE_PANJAR";
    PaymentMethod["REIMBURSEMENT"] = "REIMBURSEMENT";
    PaymentMethod["DIRECT_PAYMENT"] = "DIRECT_PAYMENT";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PARTIAL"] = "PARTIAL";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["CANCELLED"] = "CANCELLED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var LpjStatus;
(function (LpjStatus) {
    LpjStatus["DRAFT"] = "DRAFT";
    LpjStatus["SUBMITTED"] = "SUBMITTED";
    LpjStatus["VERIFYING"] = "VERIFYING";
    LpjStatus["REVISION_REQUIRED"] = "REVISION_REQUIRED";
    LpjStatus["APPROVED"] = "APPROVED";
    LpjStatus["REJECTED"] = "REJECTED";
})(LpjStatus || (exports.LpjStatus = LpjStatus = {}));
var ApprovalDecision;
(function (ApprovalDecision) {
    ApprovalDecision["APPROVE"] = "APPROVE";
    ApprovalDecision["REJECT"] = "REJECT";
    ApprovalDecision["REQUEST_REVISION"] = "REQUEST_REVISION";
})(ApprovalDecision || (exports.ApprovalDecision = ApprovalDecision = {}));
var TaxType;
(function (TaxType) {
    TaxType["PPH21"] = "PPH21";
    TaxType["PPH22"] = "PPH22";
    TaxType["PPH23"] = "PPH23";
    TaxType["PPN11"] = "PPN11";
})(TaxType || (exports.TaxType = TaxType = {}));
var PublicationStatus;
(function (PublicationStatus) {
    PublicationStatus["DRAFT"] = "DRAFT";
    PublicationStatus["APPROVED_FOR_PUBLICATION"] = "APPROVED_FOR_PUBLICATION";
    PublicationStatus["ARCHIVED"] = "ARCHIVED";
})(PublicationStatus || (exports.PublicationStatus = PublicationStatus = {}));
// Decimal-safe currency calculations using integer cents (Sen / Ratusan Rupiah)
class MoneyMath {
    /**
     * Mengonversi nilai float/string ke bigint sen (skala 2 desimal)
     */
    static toCents(val) {
        const str = typeof val === 'number' ? val.toFixed(2) : parseFloat(val || '0').toFixed(2);
        const [intPart, decPart = '00'] = str.split('.');
        const cleanDec = (decPart + '00').slice(0, 2);
        return BigInt(intPart) * BigInt(100) + BigInt(cleanDec);
    }
    /**
     * Mengonversi bigint sen kembali ke string angka dengan 2 desimal
     */
    static fromCents(cents) {
        const zero = BigInt(0);
        const hundred = BigInt(100);
        const sign = cents < zero ? '-' : '';
        const abs = cents < zero ? -cents : cents;
        const intPart = (abs / hundred).toString();
        const decPart = (abs % hundred).toString().padStart(2, '0');
        return `${sign}${intPart}.${decPart}`;
    }
    static add(a, b) {
        return this.fromCents(this.toCents(a) + this.toCents(b));
    }
    static subtract(a, b) {
        return this.fromCents(this.toCents(a) - this.toCents(b));
    }
    static multiply(a, factor) {
        const factorCents = Math.round(factor * 100);
        const resultCents = (this.toCents(a) * BigInt(factorCents)) / BigInt(100);
        return this.fromCents(resultCents);
    }
    static formatRupiah(amount) {
        const num = typeof amount === 'number' ? amount : parseFloat(amount || '0');
        return `Rp ${Math.round(num).toLocaleString('id-ID')}`;
    }
    static formatCompactRupiah(amount) {
        const num = typeof amount === 'number' ? amount : parseFloat(amount || '0');
        if (num >= 1_000_000_000) {
            return `Rp ${(num / 1_000_000_000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} M`;
        }
        if (num >= 1_000_000) {
            return `Rp ${(num / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt`;
        }
        return `Rp ${Math.round(num).toLocaleString('id-ID')}`;
    }
}
exports.MoneyMath = MoneyMath;
