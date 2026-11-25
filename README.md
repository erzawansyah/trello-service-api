> **Status: Archived (2026)**
>
> - **Reason:** a small internal tool for Sediksi (opinion submission form to Trello card) that is no longer used or maintained.
> - **Created:** 2021
>
> The code is kept for reference only. Issues and pull requests are not monitored.
>
> **Warning: known bugs, not maintained. Do not use as-is.**
>
> - `submit()` chains promises without returning them, so the API response is always `undefined` and upload errors are swallowed.
> - `getMimeType()` compares a `match()` result array against strings, so every file falls back to `application/msword`.
> - The endpoint has no authentication and no input validation: anyone can create cards in any list the Trello token can access.
> - Depends on axios 0.21.1, which has known CVEs.

# Trello Service API

This repo created for internal purpose.
I want to access Trello Card, List and Board from another app, likes React App, Wordpress Form, etc.
