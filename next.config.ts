import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler disabled — incompatible with framer-motion v12,
  // @react-three/fiber v9, and @splinetool/react-spline v4 at runtime.
  // It rewrites hook internals in ways these animation/3D libs do not expect.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com"   },
    ],
  },
  // Transpile ESM-only packages so Next.js can bundle them for the client
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@splinetool/react-spline",
    "@splinetool/runtime",
  ],
};

export default nextConfig;
