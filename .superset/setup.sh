#!/usr/bin/env bash
# Prepares a new Superset workspace for Harbor Beds.
set -euo pipefail

# Same install CI uses: exact versions from package-lock.json.
npm ci

# Copy local env files from the root checkout, if any exist. They are
# gitignored, so a fresh worktree never has them.
if [ -n "${SUPERSET_ROOT_PATH:-}" ]; then
  for f in "$SUPERSET_ROOT_PATH"/.env*; do
    [ -f "$f" ] || continue
    name="$(basename "$f")"
    [ -e "$name" ] || cp "$f" "$name"
  done
fi
