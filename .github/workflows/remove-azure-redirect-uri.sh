#!/bin/bash

appRegId="fcb522a3-6a27-4c84-b4fb-3871ef2a7986"
graphUrl="https://graph.microsoft.com/v1.0/applications/$appRegId"

# Check if jq is installed
if ! command -v jq &>/dev/null; then
  echo "jq not found. Please install jq."
  exit 1
fi

result=$(az rest --method GET --uri "$graphUrl" --headers "Content-Type=application/json")

# Extract existing redirectUris from the result using jq
existingRedirectUris=$(echo "$result" | jq -r '.spa.redirectUris[]')

# Print the existing redirectUris
echo "Existing redirectUris: $existingRedirectUris"

# Redirect URI to be removed
redirectUrlToRemove="https://salmon-meadow-0f230d803-$PR_NUMBER.westeurope.3.azurestaticapps.net"

# Remove the specified redirectUrl from the existing redirectUris
updatedRedirectUris=($(echo "${existingRedirectUris[@]}" | tr ' ' '\n' | grep -v "$redirectUrlToRemove"))

echo "${updatedRedirectUris[*]}"

# Create JSON payload using printf to avoid issues with curly braces
payload=$(printf '{"spa": {"redirectUris": %s}}' "$(printf '%s\n' "${updatedRedirectUris[@]}" | jq -R . | jq -s .)")

echo "Payload: $payload"

# Update the redirectUris via PATCH request
az rest --method PATCH --uri "$graphUrl" --headers "Content-Type=application/json" --body "$payload"
