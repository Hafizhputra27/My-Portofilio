// Feature: personal-portfolio-website, Property 10: Contact form blocks submission when required fields are empty
// Feature: personal-portfolio-website, Property 11: Valid contact form submission triggers success state
import { render, screen, fireEvent, waitFor, cleanup, act } from '@testing-library/react'
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest'
import * as fc from 'fast-check'

// Mock @emailjs/browser before importing the component
vi.mock('@emailjs/browser', () => ({
  default: {
    sendForm: vi.fn(),
  },
}))

import emailjs from '@emailjs/browser'
const { default: Contact } = await import('../Contact.jsx')

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

/**
 * Property 10: Contact form blocks submission when required fields are empty
 * Validates: Requirements 12.7
 *
 * For any combination where at least one field is empty/whitespace-only,
 * emailjs.sendForm should NOT be called.
 */
describe('Contact — Property 10: form blocks submission when required fields are empty', () => {
  it('does not call emailjs.sendForm when at least one field is empty or whitespace-only', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string(),
          email: fc.string(),
          message: fc.string(),
        }).filter(({ name, email, message }) =>
          // At least one field must be empty or whitespace-only
          !name.trim() || !email.trim() || !message.trim()
        ),
        ({ name, email, message }) => {
          const { container } = render(<Contact />)

          // Fill in the fields
          const nameInput = container.querySelector('#name')
          const emailInput = container.querySelector('#email')
          const messageInput = container.querySelector('#message')

          fireEvent.change(nameInput, { target: { name: 'name', value: name } })
          fireEvent.change(emailInput, { target: { name: 'email', value: email } })
          fireEvent.change(messageInput, { target: { name: 'message', value: message } })

          // Submit the form
          const form = container.querySelector('form')
          fireEvent.submit(form)

          // emailjs.sendForm must NOT have been called
          expect(emailjs.sendForm).not.toHaveBeenCalled()

          // At least one inline validation error must be visible
          const errorName = container.querySelector('[data-testid="error-name"]')
          const errorEmail = container.querySelector('[data-testid="error-email"]')
          const errorMessage = container.querySelector('[data-testid="error-message"]')
          const hasError = errorName || errorEmail || errorMessage
          expect(hasError).not.toBeNull()

          cleanup()
          vi.clearAllMocks()
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Property 11: Valid contact form submission triggers success state
 * Validates: Requirements 12.5
 *
 * For any submission where all required fields are non-empty and EmailJS resolves,
 * status must become 'success' and success message must be visible.
 */
describe('Contact — Property 11: valid form submission triggers success state', () => {
  it('shows success message when all fields are filled and emailjs resolves', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          name: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          email: fc.emailAddress(),
          message: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
        }),
        async ({ name, email, message }) => {
          emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: 'OK' })

          const { container } = render(<Contact />)

          const nameInput = container.querySelector('#name')
          const emailInput = container.querySelector('#email')
          const messageInput = container.querySelector('#message')

          fireEvent.change(nameInput, { target: { name: 'name', value: name } })
          fireEvent.change(emailInput, { target: { name: 'email', value: email } })
          fireEvent.change(messageInput, { target: { name: 'message', value: message } })

          const form = container.querySelector('form')
          await act(async () => {
            fireEvent.submit(form)
          })

          // emailjs.sendForm must have been called
          expect(emailjs.sendForm).toHaveBeenCalled()

          // Wait for success message to appear
          await waitFor(() => {
            const successMsg = container.querySelector('[data-testid="success-message"]')
            expect(successMsg).not.toBeNull()
          })

          cleanup()
          vi.clearAllMocks()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ── Unit tests (24.5) ────────────────────────────────────────────────────────

describe('Contact — unit tests', () => {
  it('form fields (name, email, message) are present in the DOM', () => {
    render(<Contact />)
    expect(document.querySelector('#name')).not.toBeNull()
    expect(document.querySelector('#email')).not.toBeNull()
    expect(document.querySelector('#message')).not.toBeNull()
    cleanup()
  })

  it('EmailJS failure → status becomes error and error message is shown', async () => {
    emailjs.sendForm.mockRejectedValueOnce(new Error('network error'))

    const { container } = render(<Contact />)

    fireEvent.change(container.querySelector('#name'), {
      target: { name: 'name', value: 'Ahmad' },
    })
    fireEvent.change(container.querySelector('#email'), {
      target: { name: 'email', value: 'ahmad@example.com' },
    })
    fireEvent.change(container.querySelector('#message'), {
      target: { name: 'message', value: 'Hello!' },
    })

    await act(async () => {
      fireEvent.submit(container.querySelector('form'))
    })

    await waitFor(() => {
      expect(container.querySelector('[data-testid="error-message"]')).not.toBeNull()
    })

    cleanup()
  })

  it('EmailJS success → status becomes success and success message is shown', async () => {
    emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: 'OK' })

    const { container } = render(<Contact />)

    fireEvent.change(container.querySelector('#name'), {
      target: { name: 'name', value: 'Ahmad' },
    })
    fireEvent.change(container.querySelector('#email'), {
      target: { name: 'email', value: 'ahmad@example.com' },
    })
    fireEvent.change(container.querySelector('#message'), {
      target: { name: 'message', value: 'Hello!' },
    })

    await act(async () => {
      fireEvent.submit(container.querySelector('form'))
    })

    await waitFor(() => {
      expect(container.querySelector('[data-testid="success-message"]')).not.toBeNull()
    })

    cleanup()
  })
})
