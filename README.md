# xapi-gamify

Lets gamify your training!

## Uploading xAPI Content

Unpack and commit a Rise-generated xAPI package with the helper script:

```bash
python scripts/upload_xapi_zip.py path/to/rise-export.zip
```

The archive will be extracted into the `public/` directory. The script verifies
that a `tincan.xml` or similar manifest is present before committing the files
in `public/` to the repository.
