export declare enum RoleName {
    SUPERADMIN = "SUPERADMIN",
    ADMIN_KONI = "ADMIN_KONI",
    BENDAHARA = "BENDAHARA",
    KETUA_UMUM = "KETUA_UMUM",
    SEKRETARIS = "SEKRETARIS",
    OPERATOR_CABOR = "OPERATOR_CABOR",
    AUDITOR = "AUDITOR"
}
export declare enum RabStatus {
    DRAFT = "DRAFT",
    SUBMITTED = "SUBMITTED",
    VERIFYING = "VERIFYING",
    REVISION_REQUIRED = "REVISION_REQUIRED",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED"
}
export declare enum ExpenseStatus {
    DRAFT = "DRAFT",
    SUBMITTED = "SUBMITTED",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED"
}
export declare enum PaymentMethod {
    ADVANCE_PANJAR = "ADVANCE_PANJAR",
    REIMBURSEMENT = "REIMBURSEMENT",
    DIRECT_PAYMENT = "DIRECT_PAYMENT"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PARTIAL = "PARTIAL",
    PAID = "PAID",
    CANCELLED = "CANCELLED"
}
export declare enum LpjStatus {
    DRAFT = "DRAFT",
    SUBMITTED = "SUBMITTED",
    VERIFYING = "VERIFYING",
    REVISION_REQUIRED = "REVISION_REQUIRED",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare enum ApprovalDecision {
    APPROVE = "APPROVE",
    REJECT = "REJECT",
    REQUEST_REVISION = "REQUEST_REVISION"
}
export declare enum TaxType {
    PPH21 = "PPH21",
    PPH22 = "PPH22",
    PPH23 = "PPH23",
    PPN11 = "PPN11"
}
export declare enum PublicationStatus {
    DRAFT = "DRAFT",
    APPROVED_FOR_PUBLICATION = "APPROVED_FOR_PUBLICATION",
    ARCHIVED = "ARCHIVED"
}
export declare class MoneyMath {
    /**
     * Mengonversi nilai float/string ke bigint sen (skala 2 desimal)
     */
    static toCents(val: number | string): bigint;
    /**
     * Mengonversi bigint sen kembali ke string angka dengan 2 desimal
     */
    static fromCents(cents: bigint): string;
    static add(a: number | string, b: number | string): string;
    static subtract(a: number | string, b: number | string): string;
    static multiply(a: number | string, factor: number): string;
    static formatRupiah(amount: number | string): string;
    static formatCompactRupiah(amount: number | string): string;
}
