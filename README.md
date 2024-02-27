## Notes

- The project was not completed due to time constraints.
- Some workarounds were used to avoid overcomplicating the project and wasting time.

## Omissions / Workarounds

- Added a `blacklistedTokens` key to the user collection on Firestore to mark invalidated tokens. In a real-world scenario, Redis would be used with a TTL set to the expiry time of the JWT.
- Encryption was not implemented due to time constraints. In a real-world scenario, an attestation service would be used to verify the authenticity of the client before initiating a secure key exchange using Elliptic Curve Diffie-Hellman protocol.

## Resources

- [API Documentation](www.example.com)
- Backend URL: [www.example.com](www.example.com)
- Frontend URL: [www.example.com](www.example.com)

