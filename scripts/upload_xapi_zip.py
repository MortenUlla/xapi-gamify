#!/usr/bin/env python3
"""Extract a Rise-generated xAPI ZIP and commit its contents.

This script accepts the path to a Rise export ZIP, unpacks it into the
``public/`` directory and commits the result to the repository.  The extracted
content must include a ``tincan.xml`` (or similar) manifest or the script will
abort.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

MANIFEST_NAMES = {
    "tincan.xml",
    "imsmanifest.xml",
    "xapi.xml",
}


def extract_zip(zip_path: Path, dest: Path) -> None:
    """Extract ``zip_path`` into ``dest``, clearing ``dest`` first."""
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)
    with zipfile.ZipFile(zip_path) as zf:
        zf.extractall(dest)


def has_manifest(dest: Path) -> bool:
    """Return True if ``dest`` contains a known xAPI manifest file."""
    for name in MANIFEST_NAMES:
        if any(dest.glob(f"**/{name}")):
            return True
    return False


def git_commit(path: Path, message: str, repo_root: Path) -> None:
    """Stage ``path`` and create a commit with ``message``."""
    subprocess.run(["git", "add", str(path)], cwd=repo_root, check=True)
    subprocess.run(["git", "commit", "-m", message], cwd=repo_root, check=True)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("zip_path", help="Path to the Rise-generated xAPI ZIP")
    parser.add_argument(
        "--public-dir",
        default="public",
        help="Directory where content will be extracted (default: public)",
    )
    args = parser.parse_args(argv)

    zip_path = Path(args.zip_path).resolve()
    public_dir = Path(args.public_dir).resolve()
    repo_root = Path.cwd()

    if not zip_path.exists():
        parser.error(f"ZIP not found: {zip_path}")
    if not zipfile.is_zipfile(zip_path):
        parser.error(f"Not a ZIP file: {zip_path}")

    extract_zip(zip_path, public_dir)

    if not has_manifest(public_dir):
        shutil.rmtree(public_dir)
        parser.error(
            "Extracted content is missing a tincan.xml or similar xAPI manifest"
        )

    commit_message = f"Add xAPI package from {zip_path.name}"
    git_commit(public_dir, commit_message, repo_root)
    return 0


if __name__ == "__main__":  # pragma: no cover - CLI entry point
    raise SystemExit(main())
