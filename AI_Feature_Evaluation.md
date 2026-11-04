# Section B2 – AI Feature Evaluation

## Selected Scenario: 3. Test Case Generator

### Business Requirement

An internal AI-powered tool generates test cases from a given user story. The generated test cases must follow a fixed JSON format because they are imported directly into the test management tool.

### Objective

To evaluate whether the AI-generated test cases are accurate, complete, non-duplicated, and compliant with the required JSON structure.

### Evaluation Checks

| Test ID | Evaluation Check | Test Approach / Expected Result | Scoring Method |
|---|---|---|---|
| AI_TC01 | Requirement Coverage | Provide a user story containing functional requirements, validations, and negative scenarios. Verify that the generated test cases cover all applicable acceptance criteria. | **Rubric:** Score 0–5 based on requirement coverage. 5 = complete coverage, 3 = partial coverage, 0 = no meaningful coverage. |
| AI_TC02 | Invented Requirements | Provide a user story with clearly defined acceptance criteria. Verify that the AI does not generate test cases based on unsupported assumptions or requirements not mentioned in the story. | **Human Review:** A QA reviewer compares each generated test case against the user story and identifies unsupported requirements. |
| AI_TC03 | Duplicate Test Cases | Generate multiple test cases from the same user story. Verify that the output does not contain duplicate test cases covering the same scenario with identical conditions and expected results. | **Automatically:** Compare normalized test steps, preconditions, and expected results. Flag potential duplicates for review. |
| AI_TC04 | JSON Format Validation | Verify that the generated output is valid JSON and follows the predefined schema, including mandatory fields and correct data types. | **Automatically:** Parse the JSON and validate it against the approved JSON schema. Fail if parsing or schema validation fails. |

## Example Evaluation Input

**User Story:**

As a registered user, I want to log in using my username and password so that I can access my account securely.

**Acceptance Criteria:**

1. Users can log in using valid credentials.
2. An error message must be displayed for invalid credentials.
3. Username and password are mandatory fields.

### Expected AI Behavior

The AI should generate test cases covering successful login, invalid credentials, missing username, and missing password.

The generated test cases must be unique, relevant to the acceptance criteria, and formatted according to the predefined JSON schema.

## Overall Evaluation Criteria

The AI-generated output will be considered acceptable when:

- All mandatory acceptance criteria are covered.
- No unsupported business requirements are introduced.
- No duplicate test scenarios are present.
- The JSON output passes the approved schema validation.

Any output containing invalid JSON must be rejected before import into the test management tool.

## Conclusion

The proposed evaluation set focuses on requirement coverage, factual accuracy, duplicate prevention, and JSON format validation. Combining rubric-based scoring, human review, and automated validation helps ensure that the AI-generated test cases are reliable and suitable for importing into the test management tool.
