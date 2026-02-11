import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";

const { fontFamily: interFont } = loadFont("normal", {
  weights: ["400", "600", "700", "900"],
  subsets: ["latin"],
});

const { fontFamily: caveatFont } = loadCaveat("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

// Brand colors from carousel
const COLORS = {
  brandGreen: "#0aaa50",
  brandGreenLight: "#0dcc60",
  darkBg: "#0f1419",
  cardBg: "#1a2027",
  white: "#ffffff",
  mlopsBlue: "rgba(59, 130, 246, 0.8)",
  llmopsPurple: "rgba(168, 85, 247, 0.8)",
  genaiPink: "rgba(236, 72, 153, 0.8)",
};

// Scene 1: PwC Report Hook
const PwCHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 } });
  const pwcSpring = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const statSpring = spring({ frame: frame - 30, fps, config: { damping: 15 } });

  const titleY = interpolate(titleSpring, [0, 1], [50, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const pwcScale = interpolate(pwcSpring, [0, 1], [0.5, 1]);
  const pwcOpacity = interpolate(pwcSpring, [0, 1], [0, 1]);

  const statScale = interpolate(statSpring, [0, 1], [0.3, 1]);
  const statOpacity = interpolate(statSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        fontFamily: interFont,
      }}
    >
      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10, 170, 80, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 170, 80, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: caveatFont,
          fontSize: 48,
          color: COLORS.brandGreen,
          marginBottom: 20,
        }}
      >
        Breaking News
      </div>

      <div
        style={{
          opacity: pwcOpacity,
          transform: `scale(${pwcScale})`,
          fontSize: 72,
          fontWeight: 900,
          color: COLORS.white,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        PwC Global CEO
        <br />
        Survey Dropped
      </div>

      <div
        style={{
          opacity: statOpacity,
          transform: `scale(${statScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 180,
            fontWeight: 900,
            color: COLORS.brandGreen,
            lineHeight: 1,
          }}
        >
          56%
        </div>
        <div
          style={{
            fontSize: 36,
            color: "rgba(255,255,255,0.7)",
            marginTop: 20,
          }}
        >
          see ZERO AI value
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: The Ops Landscape
const OpsLandscapeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 } });

  const ops = [
    { name: "MLOps", color: COLORS.mlopsBlue, delay: 15 },
    { name: "LLMOps", color: COLORS.llmopsPurple, delay: 30 },
    { name: "GenAIOps", color: COLORS.genaiPink, delay: 45 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        fontFamily: interFont,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10, 170, 80, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 170, 80, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.white,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        Everyone's doing...
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          alignItems: "center",
        }}
      >
        {ops.map((op, i) => {
          const opSpring = spring({
            frame: frame - op.delay,
            fps,
            config: { damping: 15, stiffness: 200 },
          });
          const scale = interpolate(opSpring, [0, 1], [0, 1]);
          const opacity = interpolate(opSpring, [0, 1], [0, 1]);

          return (
            <div
              key={op.name}
              style={{
                opacity,
                transform: `scale(${scale})`,
                background: op.color,
                padding: "30px 60px",
                borderRadius: 20,
                fontSize: 48,
                fontWeight: 700,
                color: COLORS.white,
              }}
            >
              {op.name}
            </div>
          );
        })}
      </div>

      <div
        style={{
          opacity: interpolate(
            spring({ frame: frame - 60, fps, config: { damping: 200 } }),
            [0, 1],
            [0, 1]
          ),
          fontFamily: caveatFont,
          fontSize: 44,
          color: COLORS.brandGreen,
          marginTop: 50,
        }}
      >
        ...as separate puzzle pieces
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Merge into AIOps
const MergeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mergeProgress = spring({
    frame,
    fps,
    config: { damping: 15 },
    durationInFrames: 60,
  });

  const ops = [
    { name: "MLOps", color: COLORS.mlopsBlue, angle: -120 },
    { name: "LLMOps", color: COLORS.llmopsPurple, angle: 0 },
    { name: "GenAIOps", color: COLORS.genaiPink, angle: 120 },
  ];

  const centerDistance = interpolate(mergeProgress, [0, 1], [280, 0]);
  const opsScale = interpolate(mergeProgress, [0, 1], [1, 0]);
  const opsOpacity = interpolate(mergeProgress, [0, 1], [1, 0]);

  const aiopsSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12 },
  });
  const aiopsScale = interpolate(aiopsSpring, [0, 1], [0, 1]);
  const aiopsOpacity = interpolate(aiopsSpring, [0, 1], [0, 1]);

  const textSpring = spring({ frame: frame - 60, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: interFont,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10, 170, 80, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 170, 80, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          position: "relative",
          width: 700,
          height: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Ops bubbles merging */}
        {ops.map((op) => {
          const radians = (op.angle * Math.PI) / 180;
          const x = Math.cos(radians) * centerDistance;
          const y = Math.sin(radians) * centerDistance;

          return (
            <div
              key={op.name}
              style={{
                position: "absolute",
                opacity: opsOpacity,
                transform: `translate(${x}px, ${y}px) scale(${opsScale})`,
                background: op.color,
                width: 180,
                height: 180,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.white,
              }}
            >
              {op.name}
            </div>
          );
        })}

        {/* AIOps center */}
        <div
          style={{
            opacity: aiopsOpacity,
            transform: `scale(${aiopsScale})`,
            background: COLORS.brandGreen,
            width: 280,
            height: 280,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 56,
            fontWeight: 900,
            color: COLORS.white,
            boxShadow: `0 0 80px ${COLORS.brandGreen}`,
          }}
        >
          AIOps
        </div>
      </div>

      <div
        style={{
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
          fontSize: 36,
          fontWeight: 600,
          color: COLORS.white,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        The <span style={{ color: COLORS.brandGreen }}>superset</span> that
        <br />
        connects everything
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: 11 Pillars
const PillarsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillars = [
    "Assessing Landscape",
    "Governance",
    "Model Management",
    "Security & Risk",
    "Monitoring",
    "Cost Management",
    "Team Structure",
    "Integration",
    "Vendor Strategy",
    "Adoption",
    "Scaling",
  ];

  const titleSpring = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
        fontFamily: interFont,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10, 170, 80, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 170, 80, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
          fontSize: 72,
          fontWeight: 900,
          color: COLORS.brandGreen,
          marginBottom: 20,
        }}
      >
        11
      </div>

      <div
        style={{
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
          fontSize: 44,
          fontWeight: 700,
          color: COLORS.white,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Key Considerations
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          maxWidth: 900,
        }}
      >
        {pillars.map((pillar, i) => {
          const pillarSpring = spring({
            frame: frame - 10 - i * 4,
            fps,
            config: { damping: 15, stiffness: 200 },
          });
          const scale = interpolate(pillarSpring, [0, 1], [0, 1]);
          const opacity = interpolate(pillarSpring, [0, 1], [0, 1]);

          return (
            <div
              key={pillar}
              style={{
                opacity,
                transform: `scale(${scale})`,
                background: COLORS.cardBg,
                border: `1px solid rgba(255,255,255,0.1)`,
                padding: "14px 20px",
                borderRadius: 10,
                fontSize: 22,
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {pillar}
            </div>
          );
        })}
      </div>

      <div
        style={{
          opacity: interpolate(
            spring({ frame: frame - 60, fps, config: { damping: 200 } }),
            [0, 1],
            [0, 1]
          ),
          fontFamily: caveatFont,
          fontSize: 40,
          color: COLORS.brandGreen,
          marginTop: 40,
        }}
      >
        This is the difference.
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: CTA
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 200 } });
  const cta1Spring = spring({ frame: frame - 20, fps, config: { damping: 15 } });
  const cta2Spring = spring({ frame: frame - 35, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        fontFamily: interFont,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(10, 170, 80, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 170, 80, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.white,
          }}
        >
          Stop doing AI.
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: COLORS.brandGreen,
            marginTop: 20,
          }}
        >
          Start doing AIOps.
        </div>
      </div>

      {/* CTA 1: Read the blog */}
      <div
        style={{
          opacity: interpolate(cta1Spring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(cta1Spring, [0, 1], [0.8, 1])})`,
          background: COLORS.brandGreen,
          padding: "25px 50px",
          borderRadius: 16,
          marginBottom: 25,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ fontSize: 36 }}>📖</div>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.white }}>
            Read the full breakdown
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>
            myyearindata.com/s/AIOps-Journey
          </div>
        </div>
      </div>

      {/* CTA 2: Follow on LinkedIn */}
      <div
        style={{
          opacity: interpolate(cta2Spring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(cta2Spring, [0, 1], [0.8, 1])})`,
          background: COLORS.cardBg,
          border: "2px solid rgba(255,255,255,0.1)",
          padding: "25px 50px",
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ fontSize: 36 }}>👤</div>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.white }}>
            Follow Scott Bell
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
            on LinkedIn
          </div>
        </div>
      </div>

      <div
        style={{
          opacity: interpolate(
            spring({ frame: frame - 50, fps, config: { damping: 200 } }),
            [0, 1],
            [0, 1]
          ),
          fontSize: 20,
          color: "rgba(255,255,255,0.4)",
          marginTop: 50,
        }}
      >
        Part 1 of The AIOps Journey series
      </div>
    </AbsoluteFill>
  );
};

// Main composition
export const AIOpsJourneyVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  // 15 seconds total = 450 frames at 30fps
  // Scene 1: 0-90 (3s) - PwC Hook
  // Scene 2: 90-180 (3s) - Ops Landscape
  // Scene 3: 180-270 (3s) - Merge into AIOps
  // Scene 4: 270-360 (3s) - 11 Pillars
  // Scene 5: 360-450 (3s) - CTA

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90} premountFor={fps}>
        <PwCHookScene />
      </Sequence>

      <Sequence from={90} durationInFrames={90} premountFor={fps}>
        <OpsLandscapeScene />
      </Sequence>

      <Sequence from={180} durationInFrames={90} premountFor={fps}>
        <MergeScene />
      </Sequence>

      <Sequence from={270} durationInFrames={90} premountFor={fps}>
        <PillarsScene />
      </Sequence>

      <Sequence from={360} durationInFrames={90} premountFor={fps}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
