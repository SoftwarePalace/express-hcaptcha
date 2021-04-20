declare module "express-hcaptcha" {
  /**
   * HCaptcha express middleware.
   *
   * @param secret HCaptcha secret key (`0x...`)
   */
  export function validate(
    secret: string
  ): (req: unknown, res: unknown, next: unknown) => Promise<unknown>;
}
