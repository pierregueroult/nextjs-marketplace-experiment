export class EmailDeliveryError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = "EmailDeliveryError";
  }
}

export class SMTPServerError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = "SMTPServerError";
  }
}
