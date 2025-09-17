# LumaQA Cypress BDD Framework

A comprehensive Cypress automation testing framework with BDD (Behavior-Driven Development) using Cucumber/Gherkin, TypeScript, and modern testing practices.

## 🚀 Features

- **Cypress 15.2.0** with TypeScript support
- **Cucumber/Gherkin** for BDD test scenarios
- **Page Object Model** for maintainable test structure
- **API Testing** with RESTful API validation
- **File Upload/Download** testing capabilities
- **GitHub Actions** CI/CD pipeline
- **Parallel execution** support
- **Screenshot and video** capture on failures
- **Reusable Components** and custom commands

## 📁 Project Structure

```
cypress/
├── e2e/
│   ├── features/                    # Gherkin feature files
│   │   ├── api/
│   │   │   └── validate_api.feature
│   │   └── ui/
│   │       ├── dynamic.feature
│   │       ├── practice_form.feature
│   │       ├── upload_download.feature
│   │       └── webtables.feature
│   └── step_definitions/            # Step definition implementations
│       ├── api/
│       │   └── validate_api_steps.ts
│       ├── common_steps.ts          # Shared step definitions
│       └── ui/
│           ├── dynamic_steps.ts
│           ├── practice_form_steps.ts
│           ├── upload_download_steps.ts
│           └── webtables_steps.ts
├── support/                         # Support files and commands
│   ├── api_commands.ts              # Custom API commands
│   ├── commands.ts                  # Custom Cypress commands
│   ├── e2e.ts                      # E2E configuration
│   └── pageObjests/                # Page Object Model classes
│       ├── api/
│       │   └── validate_api_page.ts
│       └── ui/
│           ├── dynamic_page.ts
│           ├── practice_form_page.ts
│           ├── upload_download_page.ts
│           └── webtables_page.ts
├── fixtures/                        # Test data files
├── downloads/                       # Download test files
└── screenshots/                     # Test failure screenshots
```

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dabhijeet51/lumahealth-cypress-bdd.git
   cd lumaqa_cypress_bdd
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 🏃‍♂️ Running Tests

### Interactive Mode (Cypress Test Runner)

```bash
npm run cypress:open
```

### Headless Mode

```bash
npm run cypress:run
```

### Run Specific Test Suites

```bash
# Run all UI tests
npx cypress run --spec "cypress/e2e/features/ui/*.feature"

# Run API tests only
npx cypress run --spec "cypress/e2e/features/api/*.feature"

# Run specific feature
npx cypress run --spec "cypress/e2e/features/ui/practice_form.feature"
```

### Run with Different Browsers

```bash
# Chrome (default)
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge
```

## 🧪 Test Coverage

### UI Tests

- **Web Tables**: Data validation, sorting, pagination, CRUD operations
- **Dynamic Properties**: Dynamic content loading and interactions
- **Practice Form**: Form validation and submission
- **Upload/Download**: File handling operations

### API Tests

- **RESTful API Testing**: Complete CRUD operations
  - GET all resources
  - GET single resource by ID
  - POST create new resource
  - PUT update existing resource
  - DELETE resource

## 🔧 Configuration

### Cypress Configuration (`cypress.config.ts`)

- Base URL: `https://demoqa.com`
- Page load timeout: 60 seconds
- Command timeout: 30 seconds
- Spec pattern: `cypress/e2e/features/**/*.feature`

### Cucumber Configuration (`package.json`)

```json
"cypress-cucumber-preprocessor": {
  "stepDefinitions": "cypress/e2e/step_definitions/**/*.{js,ts}"
}
```

## 🚀 CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/cypress.yml`) that:

- **Triggers**: On push/PR to main branches and manual execution
- **Parallel Execution**: Runs tests across multiple containers
- **Matrix Strategy**: Scalable test execution

### Manual Workflow Execution

1. Go to **Actions** tab in GitHub
2. Select **Cypress Tests** workflow
3. Click **Run workflow**
4. Choose branch and click **Run workflow**

## 🎯 Reusable Components

### Custom Commands (`cypress/support/commands.ts`)

- **`navigateToMenu(menuPath: string[])`**: Navigate through menu items
- **TypeScript declarations**: Full type safety for custom commands

### API Commands (`cypress/support/api_commands.ts`)

- **`cy.apiRequest(action, payload)`**: Unified API testing interface
- **Actions**: `getAll`, `getById`, `create`, `update`, `delete`
- **Error handling**: Comprehensive error management

### Page Object Model

- **Centralized locators**: All selectors in page object classes
- **Reusable methods**: Common actions abstracted into methods
- **Type safety**: Full TypeScript support
- **Maintainable**: Easy to update when UI changes

### Common Step Definitions (`cypress/e2e/step_definitions/common_steps.ts`)

- **`I open the demoqa homepage`**: Navigate to base URL
- **`I navigate using menu to {string} and then {string}`**: Generic menu navigation

## 🎯 Design Principles

- **Page Object Model**: Maintainable and reusable page interactions
- **BDD Approach**: Business-readable test scenarios
- **Type Safety**: Full TypeScript support
- **Modular Structure**: Organized by feature and functionality
- **Error Handling**: Comprehensive error capture and reporting
- **Reusability**: Shared components and common steps

## 🔍 API Testing

The framework includes comprehensive API testing using [RESTful API](https://api.restful-api.dev/objects):

- **Base URL**: `https://api.restful-api.dev/objects`
- **Methods**: GET, POST, PUT, DELETE
- **Validation**: Status codes, response structure, data integrity
- **Error Handling**: 404 validation for deleted resources

## 📝 Best Practices

1. **Feature Files**: Use descriptive scenario names
2. **Step Definitions**: Keep steps reusable and parameterized
3. **Page Objects**: Encapsulate page interactions
4. **Data Management**: Use fixtures for test data
5. **Assertions**: Clear and meaningful validation messages
6. **Code Organization**: Separate UI and API concerns

### Common Issues

- **TypeScript Errors**: Ensure all imports are properly typed
- **API Timeouts**: Check network connectivity and API availability
- **File Upload Issues**: Verify file paths and permissions
- **Cucumber Steps**: Ensure step definitions match feature file steps

### Debug Mode

```bash
# Run with debug logs
DEBUG=cypress:* npm run cypress:run

# Run specific test with debug
npx cypress run --spec "cypress/e2e/features/ui/practice_form.feature" --headed
```

## 📚 Dependencies

- **Cypress**: 15.2.0
- **TypeScript**: 4.9.5
- **Cucumber Preprocessor**: 23.1.0
- **File Upload Plugin**: 5.0.8
- **Mochawesome Reporter**: 3.8.4
- **ESBuild**: 0.25.9
