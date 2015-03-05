# Requisitions (User Request Management)

## Description
  Feature is set of screens that supports user request management.
  Created request is assigned to configured resolver person. Notification mails send in case of issue creation and modification.

## Artifacts & Dependencies

###   Schema:
	requisitions.json

###  Event Handlers:
	requisition-modified.js

###  Translations: 
	\*.requisitions.\*

## Configuration
   *mails.requisitionSolverAddress* - specifies single issue solver, to this person is send notification mail. If mail match users email then issue is assigned to this user.

## Limitations

## Know Issues & Leftovers
1. No security - application does not define security (permissions,visibility,state machine,WF)
2. Missing custom user and solver views - Generic screens used (My issues, Solve issues, )
3. Static issue routing - single person specified as solver.
4. Minimalistic notifications - only two types of notification mail exist (created,modified)
