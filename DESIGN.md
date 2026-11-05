# Design tokens

The standalone lab keeps the Elicitation Lab page and shared design tokens from
the supplied design-system archive. The CSS source is `lab/tokens.css`,
`lab/shared.css`, and the page-specific rules in `lab/index.html`.

| Token | Value / use |
| --- | --- |
| Paper | `#FAFAF8`, page background |
| Ink | `#0A0A0A`, text and structural borders |
| Surface | `#FFFFFF`, cards and controls |
| Muted / faint | `#6B6B6B` text and `#E8E8E5` dividers |
| Accent | `#FFD400`, highlighter marks and selection cues |
| Typography | Libre Franklin body/display; Roboto Mono labels and payloads, with system fallbacks |
| Geometry | square corners, 1px borders, hard accent offset on hover |
| Layout | `1180px` maximum width; fluid `clamp(20px, 5vw, 56px)` gutters |
| Breakpoints | three-column lab becomes two columns below 1000px and one below 680px |

Controls use semantic HTML and visible focus styles. The mobile header and
editor toolbar wrap at narrow widths; reduced-motion preferences are respected.
