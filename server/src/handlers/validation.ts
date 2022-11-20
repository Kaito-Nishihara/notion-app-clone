import { body, ValidationError, validationResult } from "express-validator";
import { Request } from "express-validator/src/base";

export async function validate(req: any, res: any, next: any) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
