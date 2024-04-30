export enum EConType {
  TELEGRAM = "telegram",
  WHATSAPP = "whatsapp",
  PHONE = "phone",
  EMAIL = "email",
}

export enum EConTypeId {
    telegram = "telegramId",
    whatsapp = "whatsappId",
    email = "email",
    phone = "phone",
}

export enum ERequestStatus {
    NEW = "new", // The request has been submitted and is awaiting initial review.
    PENDING = "pending", // The request is under review, and additional information may be required.
    IN_PROGRESS = "in progress", // Work on the request has begun.
    ON_HOLD = "on hold", // The request is temporarily paused.
    RESOLVED = "on hold", // The issue or request has been successfully resolved.
    CLOSED = "closed", // The request has been closed after resolution or for administrative reasons.
    REJECTED = "rejected", // The request has been declined.
    ESCALATED = "escalated", // The request has been escalated to higher-level authority.

}