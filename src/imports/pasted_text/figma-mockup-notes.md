1. Browser Window Mockup (center, anchor element)


Large rounded rectangle, x:130–615, y:248–595 (485×347), corner radius 16px, fill white, soft drop shadow.
Top bar: teal #4DC0AC rounded-top rectangle, x:130–615, y:248–300 (height 52px), with 3 small navy #334D85 filled circles (browser traffic-light dots) at x:155/180/205, y:270, radius 6px.
Below the top bar, content area split into two equal panels by a thin vertical line at x:400, both panels light gray dotted-pattern background #F2F5F4, inset 16px from window edges, y:310–580.


Left panel content


Small white card, x:280–365, y:325–385: 3 vertical bar-chart bars (blue #4A7FE0, ascending heights), plus 2 short horizontal blue line-bars beneath it (mock text).
Larger line-chart card below, x:200–350, y:440–530: thin axis lines, a rising zig-zag line graph in blue with 3 circular data-point dots, light grid background.


Right panel content


Green circle badge with checkmark, x:445–495, y:345–375, fill #4DC0AC/#1FAE7A, white check icon centered.
Teal speech-bubble icon beside it, x:510–560, y:345–380, with 3 white dots inside (chat indicator).
Short blue horizontal line-bar beneath, x:440–490, y:405–420 (mock text).
Image placeholder card, x:490–585, y:440–505: rounded rectangle, base fill warm coral/orange #F0735F, small yellow sun circle top-right corner, simple two-peak mountain icon in navy at bottom.
A dark navy mouse-cursor arrow icon floating at x:558, y:393 (decorative, implies "live editing").


2. Characters (8 total, flat vector illustration style, navy #334D85 hair/outlines, teal/green #4DC0AC and white clothing, peach skin tone, simplified limbs, no facial features beyond minimal style)


Running woman — far left edge, partially off-canvas, x:0–90, y:300–460. Navy bob hair flying upward/sideways (mid-stride motion), blue short-sleeve top, navy pencil skirt, arms swinging, legs in running stride. Thin vertical navy cord/line hangs above her from y:0–130 (decorative string, static).
Man with tablet — standing, x:85–175, y:420–590. Green polo shirt, navy pants, glasses, holding a tablet/laptop angled toward viewer showing a small pie-chart icon.
Man on ledge (top right) — sitting on the browser's top bar edge, legs dangling, x:460–555, y:160–305. Navy hair, green polo, navy pants, right arm raised holding a smartphone up near head height.
Standing man, center — x:355–420, y:445–590, in front of the chart. Green shirt, navy pants, left hand on hip, right arm extended pointing at the rising line-chart.
Seated man with laptop, bottom center — x:225–320, y:545–660. Gray t-shirt, navy pants, legs crossed on the ground, hunched forward looking down at laptop on his lap.
Woman pointing, far right — x:565–650, y:440–595. Navy hair in ponytail, dark navy/teal dress, leaning forward on one leg (other kicked back), pointing at the image placeholder card.
Kneeling woman with magnifying glass — x:440–545, y:465–650. Green dress, navy hair, kneeling, holding a large circular magnifying glass up to her eye, inspecting the image card.


3. Animation (looping, 3.6s cycle, ease-in-out fades, then resets to base state)

t = 0.0s (base/idle state): Everything as described above. No popups visible.

t ≈ 0.4s–2.8s: A small teal rounded-rectangle notification card fades/slides in above the tablet-man (character 2), x:95–190, y:305–390 — contains a bullet-point circle + 2 horizontal line-bars (mock notification/list preview). Holds on screen, then fades out by ~2.8s.

t ≈ 0.8s: A small dark navy zigzag/lightning "loading" glyph fades in over the phone held by the man on the ledge (character 3), near x:390–430, y:215–250 — implies the phone screen is processing/loading.

t ≈ 1.6s–2.4s: That loading glyph expands/scales up into a larger white rounded card (a popup/lightbox effect zooming from the phone), x:330–450, y:215–300, overlapping the top of the browser bar, containing a bold teal abstract crossed-wave/zigzag logo mark centered. Card scales up then back down and fades out by ~2.4s.

t ≈ 1.6s–2.4s (simultaneous): A small teal "code snippet" card with a </> icon pops up beside the seated laptop man (character 5), x:190–270, y:550–590, fades in then out.

t ≈ 1.6s–2.4s (simultaneous): Right-panel micro-swaps cycle:


The checkmark badge icon toggles between filled green "V" logo and plain white checkmark.
The magnifying-glass circle (held by character 7) briefly enlarges ~15% and shifts fill tone.
The image placeholder card's fill color cycles coral → blue #4A8FB5 → green #5FAE8A → back to coral, suggesting a live theme/content swap.


t ≈ 2.8s–3.6s: All popups fade out, icon swaps revert, colors settle back to the base palette — returning exactly to the t=0 state, then the loop repeats seamlessly.

4. Build notes for Figma Make


Build the browser mockup and all 7 characters as static SVG/vector groups first, positioned per the coordinates above.
Layer the 4 popup elements (notification card, loading-glyph→logo card, code snippet card, color-cycling image fill) as separate overlay groups, each with opacity 0 at rest.
Animate using simple fade-in/scale-up → hold → fade-out keyframes timed per the timeline above, looping infinitely.
Keep the 7 characters and browser mockup completely static (no movement) — only the 4 overlay elements animate.