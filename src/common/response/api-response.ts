export class ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;

  constructor(success: boolean, message: string, data?: T, meta?: Record<string, unknown>) {
    this.success = success;
    this.message = message;
    if (data !== undefined) this.data = data;
    if (meta !== undefined) this.meta = meta;
  }

  static success<T>(message: string, data?: T, meta?: Record<string, unknown>): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data, meta);
  }

  static error(message: string, meta?: Record<string, unknown>): ApiResponse<never> {
    return new ApiResponse<never>(false, message, undefined, meta);
  }
}
