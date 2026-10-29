# My Photo Styler

## Project Overview
My Photo Styler is a website project for photo editing and video editing services.

## Technologies Used
- HTML
- CSS
- JavaScript
- Git and GitHub
- GitHub Actions for Continuous Integration (CI)
- Node.js and HTMLHint for HTML validation

## CI Pipeline
The GitHub Actions workflow runs when code is pushed to the `main` branch or when a pull request targets `main`.

The pipeline:
1. Checks out the repository.
2. Sets up Node.js.
3. Installs dependencies using `npm ci`.
4. Checks that required website files exist.
5. Validates HTML using HTMLHint.

## Project Goal
This project is used to practise Git workflows, GitHub collaboration, and CI automation.

## Future Improvements
- Add CSS and JavaScript validation.
- Check for broken links and missing images.
- Add security scanning to the CI pipeline.
- Explore automated deployment.
