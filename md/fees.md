# Fees & Payments

## Description
   Functionality for user fee management. Feature has credit-like behavior. Generated fees are resolved against imported payments. Fees support due-date feature and its actual state is automatically recounted on change or specified due date. Simple reporting used for user and company perspective.


## Artifacts & Dependencies
### Schemas:
    peole.json
    fees.json
    payments.json
    imports.json
    \_importDefs.json

### Event Handlers:
    fee-modified.json
    payment-modified.json
    import-created.json

### Tools:
    * generateFees.js - generates fees for (filtered) users

## Configurations
    \_importDefs.json - defines  bank transaction csv list imports binding
## Limitations
1. Functionality strictly depends on fee schemas.

## Know Issues & Leftovers
1. Only single credit-account used for each user(no specific).
