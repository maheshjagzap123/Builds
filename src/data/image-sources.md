# Supporting Image Source Records

Track every **external supporting image** used in the Work/Projects section here,
so licensing can be verified and images can be replaced with real screenshots
later. See `AUDIT_REPORT.md` §27b and §18.4.

Rules:
- Only use images with clearly verified commercial-use rights (Unsplash, Pexels,
  Wikimedia Commons, public-domain, or other clearly licensed sources).
- If licensing cannot be verified, **do not use the image**.
- A supporting image is NEVER a screenshot. Never present it as real project UI.
- When a real screenshot is provided, it takes priority (`screenshot >
  project-asset > supporting`) — update `src/data/projects.js` `images[]`.

## Record template

```
Project:
Image (filename):
Source:            (Unsplash / Pexels / Wikimedia / …)
Original URL:
License:           (e.g. Unsplash License / CC0 / CC BY 4.0)
Attribution Required: (Yes/No — if Yes, where it's shown)
Image Type:        Supporting
Alt text:
```

## Records

_No external supporting images are in use yet. The three personal projects
currently render a branded placeholder tile (clearly not a screenshot) until
either supporting imagery (recorded here) or real screenshots are provided._

<!-- Example (fill in when a real image is added):
Project: TripWise
Image (filename): tripwise-travel-planning.jpg
Source: Pexels
Original URL: https://www.pexels.com/photo/...
License: Pexels License (commercial use OK)
Attribution Required: No
Image Type: Supporting
Alt text: Traveller planning a trip with a map and phone — supporting image
-->
