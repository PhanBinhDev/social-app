export function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@')
  if (localPart.length <= 3) {
    return `${'*'.repeat(localPart.length)}@${domain}`
  }
  return `${localPart.slice(0, 3)}***@${domain}`
}
