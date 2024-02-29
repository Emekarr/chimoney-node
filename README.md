## Notes

- The project was not completed due to time constraints.
- Some workarounds were used to avoid overcomplicating the project and wasting time.

## Omissions / Workarounds

- Added an `activeSession` key to the user collection on Firestore to mark active tokens. In a real-world scenario, Redis would be used with a TTL set to the expiry time of the JWT.
- Encryption was not implemented due to time constraints. In a real-world scenario, an attestation service would be used to verify the authenticity of the client before initiating a secure key exchange using Elliptic Curve Diffie-Hellman protocol.

## Resources

- [Backend URL](https://chimoney-node-iea4.onrender.com)
- [Frontend URL](https://mango-tree-041520510.4.azurestaticapps.net)


## How to run locally
- After cloning the repo run `npm i` to install all dependencies
- Create a .env file and proceed to fill in the env variables specified
- Start the project using `npm run dev`
- Use at least `node 18.18.2`

## Approach
- The project was built using clean architecture principles which aimed at decoupling the various layers of the application to give freedom to swap out different parts of the application in the future.
- `tsyringe` was used as a dependency injection in this project. It is used to initialise classes which inherit from the infrastructure layer.
- The only relationship between the infrastruecture layer into the application layer is for the above `tsyringe` to inject them.