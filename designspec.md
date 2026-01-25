# Grand Slam Tracker Design Spec

This guide captures the visual system and interaction intent of `app/components/grandSlamTracker.tsx` so future components can match the same aesthetic.

## Design intent
- **Mood**: nocturnal, premium sports telemetry with emerald highlights.
- **Visual metaphor**: illuminated stadium at night; winner data “glows” out of a dark field.
- **Density**: compact but breathable; hierarchy is created with glow, weight, and small caps.

## Composition & hierarchy
- **Card shell**: full-bleed gradient card with soft glow shadow, no border.
- **Header**: uppercase micro-label, bold title, supporting subtitle, and a compact verdict badge.
- **Hero block**: “Grand Slam Winner” banner with a strong border, slight glass effect, and larger avatar.
- **List**: stacked rows for each major with consistent height and right-aligned avatar/tbd ring.

## Layout system
- **Outer padding**: `p-5` with `space-y-6` to separate sections.
- **Row spacing**: `gap-3` between major rows.
- **Row padding**: `px-4 py-3` for list and hero blocks.
- **Radii**: `rounded-2xl` for the hero block, `rounded-xl` for list rows.

## Color & surfaces
- **Base gradient**: `bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900`.
- **Glow layer**: `radial-gradient(circle_at_top, rgba(16,185,129,0.25), transparent 55%)`.
- **Grid sheen**: thin diagonal lines at low opacity for texture.
- **Surfaces**:
  - Hero block: `bg-emerald-950/40` with `border-emerald-300/20`.
  - Rows: `bg-slate-950/40` with `border-emerald-300/10`.
- **Text palette**:
  - Primary: `text-white`.
  - Secondary: `text-emerald-100/70` or `/60` for supporting text.
  - Micro-labels: `text-emerald-200/70` or `/60`, uppercase tracking.

## Typography
- **Micro-labels**: `text-xs uppercase tracking-[0.2em–0.4em]`.
- **Title**: `text-2xl font-semibold tracking-tight`.
- **Row title**: `text-sm font-semibold`.
- **Secondary rows**: `text-xs` or `text-sm` with muted emerald.

## Components & affordances
- **Badge**: soft pill with translucent emerald background and ring outline.
- **Avatar**: 40–48px with `ring-2 ring-emerald-300/50+`. Provide fallback initials.
- **Placeholder**: dashed ring for unknown winner (`border-dashed`).
- **Card**: `border-0`, shadow glow `shadow-[0_18px_45px_-32px_rgba(15,118,110,0.7)]`.

## Motion
- **Entry**: `animate-in fade-in-50 duration-700` on header and sections.
- **List staggering**: `slide-in-from-bottom-2` with `animationDelay` per row (80ms increments).
- **Guideline**: motion should feel soft and atmospheric, never snappy.

## Data states
- **Answer badge**: `Yes / No / Maybe` derived from winners.
- **Winner block**:
  - If winner: show avatar + name.
  - If no winner: show explanatory text + dashed ring.
- **Major rows**:
  - Winner shows name + avatar.
  - No winner shows `TBD` + dashed ring.

## Implementation checklist
- Preserve the **night-emerald palette** and **glow layers**.
- Keep **uppercase micro-labels** for section headers.
- Use **ringed avatars** and **dashed placeholder circles** for missing data.
- Maintain **soft shadow glow** and **texture grid** on container.
- Maintain **staggered list animations**.

## Do / Don’t
**Do**
- Use emerald accents sparingly on dark surfaces.
- Keep gradients subtle and directional.
- Use opacity for hierarchy rather than new colors.

**Don’t**
- Swap to bright or saturated backgrounds.
- Remove texture layers; they provide depth.
- Replace uppercase micro-labels with regular case.
