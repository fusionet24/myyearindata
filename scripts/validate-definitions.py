#!/usr/bin/env python3
"""Validate that definitions.json entries have matching .qmd pages and vice versa."""
import json
import sys
from pathlib import Path


def main():
    project_root = Path(__file__).parent.parent
    json_path = project_root / "_extensions" / "defn" / "definitions.json"
    definitions_dir = project_root / "definitions"

    if not json_path.exists():
        print(f"ERROR: {json_path} not found")
        sys.exit(1)

    with open(json_path) as f:
        definitions = json.load(f)

    errors = []

    # Check each JSON entry has a matching page and required fields
    for key, entry in definitions.items():
        expected_page = definitions_dir / key / "index.qmd"
        if not expected_page.exists():
            errors.append(f"  Missing page for '{key}': expected {expected_page}")

        expected_url = f"/definitions/{key}/"
        if entry.get("url") != expected_url:
            errors.append(
                f"  URL mismatch for '{key}': got '{entry.get('url')}', expected '{expected_url}'"
            )

        for field in ("display", "summary", "url"):
            if field not in entry:
                errors.append(f"  Missing field '{field}' for '{key}'")

    # Check for orphaned definition pages (pages without JSON entries)
    if definitions_dir.exists():
        for page_dir in sorted(definitions_dir.iterdir()):
            if page_dir.is_dir() and (page_dir / "index.qmd").exists():
                if page_dir.name not in definitions:
                    errors.append(
                        f"  Orphaned page: {page_dir.name}/ has no entry in definitions.json"
                    )

    if errors:
        print("Definition validation FAILED:")
        for error in errors:
            print(error)
        sys.exit(1)
    else:
        print(f"Definition validation passed: {len(definitions)} definitions verified.")
        sys.exit(0)


if __name__ == "__main__":
    main()
