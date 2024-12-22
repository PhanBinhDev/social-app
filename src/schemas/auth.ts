import { z } from 'zod'

const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email không được để trống' })
    .email({ message: 'Email không hợp lệ' }),
  password: z
    .string({ required_error: 'Mật khẩu không được để trống' })
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  remember: z.boolean().optional()
})

const signUpSchema = z.object({
  email: z
    .string({ required_error: 'Email không được để trống' })
    .email({ message: 'Email không hợp lệ' }),
  password: z
    .string({
      required_error: 'Mật khẩu không được để trống'
    })
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(50, 'Mật khẩu không được vượt quá 50 ký tự')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
    ),
  full_name: z
    .string({ required_error: 'Tên không được để trống' })
    .min(6, { message: 'Tên phải có ít nhất 6 ký tự' })
})

const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Email không được để trống'
    })
    .email({ message: 'Email không hợp lệ' })
})
const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: 'Mật khẩu không được để trống'
      })
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .max(50, 'Mật khẩu không được vượt quá 50 ký tự')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
      ),
    confirmPassword: z.string({
      required_error: 'Xác nhận mật khẩu không được để trống'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  })

type SignInFormValues = z.infer<typeof signInSchema>
type SignUpFormValues = z.infer<typeof signUpSchema>
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export {
  signInSchema,
  signUpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type SignInFormValues,
  type SignUpFormValues,
  type ForgotPasswordFormValues,
  type ResetPasswordFormValues
}
